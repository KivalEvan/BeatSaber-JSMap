import {
   assert,
   assertEquals,
   assertExists,
   loadDifficulty,
   loadLightshow,
   saveDifficulty,
   saveLightshow,
   type v3,
   type v4,
   type wrapper,
} from './deps.ts';
import {
   assertFixtureJson,
   assertV4DifficultyFidelity,
   assertV4LightshowFidelity,
} from './fixtureAssertions.ts';

const directory = './tests/resources/examples';

function throughJson<T>(value: T): T {
   return JSON.parse(JSON.stringify(value));
}

function readFixture<T>(path: string): T {
   return JSON.parse(Deno.readTextFileSync(`${directory}/${path}`));
}

function loadV4(difficulty: v4.IDifficulty, lightshow: v4.ILightshow): wrapper.IWrapBeatmap {
   const beatmap = loadDifficulty(difficulty, 4, { forceConvert: false });
   beatmap.lightshow = loadLightshow(lightshow, 4, { forceConvert: false }).lightshow;
   return beatmap;
}

function saveV4(beatmap: wrapper.IWrapBeatmap) {
   // Save converts the wrapper in place. Both files must be saved before any
   // conversion back to v3, then parsed and explicitly reattached on reload.
   const difficulty = throughJson(saveDifficulty(beatmap, 4));
   const lightshow = throughJson(saveLightshow(beatmap, 4));
   return { difficulty, lightshow, beatmap: loadV4(difficulty, lightshow) };
}

function rotationAt(events: v3.IRotationEvent[], beat: number): number {
   // Independent forward sum: early rotations affect equal-beat objects, late
   // rotations do not. Do not rely on converter output event order or count.
   return events.reduce((sum, event) => {
      const time = event.b ?? 0;
      return sum + (time < beat || (time === beat && (event.e ?? 0) === 0) ? event.r ?? 0 : 0);
   }, 0);
}

function sameAngle(degrees: number): number {
   return ((degrees % 360) + 360) % 360;
}

function expectedV4FromV3(source: v3.IDifficulty): wrapper.IWrapBeatmap {
   const expected = loadDifficulty(source, 3, { forceConvert: false });
   expected.version = 4;
   // These fixtures contain no BPM events: v4 moves the tempo map to AudioData,
   // which is a separate conversion contract, not silently excluded here.
   assertEquals(source.bpmEvents, []);
   expected.difficulty.rotationEvents = [];
   for (
      const objects of [
         expected.difficulty.colorNotes,
         expected.difficulty.bombNotes,
         expected.difficulty.obstacles,
         expected.difficulty.arcs,
         expected.difficulty.chains,
         expected.lightshow.waypoints,
      ]
   ) {
      for (const object of objects) {
         assertEquals(object.customData.worldRotation, undefined);
         // v4 lane angles are i32; v3 rotation deltas may be fractional. The
         // unavoidable quantization is applied only to the authored oracle.
         object.laneRotation = Math.round(
            rotationAt(source.rotationEvents ?? [], object.time) % 360,
         );
         if ('tailLaneRotation' in object) {
            object.tailLaneRotation = Math.round(
               rotationAt(source.rotationEvents ?? [], object.tailTime) % 360,
            );
         }
      }
   }
   return expected;
}

