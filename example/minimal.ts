import * as bsmap from 'https://deno.land/x/bsmap@1.4.2/mod.ts';

// YOUR BEAT SABER MAP PATH
bsmap.globals.directory =
   'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/YOUR_MAP_FOLDER/';

const info = bsmap.load.infoSync();

// you can specify difficulty version as such difficultySync('ExpertPlusStandard.dat', 3)
const difficulty = bsmap.load.difficultySync('ExpertPlusStandard.dat');

bsmap.save.infoSync(info);
bsmap.save.difficultySync(difficulty);
