import * as bsmap from '../deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Poinsettia/';

const difficulty = bsmap.convert.V2toV3(
    bsmap.load.difficultyLegacySync('ExpertPlusStandard.dat'),
    true
);

const prevSlider: {
    [key: number]: bsmap.types.v3.ColorNote;
} = {};
const possibleBurst: {
    [key: number]: bsmap.types.v3.ColorNote[];
} = { 0: [], 1: [] };
for (let i = 0, len = difficulty.colorNotes.length; i < len; i++) {
    const n = difficulty.colorNotes[i];
    if (n.d === 8) {
        n.a = 45;
    }
    if (n.cd?._color) {
        if (n.cd._color[0] === 0) {
            if (possibleBurst[n.c].length) {
                difficulty.colorNotes.splice(i, 1);
                i--;
                len--;
            }
            possibleBurst[n.c].push(n);
        }
        if (n.cd._color[0] === 1) {
            if (prevSlider[n.c]) {
                difficulty.sliders.push({
                    b: prevSlider[n.c].b,
                    c: prevSlider[n.c].c,
                    x: prevSlider[n.c].x,
                    y: prevSlider[n.c].y,
                    d: prevSlider[n.c].d,
                    mu: prevSlider[n.c].cd!._disableSpawnEffect
                        ? 0
                        : prevSlider[n.c].cd!._color[2],
                    tb: n.b,
                    tx: n.x,
                    ty: n.y,
                    tc: prevSlider[n.c].cd!._disableSpawnEffect
                        ? prevSlider[n.c].d
                        : n.d,
                    tmu: prevSlider[n.c].cd!._disableSpawnEffect
                        ? 0
                        : prevSlider[n.c].cd!._color[3],
                    m: prevSlider[n.c].cd!._color[1],
                });
            }
            delete prevSlider[n.c];
            if (n.cd._color[3] !== 0) {
                prevSlider[n.c] = n;
            } else {
                if (n.cd._color[2] !== 0) {
                    let x = n.x;
                    let y = n.y;
                    while (x >= 0 && x <= 3 && y >= 0 && y <= 2) {
                        x += bsmap.v3.colorNote.cutDirectionSpace[n.d][0];
                        y += bsmap.v3.colorNote.cutDirectionSpace[n.d][1];
                    }
                    x = bsmap.utils.clamp(x, 0, 3);
                    y = bsmap.utils.clamp(y, 0, 2);
                    difficulty.sliders.push({
                        b: n.b,
                        c: n.c,
                        x: n.x,
                        y: n.y,
                        d: n.d,
                        mu: 0.5,
                        tb: n.b + n.cd._color[2],
                        tx: x,
                        ty: y,
                        tc: n.d,
                        tmu: 0,
                        m: 0,
                    });
                }
                if (n.cd!._disableSpawnEffect) {
                    difficulty.colorNotes.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
    }
    if (possibleBurst[n.c].length === 2) {
        difficulty.burstSliders.push({
            b: possibleBurst[n.c][0].b,
            c: possibleBurst[n.c][0].c,
            x: possibleBurst[n.c][0].x,
            y: possibleBurst[n.c][0].y,
            d: possibleBurst[n.c][0].d,
            tb: possibleBurst[n.c][1].b,
            tx: possibleBurst[n.c][1].x,
            ty: possibleBurst[n.c][1].y,
            sc: possibleBurst[n.c][0].cd!._color[1] / 2,
            s: possibleBurst[n.c][0].cd!._color[2]
                ? possibleBurst[n.c][0].cd!._color[2]
                : 1,
        });
        possibleBurst[n.c] = [];
    }
}
if (possibleBurst[0].length || possibleBurst[1].length) {
    throw Error('what the fuck');
}

bsmap.save.difficultySync(difficulty, {
    filePath: 'ExpertPlusStandard.dat',
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/Poinsettia/',
});

console.timeEnd('Runtime');
