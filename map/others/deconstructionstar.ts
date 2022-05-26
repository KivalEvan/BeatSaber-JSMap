import * as bsmap from '../../deno/mod.ts';
import convertSlider from '../../deno/example/jankySliderConvert.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path = 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Deconstruction Star/';

const info = bsmap.load.infoSync();
const difficultyList = bsmap.load.difficultyFromInfoSync(info);

difficultyList.forEach((d) => {
    if (!bsmap.version.isV3(d.data)) {
        d.data = bsmap.convert.V2toV3(d.data, true);
    }

    convertSlider(d.data);

    for (let i = -4; i < 8; i++) {
        if (i >= 0 && i <= 3) {
            continue;
        }
        d.data.addSliders({
            b: 688,
            x: 2,
            y: 2,
            c: 1,
            d: 1,
            mu: 2,
            tb: 694,
            tx: i,
            ty: 2,
            m: 0,
            tc: 0,
        });
    }
    for (let i = 0; i < 3; i++) {
        if (i >= 0 && i <= 3) {
            continue;
        }
        d.data.addSliders(
            {
                b: 688,
                x: 2,
                y: 1,
                c: 1,
                d: 1,
                mu: 2,
                tb: 694,
                tx: -10 + i,
                ty: 2,
                m: 0,
                tc: 8,
            },
            {
                b: 688,
                x: 2,
                y: 1,
                c: 1,
                d: 1,
                mu: 2,
                tb: 694,
                tx: 14 - i,
                ty: 2,
                m: 0,
                tc: 8,
            },
        );
    }
    const endTiming = [308, 476, 756];
    for (const et of endTiming) {
        d.data.addObstacles(
            {
                b: et,
                d: 3,
                x: -1,
                y: 2,
            },
            {
                b: et,
                d: 3,
                x: 4,
                y: 2,
            },
        );
    }
});

bsmap.save.difficultyListSync(difficultyList, {
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/Deconstruction Star/',
});

console.timeEnd('Runtime');
