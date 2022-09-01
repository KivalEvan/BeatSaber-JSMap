import * as bsmap from 'https://deno.land/x/bsmap@1.2.2/mod.ts';

// YOUR BEAT SABER MAP PATH
bsmap.globals.directory =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/YOUR_MAP_FOLDER/';

const info = bsmap.load.infoSync();
const difficultyList = bsmap.load.difficultyFromInfoSync(info);

const expertPlusDiff = difficultyList.find(
    (dl) => dl.characteristic === 'Standard' && dl.difficulty === 'ExpertPlus'
)?.data;

bsmap.save.infoSync(info);
bsmap.save.difficultyListSync(difficultyList);
