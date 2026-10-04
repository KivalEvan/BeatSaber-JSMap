import {
   assert,
   assertEquals,
   assertExists,
   assertThrows,
   loadAudioData,
   loadInfo,
   saveAudioData,
   saveInfo,
   type v2,
   type v4,
   type wrapper,
} from './deps.ts';
import { assertFixtureJson } from './fixtureAssertions.ts';

const directory = './tests/resources/examples';

function readJson<T>(map: string, filename: string): T {
   return JSON.parse(Deno.readTextFileSync(`${directory}/${map}/${filename}`));
}

function jsonBoundary<T>(value: T): T {
   return JSON.parse(JSON.stringify(value));
}

function sharedInfo(info: wrapper.IWrapInfo, quantizeColors = false): object {
   // These fields have no counterpart in the other Info format. Compare their
   // loss explicitly below rather than pretending all wrapper fields round-trip.
   const {
      version,
      filename: _filename,
      environmentBase,
      environmentNames,
      songPreviewFilename: _preview,
      audio,
      colorSchemes,
      difficulties,
      ...common
   } = info;
   const {
      duration: _duration,
      audioDataFilename: _audioData,
      lufs: _lufs,
      audioOffset: _offset,
      shuffle: _shuffle,
      shufflePeriod: _period,
      ...sharedAudio
   } = audio;
   return {
      ...common,
      audio: sharedAudio,
      colorSchemes: colorSchemes.map((scheme) => {
         const result = structuredClone(scheme);
         // v4 stores channels as eight-bit hex, unlike v2's floating-point colors.
         if (quantizeColors) {
            for (
               const key of [
                  'saberLeftColor',
                  'saberRightColor',
                  'environment0Color',
                  'environment1Color',
                  'environmentWColor',
                  'obstaclesColor',
                  'environment0ColorBoost',
                  'environment1ColorBoost',
                  'environmentWColorBoost',
               ] as const
            ) {
               const color = result[key];
               if (!color) continue;
               for (const channel of ['r', 'g', 'b', 'a'] as const) {
                  color[channel] = Math.round(color[channel] * 255) / 255;
               }
            }
         }
         return result;
      }),
      difficulties: difficulties.map((difficulty) => {
         const { environmentId, lightshowFilename: _lightshow, ...shared } = difficulty;
         let environment = environmentNames[environmentId];
         if (!environment) {
            assertEquals(version, 2, 'Every v4 difficulty must resolve its environment index');
            const rotation = difficulty.characteristic === '90Degree' ||
               difficulty.characteristic === '360Degree';
            const base = rotation ? environmentBase.allDirections : environmentBase.normal;
            assertExists(base, 'Legacy fixture must define its base environment');
            environment = base;
         }
         return { ...shared, environment };
      }),
   };
}