function assertV3Lanes(actual: v3.IDifficulty, source: v3.IDifficulty): void {
   for (
      const key of [
         'colorNotes',
         'bombNotes',
         'obstacles',
         'sliders',
         'burstSliders',
         'waypoints',
      ] as const
   ) {
      const expectedObjects = source[key] ?? [];
      const actualObjects = actual[key] ?? [];
      assertEquals(actualObjects.length, expectedObjects.length, key);
      expectedObjects.forEach((object, i) => {
         const expected = Math.round(rotationAt(source.rotationEvents ?? [], object.b ?? 0) % 360);
         const returned = actualObjects[i];
         const override = returned.customData?.worldRotation;
         const angle = typeof override === 'number'
            ? override
            : rotationAt(actual.rotationEvents ?? [], returned.b ?? 0);
         assertEquals(
            sameAngle(angle),
            sameAngle(expected),
            `${key}[${i}] at beat ${object.b ?? 0}`,
         );
         if (key === 'sliders' || key === 'burstSliders') {
            const tailBeat = ('tb' in object ? object.tb : 0) ?? 0;
            const returnedTailBeat = ('tb' in returned ? returned.tb : 0) ?? 0;
            assert(typeof tailBeat === 'number' && typeof returnedTailBeat === 'number');
            const tailAngle = typeof override === 'number'
               ? override
               : rotationAt(actual.rotationEvents ?? [], returnedTailBeat);
            assertEquals(
               sameAngle(tailAngle),
               sameAngle(Math.round(rotationAt(source.rotationEvents ?? [], tailBeat) % 360)),
               `${key}[${i}] tail at beat ${tailBeat}`,
            );
         }
      });
   }
}

function v3SharedContent(data: v3.IDifficulty): Record<string, unknown> {
   const result = throughJson(data);
   // v4 cannot retain a standalone timeline between spawns, or custom data on
   // its events. Assert the latter is absent rather than discarding authored data.
   for (const event of result.rotationEvents ?? []) {
      assertEquals(
         Object.keys(event).filter((key) => !['b', 'e', 'r', 'customData'].includes(key)),
         [],
      );
      assertEquals(event.customData ?? {}, {});
   }
   result.rotationEvents = [];
   for (
      const key of [
         'colorNotes',
         'bombNotes',
         'obstacles',
         'sliders',
         'burstSliders',
         'waypoints',
      ] as const
   ) {
      for (const object of result[key] ?? []) {
         if (typeof object.customData?.worldRotation === 'number') {
            delete object.customData.worldRotation;
            if (!Object.keys(object.customData).length) delete object.customData;
         }
      }
   }
   const usedFx = new Set<number>();
   const floatFx = result._fxEventsCollection?._fl ?? [];
   const fxGroups = (result.vfxEventBoxGroups ?? []).map((group) => {
      assertEquals(group.t, 1, 'Fixture uses float FX');
      return {
         ...group,
         e: group.e?.map((box) => ({
            ...box,
            l: box.l?.map((index) => {
               assert(Number.isInteger(index) && index >= 0 && index < floatFx.length);
               usedFx.add(index);
               return floatFx[index];
            }),
         })),
      };
   });
   assertEquals(usedFx.size, floatFx.length, 'Every float FX table row must be referenced');
   assertEquals(result._fxEventsCollection?._il, [], 'Fixture has no integer FX');
   // Like v4 tables, v3's float-FX collection may be reordered or deduplicated.
   // Compare each referenced event payload, not its numeric table index.
   return {
      ...result,
      vfxEventBoxGroups: fxGroups,
      _fxEventsCollection: { ...result._fxEventsCollection, _fl: [] },
   };
}

function v4LightshowThroughV3(source: v4.ILightshow): v4.ILightshow {
   const expected = throughJson(source);
   for (const event of expected.lightColorEvents ?? []) {
      // v3 has one transition enum (instant/interpolate/extend), not v4's
      // independent previous + easing fields. Extend cannot encode easing.
      // All non-extend easing in these fixtures is exactly representable.
      if (event.p === 1) event.e = -1;
      else assert([-1, 0].includes(event.e ?? 0), 'Fixture has unsupported v3 color easing');
   }
   return expected;
}

function v4DifficultyThroughV3(source: v4.IDifficulty): v4.IDifficulty {
   // v3 has no NJS-event array or table. Exclude only this format-level loss;
   // every other original field, reference and custom-data value stays checked.
   return { ...source, njsEvents: [], njsEventData: [] };
}

