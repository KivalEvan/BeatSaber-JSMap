import * as bsmap from 'https://deno.land/x/bsmap@2.0.0/mod.ts';

// YOUR BEAT SABER MAP PATH
bsmap.globals.directory =
   'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/YOUR_MAP_FOLDER/';

const info = bsmap.readInfoFileSync();
const beatmapList = bsmap.readFromInfoSync(info);

const expertPlusDiff = beatmapList.find(
   (data) =>
      data.info.characteristic === 'Standard' &&
      data.info.difficulty === 'ExpertPlus',
)?.beatmap;

bsmap.writeDifficultyFileSync(expertPlusDiff!);
bsmap.writeInfoFileSync(info);
