// holy shit image are so tedious to work with and optimise
import * as bsmap from './deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/KAEDE/';
const INPUT_FILE = 'ExpertPlusStandard.dat';
const OUTPUT_FILE = INPUT_FILE;

const difficulty = bsmap.load.difficultySync(INPUT_FILE);

difficulty.burstSliders = [];
difficulty.burstSliders.push({
    c: 0,
    b: 7,
    x: 0,
    y: 2,
    d: 1,
    tb: 7.5,
    tx: 0,
    ty: 0,
    sc: 2,
    s: 1,
});
difficulty.obstacles = [];
difficulty.colorNotes = [];
for (let i = 0; i < 4; i++) {
    difficulty.colorNotes.push({
        b: 4,
        x: i,
        y: 0,
        d: 2,
        c: 0,
        a: i % 2 ? 22.5 : -22.5,
    });
}

difficulty.colorNotes.push(
    {
        b: 8,
        x: 0,
        y: 0,
        d: 6,
        c: 0,
        a: 0,
    },
    {
        b: 8,
        x: 1,
        y: 2,
        d: 6,
        c: 0,
        a: 0,
    }
);

bsmap.save.difficultySync(difficulty, {
    filePath: OUTPUT_FILE,
});
console.timeEnd('Runtime');
