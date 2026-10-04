import {
   assert,
   assertAlmostEquals,
   assertEquals,
   assertExists,
   assertObjectMatch,
   assertThrows,
   loadAudioData,
   loadDifficulty,
   loadInfo,
   loadLightshow,
   readAudioDataFile,
   readFromInfo,
   readFromInfoSync,
   readInfoFile,
   readInfoFileSync,
   saveAudioData,
   saveDifficulty,
   saveInfo,
   saveLightshow,
   type v3,
   type v4,
} from './deps.ts';
import {
   assertFixtureJson,
   assertNestedProbeOwnership,
   assertV4DifficultyFidelity,
   assertV4LightshowFidelity,
} from './fixtureAssertions.ts';

const badAppleDirectory = './tests/resources/examples/Bad Apple!!';
const angelVoicesDirectory = './tests/resources/examples/Angel Voices';

Deno.test('E2E: Bad Apple!! preserves v3 gameplay, lighting, and Chroma data', async (t) => {
   const info = await readInfoFile('Info.dat', 2, {
      directory: badAppleDirectory,
      load: { forceConvert: false },
   });
   assertEquals(info.song.title, 'Bad Apple!!');
   assertEquals(info.difficulties.length, 1);
   assertEquals(info.difficulties[0].authors.mappers, ['Kival Evan']);
   assertEquals(info.difficulties[0].customData._suggestions, ['Chroma']);

   const entries = await readFromInfo(info, {
      directory: badAppleDirectory,
      load: { forceConvert: false },
   });
   assertEquals(entries.length, 1);
   const { beatmap } = entries[0];
   assertEquals(beatmap.version, 3);
   assertEquals(beatmap.filename, 'ExpertPlusStandard.dat');
   assertEquals({
      notes: beatmap.difficulty.colorNotes.length,
      bombs: beatmap.difficulty.bombNotes.length,
      obstacles: beatmap.difficulty.obstacles.length,
      arcs: beatmap.difficulty.arcs.length,
      chains: beatmap.difficulty.chains.length,
      basicEvents: beatmap.lightshow.basicEvents.length,
      colorGroups: beatmap.lightshow.lightColorEventBoxGroups.length,
      rotationGroups: beatmap.lightshow.lightRotationEventBoxGroups.length,
      translationGroups: beatmap.lightshow.lightTranslationEventBoxGroups.length,
      fxGroups: beatmap.lightshow.fxEventBoxGroups.length,
   }, {
      notes: 2152,
      bombs: 64,
      obstacles: 570,
      arcs: 157,
      chains: 148,
      basicEvents: 28373,
      colorGroups: 5562,
      rotationGroups: 1800,
      translationGroups: 270,
      fxGroups: 12,
   });

   await t.step('sync and async reads agree', () => {
      const syncInfo = readInfoFileSync('Info.dat', 2, { directory: badAppleDirectory });
      assertEquals(syncInfo, info);
      assertEquals(readFromInfoSync(syncInfo, { directory: badAppleDirectory }), entries);
   });

   await t.step('first optimized save preserves the complete authored v3 payload', () => {
      const source: v3.IDifficulty = JSON.parse(
         Deno.readTextFileSync(`${badAppleDirectory}/ExpertPlusStandard.dat`),
      );
      const saved: v3.IDifficulty = JSON.parse(JSON.stringify(saveDifficulty(beatmap, 3)));
      assertEquals(saved.version, '3.3.0');
      // This authored v3 fixture already omits zero/default fields. Compare
      // every key and record on the FIRST save, including the entire Chroma
      // tree, all lighting boxes/events, FX collection and keyword map.
      assertFixtureJson(saved, source, 'Bad Apple difficulty first save');
      assertFixtureJson(
         beatmap.difficulty.customData,
         source.customData,
         'Bad Apple first load customData',
      );
      assertObjectMatch(beatmap.difficulty.arcs[109], {
         time: 581.06,
         color: 1,
         posX: 4,
         posY: 1,
         direction: 3,
         lengthMultiplier: 1,
         tailTime: 583.0005,
         tailPosX: 3,
         tailPosY: 2,
         tailDirection: 1,
         tailLengthMultiplier: 1.25,
      });
      assertObjectMatch(beatmap.difficulty.chains[46], {
         time: 246.5,
         color: 1,
         posX: 2,
         posY: 1,
         direction: 3,
         tailTime: 246.5625,
         tailPosX: 3,
         tailPosY: 1,
         sliceCount: 5,
         squish: 1,
      });
      assertObjectMatch(beatmap.lightshow.fxEventBoxGroups[10], {
         time: 230,
         id: 23,
         boxes: [{ events: [{ value: 1, easing: -1 }] }],
      });
      const text = JSON.stringify(saved);
      const reloaded = loadDifficulty(JSON.parse(text), 3, { forceConvert: false });
      for (const key of ['colorNotes', 'bombNotes', 'obstacles', 'arcs', 'chains'] as const) {
         assertEquals(reloaded.difficulty[key].length, beatmap.difficulty[key].length, key);
      }
      for (
         const key of [
            'basicEvents',
            'colorBoostEvents',
            'lightColorEventBoxGroups',
            'lightRotationEventBoxGroups',
            'lightTranslationEventBoxGroups',
            'fxEventBoxGroups',
         ] as const
      ) {
         assertEquals(reloaded.lightshow[key].length, beatmap.lightshow[key].length, key);
      }
      assertEquals(reloaded.lightshow.fxEventBoxGroups, beatmap.lightshow.fxEventBoxGroups);
      assertEquals(reloaded.difficulty.customData.customEvents?.length, 1793);
      assertEquals(JSON.stringify(saveDifficulty(reloaded, 3)), text);

      const savedInfo = saveInfo(info, 2);
      assertEquals(savedInfo._version, '2.1.0');
      assertFixtureJson(
         JSON.parse(JSON.stringify(savedInfo)),
         JSON.parse(
            Deno.readTextFileSync(`${badAppleDirectory}/Info.dat`),
         ),
         'Bad Apple info first save',
      );
      const reloadedInfo = loadInfo(JSON.parse(JSON.stringify(savedInfo)), 2);
      assertEquals(reloadedInfo.difficulties, info.difficulties);
   });

   await t.step('custom data is isolated in copy mode and retained in transfer mode', () => {
      const source: v3.IDifficulty = JSON.parse(
         Deno.readTextFileSync(`${badAppleDirectory}/ExpertPlusStandard.dat`),
      );
      const original = JSON.stringify(source);
      const copied = loadDifficulty(source, 3);
      const transferred = loadDifficulty(source, 3, { customDataOwnership: 'transfer' });
      assert(copied.difficulty.customData !== source.customData);
      assert(transferred.difficulty.customData === source.customData);
      assertExists(source.customData?.customEvents);
      assertExists(copied.difficulty.customData.customEvents);
      const sourceEvent = source.customData.customEvents[0];
      const copiedEvent = copied.difficulty.customData.customEvents[0];
      assert(copiedEvent !== sourceEvent);
      assert(copiedEvent.d !== sourceEvent.d);
      copiedEvent.b += 1;
      assertEquals(JSON.stringify(source), original);

      const sourcePoints = source.customData.pointDefinitions?.['1'];
      const copiedPoints = copied.difficulty.customData.pointDefinitions?.['1'];
      assertExists(sourcePoints);
      assertExists(copiedPoints);
      assertEquals(sourcePoints, [[0, 0, 0, 0, 'easeStep'], [0, 0, 82.68, 1, 'easeOutBack']]);
      assert(copiedPoints !== sourcePoints);
      assert(copiedPoints[1] !== sourcePoints[1]);
      assert(transferred.difficulty.customData.pointDefinitions?.['1'] === sourcePoints);
      const copiedFrame = copiedPoints[1];
      const sourceFrame = sourcePoints[1];
      assert(Array.isArray(copiedFrame));
      assert(Array.isArray(sourceFrame));
      copiedFrame[2] = 99;
      assertEquals(sourceFrame[2], 82.68);

      // Real Chroma data is also attached to individual gameplay and light records.
      const sourceColor = source.bombNotes?.[0].customData?.color;
      const copiedColor = copied.difficulty.bombNotes[0].customData.color;
      assertExists(sourceColor);
      assertExists(copiedColor);
      assertEquals(copiedColor, [1, 1, 1]);
      assert(copiedColor !== sourceColor);
      assert(transferred.difficulty.bombNotes[0].customData.color === sourceColor);
      copiedColor[0] = 0.25;
      assertEquals(sourceColor, [1, 1, 1]);
      const sourceIDs = source.basicBeatmapEvents?.[0].customData?.lightID;
      assert(Array.isArray(sourceIDs));
      const copiedIDs = copied.lightshow.basicEvents[0].customData.lightID;
      assert(Array.isArray(copiedIDs));
      assert(copiedIDs !== sourceIDs);
      assert(transferred.lightshow.basicEvents[0].customData.lightID === sourceIDs);
      copiedIDs[0] = 999;
      assertEquals(sourceIDs, [100, 101, 102, 103, 104, 105]);
      assertEquals(JSON.stringify(source), original);

      const unoptimized = saveDifficulty(beatmap, 3, { optimize: { enabled: false } });
      assertEquals(unoptimized.customData, source.customData);
      assert(unoptimized.customData !== beatmap.difficulty.customData);
      const savedPoints = unoptimized.customData?.pointDefinitions?.['1'];
      assertExists(savedPoints);
      assert(savedPoints[1] !== beatmap.difficulty.customData.pointDefinitions?.['1'][1]);
      const savedFrame = savedPoints[1];
      assert(Array.isArray(savedFrame));
      savedFrame[2] = -1;
      assertEquals(beatmap.difficulty.customData.pointDefinitions?.['1'][1], sourceFrame);
      const savedColor = unoptimized.bombNotes?.[0].customData?.color;
      assertExists(savedColor);
      savedColor[0] = 0.5;
      assertEquals(beatmap.difficulty.bombNotes[0].customData.color, [1, 1, 1]);
      assertEquals(JSON.stringify(source), original);

      const transferredPoints = transferred.difficulty.customData.pointDefinitions?.['1'];
      assertExists(transferredPoints);
      const transferredFrame = transferredPoints[1];
      assert(Array.isArray(transferredFrame));
      transferredFrame[2] = 100;
      assertEquals(sourceFrame[2], 100);
      const transferredColor = transferred.difficulty.bombNotes[0].customData.color;
      assertExists(transferredColor);
      transferredColor[1] = 0.75;
      assertEquals(sourceColor, [1, 0.75, 1]);
   });
});