Deno.test('E2E: Info conversions preserve supported metadata in both directions', async (t) => {
   for (const map of ['Bad Apple!!', 'The Phoenix', 'Preserved Valkyria', 'ECHO']) {
      await t.step(`${map}: v2 → v4 → v2`, () => {
         const source = readJson<v2.IInfo>(map, 'Info.dat');
         const original = JSON.stringify(source);
         const expected = sharedInfo(loadInfo(source, 2), true);
         const loadedAsV4 = loadInfo(source, 4);
         assertEquals(loadedAsV4.version, 4);
         assertFixtureJson(sharedInfo(loadedAsV4, true), expected, 'Conversion on load');
         const saved = jsonBoundary(saveInfo(loadInfo(source, 2), 4));
         assertFixtureJson(saved, jsonBoundary(saveInfo(loadedAsV4, 4)), 'Conversion on save');
         const v4Info = loadInfo(saved, 4, { forceConvert: false });
         assertFixtureJson(sharedInfo(v4Info), expected, 'First v4 serialization');
         const back = loadInfo(jsonBoundary(saveInfo(v4Info, 2)), 2, { forceConvert: false });
         assertFixtureJson(sharedInfo(back), expected, 'v2 round trip');
         assertEquals(JSON.stringify(source), original, 'Do not mutate caller JSON');
      });
   }

   await t.step('modified Phoenix info: base environments resolve by characteristic', () => {
      const source = readJson<v2.IInfo>('The Phoenix', 'Info.dat');
      source._environmentNames = [];
      const original = JSON.stringify(source);
      const expected = sharedInfo(loadInfo(source, 2), true);
      const converted = loadInfo(source, 4);
      assertEquals(converted.environmentNames, ['PyroEnvironment', 'GlassDesertEnvironment']);
      assertFixtureJson(sharedInfo(converted, true), expected, 'Legacy environment selection');
      const saved = jsonBoundary(saveInfo(converted, 4));
      const reloaded = loadInfo(saved, 4);
      assertFixtureJson(sharedInfo(reloaded), expected, 'Serialized environment selection');
      assertEquals(JSON.stringify(source), original);
   });

   await t.step('modified v2 info: v4 has no offset or shuffle fields', () => {
      const source = readJson<v2.IInfo>('Bad Apple!!', 'Info.dat');
      source._songTimeOffset = 0.125;
      source._shuffle = 0.25;
      source._shufflePeriod = 0.75;
      const original = JSON.stringify(source);
      const expected = sharedInfo(loadInfo(source, 2), true);
      assertThrows(() => saveInfo(loadInfo(source, 2), 4), Error, 'Info is not compatible with v4');
      const saved = jsonBoundary(saveInfo(loadInfo(source, 2), 4, {
         validate: { compatibility: { enabled: true, throwOn: { incompatibleObject: false } } },
      }));
      assert(!('_songTimeOffset' in saved));
      assert(!('_shuffle' in saved));
      assert(!('_shufflePeriod' in saved));
      const back = loadInfo(jsonBoundary(saveInfo(loadInfo(saved, 4), 2)), 2);
      assertEquals(back.audio.audioOffset, 0);
      assertEquals(back.audio.shuffle, 0);
      assertEquals(back.audio.shufflePeriod, 0.5);
      assertFixtureJson(sharedInfo(back), expected, 'All representable v2 metadata survives');
      assertEquals(JSON.stringify(source), original);
   });

   await t.step('Angel Voices: v4 → v2 → v4', () => {
      const source = readJson<v4.IInfo>('Angel Voices', 'Info.dat');
      const original = JSON.stringify(source);
      const expected = sharedInfo(loadInfo(source, 4));
      const loadedAsV2 = loadInfo(source, 2);
      assertEquals(loadedAsV2.version, 2);
      assertFixtureJson(sharedInfo(loadedAsV2), expected, 'Conversion on load');
      const saved = jsonBoundary(saveInfo(loadInfo(source, 4), 2));
      assertFixtureJson(saved, jsonBoundary(saveInfo(loadedAsV2, 2)), 'Conversion on save');
      const v2Info = loadInfo(saved, 2, { forceConvert: false });
      assertFixtureJson(sharedInfo(v2Info), expected, 'First v2 serialization');
      const back = loadInfo(jsonBoundary(saveInfo(v2Info, 4)), 4, { forceConvert: false });
      assertFixtureJson(sharedInfo(back), expected, 'v4 round trip');
      // v2 has neither an audio duration nor per-difficulty lightshow references.
      assert(source.audio.songDuration > 0);
      assertEquals(back.audio.duration, 0);
      assert(back.difficulties.every((d) => d.lightshowFilename === 'Unnamed.lightshow.dat'));
      assertEquals(JSON.stringify(source), original);
   });

   await t.step('modified v4 info: only documented v2 representation limits are lost', () => {
      const source = readJson<v4.IInfo>('Angel Voices', 'Info.dat');
      source.songPreviewFilename = 'separate-preview.ogg';
      source.audio.audioDataFilename = 'separate-timing.dat';
      source.audio.lufs = -12.5;
      source.difficultyBeatmaps[0].beatmapAuthors.lighters = ['Test Lighter'];
      source.difficultyBeatmaps[1].beatmapAuthors.mappers = ['Test Mapper'];
      source.colorSchemes = [{
         colorSchemeName: 'Separate override flags',
         overrideNotes: false,
         overrideLights: true,
         saberAColor: 'FF0000FF',
         saberBColor: '0000FFFF',
         environmentColor0: 'FF0000FF',
         environmentColor1: '0000FFFF',
         environmentColor0Boost: '00FF00FF',
         environmentColor1Boost: 'FF00FFFF',
         obstaclesColor: 'FFFFFFFF',
      }];
      const original = JSON.stringify(source);
      assertThrows(() => saveInfo(loadInfo(source, 4), 2), Error, 'Info is not compatible with v2');
      const saved = jsonBoundary(saveInfo(loadInfo(source, 4), 2, {
         validate: { compatibility: { enabled: true, throwOn: { incompatibleObject: false } } },
      }));
      assertEquals(saved._levelAuthorName, 'Kival Evan, Test Lighter, Test Mapper');
      assertEquals(saved._colorSchemes[0].useOverride, true);
      assertEquals(saved._songFilename, source.audio.songFilename);
      assert(!('songPreviewFilename' in saved));
      const reloaded = loadInfo(saved, 2);
      for (const difficulty of reloaded.difficulties) {
         assertEquals(difficulty.authors, {
            mappers: ['Kival Evan', 'Test Lighter', 'Test Mapper'],
            lighters: [],
         });
         assertEquals(difficulty.lightshowFilename, 'Unnamed.lightshow.dat');
      }
      assertEquals(reloaded.colorSchemes[0].overrideNotes, true);
      assertEquals(reloaded.colorSchemes[0].overrideLights, true);
      assertEquals(reloaded.audio.duration, 0);
      assertEquals(reloaded.audio.lufs, 0);
      assertEquals(reloaded.audio.audioDataFilename, 'AudioData.dat');
      assertEquals(reloaded.songPreviewFilename, source.audio.songFilename);
      const expected = loadInfo(source, 4);
      expected.colorSchemes[0].overrideNotes = true;
      for (const difficulty of expected.difficulties) {
         difficulty.authors = {
            mappers: ['Kival Evan', 'Test Lighter', 'Test Mapper'],
            lighters: [],
         };
      }
      assertFixtureJson(sharedInfo(reloaded), sharedInfo(expected), 'All other metadata survives');
      const back = loadInfo(jsonBoundary(saveInfo(reloaded, 4)), 4);
      assertFixtureJson(sharedInfo(back), sharedInfo(expected), 'Re-upgrade shared metadata');
      assertEquals(JSON.stringify(source), original);
   });
});

