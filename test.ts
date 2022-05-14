import * as bsmap from './deno/mod.ts';
import cathedralEnv from './environment-enhancement/cathedral.ts';

const d2 = bsmap.load.difficultyLegacySync(
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Cathedral/Lightshow.dat'
);

const d3 = bsmap.convert.V2toV3(d2);
cathedralEnv(d3);

bsmap.save.difficultySync(d3, {
    filePath:
        'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Cathedral/Lightshow.dat',
});
