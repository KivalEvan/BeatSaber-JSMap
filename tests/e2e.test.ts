import { readFromInfo, readFromInfoSync } from '../read/fromInfo.ts';
import { assertObjectMatch } from './assert.ts';
import {
   assertEquals,
   readDifficultyFile,
   readDifficultyFileSync,
   readInfoFile,
   readInfoFileSync,
   saveDifficulty,
   saveInfo,
   type types,
} from './deps.ts';

Deno.test('Implicitly load and save V2 beatmap ', async (t) => {
   let info: types.wrapper.IWrapInfo;
   await t.step('Able to correctly load V2 info', async () => {
      info = await readInfoFile('Info.dat', 2, {
         directory: './tests/resources/examples/werewolf howls./',
         load: { forceConvert: false },
      });
   });

   let beatmapList: Awaited<ReturnType<typeof readFromInfo>>;
   await t.step('Able to correctly load V2 beatmap within info', async () => {
      beatmapList = await readFromInfo(info, {
         directory: './tests/resources/examples/werewolf howls./',
         load: { forceConvert: false },
      });
      for (const bl of beatmapList) {
         assertEquals(bl.beatmap.version, 2);
      }
   });

   await t.step('Able to save as V2 beatmap schema', () => {
      const output = beatmapList.map((bl) => saveDifficulty(bl.beatmap));
      output.forEach((o, i) => {
         assertEquals(o._version, '2.6.0');
         assertObjectMatch(saveDifficulty(beatmapList[i].beatmap, 2), o);
      });

      assertEquals(saveInfo(info, 2)._version, '2.1.0');
   });
});

Deno.test('Load V3 beatmap implicitly', async (t) => {
   let info: types.wrapper.IWrapInfo;
   await t.step('Able to correctly load V2 info', () => {
      info = readInfoFileSync('Info.dat', 2, {
         directory: "./tests/resources/examples/I Bet You'll Forget That Even If You Noticed That/",
         load: { forceConvert: false },
      });
   });

   let beatmapList: ReturnType<typeof readFromInfoSync>;
   await t.step('Able to correctly load V3 beatmap within info', () => {
      beatmapList = readFromInfoSync(info, {
         directory: "./tests/resources/examples/I Bet You'll Forget That Even If You Noticed That/",
      });
      for (const bl of beatmapList) {
         assertEquals(bl.beatmap.version, 3);
      }
   });

   await t.step('Able to save as V3 beatmap schema', () => {
      const output = beatmapList.map((bl) => saveDifficulty(bl.beatmap));
      output.forEach((o, i) => {
         assertEquals(o.version, '3.3.0');
         assertObjectMatch(saveDifficulty(beatmapList[i].beatmap, 3), o);
      });

      assertEquals(saveInfo(info, 2)._version, '2.1.0');
   });
});

Deno.test('Load mixed beatmap implicitly', async (t) => {
   let info;
   await t.step('Able to correctly load V2 info', () => {
      info = readInfoFileSync('Info.dat', 2, {
         directory: './tests/resources/examples/JOURNEY/',
         load: { forceConvert: false },
      });
   });

   let beatmapList;
   await t.step('Able to correctly load mixed beatmap within info', () => {
      beatmapList = readFromInfoSync(info!, {
         directory: './tests/resources/examples/JOURNEY/',
      });
      for (const bl of beatmapList) {
         if (bl.info.characteristic === 'OneSaber') {
            assertEquals(bl.beatmap.version, 3);
         } else {
            assertEquals(bl.beatmap.version, 2);
         }
      }
   });
});

Deno.test('Load beatmap version explicitly and convert to V3', async (t) => {
   let info: types.wrapper.IWrapInfo;
   await t.step('Able to correctly load V2 info', async () => {
      info = await readInfoFile('Info.dat', 2, {
         directory: './tests/resources/examples/werewolf howls./',
      });
   });

   await t.step('Able to correctly load V2 beatmap and convert to V3', () => {
      info.difficulties.forEach((d) => {
         readDifficultyFileSync(d.filename, 3, {
            directory: './tests/resources/examples/werewolf howls./',
         });
      });
   });
});

Deno.test('Load beatmap version explicitly and convert to V2', async (t) => {
   let info: types.wrapper.IWrapInfo;
   await t.step('Able to correctly load V2 info', async () => {
      info = await readInfoFile('Info.dat', 2, {
         directory: "./tests/resources/examples/I Bet You'll Forget That Even If You Noticed That/",
      });
   });

   await t.step(
      'Able to correctly load V3 beatmap and convert to V2',
      async () => {
         for (const d of info.difficulties) {
            await readDifficultyFile(d.filename, 2, {
               directory:
                  "./tests/resources/examples/I Bet You'll Forget That Even If You Noticed That/",
            });
         }
      },
   );
});
