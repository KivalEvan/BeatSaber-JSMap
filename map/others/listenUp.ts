import * as bsmap from '../../deno/mod.ts';
import {
    convertLight,
    insertEnvironment,
} from '../../environment-enhancement/vapor-frame/mod.ts';
import { printChromaEnvironment } from '../../deno/example/printInfo.ts';

bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/11d0294f1e929221a94ef18b86f22f852ca1395f';

const d2 = bsmap.load.difficultyLegacySync('LightshowOriginal.dat');
insertEnvironment(d2);
convertLight(d2, 'BigMirrorEnvironment');

const d3 = bsmap.convert.V2toV3(d2, true);
printChromaEnvironment(d3);
bsmap.save.difficultySync(d3, {
    filePath: 'Hard.dat',
});
