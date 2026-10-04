import {
   assertEquals,
   assertThrows,
   loadDifficulty,
   loadInfo,
   loadLightshow,
   saveDifficulty,
   saveInfo,
   saveLightshow,
   type v1,
   type v2,
   type v3,
   type v4,
   wrapper,
} from './deps.ts';
import { assertFixtureJson } from './fixtureAssertions.ts';
import { serializeDifficulty } from '../src/beatmap/schema/v1/difficulty.ts';
import { deserializeInfo } from '../src/beatmap/schema/v1/info.ts';

const directory = './tests/resources/examples/Preserved Valkyria';

function json<T>(value: T): T {
   return JSON.parse(JSON.stringify(value));
}

function legacyFixture(): v1.IDifficulty {
   const source: v2.IDifficulty = JSON.parse(
      Deno.readTextFileSync(`${directory}/ExpertPlusStandard.dat`),
   );
   // Labelled v1 adaptation, NOT an authored v1 map. Every original gameplay
   // and lighting record is already in the v1 shape (no custom data/floats).
   assertEquals(source._waypoints, []);
   for (const note of source._notes!) {
      assertEquals(Object.keys(note).sort(), [
         '_cutDirection',
         '_lineIndex',
         '_lineLayer',
         '_time',
         '_type',
      ]);
   }
   for (const event of source._events!) {
      assertEquals(Object.keys(event).sort(), ['_time', '_type', '_value']);
   }
   return {
      _version: '1.5.0',
      _beatsPerMinute: 155,
      _beatsPerBar: 4,
      _shuffle: 0,
      _shufflePeriod: 0.5,
      _noteJumpSpeed: 18.5,
      _noteJumpStartBeatOffset: -0.5,
      _notes: json(source._notes!) as v1.INote[],
      _obstacles: json(source._obstacles!) as v1.IObstacle[],
      _events: json(source._events!) as v1.IEvent[],
      // v1 editor metadata uses a top-level array and lowercase _bpm records.
      // v2-only editor settings are not part of the v1 format.
      _time: source._customData!._time,
      _BPMChanges: source._customData!._BPMChanges!.map((event) => ({
         _time: event._time,
         _bpm: event._BPM,
         _beatsPerBar: event._beatsPerBar,
         _metronomeOffset: event._metronomeOffset,
      })),
      // Synthetic legacy bookmarks cover zero/empty-string values as well.
      _bookmarks: [{ _time: 0, _name: '' }, { _time: 127.5145, _name: 'Tempo change' }],
   };
}

function legacySettings(source: v1.IDifficulty) {
   return {
      bpm: source._beatsPerMinute,
      beatsPerBar: source._beatsPerBar,
      shuffle: source._shuffle,
      shufflePeriod: source._shufflePeriod,
      njs: source._noteJumpSpeed,
      njsOffset: source._noteJumpStartBeatOffset,
   };
}

function ordered(source: v1.IDifficulty): v1.IDifficulty {
   const result = json(source);
   // Separate color/bomb arrays may interleave differently on serialization.
   // Only record order is canonicalized; all keys and values remain checked.
   result._notes.sort((a, b) =>
      a._time - b._time || a._lineIndex - b._lineIndex || a._lineLayer - b._lineLayer ||
      a._type - b._type
   );
   result._obstacles.sort((a, b) => a._time - b._time);
   result._events.sort((a, b) => a._time - b._time || a._type - b._type);
   return result;
}

