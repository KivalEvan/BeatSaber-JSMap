import {
   assert,
   assertEquals,
   assertExists,
   assertThrows,
   loadDifficulty,
   loadLightshow,
   readFromInfo,
   readFromInfoSync,
   readInfoFileSync,
   saveDifficulty,
   saveInfo,
   saveLightshow,
   type v2,
   type v3,
   type wrapper,
} from './deps.ts';
import { assertFixtureJson } from './fixtureAssertions.ts';

const fixtureDirectory = './tests/resources/examples';

function readSource(map: string, filename: string): v2.IDifficulty {
   return JSON.parse(Deno.readTextFileSync(`${fixtureDirectory}/${map}/${filename}`));
}

// Custom data keeps meaningful zero/false values. Only empty containers and surrounding
// string whitespace are removable by the default optimizer; array order/length stays exact.
function canonicalCustomData(value: unknown): unknown {
   if (typeof value === 'string') return value.trim();
   if (Array.isArray(value)) return value.map(canonicalCustomData);
   if (value && typeof value === 'object') {
      return Object.fromEntries(
         Object.entries(value).flatMap(([key, child]) => {
            const normalized = canonicalCustomData(child);
            return normalized && typeof normalized === 'object' && !Object.keys(normalized).length
               ? []
               : [[key, normalized]];
         }),
      );
   }
   return value;
}

function canonicalV2Record(record: object): Record<string, unknown> {
   const result = { ...record } as Record<string, unknown>;
   for (const [key, value] of Object.entries(result)) {
      if (key === '_customData') {
         const customData = canonicalCustomData(value) as object;
         if (Object.keys(customData).length) result[key] = customData;
         else delete result[key];
      } else if (value === 0 || value === false) {
         // Zero omission applies to schema records, never arbitrary mod data.
         delete result[key];
      }
   }
   return result;
}

function assertV2FirstSave(saved: v2.IDifficulty, source: v2.IDifficulty): void {
   function canonical(data: v2.IDifficulty): object {
      const result = {
         _sliders: [],
         _waypoints: [],
         _specialEventsKeywordFilters: { _keywords: [] },
         ...data,
         _version: '2.6.0',
      };
      for (const key of ['_notes', '_obstacles', '_events', '_sliders', '_waypoints'] as const) {
         const records = result[key];
         assertExists(records, `${key} must exist in these fixtures and their saved output`);
         result[key] = records.map((record) => {
            const canonicalRecord = canonicalV2Record(record);
            // v2.0 does not store event brightness. v2.6 serializes its implicit value of one.
            if (key === '_events' && data._version === '2.0.0') canonicalRecord._floatValue = 1;
            return canonicalRecord;
         });
      }
      if (data._customData) result._customData = canonicalCustomData(data._customData) as object;
      return result;
   }
   assertEquals(saved._version, '2.6.0');
   assertFixtureJson(canonical(saved), canonical(source), 'difficulty');
}

function assertV2InfoFirstSave(info: wrapper.IWrapInfo, directory: string): void {
   const source: v2.IInfo = JSON.parse(Deno.readTextFileSync(`${directory}/Info.dat`));
   const expected: v2.IInfo = {
      ...source,
      _environmentNames: source._environmentNames ?? [],
      _colorSchemes: source._colorSchemes ?? [],
      _version: '2.1.0',
      // v2's free-form author separator becomes a comma-separated list on save.
      _levelAuthorName: source._levelAuthorName?.replace(' & ', ', '),
      _difficultyBeatmapSets: source._difficultyBeatmapSets?.map((set) => ({
         ...set,
         _difficultyBeatmaps: set._difficultyBeatmaps?.map((d) => ({
            ...d,
            _beatmapColorSchemeIdx: d._beatmapColorSchemeIdx ?? -1,
            _environmentNameIdx: d._environmentNameIdx ?? 0,
         })),
      })),
   };
   function canonical(data: v2.IInfo): object {
      const result = structuredClone(data);
      if (data._customData) result._customData = canonicalCustomData(data._customData) as object;
      for (const set of result._difficultyBeatmapSets) {
         for (const diff of set._difficultyBeatmaps) {
            if (diff._customData) {
               const custom = canonicalCustomData(diff._customData) as object;
               if (Object.keys(custom).length) diff._customData = custom;
               else delete diff._customData;
            }
         }
      }
      return result;
   }
   const saved = saveInfo(info, 2);
   assertEquals(saved._version, '2.1.0');
   assertFixtureJson(canonical(saved), canonical(expected), 'info');
}

