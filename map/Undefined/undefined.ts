import * as bsmap from '../../deno/mod.ts';
import walls from './walls.ts';
import lights from './lights.ts';
import jankySliderConvert from '../../deno/example/jankySliderConvert.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Undefined/';

const info = bsmap.load.infoSync();
const difficultyList = bsmap.load.difficultyFromInfoSync(info);

difficultyList.forEach((d) => {
    if (!bsmap.version.isV3(d.data)) {
        d.data = bsmap.convert.V2toV3(d.data, true);
    }

    d.data.basicBeatmapEvents = [];
    d.data.useNormalEventsAsCompatibleEvents = false;
    jankySliderConvert(d.data);
    for (let i = 0, j = 0, len = d.data.colorNotes.length; i < len; i++) {
        const n = d.data.colorNotes[i];
        if (n.direction === 8) {
            n.angleOffset = 45;
        }
        if (d.difficulty === 'ExpertPlus' || d.difficulty === 'Expert') {
            if (n.color === 1 && n.time >= 32 && n.time < 32.75) {
                n.angleOffset = bsmap.utils.lerp(
                    bsmap.utils.normalize(n.time, 32, 32.75),
                    -45,
                    0
                );
            }
            if (n.color === 0 && n.time >= 33 && n.time < 33.75) {
                n.angleOffset = bsmap.utils.lerp(
                    bsmap.utils.normalize(n.time, 33, 33.75),
                    45,
                    0
                );
            }
            if (n.time >= 98 + j * 4 && n.time <= 101 + j * 4) {
                if (n.color === (d.difficulty === 'Expert' ? j + 1 : j) % 2) {
                    n.angleOffset =
                        bsmap.utils.lerp(
                            bsmap.utils.normalize(n.time, 98.25 + j * 4, 100.5 + j * 4),
                            d.difficulty === 'Expert' ? -30 : -45,
                            d.difficulty === 'Expert' ? 30 : 45
                        ) * (j % 2 ? 1 : -1);
                }
            }
            if (n.time >= 101 + j * 4) {
                j++;
            }
        }
    }
    walls(d.data);
    lights(d.data);
});

bsmap.save.difficultyListSync(difficultyList, {
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/Undefined/',
});

console.timeEnd('Runtime');