function assertContent(actual: wrapper.IWrapBeatmap, source: v1.IDifficulty, modern: boolean) {
   assertFixtureJson(
      actual.difficulty.colorNotes,
      source._notes.filter((n) => n._type !== 3).map(
         (n) => ({
            time: n._time,
            posX: n._lineIndex,
            posY: n._lineLayer,
            color: n._type,
            direction: n._cutDirection,
            angleOffset: 0,
            laneRotation: 0,
            customData: {},
         }),
      ),
   );
   assertFixtureJson(
      actual.difficulty.bombNotes,
      source._notes.filter((n) => n._type === 3).map(
         (n) => ({
            time: n._time,
            posX: n._lineIndex,
            posY: n._lineLayer,
            color: -1,
            direction: modern ? 0 : n._cutDirection,
            laneRotation: 0,
            customData: {},
         }),
      ),
   );
   assertFixtureJson(
      actual.difficulty.obstacles,
      source._obstacles.map((o) => ({
         time: o._time,
         posX: o._lineIndex,
         posY: o._type === 0 ? 0 : 2,
         duration: o._duration,
         width: o._width,
         height: o._type === 0 ? 5 : 3,
         laneRotation: 0,
         customData: {},
      })),
   );
   assertFixtureJson(
      actual.lightshow.basicEvents,
      source._events.map((e) => ({
         time: e._time,
         type: e._type,
         value: e._value,
         floatValue: 1,
         customData: {},
      })),
   );
   for (const key of ['arcs', 'chains', 'bpmEvents', 'rotationEvents', 'njsEvents'] as const) {
      assertEquals(actual.difficulty[key], [], key);
   }
   for (
      const key of [
         'colorBoostEvents',
         'waypoints',
         'lightColorEventBoxGroups',
         'lightRotationEventBoxGroups',
         'lightTranslationEventBoxGroups',
         'fxEventBoxGroups',
      ] as const
   ) assertEquals(actual.lightshow[key], [], key);
   assertEquals(actual.lightshow.basicEventTypesWithKeywords, { list: [] });
   assertEquals(actual.lightshow.useNormalEventsAsCompatibleEvents, true);
   assertEquals(actual.lightshow.customData, {});
}

function expectedMetadata(source: v1.IDifficulty, modern: boolean) {
   return modern
      ? {
         time: source._time,
         BPMChanges: source._BPMChanges!.map((e) => ({
            b: e._time,
            m: e._bpm,
            p: e._beatsPerBar,
            o: e._metronomeOffset,
         })),
         bookmarks: source._bookmarks!.map((b) => ({ b: b._time, n: b._name })),
      }
      : { _time: source._time, _bpmChanges: source._BPMChanges, _bookmarks: source._bookmarks };
}

for (const version of [2, 3, 4] as const) {
   Deno.test(`E2E labelled v1 Valkyria adaptation → v${version} → v1`, () => {
      const source = legacyFixture();
      const original = JSON.stringify(source);
      const loaded = loadDifficulty(source, 1, { forceConvert: false });
      assertEquals([
         loaded.difficulty.colorNotes.length,
         loaded.difficulty.bombNotes.length,
         loaded.difficulty.obstacles.length,
         loaded.lightshow.basicEvents.length,
      ], [1029, 46, 11, 3727]);
      assertContent(loaded, source, false);
      assertEquals(json(loaded.difficulty.customData), expectedMetadata(source, false));
      // BPM/NJS/shuffle settings are explicit serializer polyfills, not wrapper
      // fields. Preserve them explicitly; the high-level save defaults below
      // are intentional, not a conversion fidelity bug.
      assertFixtureJson(
         ordered(serializeDifficulty(loaded, legacySettings(source))),
         ordered(source),
      );

      const converted = loadDifficulty(source, version);
      // Bomb direction is retained in memory until v3/v4 serialization, whose
      // bomb records have no direction field. It does not affect bomb gameplay.
      assertContent(converted, source, false);
      assertEquals(json(converted.difficulty.customData), expectedMetadata(source, version !== 2));
      const saved = json(saveDifficulty(converted, version, { sort: false }));
      const intermediate = loadDifficulty(saved, version, { forceConvert: false });
      if (version === 4) {
         const lights = json(saveLightshow(converted, 4, { sort: false }));
         intermediate.lightshow = loadLightshow(lights, 4).lightshow;
      }
      assertContent(intermediate, source, version !== 2);
      assertEquals(
         json(intermediate.difficulty.customData),
         expectedMetadata(source, version !== 2),
      );

      const returned = json(saveDifficulty(intermediate, 1, { sort: false }));
      const expected = json(source);
      Object.assign(expected, {
         _beatsPerMinute: 120,
         _noteJumpSpeed: 0,
         _noteJumpStartBeatOffset: 0,
      });
      if (version !== 2) {
         for (const note of expected._notes) if (note._type === 3) note._cutDirection = 0;
      }
      assertFixtureJson(ordered(returned), ordered(expected));
      assertContent(loadDifficulty(returned, 1), source, version !== 2);
      // Caller-owned raw JSON must survive both load conversions and saves.
      assertEquals(JSON.stringify(source), original);
   });
}

