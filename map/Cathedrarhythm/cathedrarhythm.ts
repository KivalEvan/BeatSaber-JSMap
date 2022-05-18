import * as bsmap from '../../deno/mod.ts';
import cathedralEnv from '../../environment-enhancement/cathedral.ts';

const d2 = bsmap.load.difficultyLegacySync(
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Cathedrarhythm/ExpertPlusStandard.dat'
);

cathedralEnv(d2);
const d3 = bsmap.convert.V2toV3(d2, true);

bsmap.save.difficultySync(d3, {
    filePath:
        'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Cathedrarhythm/ExpertStandard.dat',
});
