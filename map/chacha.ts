import * as bsmap from '../deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/11cd5 (Cha Cha Slide - Chara_)/';
const INPUT_FILE = 'ExpertStandard.dat';
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

difficulty.obstacles.forEach((o) => {
    if (o.b === 298) {
        o.h = 4;
        o.y = 1;
    }
});

for (let i = 0; i < 32; i++) {
    difficulty.obstacles.push({
        b: 289 + i,
        x: i % 2 ? -2 : 5,
        y: Math.floor(Math.random() * 3),
        d: 0.25,
        w: 1,
        h: 1,
    });
}

bsmap.save.difficultySync(difficulty, {
    filePath: OUTPUT_FILE,
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/11cd5 (Cha Cha Slide - Chara_)/',
});
console.timeEnd('Runtime');
