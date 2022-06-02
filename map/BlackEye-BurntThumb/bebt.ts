import * as bsmap from '../../deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Black Eye-Burnt Thumb/';
const INPUT_FILE = 'ExpertPlusStandard.dat';
const OUTPUT_FILE = INPUT_FILE;

const old = bsmap.load.difficultySync(INPUT_FILE, 2);
old.events.forEach((e) => {
    e.floatValue = 1;
    if (e.isLightEvent()) {
        e.floatValue = e.value ? 1 : 0;
    }
    if (e.isLightEvent() && e.customData?._color) {
        if (e.value !== 0) {
            e.value = e.customData._color[0] ? (e.value <= 4 ? 4 : 8) : e.value;
        }
        e.floatValue = e.customData._color[3] ?? 1;
    }
    delete e.customData;
});

const difficulty = bsmap.convert.V2toV3(old, true);

const prevSlider: {
    [key: number]: bsmap.v3.ColorNote;
} = {};
const possibleBurst: {
    [key: number]: bsmap.v3.ColorNote[];
} = { 0: [], 1: [] };
for (let i = 0, len = difficulty.colorNotes.length; i < len; i++) {
    const n = difficulty.colorNotes[i];
    if (n.customData?._color) {
        if (n.customData._color[0] === 0) {
            if (possibleBurst[n.color].length) {
                difficulty.colorNotes.splice(i, 1);
                i--;
                len--;
            }
            possibleBurst[n.color].push(n);
        }
        if (n.customData._color[0] === 1) {
            if (prevSlider[n.color]) {
                difficulty.sliders.push(
                    bsmap.v3.Slider.create({
                        b: prevSlider[n.color].time,
                        c: prevSlider[n.color].color,
                        x: prevSlider[n.color].posX,
                        y: prevSlider[n.color].posY,
                        d: prevSlider[n.color].direction,
                        mu: prevSlider[n.color].customData!._disableSpawnEffect
                            ? 0
                            : prevSlider[n.color].customData!._color[2] * 0.75,
                        tb: n.time,
                        tx: n.posX,
                        ty: n.posY,
                        tc: prevSlider[n.color].customData!._disableSpawnEffect
                            ? prevSlider[n.color].direction
                            : n.direction,
                        tmu: prevSlider[n.color].customData!._disableSpawnEffect
                            ? 0
                            : prevSlider[n.color].customData!._color[3] * 0.75,
                        m: prevSlider[n.color].customData!._color[1],
                    }),
                );
            }
            delete prevSlider[n.color];
            if (n.customData._color[3] !== 0) {
                prevSlider[n.color] = n;
            } else {
                if (n.customData._color[2] !== 0) {
                    let x = n.posX;
                    let y = n.posY;
                    while (x >= 0 && x <= 3 && y >= 0 && y <= 2) {
                        x += bsmap.NoteCutDirectionSpace[n.direction][0];
                        y += bsmap.NoteCutDirectionSpace[n.direction][1];
                    }
                    x = bsmap.utils.clamp(x, 0, 3);
                    y = bsmap.utils.clamp(y, 0, 2);
                    difficulty.sliders.push(
                        bsmap.v3.Slider.create({
                            b: n.time,
                            c: n.color,
                            x: n.posX,
                            y: n.posY,
                            d: n.direction,
                            mu: 0.5,
                            tb: n.time + n.customData._color[2],
                            tx: x,
                            ty: y,
                            tc: n.direction,
                            tmu: 0,
                            m: 0,
                        }),
                    );
                }
                if (n.customData!._disableSpawnEffect) {
                    difficulty.colorNotes.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
    }
    if (possibleBurst[n.color].length === 2) {
        difficulty.burstSliders.push(
            bsmap.v3.BurstSlider.create({
                b: possibleBurst[n.color][0].time,
                c: possibleBurst[n.color][0].color,
                x: possibleBurst[n.color][0].posX,
                y: possibleBurst[n.color][0].posY,
                d: possibleBurst[n.color][0].direction,
                tb: possibleBurst[n.color][1].time,
                tx: possibleBurst[n.color][1].posX,
                ty: possibleBurst[n.color][1].posY,
                sc: possibleBurst[n.color][0].customData!._color[1],
                s: possibleBurst[n.color][0].customData!._color[2]
                    ? possibleBurst[n.color][0].customData!._color[2]
                    : 1,
            }),
        );
        possibleBurst[n.color] = [];
    }
    if (n.time > 528) {
        n.angleOffset = Math.round(Math.random() * 20 - 10);
    }
    if (n.time < 208) {
        n.angleOffset = Math.round(Math.random() * 10 - 5);
    }
    if (n.time < 144) {
        n.angleOffset = Math.round(Math.random() * 15 - 7.5);
    }
    if (n.time < 70) {
        n.angleOffset = Math.round(Math.random() * 20 - 10);
    }
}
if (possibleBurst[0].length || possibleBurst[1].length) {
    throw Error('what the fuck');
}
difficulty.obstacles.forEach((o) => {
    if (o.time >= 266 && o.time <= 267) {
        o.height = 2;
    }
    if (o.time >= 268 && o.time <= 271) {
        o.height = 3;
        if (o.time % 2 === 1) {
            o.height = 4;
        }
    }
    if (o.time >= 394 && o.time <= 395) {
        o.height = 2;
    }
    if (o.time >= 396 && o.time <= 399) {
        o.height = 3;
        if (o.time % 2 === 1) {
            o.height = 4;
        }
    }
    if (o.time >= 522 && o.time <= 523) {
        o.height = 2;
    }
    if (o.time >= 524 && o.time <= 527) {
        o.height = 3;
        if (o.time % 2 === 1) {
            o.height = 4;
        }
    }
    if (!(o.time >= 80 && o.time < 144)) {
        return;
    }
    if ((o.time - 80) % 8 === 0) {
        o.posY = 0;
    }
    if ((o.time - 80) % 8 === 7.5) {
        o.posY = 1;
    }
});
difficulty.obstacles.forEach((o) => {
    if (o.time >= 63 && o.time < 64) {
        o.posY = 1;
        o.height = 4;
    }
    if (!(o.time >= 3.5 && o.time < 63)) {
        return;
    }
    if (o.posX !== 1 && o.posX !== 2 && !(o.time >= 13 && o.time <= 20)) {
        o.height = 2;
    }
});
difficulty.obstacles.forEach((o) => {
    if (o.time >= 585 && o.time < 586) {
        o.posY = 1;
        o.height = 4;
    }
    if (!(o.time >= 528 && o.time < 585)) {
        return;
    }
    if (o.posX !== 1 && o.posX !== 2 && !(o.time >= 535 && o.time <= 542)) {
        o.height = 2;
    }
});

difficulty.colorNotes.forEach((n) => n.deleteCustomData());

bsmap.save.difficultySync(difficulty, {
    filePath: OUTPUT_FILE,
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/Black Eye-Burnt Thumb/',
});
console.timeEnd('Runtime');
