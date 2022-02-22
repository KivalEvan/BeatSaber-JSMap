import * as bsmap from 'https://raw.githubusercontent.com/KivalEvan/BeatSaber-MappingScript/main/deno/mod.ts';

// YOUR BEAT SABER MAP PATH
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/YOUR_MAP_FOLDER/';

const info = bsmap.load.infoSync();
const difficulty = bsmap.load.difficultySync('ExpertPlusStandard.dat');

bsmap.save.infoSync(info);
await bsmap.save.difficulty(difficulty, {
    filePath: 'ExpertPlusStandard.dat',
});
