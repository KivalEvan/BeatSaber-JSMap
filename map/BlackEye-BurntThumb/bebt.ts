// holy shit image are so tedious to work with and optimise
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

difficulty.colorNotes.forEach((n) => {
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
});
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
