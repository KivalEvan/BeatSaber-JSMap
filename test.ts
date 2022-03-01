// holy shit image are so tedious to work with and optimise
import * as bsmap from './deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/KAEDE/';
const INPUT_FILE = 'ExpertPlusStandard.dat';
const OUTPUT_FILE = INPUT_FILE;

const difficulty = bsmap.load.difficultySync(INPUT_FILE);

difficulty.colorNotes.forEach((n) => {
    if (n.d === 8) {
        n.a = Math.random() * 90;
    }
});

difficulty.rotationEvents = [];

bsmap.save.difficultySync(difficulty, {
    filePath: OUTPUT_FILE,
});
console.timeEnd('Runtime');
