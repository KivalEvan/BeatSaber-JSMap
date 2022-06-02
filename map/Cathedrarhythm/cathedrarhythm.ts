import * as bsmap from '../../deno/mod.ts';
import { insertEnvironment } from '../../environment-enhancement/cathedral/mod.ts';
import jankySliderConvert from '../../deno/example/jankySliderConvert.ts';
import { printChromaEnvironment } from '../../deno/example/printInfo.ts';

bsmap.globals.path = 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Cathedrarhythm/';

const d2 = bsmap.load.difficultySync('ExpertPlusStandard.dat', 2);
const d3 = bsmap.convert.V2toV3(d2, true);

const d2light = bsmap.load.difficultySync('ExpertPlusLightshow.dat', 2);
const d3light = bsmap.convert.V2toV3(d2light, true);

insertEnvironment(d3);
jankySliderConvert(d3);

d3light.basicBeatmapEvents.forEach((e) => {
    e.floatValue = 1;
    if (e.isLightEvent()) {
        e.floatValue = e.value ? 1 : 0;
    }
    if (e.customData?.color) {
        if (e.value !== 0) {
            e.value = e.customData.color[0] ? (e.value <= 4 ? 4 : e.value <= 8 ? 8 : 12) : e.value;
        }
        e.floatValue = e.customData.color[3] ?? 1;
    }
    // laser in bts is weak as fuck
    if (e.type === 2 || e.type === 3) {
        e.floatValue *= 1.5;
    }
    delete e.customData?.color;
});
d3.basicBeatmapEvents = d3light.basicBeatmapEvents;
d3.colorBoostBeatmapEvents = d3light.colorBoostBeatmapEvents;

printChromaEnvironment(d3);
bsmap.save.difficultySync(d3, {
    filePath: 'ExpertStandard.dat',
});