for (
   const path of [
      'Bad Apple!!/ExpertPlusStandard.dat',
      'The Phoenix/Expert90Degree.dat',
      'The Phoenix/Expert360Degree.dat',
   ]
) {
   Deno.test(`E2E conversion v3 → v4 → v3: ${path}`, async (t) => {
      const source = readFixture<v3.IDifficulty>(path);
      const original = JSON.stringify(source);
      const converted = loadDifficulty(source, 4);
      const intermediate = saveV4(converted);
      const returned = throughJson(saveDifficulty(intermediate.beatmap, 3));

      await t.step('every intermediate gameplay, lighting and custom-data field agrees', () => {
         assertFixtureJson(converted, expectedV4FromV3(source), 'Converted v4 wrapper');
         assertFixtureJson(
            loadV4(intermediate.difficulty, intermediate.lightshow),
            expectedV4FromV3(source),
            'Reloaded separate v4 files',
         );
      });
      await t.step('all non-rotation content returns to the original authored payload', () => {
         assertFixtureJson(
            v3SharedContent(returned),
            v3SharedContent(source),
            'Returned v3 payload',
         );
      });
      await t.step('every spawn retains its independently evaluated lane orientation', () => {
         assertV3Lanes(returned, source);
      });
      assertEquals(JSON.stringify(source), original, 'Parsed source must remain unchanged');
   });
}

for (
   const [filename, njsCount] of [
      ['ExpertPlusLegacy', 0],
      ['EasyStandard', 323],
      ['HardStandard', 310],
      ['ExpertPlusStandard', 240],
   ] as const
) {
   Deno.test(`E2E conversion v4 → v3 → v4: Angel Voices/${filename}`, async (t) => {
      const source = readFixture<v4.IDifficulty>(`Angel Voices/${filename}.dat`);
      const lightshow = readFixture<v4.ILightshow>(
         `Angel Voices/${
            filename === 'ExpertPlusLegacy' ? filename : 'ExpertPlusStandard'
         }.lightshow.dat`,
      );
      const original = JSON.stringify([source, lightshow]);
      assertEquals(source.njsEvents?.length, njsCount);
      const intermediate = throughJson(saveDifficulty(loadV4(source, lightshow), 3));
      const reloaded = loadDifficulty(intermediate, 3, { forceConvert: false });
      const returned = saveV4(loadDifficulty(intermediate, 4));

      await t.step('conversion on load agrees with conversion on save for both files', () => {
         const converted = loadDifficulty(source, 3);
         converted.lightshow = loadLightshow(lightshow, 3).lightshow;
         assertFixtureJson(
            throughJson(saveDifficulty(converted, 3)),
            intermediate,
            'Load-time v3 conversion',
         );
      });
      await t.step('v3 JSON carries every shared gameplay, lighting and custom-data field', () => {
         const expected = loadV4(v4DifficultyThroughV3(source), v4LightshowThroughV3(lightshow));
         expected.version = 3;
         assertFixtureJson(reloaded, expected, 'Intermediate merged v3 file');
         assert(!('njsEvents' in intermediate) && !('njsEventData' in intermediate));
         assertEquals(reloaded.difficulty.njsEvents, [], 'NJS has no v3 representation');
      });
      await t.step('all indexed gameplay records return, except the explicit NJS boundary', () => {
         assertV4DifficultyFidelity(returned.difficulty, v4DifficultyThroughV3(source));
         assertEquals(returned.difficulty.njsEvents, []);
         assertEquals(returned.difficulty.njsEventData, []);
      });
      await t.step('all lighting groups, boxes, filters, events and keyword data return', () => {
         assertV4LightshowFidelity(returned.lightshow, v4LightshowThroughV3(lightshow));
      });
      assertEquals(JSON.stringify([source, lightshow]), original);
   });
}

function addCustomData(record: { customData?: Record<string, unknown> }, location: string): void {
   record.customData = {
      ...record.customData,
      conversionProbe: {
         location,
         zero: 0,
         disabled: false,
         empty: '',
         // Default save rejects nullish values (optimize.throwNullish); this
         // payload exercises supported primitives without changing that policy.
         nested: [{ values: [0, false, '', [1, 2.5]] }],
      },
   };
}

