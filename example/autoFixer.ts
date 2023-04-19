/* Auto-fix beatmap to latest schema, including custom data related item.
 * Command-line flag:
 * -d | --directory : map folder directory
 * -q | --quite : reduced log output (overridden by verbose)
 * -v | --verbose : enable debug log output
 * -x | --no-backup : disable backup
 * -y | --no-prompt : auto-complete prompt
 * -s | --single : single difficulty map
 * example run command:
 * deno run --allow-read --allow-write autoFixer.ts -d "./Folder/Path"
 */
import { copySync } from 'https://deno.land/std@0.177.0/fs/mod.ts';
import { parse } from 'https://deno.land/std@0.177.0/flags/mod.ts';
import { customDataUpdate, dataCorrection, removeOutsidePlayable } from '../patch/mod.ts';
import { BeatPerMinute, convert, globals, load, logger, save, types, utils, v3 } from '../mod.ts';
import { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';

const args = parse(Deno.args, {
    string: ['d', 's'],
    boolean: ['v', 'q', 'x', 'y'],
    alias: {
        d: 'directory',
        q: 'quite',
        v: 'verbose',
        x: 'no-backup',
        y: 'no-prompt',
        s: 'single',
    },
});

logger.info('Beat Saber beatmap auto-fixer build 4');
logger.info(
    'Source code available at https://github.com/KivalEvan/BeatSaber-Deno/blob/main/example/autoFixer.ts',
);
logger.info('Send any feedback to Kival Evan#5480 on Discord');

if (args.x) {
    logger.warn('No backup flagged, any changes done by this script is irreversible');
}

globals.directory = (args.d as string) ??
    (args.y ? './' : prompt('Enter map folder path (blank for current folder):')?.trim() || './');

if (args.q) {
    logger.setLevel(4);
}

if (args.v) {
    logger.setLevel(1);
}

try {
    let info: types.IInfo | null = null;
    let difficulty: IWrapDifficulty | null = null;
    const difficultyName = args.s?.trim();
    if (difficultyName) {
        difficulty = load.difficultySync(difficultyName);
    } else {
        let infoFileName = 'Info.dat';
        try {
            info = load.infoSync();
        } catch {
            logger.warn('Could not load Info.dat from folder, retrying with info.dat...');
            infoFileName = 'info.dat';
            info = load.infoSync({ filePath: infoFileName });
        }
        try {
            copySync(globals.directory + infoFileName, globals.directory + infoFileName + '.old');
        } catch (_) {
            const confirmation = args.y
                ? 'n'
                : prompt('Old info backup file detected, do you want to overwrite? (y/N):', 'n');
            if (confirmation![0].toLowerCase() === 'y') {
                copySync(
                    globals.directory + infoFileName,
                    globals.directory + infoFileName + '.old',
                    {
                        overwrite: true,
                    },
                );
            } else {
                logger.info('Skipping info overwrite...');
            }
        }
        dataCorrection.info(info);
    }

    let duration = 0;
    let audioConfirmed = false;
    logger.info(
        'Could not read audio (yet), this will be used to remove outside end playable object',
    );
    while (!audioConfirmed) {
        const input = args.y
            ? '0'
            : prompt('Enter audio duration in seconds or mm:ss (blank or 0 to skip):') ?? '';
        if (/^\d+(\.\d+)?$/.test(input)) {
            duration = Math.max(parseFloat(input), 0);
        } else if (/^\d+:(\d){1,2}$/.test(input)) {
            duration = Math.max(utils.mmssToFloat(input), 0);
        } else {
            duration = 0;
        }
        logger.info(
            'Retrieved and parsed input as value',
            duration,
            'second(s) |',
            utils.toMmss(duration),
        );
        if (duration && duration < 60) {
            const confirmation = args.y ? 'y' : prompt(
                'Duration seems lower than expected, are you sure with this audio length? (Y/n):',
                'y',
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

    const bpm = info?._beatsPerMinute ? BeatPerMinute.create(info._beatsPerMinute) : null;

    let oldChromaConvert = false;
    let oldChromaConfirm = false;
    let gradientChromaConvert = false;
    let gradientChromaConfirm = false;

    const performSingle = (d: types.wrapper.IWrapDifficulty) => {
        if (bpm) {
            bpm.timescale = d.bpmEvents
                .filter((bpme) => bpme instanceof v3.BPMEvent)
                .map((bpme) => bpme.toJSON() as types.v3.IBPMEvent);
            removeOutsidePlayable(d, bpm, duration);
        }

        if (d.basicEvents.some((e) => e.isOldChroma())) {
            if (!oldChromaConfirm) {
                const confirmation = args.y ? 'n' : prompt(
                    'Old Chroma detected, do you want to convert this (apply to all)? (y/N):',
                    'n',
                );
                if (confirmation![0].toLowerCase() === 'y') {
                    oldChromaConvert = true;
                }
                oldChromaConfirm = true;
            }
            if (oldChromaConvert) {
                convert.ogChromaToChromaV2(d, info?._environmentName);
            }
        }
        if (d.basicEvents.some((e) => e.customData._lightGradient)) {
            if (!gradientChromaConfirm) {
                const confirmation = args.y ? 'n' : prompt(
                    'Chroma light gradient detected, do you want to convert this (apply to all)? (y/N):',
                    'n',
                );
                if (confirmation![0].toLowerCase() === 'y') {
                    gradientChromaConvert = true;
                }
                gradientChromaConfirm = true;
            }
            if (gradientChromaConvert) {
                convert.chromaLightGradientToVanillaGradient(d);
            }
        }

        customDataUpdate(d);
        dataCorrection.difficulty(d);
    };

    const performDifficultyList = (
        d: types.wrapper.IWrapDifficulty,
        dl: types.IDifficultyList[number],
    ) => {
        logger.info('Fixing beatmap', dl.characteristic, dl.difficulty);

        performSingle(d);

        const hasChroma = d.basicEvents.some((obj) => obj.isChroma()) ||
            d.colorNotes.some((obj) => obj.isChroma()) ||
            d.bombNotes.some((obj) => obj.isChroma()) ||
            d.sliders.some((obj) => obj.isChroma()) ||
            d.burstSliders.some((obj) => obj.isChroma()) ||
            d.obstacles.some((obj) => obj.isChroma());
        if (hasChroma) {
            dl.settings._customData ??= {};
            if (
                dl.settings._customData._suggestions &&
                !dl.settings._customData._requirements?.includes('Chroma')
            ) {
                if (!dl.settings._customData._suggestions.includes('Chroma')) {
                    logger.info('Applying Chroma suggestions to', dl.characteristic, dl.difficulty);
                    dl.settings._customData._suggestions.push('Chroma');
                }
            } else if (!dl.settings._customData._requirements?.includes('Chroma')) {
                logger.info('Creating Chroma suggestions to', dl.characteristic, dl.difficulty);
                dl.settings._customData._suggestions = ['Chroma'];
            }
        }

        const hasNoodleExtensions = d.basicEvents.some((obj) => obj.isNoodleExtensions()) ||
            d.colorNotes.some((obj) => obj.isNoodleExtensions()) ||
            d.bombNotes.some((obj) => obj.isNoodleExtensions()) ||
            d.sliders.some((obj) => obj.isNoodleExtensions()) ||
            d.burstSliders.some((obj) => obj.isNoodleExtensions()) ||
            d.obstacles.some((obj) => obj.isNoodleExtensions());
        if (hasNoodleExtensions) {
            dl.settings._customData ??= {};
            if (dl.settings._customData._requirements) {
                if (!dl.settings._customData._requirements?.includes('Noodle Extensions')) {
                    logger.info(
                        'Applying Noodle Extensions requirements to',
                        dl.characteristic,
                        dl.difficulty,
                    );
                    dl.settings._customData._requirements.push('Noodle Extensions');
                }
            } else {
                logger.info(
                    'Creating Noodle Extensions requirements to',
                    dl.characteristic,
                    dl.difficulty,
                );
                dl.settings._customData._requirements = ['Noodle Extensions'];
            }
        }
    };

    if (difficulty) {
        if (!args.x) {
            logger.info('Backing up beatmap');
            try {
                copySync(
                    globals.directory + difficulty.fileName,
                    globals.directory + difficulty.fileName + '.old',
                );
            } catch (_) {
                const confirmation = args.y ? 'n' : prompt(
                    `Old difficulty backup file detected, do you want to overwrite? (y/N):`,
                    'n',
                );
                if (confirmation![0].toLowerCase() === 'y') {
                    copySync(
                        globals.directory + difficulty.fileName,
                        globals.directory + difficulty.fileName + '.old',
                        { overwrite: true },
                    );
                } else {
                    logger.info('Skipping overwrite...');
                }
            }
        }

        performSingle(difficulty);
        save.difficultySync(difficulty);
    } else {
        const diffList = load.difficultyFromInfoSync(info!, {
            dataCheck: { enable: true, throwError: false },
        });
        diffList.forEach((dl) => {
            if (!args.x) {
                logger.info('Backing up beatmap', dl.characteristic, dl.difficulty);
                try {
                    copySync(
                        globals.directory + dl.settings._beatmapFilename,
                        globals.directory + dl.settings._beatmapFilename + '.old',
                    );
                } catch (_) {
                    const confirmation = args.y ? 'n' : prompt(
                        `Old ${dl.characteristic} ${dl.difficulty} difficulty backup file detected, do you want to overwrite? (y/N):`,
                        'n',
                    );
                    if (confirmation![0].toLowerCase() === 'y') {
                        copySync(
                            globals.directory + dl.settings._beatmapFilename,
                            globals.directory + dl.settings._beatmapFilename + '.old',
                            { overwrite: true },
                        );
                    } else {
                        logger.info('Skipping overwrite...');
                        return;
                    }
                }
            }
            performDifficultyList(dl.data, dl);
            save.difficultySync(dl.data);
        });
    }
    if (info) {
        save.infoSync(info);
    }
    logger.info('Auto-fix process completed');
    if (!args.d) {
        args.y || prompt('Enter any key to exit...');
    }
} catch (e) {
    logger.error(e.message);
    logger.error('If this is an unexpected or unknown error');
    logger.error('Please report this to Kival Evan#5480 on Discord');
    args.y || prompt('!! Enter any key to exit...');
}