Deno.test('E2E: Angel Voices preserves v4 indexed gameplay and separate lightshows', async (t) => {
   const info = readInfoFileSync('Info.dat', 4, {
      directory: angelVoicesDirectory,
      load: { forceConvert: false },
   });
   assertEquals(info.song.title, 'Angel Voices');
   assertEquals(info.audio.audioDataFilename, 'AudioData.dat');
   assertEquals(info.difficulties.map((d) => [d.filename, d.lightshowFilename]), [
      ['ExpertPlusLegacy.dat', 'ExpertPlusLegacy.lightshow.dat'],
      ['EasyStandard.dat', 'ExpertPlusStandard.lightshow.dat'],
      ['HardStandard.dat', 'ExpertPlusStandard.lightshow.dat'],
      ['ExpertPlusStandard.dat', 'ExpertPlusStandard.lightshow.dat'],
   ]);
   const entries = readFromInfoSync(info, {
      directory: angelVoicesDirectory,
      load: { forceConvert: false },
   });
   assertEquals(entries.length, 4);

   await t.step('sync and async reads attach the same referenced lightshows', async () => {
      const asyncInfo = await readInfoFile('Info.dat', 4, { directory: angelVoicesDirectory });
      assertEquals(asyncInfo, info);
      assertEquals(await readFromInfo(asyncInfo, { directory: angelVoicesDirectory }), entries);
   });

   const expectedCounts = [
      { notes: 2252, njsEvents: 0, basicEvents: 8193 },
      { notes: 709, njsEvents: 323, basicEvents: 64 },
      { notes: 1431, njsEvents: 310, basicEvents: 64 },
      { notes: 2186, njsEvents: 240, basicEvents: 64 },
   ];
   for (const [i, { info: difficultyInfo, beatmap }] of entries.entries()) {
      await t.step(`${difficultyInfo.filename} survives gameplay and lightshow round trips`, () => {
         assertEquals(beatmap.version, 4);
         assertEquals(beatmap.filename, difficultyInfo.filename);
         assertEquals(beatmap.lightshowFilename, difficultyInfo.lightshowFilename);
         assertEquals({
            notes: beatmap.difficulty.colorNotes.length,
            njsEvents: beatmap.difficulty.njsEvents.length,
            basicEvents: beatmap.lightshow.basicEvents.length,
         }, expectedCounts[i]);
         if (difficultyInfo.characteristic === 'Standard') {
            assertEquals([
               beatmap.lightshow.lightColorEventBoxGroups.length,
               beatmap.lightshow.lightRotationEventBoxGroups.length,
               beatmap.lightshow.lightTranslationEventBoxGroups.length,
               beatmap.lightshow.fxEventBoxGroups.length,
            ], [3404, 268, 444, 30]);
         }

         const saved: v4.IDifficulty = JSON.parse(JSON.stringify(saveDifficulty(beatmap, 4)));
         assertEquals(saved.version, '4.1.0');
         const source: v4.IDifficulty = JSON.parse(
            Deno.readTextFileSync(`${angelVoicesDirectory}/${difficultyInfo.filename}`),
         );
         assertV4DifficultyFidelity(saved, source);
         assertExists(saved.colorNotes);
         assertExists(saved.colorNotesData);
         assert(saved.colorNotesData.length < saved.colorNotes.length);
         const text = JSON.stringify(saved);
         const reloaded = loadDifficulty(JSON.parse(text), 4, { forceConvert: false });
         for (
            const key of [
               'colorNotes',
               'bombNotes',
               'obstacles',
               'arcs',
               'chains',
               'njsEvents',
            ] as const
         ) {
            assertEquals(reloaded.difficulty[key].length, beatmap.difficulty[key].length, key);
         }
         assertEquals(JSON.stringify(saveDifficulty(reloaded, 4)), text);
         if (difficultyInfo.filename === 'ExpertPlusStandard.dat') {
            assertEquals(reloaded.difficulty.njsEvents[1].time, 1);
            assertAlmostEquals(reloaded.difficulty.njsEvents[1].value, -12.92099953, 1e-8);
            // The fixture reuses these note/NJS data entries at distinct beats.
            // Resolve output references rather than requiring original indices
            // or requiring NJS tables to be deduplicated on save.
            assertEquals(source.colorNotes?.[2].i, source.colorNotes?.[15].i);
            assertEquals(source.njsEvents?.[3].i, source.njsEvents?.[38].i);
            for (const loaded of [beatmap, reloaded]) {
               assertObjectMatch(loaded.difficulty.colorNotes[2], {
                  time: 10,
                  posX: 1,
                  posY: 0,
                  color: 1,
                  direction: 0,
                  angleOffset: 0,
               });
               assertObjectMatch(loaded.difficulty.njsEvents[3], {
                  time: 8,
                  value: -10.17099953,
                  previous: 0,
                  easing: 0,
               });
               assertObjectMatch(loaded.difficulty.njsEvents[38], {
                  time: 131.25,
                  value: -10.17099953,
                  previous: 0,
                  easing: 0,
               });
               assert(loaded.difficulty.colorNotes[2] !== loaded.difficulty.colorNotes[15]);
               assert(loaded.difficulty.njsEvents[3] !== loaded.difficulty.njsEvents[38]);
            }
         }

         const savedLightshow: v4.ILightshow = JSON.parse(
            JSON.stringify(saveLightshow(beatmap, 4)),
         );
         assertEquals(savedLightshow.version, '4.0.0');
         // Check each of the two referenced files once, not once per consumer.
         if (i === 0 || difficultyInfo.filename === 'ExpertPlusStandard.dat') {
            const sourceLightshow: v4.ILightshow = JSON.parse(
               Deno.readTextFileSync(`${angelVoicesDirectory}/${difficultyInfo.lightshowFilename}`),
            );
            assertV4LightshowFidelity(savedLightshow, sourceLightshow);
            if (difficultyInfo.filename === 'ExpertPlusStandard.dat') {
               const colorGroup = beatmap.lightshow.lightColorEventBoxGroups[52];
               assertEquals([colorGroup.time, colorGroup.id, colorGroup.boxes.length], [
                  18.75,
                  30,
                  2,
               ]);
               assertEquals(
                  colorGroup.boxes.map((box) => [
                     box.filter.type,
                     box.filter.p0,
                     box.filter.p1,
                     box.filter.reverse,
                     box.beatDistribution,
                     box.beatDistributionType,
                  ]),
                  [[2, 16, 2, 0, 0.025, 2], [2, 17, 2, 1, 0.025, 2]],
               );
               for (const box of colorGroup.boxes) {
                  assertEquals(
                     box.events.map((event) => [
                        event.time,
                        event.color,
                        event.brightness,
                        event.strobeBrightness,
                        event.easing,
                     ]),
                     [[0, 2, 0, 0.5, -1], [0.5, 2, 2, 0, 0]],
                  );
               }
               assert(colorGroup.boxes[0] !== colorGroup.boxes[1]);
               assert(colorGroup.boxes[0].events[0] !== colorGroup.boxes[1].events[0]);
               const rotation = beatmap.lightshow.lightRotationEventBoxGroups[228];
               assertObjectMatch(rotation, {
                  time: 521,
                  id: 10,
                  boxes: [{
                     filter: { type: 2, p0: 0, p1: 2, seed: -425910698 },
                     rotationDistribution: -36,
                     rotationDistributionType: 2,
                     axis: 1,
                     affectFirst: 1,
                     events: [{ time: 0, rotation: 270, direction: 2, loop: 2 }],
                  }, {
                     events: [{ time: 0, rotation: 72, direction: 2, loop: 2 }],
                  }],
               });
               assertObjectMatch(beatmap.lightshow.lightTranslationEventBoxGroups[369], {
                  time: 495,
                  id: 22,
                  boxes: [{
                     filter: { random: 2, seed: -1277057989 },
                     gapDistribution: -4,
                     gapDistributionType: 1,
                     axis: 0,
                     affectFirst: 1,
                     events: [{ time: 0, translation: -7 }],
                  }, {
                     gapDistribution: 2,
                     axis: 1,
                     events: [{ translation: -1 }],
                  }],
               });
               assertObjectMatch(beatmap.lightshow.fxEventBoxGroups[23], {
                  time: 499.75,
                  id: 7,
                  boxes: [{
                     filter: { seed: -2131311079 },
                     events: [{ time: 0, value: 1, easing: -1 }, {
                        time: 0.25,
                        value: 0,
                        easing: 1,
                     }],
                  }],
               });
            }
         }
         const lightshowText = JSON.stringify(savedLightshow);
         const reloadedLightshow = loadLightshow(JSON.parse(lightshowText), 4);
         for (
            const key of [
               'basicEvents',
               'colorBoostEvents',
               'lightColorEventBoxGroups',
               'lightRotationEventBoxGroups',
               'lightTranslationEventBoxGroups',
               'fxEventBoxGroups',
            ] as const
         ) {
            assertEquals(
               reloadedLightshow.lightshow[key].length,
               beatmap.lightshow[key].length,
               key,
            );
         }
         assertEquals(JSON.stringify(saveLightshow(reloadedLightshow, 4)), lightshowText);
      });
   }

   await t.step('info and audio: complete first-save fidelity and JSON round trips', async () => {
      const savedInfo = saveInfo(info, 4);
      assertEquals(savedInfo.version, '4.0.1');
      assertFixtureJson(
         JSON.parse(JSON.stringify(savedInfo)),
         JSON.parse(
            Deno.readTextFileSync(`${angelVoicesDirectory}/Info.dat`),
         ),
         'Angel Voices info first save',
      );
      const reloadedInfo = loadInfo(JSON.parse(JSON.stringify(savedInfo)), 4);
      assertEquals(reloadedInfo.difficulties, info.difficulties);

      const audio = await readAudioDataFile(info.audio.audioDataFilename, 4, {
         directory: angelVoicesDirectory,
      });
      assertEquals(audio.frequency, 44100);
      assertEquals(audio.sampleCount, 17317717);
      assertEquals(audio.bpmData, [{
         startSampleIndex: 0,
         endSampleIndex: 17317717,
         startBeat: 0,
         endBeat: 543.223938,
      }]);
      const savedAudio = saveAudioData(audio, 4);
      assertEquals(savedAudio.version, '4.0.0');
      assertFixtureJson(
         JSON.parse(JSON.stringify(savedAudio)),
         JSON.parse(
            Deno.readTextFileSync(`${angelVoicesDirectory}/${info.audio.audioDataFilename}`),
         ),
         'Angel Voices audio first save',
      );
      const reloadedAudio = loadAudioData(JSON.parse(JSON.stringify(savedAudio)), 4);
      assertEquals(reloadedAudio.bpmData, audio.bpmData);
      assertEquals(reloadedAudio.sampleCount, audio.sampleCount);
      assertEquals(reloadedAudio.frequency, audio.frequency);
   });

   await t.step(
      'modified v4 fixtures: shared nested custom data obeys copy/transfer ownership',
      () => {
         const source: v4.IDifficulty = JSON.parse(
            Deno.readTextFileSync(`${angelVoicesDirectory}/ExpertPlusStandard.dat`),
         );
         const lightshow: v4.ILightshow = JSON.parse(
            Deno.readTextFileSync(`${angelVoicesDirectory}/ExpertPlusStandard.lightshow.dat`),
         );
         // Angel Voices has no authored custom data at these locations. Add a
         // nested payload to existing records with real repeated references.
         const noteData = source.colorNotesData?.[source.colorNotes![2].i!];
         const njsData = source.njsEventData?.[source.njsEvents![3].i!];
         const group = lightshow.eventBoxGroups?.filter((g) => g.t === 1)[52];
         assertExists(noteData);
         assertExists(njsData);
         assertExists(group?.e);
         const filter = lightshow.indexFilters?.[group.e[0].f!];
         const box = lightshow.lightColorEventBoxes?.[group.e[0].e!];
         const event = lightshow.lightColorEvents?.[group.e[0].l![0].i!];
         assertExists(filter);
         assertExists(box);
         assertExists(event);
         assertEquals(source.colorNotes![2].i, source.colorNotes![15].i);
         assertEquals(source.njsEvents![3].i, source.njsEvents![38].i);
         assertEquals(group.e[0].e, group.e[1].e);
         assertEquals(group.e[0].l![0].i, group.e[1].l![0].i);
         for (const record of [noteData, njsData, group, filter, box, event]) {
            record.customData = { ownershipProbe: { values: [1, 2] } };
         }

         const copied = loadDifficulty(source, 4);
         const transferred = loadDifficulty(source, 4, { customDataOwnership: 'transfer' });
         const copiedLightshow = loadLightshow(lightshow, 4);
         const transferredLightshow = loadLightshow(lightshow, 4, {
            customDataOwnership: 'transfer',
         });
         const saved = saveDifficulty(transferred, 4, { optimize: { enabled: false } });
         const savedLightshow = saveLightshow(transferredLightshow, 4, {
            optimize: { enabled: false },
         });
         for (
            const [key, dataKey, indices, original] of [
               ['colorNotes', 'colorNotesData', [2, 15], noteData],
               ['njsEvents', 'njsEventData', [3, 38], njsData],
            ] as const
         ) {
            assertNestedProbeOwnership(
               original.customData!.ownershipProbe,
               indices.map((i) => copied.difficulty[key][i].customData.ownershipProbe),
               indices.map((i) => transferred.difficulty[key][i].customData.ownershipProbe),
               indices.map((i) => saved[dataKey]![saved[key]![i].i!].customData!.ownershipProbe),
            );
         }
         const copiedGroup = copiedLightshow.lightshow.lightColorEventBoxGroups[52];
         const transferredGroup = transferredLightshow.lightshow.lightColorEventBoxGroups[52];
         const savedGroup = savedLightshow.eventBoxGroups!.filter((g) => g.t === 1)[52];
         assertNestedProbeOwnership(
            group.customData!.ownershipProbe,
            [copiedGroup.customData.ownershipProbe],
            [transferredGroup.customData.ownershipProbe],
            [savedGroup.customData!.ownershipProbe],
         );
         assertNestedProbeOwnership(
            filter.customData!.ownershipProbe,
            [copiedGroup.boxes[0].filter.customData.ownershipProbe],
            [transferredGroup.boxes[0].filter.customData.ownershipProbe],
            [savedLightshow.indexFilters![savedGroup.e![0].f!].customData!.ownershipProbe],
         );
         assertNestedProbeOwnership(
            box.customData!.ownershipProbe,
            copiedGroup.boxes.map((b) => b.customData.ownershipProbe),
            transferredGroup.boxes.map((b) => b.customData.ownershipProbe),
            savedGroup.e!.map((b) =>
               savedLightshow.lightColorEventBoxes![b.e!].customData!.ownershipProbe
            ),
         );
         assertNestedProbeOwnership(
            event.customData!.ownershipProbe,
            copiedGroup.boxes.map((b) => b.events[0].customData.ownershipProbe),
            transferredGroup.boxes.map((b) => b.events[0].customData.ownershipProbe),
            savedGroup.e!.map((b) =>
               savedLightshow.lightColorEvents![b.l![0].i!].customData!.ownershipProbe
            ),
         );
      },
   );

   await t.step('invalid indices do not prevent a subsequent valid load', () => {
      const source: v4.IDifficulty = JSON.parse(
         Deno.readTextFileSync(`${angelVoicesDirectory}/ExpertPlusStandard.dat`),
      );
      assertExists(source.colorNotes);
      assertExists(source.colorNotesData);
      const firstNote = source.colorNotes[0];
      const originalIndex = firstNote.i;
      firstNote.i = source.colorNotesData.length;
      assertThrows(() => loadDifficulty(source, 4), Error, 'out of range for "colorNotesData"');
      firstNote.i = originalIndex;
      assertEquals(loadDifficulty(source, 4).difficulty.colorNotes.length, 2186);
   });
});
