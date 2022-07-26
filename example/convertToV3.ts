/* Convert the map to beatmap V3
 * Command-line flag:
 * -p | --directory : map folder directory.
 * example run command:
 * deno run --allow-read --allow-write convertToV3.ts -d "./Folder/Path"
 */
import * as bsmap from '../mod.ts';
import { parse } from 'https://deno.land/std@0.125.0/flags/mod.ts';

const args = parse(Deno.args, {
    string: ['d'],
    alias: { d: 'directory' },
});

bsmap.logger.info('Beat Saber beatmap v2 to v3 conversion by Kival Evan#5480');
bsmap.logger.info(
    'Source code available at https://github.com/KivalEvan/BeatSaber-Deno/blob/main/example/convertToV3.ts'
);

bsmap.globals.directory =
    (args.d as string) ?? (prompt('Enter map folder path (leave blank for current folder):')?.trim() || './');

try {
    let info: ReturnType<typeof bsmap.load.infoSync>;
    try {
        info = bsmap.load.infoSync();
    } catch {
        bsmap.logger.warn('Could not load Info.dat from folder, retrying with info.dat...');
        try {
            info = bsmap.load.infoSync({ filePath: 'info.data' });
        } catch {
            throw Error('Info.dat is missing from folder.');
        }
    }

    const diffList = bsmap.load.difficultyFromInfoSync(info);

    let isConverted = false;
    diffList.forEach((dl) => {
        if (!bsmap.isV3(dl.data)) {
            bsmap.logger.info('Backing up', dl.characteristic, dl.difficulty);
            Deno.renameSync(
                bsmap.globals.directory + dl.settings._beatmapFilename,
                bsmap.globals.directory + dl.settings._beatmapFilename + '.old'
            );
            bsmap.logger.info('Converting', dl.characteristic, dl.difficulty);
            dl.data = bsmap.convert.V2toV3(dl.data, true);
            bsmap.save.difficultySync(dl.data);
            isConverted = true;
        }
    });

    if (isConverted) {
        bsmap.logger.info('Done!');
    } else {
        bsmap.logger.info('Nothing was converted.');
    }

    if (!args.d) {
        prompt('Enter any key to exit...');
    }
} catch (e) {
    bsmap.logger.error(e.message);
    prompt('!! An error has occured, enter any key to exit...');
}
