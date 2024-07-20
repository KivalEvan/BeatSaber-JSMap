import * as bsmap from 'https://deno.land/x/bsmap@2.0.0/mod.ts';

// YOUR BEAT SABER MAP PATH
bsmap.globals.directory =
   'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/YOUR_MAP_FOLDER/';

const info = bsmap.readInfoFileSync();

// you can specify difficulty version as such difficultySync('ExpertPlusStandard.dat', 3)
const difficulty = bsmap.readDifficultyFileSync('ExpertPlusStandard.dat');

bsmap.writeDifficultyFileSync(difficulty);
bsmap.writeInfoFileSync(info);
