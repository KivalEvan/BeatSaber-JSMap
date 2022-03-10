import * as bsmap from '../deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/11cd5 (Cha Cha Slide - Chara_)/';
const INPUT_FILE = 'ExpertStandard.dat';
const OUTPUT_FILE = INPUT_FILE;

const difficulty = bsmap.convert.V2toV3(
    bsmap.load.difficultyLegacySync(INPUT_FILE),
    true
);

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
difficulty.obstacles.push(
    {
        b: 316,
        x: 0,
        y: 1,
        d: 0.03125,
        w: 4,
        h: 1,
    },
    {
        b: 316,
        x: -1,
        y: 0,
        d: 0.03125,
        w: 1,
        h: 3,
    },
    {
        b: 316,
        x: 4,
        y: 0,
        d: 0.03125,
        w: 1,
        h: 3,
    }
);

bsmap.save.difficultySync(difficulty, {
    filePath: OUTPUT_FILE,
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/11cd5 (Cha Cha Slide - Chara_)/',
});
console.timeEnd('Runtime');