function legacyInfo(): v1.IInfo {
   // Synthetic legacy metadata exercises fields absent from empty v1 resources.
   return {
      songName: 'Legacy conversion probe',
      songSubName: 'Synthetic',
      authorName: 'Test Author',
      beatsPerMinute: 155,
      previewStartTime: 49.125,
      previewDuration: 20.5,
      coverImagePath: 'cover.jpg',
      environmentName: 'DefaultEnvironment',
      oneSaber: true,
      contributors: [{ _role: 'Lighter', _name: 'Contributor', _iconPath: 'icon.png' }],
      customEnvironment: 'Legacy stage',
      customEnvironmentHash: 'synthetic-hash',
      difficultyLevels: [{
         difficulty: 'ExpertPlus',
         difficultyRank: 9,
         audioPath: 'pv.egg',
         jsonPath: 'ExpertPlus.json',
         characteristic: 'OneSaber',
         offset: 12,
         oldOffset: -6,
         chromaToggle: 'true',
         customColors: true,
         difficultyLabel: 'The Road to Valhalla',
         colorLeft: { r: 1, g: 0.1, b: 0.2 },
         colorRight: { r: 0.1, g: 0.2, b: 1 },
         envColorLeft: { r: 0.5, g: 0, b: 0 },
         envColorRight: { r: 0, g: 0, b: 0.5 },
         obstacleColor: { r: 0.3, g: 0.2, b: 0.1 },
      }],
   };
}

for (const version of [3, 4] as const) {
   Deno.test(`E2E synthetic modern v${version} editor metadata → v1`, () => {
      const source: v3.IDifficulty = {
         version: '3.3.0',
         colorNotes: [{ b: 2.5, x: 3, y: 1, c: 1, d: 7 }],
         bombNotes: [{ b: 4, x: 1, y: 2 }],
         obstacles: [{ b: 6, x: 0, y: 2, d: 1.5, w: 2, h: 3 }],
         basicBeatmapEvents: [{ b: 1.5, et: 4, i: 3, f: 1 }],
         customData: {
            time: 0,
            BPMChanges: [{ b: 2.5, m: 155, p: 3, o: 1 }],
            bookmarks: [{ b: 0, n: '' }, { b: 2.5, n: 'Start' }],
         },
      };
      const original = JSON.stringify(source);
      let converted = loadDifficulty(source, version);
      if (version === 4) {
         const gameplay = json(saveDifficulty(converted, 4));
         const lighting = json(saveLightshow(converted, 4));
         converted = loadDifficulty(gameplay, 4);
         converted.lightshow = loadLightshow(lighting, 4).lightshow;
      }
      const expected: v1.IDifficulty = {
         _version: '1.5.0',
         _beatsPerMinute: 120,
         _beatsPerBar: 4,
         _shuffle: 0,
         _shufflePeriod: 0.5,
         _noteJumpSpeed: 0,
         _noteJumpStartBeatOffset: 0,
         _notes: [
            { _time: 2.5, _lineIndex: 3, _lineLayer: 1, _type: 1, _cutDirection: 7 },
            { _time: 4, _lineIndex: 1, _lineLayer: 2, _type: 3, _cutDirection: 0 },
         ],
         _obstacles: [{ _time: 6, _lineIndex: 0, _type: 1, _duration: 1.5, _width: 2 }],
         _events: [{ _time: 1.5, _type: 4, _value: 3 }],
         _time: 0,
         _BPMChanges: [{ _time: 2.5, _bpm: 155, _beatsPerBar: 3, _metronomeOffset: 1 }],
         _bookmarks: [{ _time: 0, _name: '' }, { _time: 2.5, _name: 'Start' }],
      };
      assertFixtureJson(json(saveDifficulty(converted, 1)), expected);
      assertEquals(JSON.stringify(source), original);
   });
}

Deno.test('E2E v1 info serializer preserves all supported legacy fields', () => {
   const source = legacyInfo();
   const original = JSON.stringify(source);
   // Direct schema coverage isolates serialization from versionless Info detection.
   const loaded = deserializeInfo(source);
   assertFixtureJson(json(saveInfo(loaded, 1)), source);
   for (const version of [2, 4] as const) {
      const saved = json(saveInfo(deserializeInfo(source), version));
      assertFixtureJson(json(saveInfo(loadInfo(saved, version), 1)), source);
   }
   assertEquals(JSON.stringify(source), original);
});

Deno.test('E2E v1 info compatibility accepts redundant metadata but rejects real losses', () => {
   const loaded = deserializeInfo(legacyInfo());
   // v4 needs an environment list, and v2 deserializes its empty author string.
   // These representations do not introduce information absent from v1.
   loaded.environmentNames = ['DefaultEnvironment'];
   loaded.difficulties[0].authors.mappers = [''];
   assertEquals(saveInfo(loaded, 1).environmentName, 'DefaultEnvironment');
   loaded.environmentNames.push('TriangleEnvironment');
   assertThrows(() => saveInfo(loaded, 1), Error, 'not compatible with v1');
   loaded.environmentNames.pop();
   loaded.difficulties[0].authors.mappers = ['Named mapper'];
   assertThrows(() => saveInfo(loaded, 1), Error, 'not compatible with v1');
   loaded.difficulties[0].authors.mappers = [];
   assertFixtureJson(json(saveInfo(loaded, 1)), legacyInfo());
});