Deno.test('E2E conversion: modified Bad Apple fixture preserves nested custom data at every v3 record kind', () => {
   const source = readFixture<v3.IDifficulty>('Bad Apple!!/ExpertPlusStandard.dat');
   addCustomData(source, 'difficulty');
   for (
      const key of [
         'colorNotes',
         'bombNotes',
         'obstacles',
         'sliders',
         'burstSliders',
         'basicBeatmapEvents',
         'colorBoostBeatmapEvents',
      ] as const
   ) {
      const objects = source[key];
      assertExists(objects?.[0]);
      addCustomData(objects[0], key);
   }
   for (
      const key of [
         'lightColorEventBoxGroups',
         'lightRotationEventBoxGroups',
         'lightTranslationEventBoxGroups',
         'vfxEventBoxGroups',
      ] as const
   ) {
      const group = source[key]?.[0];
      assertExists(group);
      addCustomData(group, key);
      const box = group.e?.[0];
      assertExists(box);
      addCustomData(box, `${key}.box`);
      assertExists(box.f);
      addCustomData(box.f, `${key}.filter`);
   }
   for (
      const key of [
         'lightColorEventBoxGroups',
         'lightRotationEventBoxGroups',
         'lightTranslationEventBoxGroups',
      ] as const
   ) {
      const box = source[key]![0].e![0];
      const event = 'e' in box ? box.e?.[0] : 'l' in box ? box.l?.[0] : undefined;
      assertExists(event);
      addCustomData(event, `${key}.event`);
   }
   assertExists(source._fxEventsCollection?._fl?.[0]);
   addCustomData(source._fxEventsCollection._fl[0], 'fxEvent');
   const original = JSON.stringify(source);
   const intermediate = saveV4(loadDifficulty(source, 3));
   const returned = throughJson(saveDifficulty(intermediate.beatmap, 3));
   assertFixtureJson(
      v3SharedContent(returned),
      v3SharedContent(source),
      'Modified v3 complete round trip',
   );
   assertV3Lanes(returned, source);
   assertEquals(JSON.stringify(source), original);
});

Deno.test('E2E conversion: modified Angel Voices fixture preserves shared table custom data', () => {
   const source = readFixture<v4.IDifficulty>('Angel Voices/ExpertPlusStandard.dat');
   const lightshow = readFixture<v4.ILightshow>('Angel Voices/ExpertPlusStandard.lightshow.dat');
   addCustomData(source, 'difficulty');
   const noteIndex = source.colorNotes![2].i!;
   assertEquals(noteIndex, source.colorNotes![15].i);
   // Arc/chain note references describe geometry, not independent note payloads.
   // Attach note custom data to a real shared note-only row, and slider custom
   // data to arcsData/chainsData, where both schemas represent it.
   assert(source.arcs!.every((arc) => arc.hi !== noteIndex && arc.ti !== noteIndex));
   assert(source.chains!.every((chain) => chain.i !== noteIndex));
   addCustomData(source.colorNotesData![noteIndex], 'sharedColorNote');
   for (const key of ['bombNotesData', 'obstaclesData', 'arcsData', 'chainsData'] as const) {
      assertExists(source[key]?.[0]);
      addCustomData(source[key]![0], key);
   }
   for (
      const key of [
         'basicEventsData',
         'colorBoostEventsData',
         'indexFilters',
         'lightColorEventBoxes',
         'lightColorEvents',
         'lightRotationEventBoxes',
         'lightRotationEvents',
         'lightTranslationEventBoxes',
         'lightTranslationEvents',
         'fxEventBoxes',
         'floatFxEvents',
      ] as const
   ) {
      assertExists(lightshow[key]?.[0]);
      addCustomData(lightshow[key]![0], key);
   }
   for (const type of [1, 2, 3, 4]) {
      const group = lightshow.eventBoxGroups!.find((group) => group.t === type);
      assertExists(group);
      addCustomData(group, `group.${type}`);
   }
   const original = JSON.stringify([source, lightshow]);
   const intermediate = throughJson(saveDifficulty(loadV4(source, lightshow), 3));
   const returned = saveV4(loadDifficulty(intermediate, 3));
   assertV4DifficultyFidelity(returned.difficulty, v4DifficultyThroughV3(source));
   assertV4LightshowFidelity(returned.lightshow, v4LightshowThroughV3(lightshow));
   assertEquals(JSON.stringify([source, lightshow]), original);
});

