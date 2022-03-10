import * as bsmap from '../deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.logLevel = 1;
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/KAEDE/';

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

difficulty.sliders.push(
    {
        b: 196,
        c: 1,
        x: 1,
        y: 1,
        d: 3,
        mu: 1,
        tb: 197,
        tx: 2,
        ty: 0,
        tc: 1,
        tmu: 1,
        m: 2,
    },
    {
        b: 196,
        c: 0,
        x: 2,
        y: 0,
        d: 2,
        mu: 2,
        tb: 198,
        tx: 2,
        ty: 2,
        tc: 1,
        tmu: 1,
        m: 1,
    },
    {
        b: 197,
        c: 1,
        x: 2,
        y: 0,
        d: 1,
        mu: 1,
        tb: 198,
        tx: 3,
        ty: 1,
        tc: 0,
        tmu: 1,
        m: 0,
    },
    {
        b: 228,
        c: 1,
        x: 1,
        y: 2,
        d: 0,
        mu: 1,
        tb: 229,
        tx: 3,
        ty: 1,
        tc: 7,
        tmu: 1,
        m: 2,
    },
    {
        b: 228,
        c: 0,
        x: 0,
        y: 0,
        d: 6,
        mu: 1,
        tb: 230,
        tx: 1,
        ty: 0,
        tc: 3,
        tmu: 1,
        m: 1,
    },
    {
        b: 229,
        c: 1,
        x: 3,
        y: 1,
        d: 7,
        mu: 1,
        tb: 230,
        tx: 2,
        ty: 2,
        tc: 2,
        tmu: 1,
        m: 2,
    },
    {
        b: 230,
        c: 0,
        x: 1,
        y: 0,
        d: 3,
        mu: 2,
        tb: 232,
        tx: 2,
        ty: 0,
        tc: 2,
        tmu: 1,
        m: 0,
    },
    {
        b: 230,
        c: 1,
        x: 2,
        y: 2,
        d: 2,
        mu: 2,
        tb: 232,
        tx: 1,
        ty: 2,
        tc: 3,
        tmu: 1,
        m: 0,
    },
    {
        b: 238,
        c: 1,
        x: 1,
        y: 0,
        d: 5,
        mu: 2,
        tb: 240,
        tx: 1,
        ty: 2,
        tc: 1,
        tmu: 1,
        m: 0,
    },
    {
        b: 246,
        c: 0,
        x: 2,
        y: 2,
        d: 2,
        mu: 2,
        tb: 248,
        tx: 1,
        ty: 2,
        tc: 3,
        tmu: 1,
        m: 0,
    },
    {
        b: 246,
        c: 1,
        x: 1,
        y: 1,
        d: 3,
        mu: 2,
        tb: 248,
        tx: 2,
        ty: 0,
        tc: 4,
        tmu: 1,
        m: 1,
    },
    {
        b: 261,
        c: 0,
        x: 1,
        y: 2,
        d: 0,
        mu: 1,
        tb: 262,
        tx: 2,
        ty: 2,
        tc: 1,
        tmu: 1,
        m: 0,
    },
    {
        b: 262,
        c: 0,
        x: 2,
        y: 2,
        d: 1,
        mu: 2,
        tb: 264,
        tx: 1,
        ty: 0,
        tc: 0,
        tmu: 1,
        m: 0,
    },
    {
        b: 292,
        c: 1,
        x: 2,
        y: 0,
        d: 2,
        mu: 1,
        tb: 293,
        tx: 1,
        ty: 0,
        tc: 3,
        tmu: 1,
        m: 0,
    },
    {
        b: 292,
        c: 0,
        x: 2,
        y: 1,
        d: 2,
        mu: 2,
        tb: 294,
        tx: 1,
        ty: 0,
        tc: 3,
        tmu: 1,
        m: 0,
    },
    {
        b: 293,
        c: 1,
        x: 1,
        y: 0,
        d: 3,
        mu: 1,
        tb: 294,
        tx: 2,
        ty: 1,
        tc: 2,
        tmu: 1,
        m: 0,
    },
    {
        b: 484,
        c: 0,
        x: 2,
        y: 1,
        d: 2,
        mu: 1,
        tb: 485,
        tx: 1,
        ty: 0,
        tc: 1,
        tmu: 1,
        m: 1,
    },
    {
        b: 484,
        c: 1,
        x: 1,
        y: 0,
        d: 3,
        mu: 2,
        tb: 486,
        tx: 1,
        ty: 2,
        tc: 1,
        tmu: 1,
        m: 2,
    },
    {
        b: 485,
        c: 0,
        x: 1,
        y: 0,
        d: 1,
        mu: 1,
        tb: 486,
        tx: 0,
        ty: 1,
        tc: 0,
        tmu: 1,
        m: 0,
    },
    {
        b: 516,
        c: 0,
        x: 2,
        y: 2,
        d: 0,
        mu: 1,
        tb: 517,
        tx: 0,
        ty: 1,
        tc: 6,
        tmu: 1,
        m: 1,
    },
    {
        b: 516,
        c: 1,
        x: 3,
        y: 0,
        d: 7,
        mu: 1,
        tb: 518,
        tx: 2,
        ty: 0,
        tc: 2,
        tmu: 1,
        m: 2,
    },
    {
        b: 517,
        c: 0,
        x: 0,
        y: 1,
        d: 6,
        mu: 1,
        tb: 518,
        tx: 1,
        ty: 2,
        tc: 3,
        tmu: 1,
        m: 1,
    },
    {
        b: 518,
        c: 0,
        x: 1,
        y: 2,
        d: 3,
        mu: 2,
        tb: 520,
        tx: 2,
        ty: 2,
        tc: 2,
        tmu: 1,
        m: 0,
    },
    {
        b: 518,
        c: 1,
        x: 2,
        y: 0,
        d: 2,
        mu: 2,
        tb: 520,
        tx: 1,
        ty: 0,
        tc: 3,
        tmu: 1,
        m: 0,
    },
    {
        b: 526,
        c: 1,
        x: 2,
        y: 0,
        d: 4,
        mu: 2,
        tb: 528,
        tx: 2,
        ty: 2,
        tc: 1,
        tmu: 1,
        m: 0,
    },
    {
        b: 534,
        c: 1,
        x: 1,
        y: 2,
        d: 3,
        mu: 2,
        tb: 536,
        tx: 2,
        ty: 2,
        tc: 2,
        tmu: 1,
        m: 0,
    },
    {
        b: 534,
        c: 0,
        x: 2,
        y: 1,
        d: 3,
        mu: 2,
        tb: 536,
        tx: 2,
        ty: 0,
        tc: 5,
        tmu: 1,
        m: 1,
    },
    {
        b: 549,
        c: 1,
        x: 2,
        y: 2,
        d: 0,
        mu: 1,
        tb: 550,
        tx: 1,
        ty: 2,
        tc: 1,
        tmu: 1,
        m: 0,
    },
    {
        b: 550,
        c: 0,
        x: 1,
        y: 2,
        d: 1,
        mu: 2,
        tb: 552,
        tx: 2,
        ty: 0,
        tc: 0,
        tmu: 1,
        m: 0,
    },
    {
        b: 580,
        c: 0,
        x: 1,
        y: 0,
        d: 3,
        mu: 1,
        tb: 581,
        tx: 2,
        ty: 0,
        tc: 2,
        tmu: 1,
        m: 0,
    },
    {
        b: 580,
        c: 1,
        x: 1,
        y: 1,
        d: 3,
        mu: 2,
        tb: 582,
        tx: 2,
        ty: 0,
        tc: 2,
        tmu: 1,
        m: 0,
    },
    {
        b: 581,
        c: 0,
        x: 2,
        y: 0,
        d: 2,
        mu: 1,
        tb: 582,
        tx: 1,
        ty: 1,
        tc: 3,
        tmu: 1,
        m: 0,
    }
);

bsmap.save.difficultySync(difficulty, {
    filePath: 'ExpertPlusStandard.dat',
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/KAEDE/',
});

console.timeEnd('Runtime');
