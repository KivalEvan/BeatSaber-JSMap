import {
   assert,
   assertEquals,
   assertExists,
   assertThrows,
   loadAudioData,
   loadDifficulty,
   loadInfo,
   loadLightshow,
   saveAudioData,
   saveDifficulty,
   saveInfo,
   saveLightshow,
   type v2,
   type v3,
} from './deps.ts';
import { assertFixtureJson } from './fixtureAssertions.ts';

const directory = './tests/resources/examples/Necromantic';

function readJson<T>(filename: string): T {
   return JSON.parse(Deno.readTextFileSync(`${directory}/${filename}`));
}

function json<T>(value: T): T {
   return JSON.parse(JSON.stringify(value));
}

function resolveFx(data: v3.IDifficulty) {
   const events = data._fxEventsCollection?._fl ?? [];
   const used = new Set<number>();
   const groups = data.vfxEventBoxGroups?.map((group) => {
      assertEquals(group.t, 1, 'The fixture uses float FX');
      return {
         ...group,
         e: group.e?.map((box) => ({
            ...box,
            l: box.l?.map((index) => {
               assert(Number.isInteger(index) && index >= 0 && index < events.length);
               used.add(index);
               return events[index];
            }),
         })),
      };
   });
   assertEquals(used.size, events.length, 'Every FX table row must be examined');
   return {
      ...data,
      vfxEventBoxGroups: groups,
      _fxEventsCollection: { ...data._fxEventsCollection, _fl: [] },
   };
}

Deno.test('E2E conversion: Necromantic preserves gameplay BPM events and separate audio timing', async (t) => {
   const source = readJson<v3.IDifficulty>('EasyStandard.dat');
   const audioSource = readJson<v2.IBPMInfo>('BPMInfo.dat');
   const infoSource = readJson<v2.IInfo>('Info.dat');
   const original = JSON.stringify([source, audioSource, infoSource]);
   assertEquals(source.bpmEvents?.length, 18);
   assertEquals(audioSource._regions.length, 18);
   assertEquals(source.rotationEvents, []);

   await t.step('the complete original gameplay, lighting, and info survive first save', () => {
      const saved = json(saveDifficulty(loadDifficulty(source, 3), 3));
      // The author supplied an empty root customData object; save omits that default.
      assertEquals(source.customData, {});
      const expected = structuredClone(source);
      delete expected.customData;
      assertFixtureJson(resolveFx(saved), resolveFx(expected), 'Complete Necromantic first save');
      assertFixtureJson(
         json(saveInfo(loadInfo(infoSource, 2), 2)),
         infoSource,
         'Complete Necromantic info',
      );
   });

   await t.step('all gameplay BPM events survive v3 → v2 → v3', () => {
      assertThrows(
         () => saveDifficulty(loadDifficulty(source, 3), 2),
         Error,
         'Beatmap is not compatible with v2',
      );
      // Permit loss of event boxes and chains, which v2 cannot store. BPM events
      // have a v2 representation and must all remain intact.
      const saved = json(saveDifficulty(loadDifficulty(source, 3), 2, {
         validate: { compatibility: { enabled: true, throwOn: { incompatibleObject: false } } },
      }));
      const events = saved._events!.filter((event) => event._type === 100);
      assertEquals(events.length, source.bpmEvents!.length);
      assertFixtureJson(
         events.map((event) => [event._time ?? 0, event._floatValue, event._customData ?? {}]),
         source.bpmEvents!.map((event) => [event.b ?? 0, event.m, event.customData ?? {}]),
         'Every v2 gameplay BPM record',
      );
      const returned = json(saveDifficulty(loadDifficulty(saved, 3), 3));
      assertFixtureJson(returned.bpmEvents, source.bpmEvents, 'Every returned v3 BPM event');
   });

   await t.step('v4 saves tempo in AudioData, not in the gameplay file', () => {
      const converted = loadDifficulty(source, 4);
      const saved = json(saveDifficulty(converted, 4));
      const lightshow = json(saveLightshow(converted, 4));
      assert(!('bpmEvents' in saved));
      const returned = loadDifficulty(saved, 4);
      returned.lightshow = loadLightshow(lightshow, 4).lightshow;
      const expected = loadDifficulty(source, 3);
      expected.version = 4;
      expected.difficulty.bpmEvents = [];
      assertFixtureJson(returned, expected, 'Only gameplay BPM has no v4 field');

      // The library does not synthesize AudioData from gameplay BPM events.
      // Convert the authored audio regions separately, preserving every boundary.
      const audio = json(saveAudioData(loadAudioData(audioSource, 2), 4));
      assertFixtureJson(audio, {
         version: '4.0.0',
         songChecksum: '',
         songSampleCount: audioSource._songSampleCount,
         songFrequency: audioSource._songFrequency,
         bpmData: audioSource._regions.map((region) => ({
            si: region._startSampleIndex,
            ei: region._endSampleIndex,
            sb: region._startBeat,
            eb: region._endBeat,
         })),
         lufsData: [],
      }, 'Independent audio timing conversion');
      const back = json(saveDifficulty(returned, 3));
      assertEquals(back.bpmEvents, [], 'Audio regions do not automatically recreate gameplay BPM');
      assertFixtureJson(
         json(saveAudioData(loadAudioData(audio, 4), 2)),
         audioSource,
         'Every audio region returns independently',
      );
   });
   assertEquals(JSON.stringify([source, audioSource, infoSource]), original);
});

Deno.test('E2E conversion: modified Necromantic preserves BPM custom data and the value fallback', () => {
   const source = readJson<v3.IDifficulty>('EasyStandard.dat');
   assertExists(source.bpmEvents);
   source.bpmEvents.forEach((event, i) => {
      event.customData = {
         authoredIndex: i,
         zero: 0,
         enabled: false,
         nested: [{ values: [1, 2.5] }],
      };
   });
   const original = JSON.stringify(source);
   const v2Data = json(saveDifficulty(loadDifficulty(source, 3), 2, {
      validate: { compatibility: { enabled: true, throwOn: { incompatibleObject: false } } },
   }));
   // The loader accepts _value when _floatValue is absent. This is a library
   // compatibility fallback, not the canonical v2.5 BPM-event encoding.
   const legacyEvent = v2Data._events!.find((event) => event._type === 100);
   assertExists(legacyEvent);
   assertEquals(legacyEvent._floatValue, 144);
   legacyEvent._value = 144;
   delete legacyEvent._floatValue;
   const originalV2 = JSON.stringify(v2Data);
   const returned = json(saveDifficulty(loadDifficulty(v2Data, 3), 3));
   assertFixtureJson(returned.bpmEvents, source.bpmEvents, 'Every BPM custom-data payload');
   assertEquals(JSON.stringify(source), original);
   assertEquals(JSON.stringify(v2Data), originalV2);
});