Deno.test('E2E conversion: interleaved integer/fractional spawn beats retain chronological rotations', () => {
   const source: v4.IDifficulty = {
      version: '4.1.0',
      colorNotes: [{ b: 1, r: 15 }, { b: 1.5, r: 30 }, { b: 2, r: 45 }],
      colorNotesData: [{}],
   };
   const intermediate = throughJson(saveDifficulty(loadDifficulty(source, 4), 3));
   // The integer/fractional beat mixture is also present in The Phoenix. This
   // minimal case diagnoses event-delta ordering without demanding an event list.
   for (const note of source.colorNotes!) {
      assertEquals(sameAngle(rotationAt(intermediate.rotationEvents ?? [], note.b!)), note.r);
   }
});

Deno.test('E2E conversion: modified Angel Voices retains conflicting same-beat lanes via mod data', () => {
   const source = readFixture<v4.IDifficulty>('Angel Voices/ExpertPlusStandard.dat');
   const lightshow = readFixture<v4.ILightshow>('Angel Voices/ExpertPlusStandard.lightshow.dat');
   const angles = [0, 15, -30, 45];
   for (const key of ['colorNotes', 'bombNotes', 'obstacles'] as const) {
      for (const [i, object] of source[key]!.entries()) object.r = angles[i % angles.length];
   }
   for (const key of ['arcs', 'chains'] as const) {
      for (const [i, object] of source[key]!.entries()) {
         object.hr = angles[i % angles.length];
         // v3 sliders have a single worldRotation, not independent head/tail
         // orientations. This scenario exercises the shared representation.
         object.tr = object.hr;
      }
   }
   assertEquals(source.colorNotes![0].b, source.colorNotes![1].b);
   assertEquals([source.colorNotes![0].r, source.colorNotes![1].r], [0, 15]);
   // Original fixtures have no waypoints. This explicit modification covers
   // their lane and custom-data conversion without claiming authored coverage.
   lightshow.waypoints = [{ b: source.colorNotes![0].b, r: 90, i: 0 }];
   lightshow.waypointsData = [{ x: 1, y: 2, d: 3 }];
   addCustomData(lightshow.waypointsData[0], 'waypoint');
   const original = JSON.stringify([source, lightshow]);
   const intermediate = throughJson(saveDifficulty(loadV4(source, lightshow), 3));
   assertEquals(
      intermediate.rotationEvents,
      [],
      'One vanilla timeline cannot express conflicting lanes',
   );
   for (
      const [v4Key, v3Key] of [
         ['colorNotes', 'colorNotes'],
         ['bombNotes', 'bombNotes'],
         ['obstacles', 'obstacles'],
         ['arcs', 'sliders'],
         ['chains', 'burstSliders'],
      ] as const
   ) {
      const expected = source[v4Key]!;
      const actual = intermediate[v3Key]!;
      assertEquals(actual.length, expected.length);
      expected.forEach((object, i) => {
         const rotation = 'hr' in object ? object.hr : 'r' in object ? object.r : 0;
         assertEquals(actual[i].customData?.worldRotation ?? 0, rotation ?? 0, `${v3Key}[${i}]`);
      });
   }
   assertEquals(intermediate.waypoints?.[0].customData?.worldRotation, 90);
   const returned = saveV4(loadDifficulty(intermediate, 3));
   assertV4DifficultyFidelity(returned.difficulty, v4DifficultyThroughV3(source));
   assertV4LightshowFidelity(returned.lightshow, v4LightshowThroughV3(lightshow));
   assertEquals(JSON.stringify([source, lightshow]), original);
});
