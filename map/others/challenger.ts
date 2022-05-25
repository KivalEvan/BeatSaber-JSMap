import * as bsmap from '../../deno/mod.ts';
import {
    insertEnvironment,
    convertLight,
} from '../../environment-enhancement/vapor-frame/mod.ts';
import { printChromaEnvironment } from '../../deno/example/printInfo.ts';

bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/584b (Challenger - Excession, Aeroluna)';

const d2 = bsmap.load.difficultyLegacySync('Expert.dat');
insertEnvironment(d2);
convertLight(d2, 'BigMirrorEnvironment');

printChromaEnvironment(bsmap.convert.V2toV3(d2, true));
bsmap.save.difficultySync(d2, {
    filePath: 'ExpertPlus.dat',
});