/** Compare every vanilla gameplay/light value with the authored v2 records, not another save. */
function assertV2Content(actual: wrapper.IWrapBeatmap, source: v2.IDifficulty): void {
   assertExists(source._notes);
   assertExists(source._obstacles);
   assertExists(source._events);
   const notes = [...source._notes].sort((a, b) => (a._time ?? 0) - (b._time ?? 0));
   assertEquals(
      actual.difficulty.colorNotes.map((n) => [n.time, n.posX, n.posY, n.color, n.direction]),
      notes.filter((n) => n._type !== 3).map((n) => [
         n._time,
         n._lineIndex,
         n._lineLayer,
         n._type,
         n._cutDirection,
      ]),
      'All authored color-note values',
   );
   assertEquals(
      actual.difficulty.bombNotes.map((n) => [n.time, n.posX, n.posY]),
      notes.filter((n) => n._type === 3).map((n) => [n._time, n._lineIndex, n._lineLayer]),
      'All authored bomb values',
   );
   assertEquals(
      actual.difficulty.obstacles.map((o) => [
         o.time,
         o.posX,
         o.posY,
         o.duration,
         o.width,
         o.height,
      ]),
      source._obstacles.map((o) => [
         o._time,
         o._lineIndex,
         o._type === 1 ? 2 : 0,
         o._duration,
         o._width,
         o._type === 1 ? 3 : 5,
      ]),
      'All authored full-height and crouch-wall values',
   );
   assertEquals(
      actual.lightshow.basicEvents.map((e) => [e.time, e.type, e.value, e.floatValue]),
      // The v2.0 fixture predates float brightness; the v2.6 fixture supplies every value.
      source._events.map((e) => [e._time, e._type, e._value, e._floatValue ?? 1]),
      'All authored basic-lighting values',
   );
}

Deno.test('E2E: Preserved Valkyria preserves v2 content across supported conversions', async (t) => {
   const directory = `${fixtureDirectory}/Preserved Valkyria`;
   const source = readSource('Preserved Valkyria', 'ExpertPlusStandard.dat');
   const original = JSON.stringify(source);
   const info = readInfoFileSync('Info.dat', 2, { directory });
   assertEquals(info.song.title, 'Preserved Valkyria');
   assertEquals(info.difficulties.length, 1);
   assertEquals(info.difficulties[0].authors.mappers, ['Kival Evan']);
   const entries = readFromInfoSync(info, { directory });
   assertEquals(entries.length, 1);
   assertV2Content(entries[0].beatmap, source);
   assertEquals(entries[0].beatmap.difficulty.colorNotes.length, 1029);
   assertEquals(entries[0].beatmap.difficulty.bombNotes.length, 46);
   assertEquals(entries[0].beatmap.difficulty.obstacles.length, 11);

   await t.step('first save preserves every difficulty and info field', async () => {
      assertEquals(await readFromInfo(info, { directory }), entries);
      const saved = saveDifficulty(entries[0].beatmap, 2);
      assertV2FirstSave(saved, source);
      assertV2InfoFirstSave(info, directory);
      assertV2Content(loadDifficulty(JSON.parse(JSON.stringify(saved)), 2), source);
   });

   for (const version of [3, 4] as const) {
      await t.step(`v2 → v${version} → v2 preserves gameplay and basic lighting`, () => {
         // Exercise conversion on load and on save independently, using fresh wrappers because
         // cross-version saving is allowed to convert the wrapper in place.
         const convertedOnLoad = loadDifficulty(source, version);
         assertEquals(convertedOnLoad.version, version);
         assertV2Content(convertedOnLoad, source);
         const convertedOnSave = saveDifficulty(loadDifficulty(source, 2), version);
         assertEquals(convertedOnSave, saveDifficulty(convertedOnLoad, version));

         const reloaded = loadDifficulty(JSON.parse(JSON.stringify(convertedOnSave)), version);
         if (version === 4) {
            // v4 stores lighting separately; reattach it before checking and converting back.
            const savedLightshow = saveLightshow(convertedOnLoad, 4);
            reloaded.lightshow = loadLightshow(
               JSON.parse(JSON.stringify(savedLightshow)),
               4,
            ).lightshow;
         }
         assertV2Content(reloaded, source);
         const backToV2 = saveDifficulty(reloaded, 2);
         assertV2Content(loadDifficulty(JSON.parse(JSON.stringify(backToV2)), 2), source);
         assertEquals(JSON.stringify(source), original, 'Conversion must not mutate parsed input');
      });
   }

   await t.step('forceConvert false rejects mismatches without preventing a valid retry', () => {
      assertThrows(
         () => loadDifficulty(source, 3, { forceConvert: false }),
         Error,
         'Beatmap version unmatched, expected 3 but received 2',
      );
      const beatmap = loadDifficulty(source, 2);
      assertThrows(
         () => saveDifficulty(beatmap, 4, { forceConvert: false }),
         Error,
         'Beatmap version unmatched, expected 4 but received 2',
      );
      assertEquals(beatmap.version, 2);
      assertV2Content(beatmap, source);
      assertV2Content(loadDifficulty(saveDifficulty(beatmap, 2), 2), source);
      assertEquals(JSON.stringify(source), original);
   });
});

