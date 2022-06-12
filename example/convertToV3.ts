/* Convert the map to beatmap V3
 * Command-line flag:
 * -p | --path : map folder path.
 * example run command:
 * deno run --allow-read --allow-write convertToV3.ts -p "FolderPath"
 */
import * as bsmap from 'https://deno.land/x/bsmap/mod.ts';
import { parse } from 'https://deno.land/std@0.125.0/flags/mod.ts';

const args = parse(Deno.args, {
    string: ['p'],
    alias: { p: 'path' },
});
bsmap.globals.path = (args.p as string) ?? './';

let info: ReturnType<typeof bsmap.load.infoSync>;
try {
    info = bsmap.load.infoSync();
} catch {
    console.error('Could not load Info.dat from folder, retrying with info.dat...');
    try {
        info = bsmap.load.infoSync({ filePath: 'info.data' });
    } catch {
        throw Error('Info.dat is missing from folder.');
    }
}

const diffList = bsmap.load.difficultyFromInfoSync(info);

let isConverted = false;
diffList.forEach((dl) => {
    if (!bsmap.version.isV3(dl.data)) {
        console.log('Backing up', dl.characteristic, dl.difficulty);
        bsmap.save.difficultySync(dl.data, {
            filePath: dl.settings._beatmapFilename + '.old',
        });
        console.log('Converting up', dl.characteristic, dl.difficulty);
        dl.data = bsmap.convert.V2toV3(dl.data, true);
        bsmap.save.difficultySync(dl.data);
        isConverted = true;
    }
});

if (isConverted) {
    console.log('Done!');
} else {
    console.log('Nothing was converted.');
}
