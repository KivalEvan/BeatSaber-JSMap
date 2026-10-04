import {
   assert,
   assertEquals,
   assertExists,
   loadDifficulty,
   loadLightshow,
   readFromInfo,
   readFromInfoSync,
   readInfoFile,
   readInfoFileSync,
   saveDifficulty,
   saveInfo,
   saveLightshow,
   type v3,
   type v4,
   type wrapper,
} from './deps.ts';
import { assertFixtureJson } from './fixtureAssertions.ts';

const directory = './tests/resources/examples/The Phoenix';
const scenarios = [
   { filename: 'Expert360Degree.dat', rotations: 575, fractionalLane: -232 },
   { filename: 'Expert90Degree.dat', rotations: 532, fractionalLane: -37 },
] as const;

function readSource(filename: string): v3.IDifficulty {
   return JSON.parse(Deno.readTextFileSync(`${directory}/${filename}`));
}

function expectedLaneRotation(rotations: v3.IRotationEvent[], beat: number): number {
   // Sum the authored timeline independently of the converter's indexed lookup.
   // Early events affect objects at the same beat; late events affect only later objects.
   const degrees = rotations.reduce((total, event) => {
      const time = event.b ?? 0;
      return total + (time < beat || (time === beat && (event.e ?? 0) === 0) ? event.r ?? 0 : 0);
   }, 0);
   // v4 object-lane angles are i32 rather than v3's fractional rotation-event values.
   return Math.round(degrees % 360);
}

function expectedV4(source: v3.IDifficulty): wrapper.IWrapBeatmap {
   assertExists(source.rotationEvents);
   const expected = loadDifficulty(source, 3, { forceConvert: false });
   expected.version = 4;
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
         assertEquals(
            object.customData.worldRotation,
            undefined,
            'No per-object rotation override',
         );
         object.laneRotation = expectedLaneRotation(source.rotationEvents, object.time);
         if ('tailLaneRotation' in object) {
            object.tailLaneRotation = expectedLaneRotation(source.rotationEvents, object.tailTime);
         }
      }
   }
   return expected;
}

function assertNoteLanes(beatmap: wrapper.IWrapBeatmap, beat: number, rotation: number): void {
   const notes = beatmap.difficulty.colorNotes.filter((note) => note.time === beat);
   assert(notes.length > 0, `Fixture must contain notes at beat ${beat}`);
   for (const note of notes) assertEquals(note.laneRotation, rotation, `Lane at beat ${beat}`);
}