for (const version of [2, 4] as const) {
   Deno.test(`E2E synthetic v1 info → v${version} → v1 retains supported metadata`, () => {
      const source = legacyInfo();
      const original = JSON.stringify(source);
      const loaded = loadInfo(source, 1);
      assertEquals(loaded.audio.filename, 'pv.egg');
      assertEquals(loaded.difficulties[0].njs, 0);
      assertEquals(loaded.difficulties[0].njsOffset, 0);
      assertFixtureJson(json(saveInfo(loaded, 1)), source, 'First v1 info save');
      const converted = loadInfo(source, version);
      const saved = json(saveInfo(converted, version));
      const intermediate = loadInfo(saved, version);
      assertEquals(intermediate.song, loaded.song);
      assertEquals(intermediate.audio.filename, source.difficultyLevels[0].audioPath);
      assertEquals(intermediate.audio.bpm, source.beatsPerMinute);
      assertEquals(intermediate.audio.previewStartTime, source.previewStartTime);
      assertEquals(intermediate.audio.previewDuration, source.previewDuration);
      assertEquals(intermediate.coverImageFilename, source.coverImagePath);
      const expectedDifficulties = json(loaded.difficulties);
      // v2 has one string author field; no v1 author becomes the empty string.
      if (version === 2) expectedDifficulties[0].authors.mappers = [''];
      assertEquals(json(intermediate.difficulties), json(expectedDifficulties));
      assertEquals(intermediate.customData, loaded.customData);
      assertFixtureJson(json(saveInfo(intermediate, 1)), source, 'Returned v1 info');
      assertEquals(JSON.stringify(source), original);
   });
}

Deno.test('E2E v1 oneSaber fallback respects explicit characteristics and source JSON', () => {
   // Historical SongLoader GetCustomSongInfoFromJson selects oneSaber first,
   // then lets a per-difficulty characteristic override it:
   // github.com/Kylemc1413/BeatSaberSongLoader/blob/master/SongLoaderPlugin/SongLoader.cs
   const source = legacyInfo();
   delete source.difficultyLevels[0].characteristic;
   source.difficultyLevels.push({ ...source.difficultyLevels[0], characteristic: 'Standard' });
   const original = JSON.stringify(source);
   assertEquals(deserializeInfo(source).difficulties.map((d) => d.characteristic), [
      'OneSaber',
      'Standard',
   ]);
   for (const version of [1, 2, 4] as const) {
      assertEquals(loadInfo(source, version).difficulties.map((d) => d.characteristic), [
         'OneSaber',
         'Standard',
      ]);
   }
   assertEquals(JSON.stringify(source), original);
   source.oneSaber = false;
   assertEquals(loadInfo(source, 1).difficulties.map((d) => d.characteristic), [
      'Standard',
      'Standard',
   ]);
});

Deno.test('E2E versionless v1 info validates without relaxing malformed-version rejection', () => {
   const source = legacyInfo();
   delete source.difficultyLevels[0].characteristic;
   const loaded = loadInfo(source, 1, {
      forceConvert: false,
      schemaCheck: { enabled: true },
   });
   assertEquals(loaded.version, 1);
   assertEquals(loaded.difficulties[0].characteristic, 'OneSaber');
   for (const value of [undefined, null, 1]) {
      assertThrows(
         () => loadInfo({ ...source, _version: value }, 1),
         TypeError,
         'Malformed info beatmap version',
      );
   }
});

Deno.test('E2E v1 rejects unsupported modern gameplay and lighting, then recovers', () => {
   const beatmap = loadDifficulty(legacyFixture(), 1);
   // BPM editor markers above are supported; gameplay BPM events are not.
   const unsupported: [unknown[], unknown][] = [
      [beatmap.difficulty.bpmEvents, wrapper.createBPMEvent({ time: 4, bpm: 180 })],
      [beatmap.difficulty.arcs, wrapper.createArc({ time: 4, tailTime: 5 })],
      [beatmap.difficulty.chains, wrapper.createChain({ time: 4, tailTime: 5 })],
      [beatmap.difficulty.njsEvents, wrapper.createNJSEvent({ time: 4, value: 18 })],
      [
         beatmap.lightshow.lightColorEventBoxGroups,
         wrapper.createLightColorEventBoxGroup({ time: 4 }),
      ],
   ];
   for (const [collection, object] of unsupported) {
      collection.push(object);
      assertThrows(
         () =>
            saveDifficulty(beatmap, 1, {
               validate: {
                  compatibility: { enabled: true, throwOn: { incompatibleObject: true } },
               },
            }),
         Error,
         'not compatible with v1',
      );
      collection.pop();
      assertEquals(saveDifficulty(beatmap, 1)._notes.length, 1075);
   }
});

