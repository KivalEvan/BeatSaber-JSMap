/* Auto-fix beatmap
 * Command-line flag:
 * -d | --directory : map folder directory
 * -q | --quite : reduced log output (overridden by verbose)
 * -v | --verbose : enable debug log output
 * example run command:
 * deno run --allow-read --allow-write autoFixer.ts -d "./Folder/Path"
 */
import { copySync } from 'https://deno.land/std@0.153.0/fs/mod.ts';
import { parse } from 'https://deno.land/std@0.153.0/flags/mod.ts';
import { customDataUpdate, dataCorrection, removeOutsidePlayable } from '../patch/mod.ts';
import { BeatPerMinute, convert, globals, isV2, load, logger, save, utils } from '../mod.ts';

const args = parse(Deno.args, {
    string: 'd',
    boolean: ['v', 'q'],
    alias: { d: 'directory', q: 'quite', v: 'verbose' },
});

logger.info('Beat Saber beatmap auto-fixer build 2');
logger.info('Source code available at https://github.com/KivalEvan/BeatSaber-Deno/blob/main/example/autoFixer.ts');
logger.info('Send any feedback to Kival Evan#5480 on Discord');

globals.directory = (args.d as string) ?? (prompt('Enter map folder path (blank for current folder):')?.trim() || './');

if (args.q) {
    logger.setLevel(4);
}

if (args.v) {
    logger.setLevel(1);
}

try {
    let info: ReturnType<typeof load.infoSync>;
    let infoFileName = 'Info.dat';
    try {
        info = load.infoSync();
    } catch {
        logger.warn('Could not load Info.dat from folder, retrying with info.dat...');
        try {
            infoFileName = 'info.dat';
            info = load.infoSync({ filePath: infoFileName });
        } catch {
            throw Error('Info.dat is missing from folder');
        }
    }
    try {
        copySync(globals.directory + infoFileName, globals.directory + infoFileName + '.old');
    } catch (_) {
        const confirmation = prompt('Old info backup file detected, do you want to overwrite? (y/N):', 'n');
        if (confirmation![0].toLowerCase() === 'y') {
            copySync(globals.directory + infoFileName, globals.directory + infoFileName + '.old', { overwrite: true });
        } else {
            logger.info('Skipping info overwrite...');
        }
    }
    dataCorrection.info(info);

    let duration = 0;
    let audioConfirmed = false;
    logger.info('Could not read audio (yet), this will be used to remove outside end playable object');
    while (!audioConfirmed) {
        const input = prompt('Enter audio duration in seconds or mm:ss (blank or 0 to skip):') ?? '';
        if (/^\d+(\.\d+)?$/.test(input)) {
            duration = Math.max(parseFloat(input), 0);
        } else if (/^\d+:(\d){1,2}$/.test(input)) {
            duration = Math.max(utils.MMSStoFloat(input), 0);
        } else {
            duration = 0;
        }
        logger.info('Retrieved and parsed input as value', duration, 'second(s) |', utils.toMMSS(duration));
        if (duration && duration < 60) {
            const confirmation = prompt(
                'Duration seems lower than expected, are you sure with this audio length? (Y/n):',
                'y'
            );
            if (confirmation![0].toLowerCase() === 'y') {
                audioConfirmed = true;
            }
        } else {
            audioConfirmed = true;
        }
    }
    if (!duration) {
        logger.info('Skipping beyond end audio duration check...');
    }

    save.infoSync(info);

    const bpm = BeatPerMinute.create(info._beatsPerMinute);

    const diffList = load.difficultyFromInfoSync(info, {
        dataCheck: { enable: true, throwError: false },
    });

    let oldChromaConvert = false;
    let oldChromaConfirm = false;
    let gradientChromaConvert = false;
    let gradientChromaConfirm = false;
    diffList.forEach((dl) => {
        bpm.timescale = [];
        logger.info('Backing up beatmap', dl.characteristic, dl.difficulty);
        try {
            copySync(
                globals.directory + dl.settings._beatmapFilename,
                globals.directory + dl.settings._beatmapFilename + '.old'
            );
        } catch (_) {
            const confirmation = prompt(
                `Old ${dl.characteristic} ${dl.difficulty} difficulty backup file detected, do you want to overwrite? (y/N):`,
                'n'
            );
            if (confirmation![0].toLowerCase() === 'y') {
                copySync(
                    globals.directory + dl.settings._beatmapFilename,
                    globals.directory + dl.settings._beatmapFilename + '.old',
                    { overwrite: true }
                );
            } else {
                logger.info('Skipping overwrite...');
                return;
            }
        }
        if (isV2(dl.data)) {
            logger.info('Fixing beatmap v2', dl.characteristic, dl.difficulty);
            if (dl.data.events.some((e) => e.hasOldChroma())) {
                if (!oldChromaConfirm) {
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
                if (!gradientChromaConfirm) {
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
        } else {
            logger.info('Fixing beatmap v3', dl.characteristic, dl.difficulty);
            bpm.timescale = dl.data.bpmEvents.map((bpme) => bpme.toJSON());

            logger.info('Temporarily converting beatmap v2 copy', dl.characteristic, dl.difficulty);
            const temp = convert.V3toV2(dl.data, true);
            if (temp.events.some((e) => e.hasOldChroma())) {
                if (!oldChromaConfirm) {
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
                if (!gradientChromaConfirm) {
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
        }
        removeOutsidePlayable(dl.data, bpm, duration);
        customDataUpdate(dl.data);
        dataCorrection.difficulty(dl.data);
        save.difficultySync(dl.data);
    });

    logger.info('Auto-fix process completed');
    if (!args.d) {
        prompt('Enter any key to exit...');
    }
} catch (e) {
    logger.error(e.message);
    logger.error('If this is an unexpected or unknown error');
    logger.error('Please report this to Kival Evan#5480 on Discord');
    prompt('!! Enter any key to exit...');
}
