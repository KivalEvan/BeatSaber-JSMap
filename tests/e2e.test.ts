import { assertClassObjectMatch } from './assert.ts';
import { assertEquals, assertInstanceOf, load, save, types, v2, v3 } from './deps.ts';

Deno.test('Implicitly load and save V2 beatmap ', async (t) => {
   let info: types.wrapper.IWrapInfo;
   await t.step('Able to correctly load V2 info', async () => {
      info = await load.info(null, {
         directory: './tests/resources/examples/werewolf howls./',
      });
      assertInstanceOf(info, v2.Info);
   });

   let beatmapList: Awaited<ReturnType<typeof load.beatmapFromInfo>>;
   await t.step('Able to correctly load V2 beatmap within info', async () => {
      beatmapList = await load.beatmapFromInfo(info!, {
         directory: './tests/resources/examples/werewolf howls./',
      });
      for (const bl of beatmapList) {
         assertEquals(bl.version, 2);
         assertInstanceOf(bl.data, v2.Difficulty);
      }
   });

   await t.step('Able to save as V2 beatmap schema', async () => {
      const output = await save.beatmapList(beatmapList, {
         write: false,
      });
      output.forEach((r, i) => {
         const o = r.status === 'fulfilled' ? r.value : {};
         assertEquals(o._version, '2.6.0');
         assertClassObjectMatch(beatmapList[i].data.toJSON(), o);
      });

      assertEquals((await save.info(info, { write: false }))._version, '2.1.0');
   });
});

Deno.test('Load V3 beatmap implicitly', async (t) => {
   let info: types.wrapper.IWrapInfo;
   await t.step('Able to correctly load V2 info', () => {
      info = load.infoSync(null, {
         directory: "./tests/resources/examples/I Bet You'll Forget That Even If You Noticed That/",
      });
      assertInstanceOf(info, v2.Info);
   });

   let beatmapList: ReturnType<typeof load.beatmapFromInfoSync>;
   await t.step('Able to correctly load V3 beatmap within info', () => {
      beatmapList = load.beatmapFromInfoSync(info!, {
         directory: "./tests/resources/examples/I Bet You'll Forget That Even If You Noticed That/",
      });
      for (const bl of beatmapList) {
         assertEquals(bl.version, 3);
         assertInstanceOf(bl.data, v3.Difficulty);
      }
   });

   await t.step('Able to save as V3 beatmap schema', () => {
      const output = save.beatmapListSync(beatmapList, {
         write: false,
      });
      output.forEach((o, i) => {
         assertEquals(o.version, '3.3.0');
         assertClassObjectMatch(beatmapList[i].data.toJSON(), o);
      });

      assertEquals(save.infoSync(info, { write: false })._version, '2.1.0');
   });
});

Deno.test('Load mixed beatmap implicitly', async (t) => {
   let info;
   await t.step('Able to correctly load V2 info', () => {
      info = load.infoSync(null, {
         directory: './tests/resources/examples/JOURNEY/',
      });
      assertInstanceOf(info, v2.Info);
   });

   let beatmapList;
   await t.step('Able to correctly load mixed beatmap within info', () => {
      beatmapList = load.beatmapFromInfoSync(info!, {
         directory: './tests/resources/examples/JOURNEY/',
      });
      for (const bl of beatmapList) {
         if (bl.characteristic === 'OneSaber') {
            assertEquals(bl.version, 3);
            assertInstanceOf(bl.data, v3.Difficulty);
         } else {
            assertEquals(bl.version, 2);
            assertInstanceOf(bl.data, v2.Difficulty);
         }
      }
   });
});

Deno.test('Load beatmap version explicitly and convert to V3', async (t) => {
   let info: v2.Info;
   await t.step('Able to correctly load V2 info', async () => {
      info = await load.info(2, {
         directory: './tests/resources/examples/werewolf howls./',
         forceConvert: false,
      });
      assertInstanceOf(info, v2.Info);
   });

   await t.step('Able to correctly load V2 beatmap and convert to V3', () => {
      info.difficulties.forEach((d) => {
         const diff = load.difficultySync(d.filename, 3, {
            directory: './tests/resources/examples/werewolf howls./',
         });
         assertInstanceOf(diff, v3.Difficulty);
      });
   });
});

Deno.test('Load beatmap version explicitly and convert to V2', async (t) => {
   let info: v2.Info;
   await t.step('Able to correctly load V2 info', async () => {
      info = await load.info(2, {
         directory: "./tests/resources/examples/I Bet You'll Forget That Even If You Noticed That/",
         forceConvert: false,
      });
      assertInstanceOf(info, v2.Info);
   });

   await t.step(
      'Able to correctly load V3 beatmap and convert to V2',
      async () => {
         for (const d of info.difficulties) {
            const diff = await load.difficulty(d.filename, 2, {
               directory:
                  "./tests/resources/examples/I Bet You'll Forget That Even If You Noticed That/",
            });
            assertInstanceOf(diff, v2.Difficulty);
         }
      },
   );
});
