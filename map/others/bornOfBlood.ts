import * as bsmap from '../../deno/mod.ts';
import { convertLight, insertEnvironment } from '../../environment-enhancement/bmv2/mod.ts';
import { printChromaEnvironment } from '../../deno/example/printInfo.ts';

bsmap.globals.path = 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Born_Of_Blood';

const d2 = bsmap.load.difficultyLegacySync('LightshowOriginal.dat');
insertEnvironment(d2);
convertLight(d2, 'BigMirrorEnvironment');

printChromaEnvironment(bsmap.convert.V2toV3(d2, true));
bsmap.save.difficultySync(d2, {
    filePath: 'Hard.dat',
});