Deno.test('E2E: ECHO preserves v2 Noodle and Chroma payloads', async (t) => {
   const directory = `${fixtureDirectory}/ECHO`;
   const source = readSource('ECHO', 'ExpertPlusLawless.dat');
   const original = JSON.stringify(source);
   const info = readInfoFileSync('Info.dat', 2, { directory });
   // Keep the original Info.dat intact; only the Lawless difficulty is included as a fixture.
   const difficulties = info.difficulties.filter((d) => d.characteristic === 'Lawless');
   assertEquals(difficulties.length, 1);
   assertEquals(difficulties[0].filename, 'ExpertPlusLawless.dat');
   assertEquals(difficulties[0].customData._requirements, ['Noodle Extensions', 'Chroma']);
   const entries = readFromInfoSync({ difficulties }, { directory });
   assertEquals(entries.length, 1);
   const { beatmap } = entries[0];
   assertV2Content(beatmap, source);
   assertEquals(beatmap.difficulty.colorNotes.length, 1544);
   assertEquals(beatmap.difficulty.customData._customEvents?.length, 714);
   assertEquals(beatmap.difficulty.customData._environment?.length, 716);

   await t.step('reads and the first unoptimized save retain all custom payloads', async () => {
      assertEquals(await readFromInfo({ difficulties }, { directory }), entries);
      assertExists(source._notes);
      assertExists(source._events);
      assertEquals(beatmap.difficulty.customData, source._customData);
      assertEquals(
         beatmap.difficulty.colorNotes.map((n) => n.customData),
         source._notes.map((n) => n._customData),
      );
      assertEquals(
         beatmap.lightshow.basicEvents.map((e) => e.customData),
         source._events.map((e) => e._customData ?? {}),
      );

      const saved = saveDifficulty(beatmap, 2, { optimize: { enabled: false } });
      assertEquals(saved._customData, source._customData);
      assertEquals(
         saved._notes?.map((n) => n._customData),
         source._notes.map((n) => n._customData),
      );
      assertEquals(
         saved._events?.map((e) => e._customData),
         source._events.map((e) => e._customData ?? {}),
      );
      const reloaded = loadDifficulty(JSON.parse(JSON.stringify(saved)), 2);
      assertV2Content(reloaded, source);
      assertEquals(reloaded.difficulty.customData, source._customData);
      assertEquals(JSON.stringify(source), original);
      assertV2InfoFirstSave(info, directory);
   });

   await t.step('default save preserves every record and nested custom-data field', () => {
      const saved = saveDifficulty(beatmap, 2);
      assertV2FirstSave(saved, source);
      const animated = saved._notes?.find((n) => n._time === 52 && n._lineIndex === 1);
      assertExists(animated);
      assertEquals(animated._customData?._animation?._position, [
         [0, 0, -13.37, 0],
         [0, 0, 0, 0.4875, 'easeInOutQuad'],
      ]);
      assertEquals(saved._customData?._pointDefinitions, source._customData?._pointDefinitions);
      assertEquals(saved._customData?._customEvents?.[0], source._customData?._customEvents?.[0]);
      assertEquals(saved._customData?._environment?.[0], source._customData?._environment?.[0]);
      assertEquals(saved._notes?.filter((n) => n._customData?._fake).length, 677);
      assertEquals(JSON.stringify(source), original);
   });

   await t.step('nested animations and light IDs respect copy/transfer ownership', () => {
      const copied = loadDifficulty(source, 2);
      const transferred = loadDifficulty(source, 2, { customDataOwnership: 'transfer' });
      assertExists(source._notes);
      assertExists(source._events);
      const index = source._notes.findIndex((n) => n._customData?._animation?._position);
      assert(index >= 0);
      const sourceAnimation = source._notes[index]._customData!._animation!._position!;
      const copiedAnimation = copied.difficulty.colorNotes[index].customData._animation!._position!;
      const transferredAnimation = transferred.difficulty.colorNotes[index].customData
         ._animation!._position!;
      assert(Array.isArray(sourceAnimation));
      assert(Array.isArray(copiedAnimation));
      assert(copiedAnimation !== sourceAnimation);
      assert(copiedAnimation[0] !== sourceAnimation[0]);
      assert(transferredAnimation === sourceAnimation);
      const copiedFrame = copiedAnimation[0];
      assert(Array.isArray(copiedFrame));
      copiedFrame[0] = 99;

      const sourceIDs = source._events[0]._customData!._lightID!;
      const copiedIDs = copied.lightshow.basicEvents[0].customData._lightID!;
      assert(Array.isArray(copiedIDs));
      assert(copiedIDs !== sourceIDs);
      assert(transferred.lightshow.basicEvents[0].customData._lightID === sourceIDs);
      copiedIDs[0] = -100;
      assertEquals(JSON.stringify(source), original);

      const saved = saveDifficulty(transferred, 2, { optimize: { enabled: false } });
      assertExists(saved._customData?._pointDefinitions);
      const savedFrame = saved._customData._pointDefinitions[0]._points[0];
      assert(Array.isArray(savedFrame));
      savedFrame[0] = -1;
      assertEquals(JSON.stringify(source), original, 'Saving must not retain input aliases');
   });

   await t.step('v2 → v3 separates fake notes and translates Noodle/Chroma payloads', () => {
      const converted = loadDifficulty(source, 3);
      const saved: v3.IDifficulty = JSON.parse(JSON.stringify(saveDifficulty(converted, 3)));
      assertEquals(saved.colorNotes?.length, 867);
      assertEquals(saved.customData?.fakeColorNotes?.length, 677);
      assertExists(source._notes);
      for (const fake of [false, true]) {
         const originals = source._notes.filter((n) => !!n._customData?._fake === fake);
         const output = fake ? saved.customData?.fakeColorNotes : saved.colorNotes;
         assertExists(output);
         assertEquals(
            output.map((n) => [n.b ?? 0, n.x ?? 0, n.y ?? 0, n.c ?? 0, n.d ?? 0, n.a ?? 0]),
            originals.map((n) => [
               n._time,
               n._lineIndex,
               n._lineLayer,
               n._type,
               n._cutDirection,
               0,
            ]),
            fake ? 'Every fake-note placement' : 'Every playable-note placement',
         );
      }
      const animated = saved.colorNotes?.find((n) => n.b === 52 && n.x === 1);
      assertExists(animated);
      assertEquals(animated.customData?.animation?.offsetPosition, [
         [0, 0, -13.37, 0],
         [0, 0, 0, 0.4875, 'easeInOutQuad'],
      ]);
      assertEquals(animated.customData?.spawnEffect, false);
      assertEquals(animated.customData?.noteJumpMovementSpeed, 18);
      const fake = saved.customData!.fakeColorNotes![0];
      assertEquals([fake.b, fake.x, fake.y, fake.c, fake.d], [134.4375, 1, 0, 1, 6]);
      assertEquals(fake.customData?.track, 'echooo');
      assertEquals(fake.customData?.uninteractable, true);
      assertEquals(fake.customData?.animation?.dissolveArrow, [
         [0, 0.25],
         [1, 0.375, 'easeInQuad'],
         [0, 0.5, 'easeOutQuad'],
      ]);
      assertExists(source._customData?._pointDefinitions);
      assertFixtureJson(
         saved.customData?.pointDefinitions,
         Object.fromEntries(source._customData._pointDefinitions.map((p) => [p._name, p._points])),
         'converted point definitions',
      );
      assertFixtureJson(
         saved.customData?.customEvents?.map((e) => [e.b, e.t]),
         source._customData?._customEvents?.map((e) => [e._time, e._type]),
         'Every custom-event time and type',
      );
      assertEquals(saved.customData?.customEvents?.[0], {
         b: 100,
         t: 'AnimateTrack',
         d: {
            track: ['dropL1CC', 'dropL2CC', 'dropL3CC', 'dropL4CC'],
            color: [[0.269, 0.269, 0.269, 1, 0]],
         },
      });
      assertEquals(saved.basicBeatmapEvents?.[0].customData?.lightID, [
         380,
         412,
         436,
         445,
         471,
         472,
         473,
         477,
         509,
         532,
         540,
         572,
      ]);
      const reloaded = loadDifficulty(JSON.parse(JSON.stringify(saved)), 3);
      assertEquals(reloaded.difficulty.customData.fakeColorNotes, saved.customData?.fakeColorNotes);
      assertEquals(reloaded.difficulty.customData.customEvents, saved.customData?.customEvents);
      assertEquals(JSON.stringify(source), original);
   });
});
