import * as bsmap from '../mod.ts';

// YOUR BEAT SABER MAP PATH
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/YOUR_MAP_FOLDER/';

const info = bsmap.load.infoSync();
// for beatmap v2, use difficultyLegacySync()
const difficulty = bsmap.load.difficultySync('ExpertPlusStandard.dat');

bsmap.save.infoSync(info);
await bsmap.save.difficulty(difficulty, {
    filePath: 'ExpertPlusStandard.dat',
});