Deno.test('E2E v1 explicitly loses unsupported per-object custom data and event float values', () => {
   const source: v3.IDifficulty = {
      version: '3.3.0',
      colorNotes: [{ b: 2, x: 1, y: 1, c: 1, d: 3, customData: { color: [0.1, 0.2, 0.3] } }],
      basicBeatmapEvents: [{ b: 1, et: 4, i: 3, f: 2.5, customData: { lightID: [1, 2] } }],
   };
   const original = JSON.stringify(source);
   const converted = loadDifficulty(source, 1);
   const saved = json(saveDifficulty(converted, 1));
   assertEquals(saved._notes, [{
      _time: 2,
      _lineIndex: 1,
      _lineLayer: 1,
      _type: 1,
      _cutDirection: 3,
   }]);
   assertEquals(saved._events, [{ _time: 1, _type: 4, _value: 3 }]);
   const reloaded = loadDifficulty(saved, 1);
   assertEquals(reloaded.difficulty.colorNotes[0].customData, {});
   assertEquals(reloaded.lightshow.basicEvents[0].customData, {});
   assertEquals(reloaded.lightshow.basicEvents[0].floatValue, 1);
   assertEquals(JSON.stringify(source), original);
});

for (const version of [1, 2] as const) {
   Deno.test(`E2E v${version} compatibility rotation events retain fractional-beat ordering`, () => {
      // This tests the library's supported legacy event encoding, not v1 game playback.
      const source: v4.IDifficulty = {
         version: '4.1.0',
         colorNotes: [{ b: 1, r: 15 }, { b: 1.5, r: 30 }, { b: 2, r: 45 }],
         colorNotesData: [{ x: 1, y: 2, c: 1, d: 3 }],
      };
      const original = JSON.stringify(source);
      const saved = json(saveDifficulty(loadDifficulty(source, 4), version));
      const loaded = loadDifficulty(saved, version);
      for (const note of source.colorNotes!) {
         const rotation = loaded.difficulty.rotationEvents.reduce(
            (sum, event) => sum + (event.time <= note.b! ? event.rotation : 0),
            0,
         );
         assertEquals(rotation, note.r, `v${version} rotation at beat ${note.b}`);
      }
      const returned = loadDifficulty(json(saveDifficulty(loaded, 4)), 4);
      assertFixtureJson(
         returned.difficulty.colorNotes,
         source.colorNotes!.map((note) => ({
            time: note.b,
            laneRotation: note.r,
            posX: 1,
            posY: 2,
            color: 1,
            direction: 3,
            angleOffset: 0,
            customData: {},
         })),
      );
      assertEquals(JSON.stringify(source), original);
   });

   Deno.test(`E2E legacy v4 event timing survives v${version} downgrade`, () => {
      // v1 rotation events are library compatibility data, not current game support.
      const source: v4.IDifficulty = {
         version: '4.0.0',
         colorNotes: [{ b: 1 }, { b: 1.5 }],
         colorNotesData: [{ x: 1, y: 2, c: 1, d: 3 }],
         spawnRotations: [{ b: 1 }, { b: 1, i: 1 }],
         spawnRotationsData: [{ t: 0, r: 15 }, { t: 1, r: 30 }],
      };
      const original = JSON.stringify(source);
      const saved = json(saveDifficulty(loadDifficulty(source, 4), version));
      const loaded = loadDifficulty(saved, version);
      assertFixtureJson(loaded.difficulty.rotationEvents, [
         { time: 1, executionTime: 0, rotation: 15, customData: {} },
         { time: 1, executionTime: 1, rotation: 30, customData: {} },
      ]);
      const returned = loadDifficulty(json(saveDifficulty(loaded, 4)), 4);
      assertEquals(returned.difficulty.colorNotes.map((note) => note.laneRotation), [15, 45]);
      assertEquals(JSON.stringify(source), original);
   });
}
