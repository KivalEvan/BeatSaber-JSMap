import jankySliderConvert from '../../deno/example/jankySliderConvert.ts';
import * as bsmap from '../../deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/ECHO/';

const info = bsmap.load.infoSync();
const lightshow = bsmap.load.difficultySync('EasyLightshow.dat', 3);
const difficultyList = bsmap.load.difficultyFromInfoSync(info);

difficultyList.forEach((d) => {
    if (!bsmap.version.isV3(d.data)) {
        d.data = bsmap.convert.V2toV3(d.data, true);
    }

    d.data.basicBeatmapEvents = lightshow.basicBeatmapEvents;
    d.data.customData.environment = lightshow.customData.environment;
    d.data.customData.customEvents = lightshow.customData.customEvents;
    jankySliderConvert(d.data);
});

bsmap.save.difficultyListSync(difficultyList, {
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/ECHO/',
});

console.timeEnd('Runtime');