Deno.test('E2E: Audio conversions preserve all sample and beat-region boundaries', async (t) => {
   await t.step('Necromantic: all 18 BPM regions survive v2 → v4 → v2', () => {
      const source = readJson<v2.IBPMInfo>('Necromantic', 'BPMInfo.dat');
      const original = JSON.stringify(source);
      assertEquals(source._regions.length, 18);
      const expected: v4.IAudio = {
         version: '4.0.0',
         songChecksum: '',
         songSampleCount: source._songSampleCount,
         songFrequency: source._songFrequency,
         bpmData: source._regions.map((region) => ({
            si: region._startSampleIndex,
            ei: region._endSampleIndex,
            sb: region._startBeat,
            eb: region._endBeat,
         })),
         lufsData: [],
      };
      const loadedAsV4 = loadAudioData(source, 4);
      assertEquals(loadedAsV4.version, 4);
      const saved = jsonBoundary(saveAudioData(loadAudioData(source, 2), 4));
      assertFixtureJson(saved, expected, 'Every authored BPM region');
      assertFixtureJson(jsonBoundary(saveAudioData(loadedAsV4, 4)), expected, 'Conversion on load');
      const reloaded = loadAudioData(saved, 4, { forceConvert: false });
      const back = jsonBoundary(saveAudioData(reloaded, 2));
      assertFixtureJson(back, source, 'Complete original v2 audio data');
      assertEquals(JSON.stringify(source), original);
   });

   await t.step('Angel Voices: v4 → v2 → v4', () => {
      const source = readJson<v4.IAudio>('Angel Voices', 'AudioData.dat');
      const original = JSON.stringify(source);
      const expected: v2.IBPMInfo = {
         _version: '2.0.0',
         _songSampleCount: source.songSampleCount,
         _songFrequency: source.songFrequency,
         _regions: source.bpmData.map((region) => ({
            _startSampleIndex: region.si,
            _endSampleIndex: region.ei,
            _startBeat: region.sb,
            _endBeat: region.eb,
         })),
      };
      const loadedAsV2 = loadAudioData(source, 2);
      assertEquals(loadedAsV2.version, 2);
      const saved = jsonBoundary(saveAudioData(loadAudioData(source, 4), 2));
      assertFixtureJson(saved, expected, 'Every v4 sample/beat boundary');
      assertFixtureJson(jsonBoundary(saveAudioData(loadedAsV2, 2)), expected, 'Conversion on load');
      const reloaded = loadAudioData(saved, 2, { forceConvert: false });
      assertFixtureJson(jsonBoundary(saveAudioData(reloaded, 4)), source, 'Complete v4 audio data');
      assertEquals(JSON.stringify(source), original);
   });

   await t.step('modified v4 audio: v2 cannot retain checksum or loudness regions', () => {
      const source = readJson<v4.IAudio>('Angel Voices', 'AudioData.dat');
      source.songChecksum = 'fixture-checksum';
      source.lufsData = [
         { si: 0, ei: 1000, l: -12.5 },
         { si: 1000, ei: source.songSampleCount, l: -8.25 },
      ];
      const original = JSON.stringify(source);
      assertThrows(
         () => saveAudioData(loadAudioData(source, 4), 2),
         Error,
         'Audio data is not compatible with v2',
      );
      const saved = jsonBoundary(saveAudioData(loadAudioData(source, 4), 2, {
         validate: { compatibility: { enabled: true, throwOn: { incompatibleObject: false } } },
      }));
      assert(!('songChecksum' in saved));
      assert(!('lufsData' in saved));
      const back = jsonBoundary(saveAudioData(loadAudioData(saved, 2), 4));
      assertFixtureJson(
         back,
         { ...source, songChecksum: '', lufsData: [] },
         'Only v4-only data lost',
      );
      assertEquals(JSON.stringify(source), original);
   });
});
