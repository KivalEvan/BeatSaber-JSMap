import {
   assert,
   assertEquals,
   assertExists,
   assertThrows,
   deserializeV4RotationEvent,
   loadDifficulty,
   loadLightshow,
   saveDifficulty,
   saveLightshow,
   serializeV4Difficulty,
   serializeV4Lightshow,
   serializeV4RotationEvent,
   toV2Beatmap,
   toV3Beatmap,
   toV4Beatmap,
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

function json<T>(value: T): T {
   return JSON.parse(JSON.stringify(value));
}

function fixture<T>(path: string): T {
   return JSON.parse(Deno.readTextFileSync(`${directory}/${path}`));
}

function loadV4(difficulty: v4.IDifficulty, lightshow: v4.ILightshow): wrapper.IWrapBeatmap {
   const beatmap = loadDifficulty(difficulty, 4, { forceConvert: false });
   beatmap.lightshow = loadLightshow(lightshow, 4, { forceConvert: false }).lightshow;
   return beatmap;
}

function saveV4(beatmap: wrapper.IWrapBeatmap) {
   const difficulty = json(saveDifficulty(beatmap, 4));
   const lightshow = json(saveLightshow(beatmap, 4));
   return { difficulty, lightshow, beatmap: loadV4(difficulty, lightshow) };
}

function spawnGroups(beatmap: wrapper.IWrapBeatmap) {
   return [
      ['colorNotes', beatmap.difficulty.colorNotes],
      ['bombNotes', beatmap.difficulty.bombNotes],
      ['obstacles', beatmap.difficulty.obstacles],
      ['arcs', beatmap.difficulty.arcs],
      ['chains', beatmap.difficulty.chains],
      ['waypoints', beatmap.lightshow.waypoints],
   ] as const;
}

function angle(degrees: number): number {
   return ((degrees % 360) + 360) % 360;
}

function rotationAt(events: wrapper.IWrapRotationEvent[], beat: number): number {
   // BSMG: early events affect equal-beat objects; late events affect only later
   // objects. Sum independently of event ordering and converter traversal.
   return events.reduce(
      (total, event) =>
         total +
         (event.time < beat || (event.time === beat && event.executionTime === 0)
            ? event.rotation
            : 0),
      0,
   );
}

function yawOverride(value: unknown): number | undefined {
   if (value === undefined) return undefined;
   if (typeof value === 'number') return value;
   assert(Array.isArray(value));
   assertEquals(value.length, 3);
   assertEquals([value[0], value[2]], [0, 0], 'This case covers only lane-representable vectors');
   assert(typeof value[1] === 'number');
   return value[1];
}

function orientationView(beatmap: wrapper.IWrapBeatmap): wrapper.IWrapBeatmap {
   const view = json(beatmap);
   for (const [, objects] of spawnGroups(view)) {
      for (const object of objects) {
         const override = yawOverride(
            beatmap.version === 2
               ? object.customData._rotation ?? object.customData.worldRotation
               : object.customData.worldRotation,
         );
         const native = beatmap.version === 4
            ? object.laneRotation
            : Math.round(rotationAt(beatmap.difficulty.rotationEvents, object.time) % 360);
         object.laneRotation = angle(override ?? native);
         if ('tailLaneRotation' in object) {
            const tail = beatmap.version === 4
               ? object.tailLaneRotation
               : Math.round(rotationAt(beatmap.difficulty.rotationEvents, object.tailTime) % 360);
            // DataModels' v3 SliderConverter and BurstSliderConverter call
            // BeatToRotation separately at head and tail. A Noodle override
            // remains absolute and applies to both endpoints instead.
            object.tailLaneRotation = angle(override ?? tail);
         }
         // A supported yaw may remain mod data or become a native lane. Compare
         // its effective angle above, and protect every OTHER custom-data field.
         delete object.customData.worldRotation;
         if (beatmap.version === 2) delete object.customData._rotation;
      }
   }
   view.version = 4;
   view.difficulty.rotationEvents = [];
   return view;
}

Deno.test('E2E rotation: modified Phoenix scalar/vector overrides beat vanilla events, including between slider endpoints', async (t) => {
   const source = fixture<v3.IDifficulty>('The Phoenix/Expert360Degree.dat');
   const overrides: (number | [number, number, number])[] = [
      0,
      [0, 90, 0],
      -30,
      [0, 0, 0],
      60,
      [0, -45, 0],
   ];
   // These are explicitly modified fixture records, not authored Noodle data.
   // Heck Objects documents scalar x as [0,x,0], absolute from song-start facing:
   // https://github.com/Aeroluna/Heck/wiki/Objects#all-objects
   // NoteInitNoodlifier and SliderInitNoodlifier replace _worldRotation; they do
   // not add the override to vanilla rotation (Heck revision 3bbcaf6733f6).
   for (const key of ['colorNotes', 'bombNotes', 'obstacles', 'sliders', 'burstSliders'] as const) {
      assertExists(source[key]);
      assert(source[key].length >= overrides.length, `${key}: exercise every override form`);
      for (const [i, object] of source[key].entries()) {
         object.customData = {
            ...object.customData,
            worldRotation: json(overrides[i % overrides.length]),
            rotationConversionProbe: { key, i, zero: 0, disabled: false, nested: ['', [1, 2]] },
         };
      }
   }
   assertExists(source.rotationEvents);
   for (const slider of [...source.sliders!, ...source.burstSliders!]) {
      assert((slider.tb ?? 0) > (slider.b ?? 0));
      const between = ((slider.b ?? 0) + (slider.tb ?? 0)) / 2;
      source.rotationEvents.push({ b: between, e: 0, r: 15 });
   }
   // Leave one ordinary note under the timeline so overrides cannot suppress
   // vanilla rotation globally. It retains all other custom data.
   delete source.colorNotes!.at(-1)!.customData!.worldRotation;
   const original = JSON.stringify(source);
   const expected = orientationView(loadDifficulty(source, 3, { forceConvert: false }));
   const onLoad = loadDifficulty(source, 4);
   const onSave = saveV4(loadDifficulty(source, 3, { forceConvert: false }));
   const fromLoad = saveV4(onLoad);
   const returned = json(saveDifficulty(onSave.beatmap, 3));
   const reloaded = loadDifficulty(returned, 3, { forceConvert: false });
   const secondV4 = saveV4(reloaded);
   assertEquals(JSON.stringify(source), original, 'Conversion must not mutate input JSON');

   await t.step('load/save conversion and split JSON reload preserve every effective angle', () => {
      assertFixtureJson(orientationView(onLoad), expected, 'Load-time v4');
      assertFixtureJson(orientationView(fromLoad.beatmap), expected, 'Reloaded load-time v4');
      assertFixtureJson(
         orientationView(loadV4(onSave.difficulty, onSave.lightshow)),
         expected,
         'Saved v4',
      );
      assertV4DifficultyFidelity(fromLoad.difficulty, onSave.difficulty);
      assertV4LightshowFidelity(fromLoad.lightshow, onSave.lightshow);
   });
   await t.step('mutating conversion preserves transferred custom-data aliases', () => {
      const transferredSource = json(source);
      const transferred = loadDifficulty(transferredSource, 3, { customDataOwnership: 'transfer' });
      const objects = spawnGroups(transferred).flatMap(([, objects]) => [...objects]);
      const customData = objects.map((object) => object.customData);
      assert(customData[0] === transferredSource.colorNotes![0].customData);
      toV4Beatmap(transferred);
      objects.forEach((object, i) => assert(object.customData === customData[i]));
      assertEquals(transferredSource.colorNotes![0].customData!.worldRotation, undefined);
      assertEquals(transferredSource.colorNotes![1].customData!.worldRotation, [0, 90, 0]);
      assertEquals(JSON.stringify(source), original);
      assertFixtureJson(orientationView(transferred), expected, 'Transferred v3 to v4');
   });
   await t.step('v3 fallback does not replace vector overrides with the vanilla lane', () => {
      assertFixtureJson(
         orientationView(loadDifficulty(returned, 3, { forceConvert: false })),
         expected,
         'Returned v3, all gameplay/lighting/custom data and every orientation',
      );
   });
   await t.step('a second v4 conversion retains all geometry, lighting and custom data', () => {
      assertFixtureJson(orientationView(secondV4.beatmap), expected, 'Second v4 round trip');
   });
});

Deno.test('E2E rotation: modified Phoenix native arc/chain tails use their own beat, including early/late endpoint events', async (t) => {
   const source = fixture<v3.IDifficulty>('The Phoenix/Expert360Degree.dat');
   assertExists(source.rotationEvents);
   for (const slider of [...source.sliders!, ...source.burstSliders!]) {
      const head = slider.b ?? 0;
      const tail = slider.tb ?? 0;
      assert(tail > head);
      assertEquals(slider.customData?.worldRotation, undefined);
      // Append deliberately unsorted; retain the complete original map and
      // timeline, adding only this explicitly labelled rotation modification.
      source.rotationEvents.push(
         { b: tail, e: 1, r: 13 },
         { b: head, e: 1, r: 7 },
         { b: (head + tail) / 2, e: 0, r: 19 },
         { b: head, e: 0, r: 11 },
         { b: tail, e: 0, r: 23 },
      );
   }
   const original = JSON.stringify(source);
   const expected = orientationView(loadDifficulty(source, 3, { forceConvert: false }));
   for (const sliders of [expected.difficulty.arcs, expected.difficulty.chains]) {
      assert(sliders.some((slider) => slider.laneRotation !== slider.tailLaneRotation));
   }
   const onLoad = loadDifficulty(source, 4);
   const onSave = saveV4(loadDifficulty(source, 3, { forceConvert: false }));
   const returned = saveV4(onLoad);
   assertEquals(JSON.stringify(source), original);

   await t.step('every object, both slider endpoints and all original shared data agree', () => {
      assertFixtureJson(orientationView(onLoad), expected, 'Load-time native endpoints');
      assertFixtureJson(orientationView(onSave.beatmap), expected, 'Save-time native endpoints');
      assertFixtureJson(orientationView(returned.beatmap), expected, 'Reloaded native endpoints');
      assertV4DifficultyFidelity(returned.difficulty, onSave.difficulty);
      assertV4LightshowFidelity(returned.lightshow, onSave.lightshow);
   });
});

Deno.test('E2E rotation: native v3 endpoints include early but exclude late rotations at each exact beat', () => {
   // A diagnostic counterpart to the complete modified-fixture comparison.
   // Endpoint expectations are literal, not generated by the converter.
   const source: v3.IDifficulty = {
      version: '3.3.0',
      rotationEvents: [
         { b: 3, e: 1, r: 120 },
         { b: 1, e: 1, r: 30 },
         { b: 2, e: 0, r: -15 },
         { b: 3, e: 0, r: 45 },
         { b: 1, e: 0, r: 15 },
      ],
      sliders: [
         { b: 1, tb: 3, mu: 1, tmu: 1 },
         { b: 0, tb: 1, mu: 1, tmu: 1 },
         { b: 3, tb: 4, mu: 1, tmu: 1 },
      ],
      burstSliders: [
         { b: 1, tb: 3, sc: 3, s: 1 },
         { b: 0, tb: 1, sc: 3, s: 1 },
         { b: 3, tb: 4, sc: 3, s: 1 },
      ],
   };
   const original = JSON.stringify(source);
   const expected = orientationView(loadDifficulty(source, 3, { forceConvert: false }));
   const converted = saveV4(loadDifficulty(source, 4));
   assertEquals(JSON.stringify(source), original);
   for (const sliders of [converted.beatmap.difficulty.arcs, converted.beatmap.difficulty.chains]) {
      assertEquals(sliders.map((s) => [s.laneRotation, s.tailLaneRotation]), [
         [15, 75],
         [0, 15],
         [75, 195],
      ]);
   }
   assertFixtureJson(
      orientationView(converted.beatmap),
      expected,
      'Complete native endpoint payload',
   );
});

Deno.test('E2E rotation: modified Angel Voices keeps unequal arc/chain endpoints when explicitly converting current v4', async (t) => {
   const source = fixture<v4.IDifficulty>('Angel Voices/ExpertPlusStandard.dat');
   const lightshow = fixture<v4.ILightshow>('Angel Voices/ExpertPlusStandard.lightshow.dat');
   const lanes = [15, -30, 90, 0];
   for (const key of ['arcs', 'chains'] as const) {
      assertExists(source[key]);
      assert(source[key].length > 0);
      for (const [i, slider] of source[key].entries()) {
         slider.hr = lanes[i % lanes.length];
         slider.tr = lanes[(i + 1) % lanes.length];
         assert(slider.hr !== slider.tr);
      }
   }
   // v4 explicitly defines independent hr/tr lanes. No v3 downgrade semantics or
   // invented tail-worldRotation extension is involved in this identity path.
   // https://bsmg.wiki/mapping/map-format/beatmap.html#arcs-rotation-lane
   const original = JSON.stringify([source, lightshow]);
   const direct = saveV4(loadV4(source, lightshow));
   const current = loadV4(source, lightshow);
   const currentJson = JSON.stringify(current);
   const currentGroups = spawnGroups(current);
   assert(toV4Beatmap(current) === current);
   assertEquals(JSON.stringify(current), currentJson, 'Current v4 conversion is an identity');
   for (const [i, [, objects]] of spawnGroups(current).entries()) {
      assert(objects === currentGroups[i][1], 'Current v4 object arrays retain their identity');
   }
   const converted = saveV4(current);
   assertEquals(JSON.stringify([source, lightshow]), original);

   await t.step('baseline serialization preserves every independently authored endpoint', () => {
      assertV4DifficultyFidelity(direct.difficulty, source);
      assertV4LightshowFidelity(direct.lightshow, lightshow);
   });
   await t.step(
      'explicit v4 conversion is lossless, including all NJS and lighting records',
      () => {
         assertV4DifficultyFidelity(converted.difficulty, source);
         assertV4LightshowFidelity(converted.lightshow, lightshow);
         assertFixtureJson(converted.beatmap, direct.beatmap, 'Every reloaded v4 field');
      },
   );
});

function endpointV4Source(): v4.IDifficulty {
   return {
      version: '4.1.0',
      colorNotes: [],
      colorNotesData: [
         { x: 1, y: 1, c: 0, d: 1, a: 0 },
         { x: 2, y: 0, c: 0, d: 0, a: 0 },
      ],
      bombNotes: [],
      bombNotesData: [],
      obstacles: [],
      obstaclesData: [],
      arcs: [
         { hb: 1, tb: 2.5, hr: 15, tr: 45, hi: 0, ti: 1, ai: 0 },
         { hb: 3, tb: 4, hr: 90, tr: 120, hi: 0, ti: 1, ai: 0 },
      ],
      arcsData: [{ m: 1, tm: 0.5, a: 1, customData: { probe: [0, false, 'arc'] } }],
      chains: [{ hb: 1.5, tb: 2, hr: 30, tr: 60, i: 0, ci: 0 }],
      chainsData: [{ tx: 2, ty: 0, c: 3, s: 0.75, customData: { probe: [0, false, 'chain'] } }],
      njsEvents: [],
      njsEventData: [],
      customData: { rotationConversionProbe: { zero: 0, disabled: false, nested: ['', [1, 2]] } },
   };
}

Deno.test('E2E rotation: representable unequal v4 arc/chain endpoints survive v3 and return to v4', async (t) => {
   const source = endpointV4Source();
   const lightshow = legacyLightshow();
   // No head/waypoint may accidentally supply the missing tail constraint to a
   // head-only converter. The distinct tail beats are 2, 2.5 and 4.
   lightshow.waypoints = [];
   lightshow.waypointsData = [];
   const original = JSON.stringify([source, lightshow]);
   const expected = loadV4(source, lightshow);
   const intermediate = json(saveDifficulty(loadV4(source, lightshow), 3));
   const reloaded = loadDifficulty(intermediate, 3, { forceConvert: false });
   const intermediateView = orientationView(reloaded);
   const returned = saveV4(reloaded);
   assertEquals(JSON.stringify([source, lightshow]), original);

   await t.step('v3 timeline carries every head and every tail, not just object heads', () => {
      assertFixtureJson(intermediateView, orientationView(expected), 'Every intermediate v3 field');
   });
   await t.step('all indexed geometry, endpoint lanes, lighting and custom data return', () => {
      assertV4DifficultyFidelity(returned.difficulty, source);
      assertFixtureJson(returned.beatmap, expected, 'Complete v4 endpoint round trip');
   });
});

for (const conflict of ['tail/tail', 'head/tail'] as const) {
   Deno.test(`E2E rotation: impossible v4 ${conflict} constraints reject v3 downgrade`, () => {
      const source = endpointV4Source();
      source.arcs = [{
         ...source.arcs![0],
         hb: conflict === 'tail/tail' ? 1 : 2,
         tb: conflict === 'tail/tail' ? 2 : 3,
         hr: conflict === 'tail/tail' ? 0 : 15,
         tr: conflict === 'tail/tail' ? 30 : 45,
      }];
      source.chains = [{
         ...source.chains![0],
         hb: 1,
         tb: 2,
         hr: 0,
         tr: conflict === 'tail/tail' ? 60 : 30,
      }];
      // Both sliders have unequal endpoints. One timeline cannot satisfy their
      // competing beat-2 lanes, and a single worldRotation per slider would
      // collapse its distinct head/tail lanes rather than solve the conflict.
      const original = JSON.stringify(source);
      for (const target of [2, 3] as const) {
         const loaded = loadDifficulty(source, 4, { forceConvert: false });
         assertV4DifficultyFidelity(json(saveDifficulty(loaded, 4)), source);
         const before = json(loaded);
         const error = assertThrows(() => saveDifficulty(loaded, target), Error);
         assert(/rotat|lane|tail|endpoint/i.test(error.message), 'Actionable rotation error');
         // v2 sets its version before its existing mod pass. The rotation
         // planner itself must reject without changing any payload fields.
         assertFixtureJson({ ...loaded, version: 4 }, before, 'No partial rotation mutation');
         assertEquals(JSON.stringify(source), original);
      }
   });
}

function conflictingEndpointSource(): v4.IDifficulty {
   const source = endpointV4Source();
   source.colorNotesData!.push(
      { x: 0, y: 0, c: 1, d: 1, customData: { probe: ['zero', false] } },
      { x: 1, y: 0, c: 1, d: 1, customData: { probe: ['sixty', 0] } },
      { x: 2, y: 0, c: 1, d: 1, customData: { worldRotation: 0, probe: ['scalar'] } },
      { x: 3, y: 0, c: 1, d: 1, customData: { worldRotation: [0, -90, 0], probe: ['vector'] } },
   );
   source.colorNotes = [
      { b: 2, r: 0, i: 2 },
      { b: 1.5, r: 60, i: 3 },
      { b: 2, r: 90, i: 4 },
      { b: 2, r: 90, i: 5 },
   ];
   source.bombNotes = [{ b: 2, r: -30, i: 0 }];
   source.bombNotesData = [{ x: 0, y: 1, customData: { probe: ['bomb'] } }];
   source.obstacles = [{ b: 2, r: 0, i: 0 }];
   source.obstaclesData = [{ x: 0, y: 0, w: 1, h: 3, d: 0.25, customData: { probe: ['wall'] } }];
   source.arcs = [
      { hb: 1, tb: 2, hr: 15, tr: 45, hi: 0, ti: 1, ai: 0 },
      { hb: 2, tb: 3, hr: 405, tr: 90, hi: 0, ti: 1, ai: 1 },
      { hb: 1.25, tb: 2, hr: 0, tr: 360, hi: 0, ti: 1, ai: 2 },
      { hb: 1, tb: 2, hr: -75, tr: 120, hi: 0, ti: 1, ai: 3 },
   ];
   source.arcsData = [0, 1, 2, 3].map((i) => ({
      m: 1,
      tm: 0.5,
      a: 1,
      customData: { probe: ['arc', i], ...(i === 3 ? { worldRotation: [0, -45, 0] } : {}) },
   }));
   source.chains = [
      { hb: 1.5, tb: 2, hr: 30, tr: 45, i: 0, ci: 0 },
      { hb: 1.75, tb: 2, hr: -360, tr: 0, i: 0, ci: 1 },
   ];
   source.chainsData = [0, 1].map((i) => ({
      tx: 2,
      ty: 0,
      c: 3,
      s: 0.75,
      customData: { probe: ['chain', i] },
   }));
   return source;
}

for (const target of [2, 3] as const) {
   for (const customDataOwnership of ['copy', 'transfer'] as const) {
      Deno.test(`E2E rotation: v${target} plans unequal endpoints before optional overrides (${customDataOwnership})`, () => {
         const source = conflictingEndpointSource();
         const lightshow = legacyLightshow();
         // Diagnostic data: keep all lighting, but use a version-neutral custom
         // field so this check isolates rotation rather than Chroma renaming.
         lightshow.basicEventsData![0].customData = { probe: [1, 0.5, 0] };
         for (const waypoint of lightshow.waypoints!) waypoint.r = 75;
         const original = JSON.stringify([source, lightshow]);
         const loaded = loadDifficulty(source, 4, { customDataOwnership, forceConvert: false });
         loaded.lightshow = loadLightshow(lightshow, 4, { customDataOwnership }).lightshow;
         const expected = orientationView(loaded);
         const objects = spawnGroups(loaded).flatMap(([, objects]) => [...objects]);
         const dataRefs = objects.map((obj) => obj.customData);
         const vector = loaded.difficulty.colorNotes[3].customData.worldRotation;
         const convert = target === 2 ? toV2Beatmap : toV3Beatmap;
         assert(convert(loaded) === loaded);
         assertFixtureJson(orientationView(loaded), expected, 'Every endpoint and shared field');
         const key = target === 2 ? '_rotation' : 'worldRotation';
         assertEquals(loaded.difficulty.colorNotes[0].customData[key], 0);
         assertEquals(loaded.difficulty.colorNotes[1].customData[key], 60);
         assertEquals(loaded.difficulty.colorNotes[2].customData[key], 0);
         assert(loaded.difficulty.colorNotes[3].customData[key] === vector);
         assertEquals(loaded.difficulty.arcs[0].customData[key], undefined);
         assertEquals(loaded.difficulty.arcs[1].customData[key], undefined);
         assertEquals(loaded.difficulty.arcs[2].customData[key], 0);
         assertEquals(rotationAt(loaded.difficulty.rotationEvents, 2), 45);
         if (target === 3) {
            objects.forEach((obj, i) => assert(obj.customData === dataRefs[i]));
            const reloaded = loadDifficulty(json(saveDifficulty(loaded, 3)), 3, {
               forceConvert: false,
            });
            assertFixtureJson(orientationView(reloaded), expected, 'Serialized v3 reload');
            assertFixtureJson(orientationView(saveV4(reloaded).beatmap), expected, 'v4 return');
         }
         if (customDataOwnership === 'copy') {
            assertEquals(JSON.stringify([source, lightshow]), original);
         } else if (target === 3) {
            assert(
               loaded.difficulty.colorNotes[0].customData === source.colorNotesData![2].customData,
            );
            assertEquals(source.colorNotesData![2].customData!.worldRotation, 0);
         }
         if (target === 3) {
            // Return without a JSON reload breaking the transferred waypoint
            // alias. Both records must consume the same scalar override.
            toV4Beatmap(loaded);
            assertFixtureJson(
               orientationView(loaded),
               expected,
               'Direct return retains shared override',
            );
            objects.forEach((obj, i) => assert(obj.customData === dataRefs[i]));
         }
      });
   }
}

Deno.test('E2E rotation: modified Angel Voices uses per-object overrides around unequal arc endpoints', () => {
   const source = fixture<v4.IDifficulty>('Angel Voices/ExpertPlusStandard.dat');
   const lightshow = fixture<v4.ILightshow>('Angel Voices/ExpertPlusStandard.lightshow.dat');
   assertExists(source.arcs);
   assert(source.arcs.length > 0);
   source.arcs[0].hr = 15;
   source.arcs[0].tr = 30;
   const original = JSON.stringify([source, lightshow]);
   const expected = orientationView(loadV4(source, lightshow));
   const loaded = loadV4(source, lightshow);
   toV3Beatmap(loaded);
   assertFixtureJson(orientationView(loaded), expected, 'Every in-memory field, including v4 NJS');
   // NJS events have no v3 JSON representation. Verify them above, then compare
   // every shared field through the actual v3 serialization boundary.
   const shared = json(expected);
   shared.difficulty.njsEvents = [];
   for (const group of shared.lightshow.lightColorEventBoxGroups) {
      for (const box of group.boxes) {
         for (const event of box.events) {
            // v3's EXTEND transition does not carry a separate easing value.
            if (event.previous) event.easing = -1;
            else assert([-1, 0].includes(event.easing), 'Non-extend easing is v3-representable');
         }
      }
   }
   const intermediate = loadDifficulty(json(saveDifficulty(loaded, 3)), 3, { forceConvert: false });
   assertFixtureJson(
      orientationView(intermediate),
      shared,
      'All original shared fields through v3',
   );
   assertFixtureJson(
      orientationView(saveV4(intermediate).beatmap),
      shared,
      'All shared fields return',
   );
   assertEquals(JSON.stringify([source, lightshow]), original);
});

Deno.test('E2E rotation: shared custom-data aliases constrain fallback without destructive writes', () => {
   const source = conflictingEndpointSource();
   source.colorNotes = [{ b: 2, r: 0, i: 2 }, { b: 3, r: 90, i: 2 }];
   const loaded = loadDifficulty(source, 4, {
      customDataOwnership: 'transfer',
      forceConvert: false,
   });
   assert(
      loaded.difficulty.colorNotes[0].customData === loaded.difficulty.colorNotes[1].customData,
   );
   const before = JSON.stringify(loaded);
   const original = JSON.stringify(source);
   assertThrows(() => toV3Beatmap(loaded), Error, 'shared custom data');
   assertEquals(
      JSON.stringify(loaded),
      before,
      'Reject before changing lanes, custom data or version',
   );
   assertEquals(JSON.stringify(source), original);

   // The same alias group is representable when its first note is not at a
   // competing required endpoint. Its two different lanes must use events,
   // rather than an override that would change both aliased records.
   source.colorNotes[0].b = 1.875;
   const possible = loadDifficulty(source, 4, {
      customDataOwnership: 'transfer',
      forceConvert: false,
   });
   const expected = orientationView(possible);
   const data = possible.difficulty.colorNotes[0].customData;
   toV3Beatmap(possible);
   assert(possible.difficulty.colorNotes[0].customData === data);
   assert(possible.difficulty.colorNotes[1].customData === data);
   assertEquals(data.worldRotation, undefined);
   assertFixtureJson(orientationView(possible), expected, 'Representable shared metadata');
});

Deno.test('E2E rotation: conflicting arcs and waypoints survive v4 → v2 → v4', () => {
   const source = conflictingEndpointSource();
   const lightshow = legacyLightshow();
   lightshow.basicEventsData![0].customData = { probe: [1, 0.5, 0] };
   for (const waypoint of lightshow.waypoints!) waypoint.r = 75;
   // v2 has no chain representation. This diagnostic exercises every shared
   // v2/v4 object kind without attributing that separate format loss to lanes.
   source.chains = [];
   source.chainsData = [];
   // Keep this rotation comparison in native v2 dimensions, not ME's packed encoding.
   source.obstaclesData![0].h = 5;
   source.colorNotes!.sort((a, b) => (a.b ?? 0) - (b.b ?? 0));
   const original = JSON.stringify([source, lightshow]);
   const loaded = loadV4(source, lightshow);
   // v2 only has normal basic lighting, not the later compatibility toggle.
   loaded.lightshow.useNormalEventsAsCompatibleEvents = true;
   const expected = orientationView(loaded);
   const saved = json(saveDifficulty(loaded, 2));
   const returned = loadDifficulty(saved, 2, { forceConvert: false });
   assertFixtureJson(
      orientationView(returned),
      expected,
      'Every v2 JSON endpoint and shared field',
   );
   assertFixtureJson(
      orientationView(saveV4(returned).beatmap),
      expected,
      'Every arc and waypoint override returns through v4 JSON',
   );
   assertEquals(JSON.stringify([source, lightshow]), original);
});

Deno.test('E2E rotation: whole-turn equivalent simultaneous endpoints do not conflict', () => {
   const source = endpointV4Source();
   source.arcs = [{ ...source.arcs![0], hb: 1, tb: 2, hr: 0, tr: 45 }];
   source.chains = [{ ...source.chains![0], hb: 1, tb: 2, hr: 360, tr: -315 }];
   source.colorNotes = [{ b: 1, r: -360, i: 0 }, { b: 2, r: 405, i: 1 }];
   const original = JSON.stringify(source);
   const loaded = loadDifficulty(source, 4, { forceConvert: false });
   const expected = orientationView(loaded);
   toV3Beatmap(loaded);
   assertEquals(loaded.difficulty.rotationEvents, [
      { time: 2, rotation: 45, executionTime: 0, customData: {} },
   ]);
   assertFixtureJson(orientationView(loaded), expected, 'Whole-turn aliases at every endpoint');
   assertFixtureJson(orientationView(saveV4(loaded).beatmap), expected, 'Alias return to v4');
   assertEquals(JSON.stringify(source), original);
});

function legacyV4Source() {
   // Minimal documented v4.0 input, not a rewritten real fixture. BSMG and
   // ChroMapper V4CommonData.RotationEvent use t (not v3's e):
   // https://bsmg.wiki/mapping/map-format/beatmap.html#spawn-rotations
   // ChroMapper revision 0d67a67d9b6e, Assets/__Scripts/Beatmap/V4/V4CommonData.cs.
   // Omit native r to isolate event-only migration from mixed-lane precedence.
   const beats = [0, 1, 2, 2.5, 3, 4, 5];
   return {
      version: '4.0.0',
      colorNotes: beats.map((b) => ({ b, i: 0 })),
      bombNotes: beats.map((b) => ({ b, i: 0 })),
      obstacles: beats.map((b) => ({ b, i: 0 })),
      colorNotesData: [
         { x: 1, y: 2, c: 1, d: 3, a: 15, customData: { probe: [0, false, ''] } },
         { x: 0, y: 0, c: 0, d: 1, a: 0 },
         { x: 1, y: 2, c: 0, d: 0, a: 0 },
      ],
      bombNotesData: [{ x: 3, y: 1, customData: { probe: { value: 0 } } }],
      obstaclesData: [{ x: 0, y: 0, d: 0.25, w: 1, h: 3, customData: { probe: false } }],
      arcs: [{ hb: 1, tb: 2.5, hi: 1, ti: 2, ai: 0 }],
      arcsData: [{ m: 1, tm: 0.5, a: 1, customData: { probe: [0, false, 'arc'] } }],
      chains: [{ hb: 2, tb: 3, i: 1, ci: 0 }],
      chainsData: [{ tx: 1, ty: 2, c: 3, s: 0.8, customData: { probe: [0, false, 'chain'] } }],
      spawnRotations: [{ b: 3, i: 2 }, { b: 1, i: 0 }, { b: 2, i: 1 }, { b: 4, i: 0 }],
      spawnRotationsData: [{ t: 0, r: 30 }, { t: 1, r: -15 }, { t: 0, r: 45 }],
      customData: { rotationConversionProbe: { nested: [0, false, '', [1, 2]] } },
   } satisfies v4.IDifficulty;
}

function legacyLightshow(): v4.ILightshow {
   return {
      version: '4.0.0',
      basicEvents: [{ b: 0, i: 0 }, { b: 5, i: 1 }],
      basicEventsData: [
         { t: 1, i: 3, f: 0.75, customData: { color: [1, 0.5, 0] } },
         { t: 4, i: 0, f: 1, customData: { probe: [false, 0, ''] } },
      ],
      colorBoostEvents: [{ b: 2, i: 0 }],
      colorBoostEventsData: [{ b: 1 }],
      waypoints: [{ b: 2, i: 0 }, { b: 2.5, i: 0 }],
      waypointsData: [{ x: 1, y: 2, d: 3, customData: { probe: [false, 0, ''] } }],
   };
}

function expectedLegacyEvents(source: ReturnType<typeof legacyV4Source>) {
   return source.spawnRotations.map(({ b, i }) => ({
      time: b,
      executionTime: source.spawnRotationsData[i].t,
      rotation: source.spawnRotationsData[i].r,
      customData: {},
   }));
}

function expectedLegacyBeatmap(
   source: ReturnType<typeof legacyV4Source>,
   lightshow: v4.ILightshow,
): wrapper.IWrapBeatmap {
   const events = expectedLegacyEvents(source);
   const expected = loadV4(source, lightshow);
   expected.difficulty.rotationEvents = [];
   for (const [, objects] of spawnGroups(expected)) {
      for (const object of objects) {
         object.laneRotation = rotationAt(events, object.time);
         if ('tailLaneRotation' in object) {
            object.tailLaneRotation = rotationAt(events, object.tailTime);
         }
      }
   }
   assertEquals(expected.difficulty.colorNotes.map((n) => n.laneRotation), [
      0,
      30,
      30,
      15,
      60,
      90,
      90,
   ]);
   return expected;
}

Deno.test('E2E rotation: nonempty legacy v4.0 tables resolve every early/late record', () => {
   const source = legacyV4Source();
   const original = JSON.stringify(source);
   const loaded = loadDifficulty(source, 4, { forceConvert: false });
   assertEquals(JSON.stringify(source), original);
   assertFixtureJson(
      loaded.difficulty.rotationEvents,
      expectedLegacyEvents(source),
      'Legacy events',
   );
});

Deno.test('E2E rotation: legacy v4 cleanup uses only t for execution time', () => {
   for (const data of [{ t: 1 }, { t: 1, e: 0 }, { e: 1 }] as const) {
      const source = {
         object: { b: 2 },
         data: { ...data, r: -15, customData: { probe: [0, false] } },
      };
      const original = JSON.stringify(source);
      const loaded = deserializeV4RotationEvent(source, { customDataOwnership: 'transfer' });
      const executionTime = 't' in data ? data.t : 0;
      assertEquals(loaded.executionTime, executionTime);
      const returned = json(serializeV4RotationEvent(loaded));
      assertFixtureJson(returned, {
         object: { b: 2 },
         data: { t: executionTime, r: -15, customData: { probe: [0, false] } },
      });
      assertEquals(JSON.stringify(source), original);
      assert(returned.data.customData !== source.data.customData);
   }
});

for (const customDataOwnership of ['copy', 'transfer'] as const) {
   Deno.test(`E2E rotation: bare v4 serializers migrate legacy lanes without mutating ${customDataOwnership} input`, () => {
      const source = legacyV4Source();
      const lightshow = legacyLightshow();
      const original = JSON.stringify([source, lightshow]);
      const loaded = loadDifficulty(source, 4, { customDataOwnership });
      loaded.lightshow = loadLightshow(lightshow, 4, { customDataOwnership }).lightshow;
      const before = JSON.stringify(loaded);
      const difficultyJson = serializeV4Difficulty(loaded);
      const lightshowJson = serializeV4Lightshow(loaded);
      assertEquals(
         JSON.stringify(loaded),
         before,
         'Bare serialization does not mutate the wrapper',
      );
      assertEquals(JSON.stringify([source, lightshow]), original);
      assert(difficultyJson.customData !== loaded.difficulty.customData);
      assert(
         difficultyJson.colorNotesData![0].customData!.probe !==
            source.colorNotesData[0].customData!.probe,
      );
      assert(
         lightshowJson.waypointsData![0].customData!.probe !==
            lightshow.waypointsData![0].customData!.probe,
      );
      assertFixtureJson(
         loadV4(json(difficultyJson), json(lightshowJson)),
         expectedLegacyBeatmap(source, lightshow),
         'Complete bare-serialized v4 reload',
      );
   });
}

for (const route of ['save current v4.1', 'explicit current v4.1', 'through v3'] as const) {
   Deno.test(`E2E rotation: nonempty legacy v4.0 event-only migration ${route}`, async (t) => {
      const source = legacyV4Source();
      const lightshow = legacyLightshow();
      const original = JSON.stringify([source, lightshow]);
      const expected = expectedLegacyBeatmap(source, lightshow);
      let beatmap = loadV4(source, lightshow);
      let intermediate: wrapper.IWrapBeatmap | undefined;
      if (route === 'explicit current v4.1') beatmap = toV4Beatmap(beatmap);
      if (route === 'through v3') {
         beatmap = loadDifficulty(json(saveDifficulty(beatmap, 3)), 3, { forceConvert: false });
         intermediate = json(beatmap);
      }
      const returned = saveV4(beatmap);
      assertEquals(JSON.stringify([source, lightshow]), original);
      assertEquals(returned.difficulty.version, '4.1.0');
      assert(!('spawnRotations' in returned.difficulty));
      assert(!('spawnRotationsData' in returned.difficulty));
      // Only standalone event records disappear; all authored object geometry,
      // effective orientations, lighting, and nested custom data remain checked.
      if (intermediate) {
         await t.step('intermediate v3 preserves every effective lane and shared field', () => {
            assertFixtureJson(orientationView(intermediate!), expected, 'Intermediate v3');
         });
      }
      await t.step('current v4.1 preserves every effective lane and shared field', () => {
         assertFixtureJson(returned.beatmap, expected, `${route}: complete migrated payload`);
      });
   });
}

for (const version of ['4.0.0', '4.1.0'] as const) {
   Deno.test(`E2E rotation: mixed legacy/native ${version} never silently chooses a representation`, async (t) => {
      for (const customDataOwnership of ['copy', 'transfer'] as const) {
         for (
            const group of [
               'colorNotes',
               'bombNotes',
               'obstacles',
               'arcs',
               'chains',
               'waypoints',
            ] as const
         ) {
            await t.step(`${customDataOwnership}: ${group}`, () => {
               const source: v4.IDifficulty = { ...legacyV4Source(), version };
               const lightshow = legacyLightshow();
               if (group === 'waypoints') lightshow.waypoints![0].r = 30;
               else if (group === 'arcs' || group === 'chains') source[group]![0].tr = 30;
               else source[group]![0].r = 30;
               // This also rejects a native 30-degree lane that happens to
               // agree with an event. Coincidence does not define precedence.
               const original = JSON.stringify([source, lightshow]);
               for (
                  const route of [
                     serializeV4Difficulty,
                     serializeV4Lightshow,
                     toV4Beatmap,
                     toV3Beatmap,
                     toV2Beatmap,
                  ]
               ) {
                  const loaded = loadDifficulty(source, 4, {
                     customDataOwnership,
                     forceConvert: false,
                  });
                  loaded.lightshow = loadLightshow(lightshow, 4, { customDataOwnership }).lightshow;
                  const before = JSON.stringify(loaded);
                  const events = loaded.difficulty.rotationEvents;
                  assertThrows(() => route(loaded), Error, 'mixed with nonzero native lanes');
                  assert(loaded.difficulty.rotationEvents === events);
                  if (route !== toV2Beatmap) assertEquals(JSON.stringify(loaded), before);
                  // The pre-existing v2 mod conversion precedes its rotation
                  // pass, but must not discard either rotation representation.
                  assertEquals(JSON.stringify([source, lightshow]), original);
               }
            });
         }
      }
   });
}
