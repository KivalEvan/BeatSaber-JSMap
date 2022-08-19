/* Convert the map to beatmap V3
 * Command-line flag:
 * -p | --directory : map folder directory.
 * example run command:
 * deno run --allow-read --allow-write convertToV3.ts -d "./Folder/Path"
 */
import { parse } from 'https://deno.land/std@0.125.0/flags/mod.ts';
import { load, isV3, convert, save, logger, globals } from '../mod.ts';

const args = parse(Deno.args, {
    string: ['d'],
    alias: { d: 'directory' },
});

logger.info('Beat Saber beatmap v2 to v3 conversion by Kival Evan#5480');
logger.info('Source code available at https://github.com/KivalEvan/BeatSaber-Deno/blob/main/example/convertToV3.ts');

globals.directory =
    (args.d as string) ?? (prompt('Enter map folder path (leave blank for current folder):')?.trim() || './');

try {
    let info: ReturnType<typeof load.infoSync>;
    try {
        info = load.infoSync();
    } catch {
        logger.warn('Could not load Info.dat from folder, retrying with info.dat...');
        try {
            info = load.infoSync({ filePath: 'info.data' });
        } catch {
            throw Error('Info.dat is missing from folder.');
        }
    }

    const diffList = load.difficultyFromInfoSync(info);

    let isConverted = false;
    let oldChromaConvert = false;
    let oldChromaConfirm = false;
    let gradientChromaConvert = false;
    let gradientChromaConfirm = false;
    diffList.forEach((dl) => {
        if (!isV3(dl.data)) {
            logger.info('Backing up beatmap v2', dl.characteristic, dl.difficulty);
            Deno.renameSync(
                globals.directory + dl.settings._beatmapFilename,
                globals.directory + dl.settings._beatmapFilename + '.old'
            );
            if (dl.data.events.some((e) => e.hasOldChroma())) {
                if (oldChromaConfirm) {
                    const confirmation = prompt(
                        'Old Chroma detected, do you want to convert this (apply to all)? (y/N):',
                        'n'
                    );
                    if (confirmation![0].toLowerCase() === 'y') {
                        oldChromaConvert = true;
                    }
                    oldChromaConfirm = true;
                }
                if (oldChromaConvert) {
                    convert.ogChromaToChromaV2(dl.data, info._environmentName);
                }
            }
            if (dl.data.events.some((e) => e.customData._lightGradient)) {
                if (gradientChromaConfirm) {
                    const confirmation = prompt(
                        'Chroma light gradient detected, do you want to convert this (apply to all)? (y/N):',
                        'n'
                    );
                    if (confirmation![0].toLowerCase() === 'y') {
                        gradientChromaConvert = true;
                    }
                    gradientChromaConfirm = true;
                }
                if (gradientChromaConvert) {
                    convert.chromaLightGradientToVanillaGradient(dl.data, true);
                }
            }
            logger.info('Converting beatmap v2', dl.characteristic, dl.difficulty, 'to v3');
            dl.data = convert.V2toV3(dl.data, true);
            save.difficultySync(dl.data);
            isConverted = true;
        }
    });

    if (isConverted) {
        logger.info('Conversion completed!');
    } else {
        logger.info('Nothing was converted.');
    }

    if (!args.d) {
        prompt('Enter any key to exit...');
    }
} catch (e) {
    logger.error(e.message);
    prompt('!! An error has occured, enter any key to exit...');
}
