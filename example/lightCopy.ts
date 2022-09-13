/* Copy lightshow from specific difficulty file to all within Info.dat.
 * This includes both v2 and v3 beatmap, and can be made compatible given constraint.
 * Command-line flag:
 * -d | --directory : map folder directory.
 * -f | --force : force copy to same file.
 * -e | --env : copy environment enhancement.
 * -m | --merge : merge instead of overriding the event property
 * -q | --quite : reduced log output (overridden by verbose)
 * -v | --verbose : enable debug log output
 * example run command:
 * deno run --allow-read --allow-write lightCopy.ts -d "./Folder/Path" SourceLightshow.dat
 */
import { globals, load, logger, save, types, parse as beatmapParser, v2, v3, convert, isV3 } from '../mod.ts';
import { parse } from 'https://deno.land/std@0.153.0/flags/mod.ts';
import { copySync } from 'https://deno.land/std@0.153.0/fs/mod.ts';

const args = parse(Deno.args, {
    string: ['d'],
    boolean: ['e', 'f', 'm', 'v', 'q'],
    alias: { d: 'directory', e: 'env', f: 'force', m: 'merge', q: 'quite', v: 'verbose' },
});

logger.info('Beat Saber beatmap light copy build 1');
logger.info('Source code available at https://github.com/KivalEvan/BeatSaber-Deno/blob/main/example/lightCopy.ts');
logger.info('Send any feedback to Kival Evan#5480 on Discord');

globals.directory =
    (args.d as string) ?? (prompt('Enter map folder path (leave blank for current folder):')?.trim() || './');

if (args.q) {
    logger.setLevel(4);
}

if (args.v) {
    logger.setLevel(1);
}

try {
    if (!args._[0]) {
        throw Error('Unspecified difficulty file to copy light.');
    }

    if (typeof args._[0] === 'number') {
        throw Error('Number is not accepted value.');
    }

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

    const lightToCopy = args._[0];
    const diffJSON = JSON.parse(Deno.readTextFileSync(globals.directory + lightToCopy)) as types.Either<
        types.v2.IDifficulty,
        types.v3.IDifficulty
    >;
    const diffVersion = parseInt(diffJSON._version?.at(0)! ?? parseInt(diffJSON.version?.at(0)! ?? '2'));

    let lightV3!: v3.Difficulty, lightV2!: v2.Difficulty;
    if (diffVersion === 3) {
        lightV3 = beatmapParser.difficultyV3(diffJSON as types.v3.IDifficulty).setFileName(lightToCopy);
    } else {
        lightV2 = beatmapParser.difficultyV2(diffJSON as types.v2.IDifficulty).setFileName(lightToCopy);
        if (lightV2.events.some((e) => e.hasOldChroma())) {
            const confirmation = prompt('Old Chroma detected, do you want to convert this (apply to all)? (y/N):', 'n');
            if (confirmation![0].toLowerCase() === 'y') {
                convert.ogChromaToChromaV2(lightV2, info._environmentName);
            }
        }
        if (lightV2.events.some((e) => e.customData._lightGradient)) {
            const confirmation = prompt(
                'Chroma light gradient detected, do you want to convert this (apply to all)? (y/N):',
                'n'
            );
            if (confirmation![0].toLowerCase() === 'y') {
                convert.chromaLightGradientToVanillaGradient(lightV2, true);
            }
        }
    }
    if (lightV3! && !lightV2!) {
        lightV2 = convert.V3toV2(lightV3, true);
    }
    if (lightV2! && !lightV3!) {
        lightV3 = convert.V2toV3(lightV2, true);
    }

    if (args.e && (!lightV3.customData.environment || !lightV2.customData._environment)) {
        logger.warn('Selected lightshow has no environment enhancement.');
    }

    const diffList = load.difficultyFromInfoSync(info);

    let hasCopied = false;
    diffList.forEach((dl) => {
        if (!args.f && lightToCopy === dl.settings._beatmapFilename) {
            return;
        }

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
            } else {
                logger.info('Skipping overwrite...');
                return;
            }
        }
        logger.info('Copying lightshow to', dl.characteristic, dl.difficulty);
        if (isV3(dl.data)) {
            if (args.e) {
                if (dl.data.customData) {
                    dl.data.customData.environment = lightV3.customData.environment;
                } else {
                    dl.data.customData = {
                        environment: lightV3.customData.environment,
                    };
                }
            }
            if (args.m) {
                dl.data.basicBeatmapEvents.push(...lightV3.basicBeatmapEvents);
            } else {
                dl.data.basicBeatmapEvents = lightV3.basicBeatmapEvents;
                dl.data.colorBoostBeatmapEvents = lightV3.colorBoostBeatmapEvents;
                dl.data.lightColorEventBoxGroups = lightV3.lightColorEventBoxGroups;
                dl.data.lightRotationEventBoxGroups = lightV3.lightRotationEventBoxGroups;
            }
        } else {
            if (args.e) {
                if (dl.data.customData) {
                    dl.data.customData._environment = lightV2.customData._environment;
                } else {
                    dl.data.customData = {
                        _environment: lightV2.customData._environment,
                    };
                }
            }
            if (args.m) {
                dl.data.events.push(...lightV2.events);
            } else {
                dl.data.events = lightV2.events;
            }
        }

        save.difficultySync(dl.data);
        hasCopied = true;
    });

    if (hasCopied) {
        logger.info('Copying done!');
    } else {
        logger.info('No lightshow were copied.');
    }

    if (!args.d) {
        prompt('Enter any key to exit...');
    }
} catch (e) {
    logger.error(e.message);
    logger.error('If this is an unexpected or unknown error');
    logger.error('Please report this to Kival Evan#5480 on Discord');
    prompt('!! Enter any key to exit...');
}
