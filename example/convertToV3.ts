/* Convert the map to beatmap V3
 * Command-line flag:
 * -d | --directory : map folder directory
 * -s | --single : single difficulty conversion
 * -q | --quite : reduced log output (overridden by verbose)
 * -v | --verbose : enable debug log output
 * -x | --no-backup : disable backup
 * -y | --no-prompt : auto-complete prompt
 * example run command:
 * deno run --allow-read --allow-write convertToV3.ts -d "./Folder/Path"
 */
import { copySync } from 'https://deno.land/std@0.177.0/fs/mod.ts';
import { parse } from 'https://deno.land/std@0.177.0/flags/mod.ts';
import {
    convert,
    globals,
    isV3,
    load,
    logger,
    parse as beatmapParser,
    save,
    types,
    v2,
} from '../mod.ts';

const args = parse(Deno.args, {
    string: 'd',
    boolean: ['v', 'q', 'x', 'y', 's'],
    alias: {
        d: 'directory',
        q: 'quite',
        v: 'verbose',
        x: 'no-backup',
        y: 'no-prompt',
        s: 'single',
    },
});

logger.info('Beat Saber beatmap v2 to v3 conversion build 3');
logger.info(
    'Source code available at https://github.com/KivalEvan/BeatSaber-Deno/blob/main/example/convertToV3.ts',
);
logger.info('Send any feedback to Kival Evan#5480 on Discord');

if (args.x) {
    logger.warn('No backup flagged, any changes done by this script is irreversible');
}

globals.directory = (args.d as string) ??
    (args.y
        ? './'
        : prompt('Enter map folder path (leave blank for current folder):')?.trim() || './');

if (args.q) {
    logger.setLevel(4);
}

if (args.v) {
    logger.setLevel(1);
}

let isConverted = false;
let oldChromaConvert = false;
let oldChromaConfirm = false;
let gradientChromaConvert = false;
let gradientChromaConfirm = false;
try {
    if (args.s) {
        if (!args._[0]) {
            logger.warn('Unspecified difficulty file to convert.');
        }

        if (typeof args._[0] === 'number') {
            logger.error('Number is not acceptable value for file path.');
        }

        const diffFilePath = typeof args._[0] === 'string'
            ? args._[0]
            : prompt('Enter difficulty file name (must include extension):')?.trim();

        if (!diffFilePath) {
            throw new Error('Received empty file path.');
        }

        const diffJSON = JSON.parse(
            Deno.readTextFileSync(globals.directory + diffFilePath),
        ) as types.Either<types.v2.IDifficulty, types.v3.IDifficulty>;
        const diffVersion = parseInt(
            diffJSON._version?.at(0)! ?? parseInt(diffJSON.version?.at(0)! ?? '2'),
        );

        let diff!: v2.Difficulty;
        if (diffVersion === 2) {
            let skipped = false;
            if (!args.x) {
                logger.info('Backing up beatmap');
                try {
                    copySync(
                        globals.directory + diffFilePath,
                        globals.directory + diffFilePath + '.old',
                    );
                } catch (_) {
                    const confirmation = args.y
                        ? 'n'
                        : prompt('Old backup file detected, do you want to overwrite? (y/N):', 'n');
                    if (confirmation![0].toLowerCase() === 'y') {
                        copySync(
                            globals.directory + diffFilePath,
                            globals.directory + diffFilePath + '.old',
                            {
                                overwrite: true,
                            },
                        );
                    } else {
                        logger.info('Skipping overwrite...');
                        skipped = true;
                    }
                }
            }
            if (!skipped) {
                diff = beatmapParser
                    .difficultyV2(diffJSON as types.v2.IDifficulty)
                    .setFileName(diffFilePath);
                if (diff.basicEvents.some((e) => e.isOldChroma())) {
                    const confirmation = args.y ? 'n' : prompt(
                        'Old Chroma detected, do you want to convert this (apply to all)? (y/N):',
                        'n',
                    );
                    if (confirmation![0].toLowerCase() === 'y') {
                        convert.ogChromaToChromaV2(diff);
                    }
                }
                if (diff.basicEvents.some((e) => e.customData._lightGradient)) {
                    const confirmation = args.y ? 'n' : prompt(
                        'Chroma light gradient detected, do you want to convert this (apply to all)? (y/N):',
                        'n',
                    );
                    if (confirmation![0].toLowerCase() === 'y') {
                        convert.chromaLightGradientToVanillaGradient(diff, true);
                    }
                }
                logger.info('Converting beatmap to v3');
                save.difficultySync(convert.V2toV3(diff, true));
                isConverted = true;
            }
        }
    } else {
        let info: ReturnType<typeof load.infoSync>;
        try {
            info = load.infoSync();
        } catch {
            logger.warn('Could not load Info.dat from folder, retrying with info.dat...');
            info = load.infoSync({ filePath: 'info.dat' });
        }

        const diffList = load.difficultyFromInfoSync(info);

        diffList.forEach((dl) => {
            if (!isV3(dl.data)) {
                if (!args.x) {
                    logger.info('Backing up beatmap v2', dl.characteristic, dl.difficulty);
                    try {
                        copySync(
                            globals.directory + dl.settings._beatmapFilename,
                            globals.directory + dl.settings._beatmapFilename + '.old',
                        );
                    } catch (_) {
                        const confirmation = args.y ? 'n' : prompt(
                            'Old backup file detected, do you want to overwrite? (y/N):',
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
                if (dl.data.basicEvents.some((e) => e.isOldChroma())) {
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
                        convert.ogChromaToChromaV2(dl.data, info._environmentName);
                    }
                }
                if (dl.data.basicEvents.some((e) => e.customData._lightGradient)) {
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
                        convert.chromaLightGradientToVanillaGradient(dl.data, true);
                    }
                }
                logger.info('Converting beatmap v2', dl.characteristic, dl.difficulty, 'to v3');
                dl.data = convert.V2toV3(dl.data as v2.Difficulty, true);
                save.difficultySync(dl.data);
                isConverted = true;
            }
        });
    }
    if (isConverted) {
        logger.info('Conversion completed!');
    } else {
        logger.info('Nothing was converted.');
    }

    if (!args.d) {
        args.y || prompt('Enter any key to exit...');
    }
} catch (e) {
    logger.error(e.message);
    logger.error('If this is an unexpected or unknown error');
    logger.error('Please report this to Kival Evan#5480 on Discord');
    args.y || prompt('!! Enter any key to exit...');
}
