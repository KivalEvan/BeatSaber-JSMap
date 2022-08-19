/* Convert the map to beatmap V3
 * Command-line flag:
 * -p | --directory : map folder directory.
 * example run command:
 * deno run --allow-read --allow-write convertToV3.ts -d "./Folder/Path"
 */
import { copySync } from 'https://deno.land/std@0.152.0/fs/mod.ts';
import { parse } from 'https://deno.land/std@0.125.0/flags/mod.ts';
import { patchCustomData } from '../patch/customData.ts';
import { convert, globals, isV2, load, logger, save } from '../mod.ts';

const args = parse(Deno.args, {
    string: ['d'],
    alias: { d: 'directory' },
});

logger.info('Beat Saber beatmap fixer by Kival Evan#5480');
logger.info('Source code available at https://github.com/KivalEvan/BeatSaber-Deno/blob/main/example/autoFixer.ts');

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

    let oldChromaConvert = false;
    let oldChromaConfirm = false;
    let gradientChromaConvert = false;
    let gradientChromaConfirm = false;
    diffList.forEach((dl) => {
        logger.info('Backing up beatmap', dl.characteristic, dl.difficulty);
        try {
            copySync(
                globals.directory + dl.settings._beatmapFilename,
                globals.directory + dl.settings._beatmapFilename + '.old'
            );
        } catch (_) {
            const confirmation = prompt('Old backup file detected, do you want to overwrite? (y/N):', 'n');
            if (confirmation![0].toLowerCase() === 'y') {
                copySync(
                    globals.directory + dl.settings._beatmapFilename,
                    globals.directory + dl.settings._beatmapFilename + '.old',
                    { overwrite: true }
                );
            }
            logger.info('Skipping overwrite...');
            return;
        }
        if (isV2(dl.data)) {
            logger.info('Fixing beatmap v2', dl.characteristic, dl.difficulty);
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
            save.difficultySync(dl.data);
        } else {
            logger.info('Fixing beatmap v3', dl.characteristic, dl.difficulty);
            logger.info('Temporarily converting beatmap v2 copy', dl.characteristic, dl.difficulty);
            const temp = convert.V3toV2(dl.data, true);

            if (temp.events.some((e) => e.hasOldChroma())) {
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
                    convert.ogChromaToChromaV2(temp, info._environmentName);
                }
            }
            if (temp.events.some((e) => e.customData._lightGradient)) {
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
                    convert.chromaLightGradientToVanillaGradient(temp, true);
                }
            }

            logger.info('Reconverting temporary beatmap v2 copy to v3', dl.characteristic, dl.difficulty);
            const temp2 = convert.V2toV3(temp, true);

            logger.info('Re-inserting events from temporary beatmap', dl.characteristic, dl.difficulty);
            dl.data.basicBeatmapEvents = temp2.basicBeatmapEvents;

            save.difficultySync(dl.data);
        }
        patchCustomData(dl.data);
    });

    logger.info('Auto-fix process completed.');
    if (!args.d) {
        prompt('Enter any key to exit...');
    }
} catch (e) {
    logger.error(e.message);
    prompt('!! An error has occured, enter any key to exit...');
}