Deno.test('E2E: The Phoenix preserves 90°/360° rotation timelines and Chroma data', async (t) => {
   const info = readInfoFileSync('Info.dat', 2, { directory });
   assertEquals(info.song.title, 'The Phoenix');
   // The original metadata is intact; only the two Expert rotation maps are copied here.
   const difficulties = info.difficulties.filter((d) =>
      scenarios.some(({ filename }) => d.filename === filename)
   );
   assertEquals(difficulties.map((d) => [d.filename, d.characteristic]), [
      ['Expert360Degree.dat', '360Degree'],
      ['Expert90Degree.dat', '90Degree'],
   ]);
   for (const difficulty of difficulties) {
      assertEquals(difficulty.authors.mappers, ['Kival Evan']);
      assertEquals(difficulty.customData._suggestions, ['Chroma']);
   }
   const entries = readFromInfoSync({ difficulties }, { directory });
   assertEquals(entries.length, 2);

   await t.step('sync/async reads and the complete info metadata agree', async () => {
      assertEquals(await readInfoFile('Info.dat', 2, { directory }), info);
      assertEquals(await readFromInfo({ difficulties }, { directory }), entries);
      assertFixtureJson(
         JSON.parse(JSON.stringify(saveInfo(info, 2))),
         JSON.parse(Deno.readTextFileSync(`${directory}/Info.dat`)),
         'The Phoenix info first save',
      );
   });

   for (const [i, scenario] of scenarios.entries()) {
      const source = readSource(scenario.filename);
      const original = JSON.stringify(source);
      const { beatmap } = entries[i];
      assertEquals(beatmap.filename, scenario.filename);
      assertEquals(beatmap.version, 3);
      assertExists(source.rotationEvents);
      assertEquals(source.rotationEvents.length, scenario.rotations);
      assert(source.rotationEvents.every((event) => event.e === 1));
      assertEquals(
         source.rotationEvents.filter((event) => Math.abs(event.r ?? 0) === 7.5).length,
         8,
      );

      await t.step(`${scenario.filename}: every v3 rotation and Chroma field survives`, () => {
         assertEquals(
            beatmap.difficulty.rotationEvents.map((event) => [
               event.time,
               event.executionTime,
               event.rotation,
            ]),
            source.rotationEvents!.map((event) => [event.b, event.e, event.r]),
         );
         assertFixtureJson(beatmap.difficulty.customData, source.customData, 'First load Chroma');
         const saved: v3.IDifficulty = JSON.parse(JSON.stringify(saveDifficulty(beatmap, 3)));
         assertFixtureJson(saved, source, `${scenario.filename}: complete first save`);
         const reloaded = loadDifficulty(saved, 3, { forceConvert: false });
         assertEquals(reloaded.difficulty.rotationEvents, beatmap.difficulty.rotationEvents);
         assertFixtureJson(
            JSON.parse(JSON.stringify(saveDifficulty(reloaded, 3))),
            source,
            `${scenario.filename}: complete reload/resave`,
         );
         assertEquals(JSON.stringify(source), original);
      });

      await t.step(`${scenario.filename}: v4 lanes match the authored rotation timeline`, () => {
         const expected = expectedV4(source);
         const converted = loadDifficulty(source, 4);
         assertFixtureJson(converted, expected, 'Conversion on load');
         assertEquals(converted.difficulty.rotationEvents, []);
         assertNoteLanes(converted, 6, 0);
         assertNoteLanes(converted, 7.5, 15);
         assertNoteLanes(converted, 8.5, 0);
         assertNoteLanes(converted, 100.5, scenario.fractionalLane);
         if (scenario.filename === 'Expert360Degree.dat') {
            assertNoteLanes(converted, 49, -15); // Authored cumulative rotation is -375°.
         }

         const convertedOnSave = loadDifficulty(source, 3);
         const saved: v4.IDifficulty = JSON.parse(
            JSON.stringify(saveDifficulty(convertedOnSave, 4)),
         );
         assertFixtureJson(convertedOnSave, expected, 'Conversion on save');
         assertEquals(saved.version, '4.1.0');
         assert(!('spawnRotations' in saved));
         assert(!('spawnRotationsData' in saved));
         assertFixtureJson(
            JSON.parse(JSON.stringify(saveDifficulty(converted, 4))),
            saved,
            'Load-time and save-time conversion agree',
         );

         // v4 stores lighting separately. Reassemble the full map to check every gameplay,
         // lane, arc/chain head and tail, lighting, and Chroma value after JSON serialization.
         const savedLightshow = saveLightshow(converted, 4);
         const reloaded = loadDifficulty(saved, 4, { forceConvert: false });
         reloaded.lightshow = loadLightshow(
            JSON.parse(JSON.stringify(savedLightshow)),
            4,
            { forceConvert: false },
         ).lightshow;
         assertFixtureJson(reloaded, expected, 'Complete v4 JSON round trip');
         assertEquals(JSON.stringify(source), original, 'Conversion must not mutate parsed input');
      });
   }

   await t.step('modified fixture: early and late rotations at the same beat stay distinct', () => {
      const source = readSource('Expert360Degree.dat');
      assertExists(source.rotationEvents);
      assertEquals(source.rotationEvents[0], { b: 6, e: 1, r: 15 });
      source.rotationEvents[0].e = 0;
      // Append out of chronological order so the converter must sort the timeline, not input.
      source.rotationEvents.push({ b: 6, e: 1, r: -30 });
      const original = JSON.stringify(source);
      const expected = expectedV4(source);
      const converted = loadDifficulty(source, 4);
      assertFixtureJson(converted, expected, 'Mixed early/late timeline');
      assertNoteLanes(converted, 6, 15);
      assertNoteLanes(converted, 7.5, -15);
      assertNoteLanes(converted, 8.5, -30);
      const reloaded = loadDifficulty(JSON.parse(JSON.stringify(saveDifficulty(converted, 4))), 4);
      assertFixtureJson(reloaded.difficulty, expected.difficulty, 'Saved mixed early/late lanes');
      assertEquals(JSON.stringify(source), original);
   });
});
