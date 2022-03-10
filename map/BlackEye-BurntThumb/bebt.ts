import * as bsmap from '../../deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Black Eye-Burnt Thumb/';
const INPUT_FILE = 'ExpertPlusStandard.dat';
const OUTPUT_FILE = INPUT_FILE;

const old = bsmap.load.difficultyLegacySync(INPUT_FILE);
old._events.forEach((e) => {
    e._floatValue = 1;
    if (bsmap.v2.event.isLightEvent(e)) {
        e._floatValue = e._value ? 1 : 0;
    }
    if (bsmap.v2.event.isLightEvent(e) && e._customData?._color) {
        if (e._value !== 0) {
            e._value = e._customData._color[0] ? (e._value <= 4 ? 4 : 8) : e._value;
        }
        e._floatValue = e._customData._color[3] ?? 1;
    }
    delete e._customData;
});

const difficulty = bsmap.convert.V2toV3(old, true);

const prevSlider: {
    [key: number]: bsmap.types.v3.ColorNote;
} = {};
const possibleBurst: {
    [key: number]: bsmap.types.v3.ColorNote[];
} = { 0: [], 1: [] };
for (let i = 0, len = difficulty.colorNotes.length; i < len; i++) {
    const n = difficulty.colorNotes[i];
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
            sc: possibleBurst[n.c][0].cd!._color[1],
            s: possibleBurst[n.c][0].cd!._color[2]
                ? possibleBurst[n.c][0].cd!._color[2]
                : 1,
        });
        possibleBurst[n.c] = [];
    }
    if (n.b > 528) {
        n.a = Math.round(Math.random() * 20 - 10);
    }
    if (n.b < 208) {
        n.a = Math.round(Math.random() * 10 - 5);
    }
    if (n.b < 144) {
        n.a = Math.round(Math.random() * 15 - 7.5);
    }
    if (n.b < 70) {
        n.a = Math.round(Math.random() * 20 - 10);
    }
}
if (possibleBurst[0].length || possibleBurst[1].length) {
    throw Error('what the fuck');
}
difficulty.obstacles.forEach((o) => {
    if (o.b >= 266 && o.b <= 267) {
        o.h = 2;
    }
    if (o.b >= 268 && o.b <= 271) {
        o.h = 3;
        if (o.b % 2 === 1) {
            o.h = 4;
        }
    }
    if (o.b >= 394 && o.b <= 395) {
        o.h = 2;
    }
    if (o.b >= 396 && o.b <= 399) {
        o.h = 3;
        if (o.b % 2 === 1) {
            o.h = 4;
        }
    }
    if (o.b >= 522 && o.b <= 523) {
        o.h = 2;
    }
    if (o.b >= 524 && o.b <= 527) {
        o.h = 3;
        if (o.b % 2 === 1) {
            o.h = 4;
        }
    }
    if (!(o.b >= 80 && o.b < 144)) {
        return;
    }
    if ((o.b - 80) % 8 === 0) {
        o.y = 0;
    }
    if ((o.b - 80) % 8 === 7.5) {
        o.y = 1;
    }
});
difficulty.obstacles.forEach((o) => {
    if (o.b >= 63 && o.b < 64) {
        o.y = 1;
        o.h = 4;
    }
    if (!(o.b >= 3.5 && o.b < 63)) {
        return;
    }
    if (o.x !== 1 && o.x !== 2 && !(o.b >= 13 && o.b <= 20)) {
        o.h = 2;
    }
});
difficulty.obstacles.forEach((o) => {
    if (o.b >= 585 && o.b < 586) {
        o.y = 1;
        o.h = 4;
    }
    if (!(o.b >= 528 && o.b < 585)) {
        return;
    }
    if (o.x !== 1 && o.x !== 2 && !(o.b >= 535 && o.b <= 542)) {
        o.h = 2;
    }
});

bsmap.save.difficultySync(difficulty, {
    filePath: OUTPUT_FILE,
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/Black Eye-Burnt Thumb/',
});
console.timeEnd('Runtime');
