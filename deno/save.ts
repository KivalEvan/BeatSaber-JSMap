import { InfoData } from './beatmap/types/info.ts';
import { DifficultyData } from './beatmap/types/difficulty.ts';
import {
    SaveOptionsDifficulty,
    SaveOptionsDifficultyList,
    SaveOptionsInfo,
    DifficultyList,
} from './types.ts';
import { performDifficulty, performInfo } from './optimize.ts';
import globals from './globals.ts';
import logger from './logger.ts';

// deno-lint-ignore ban-types
const tag = (func: Function) => {
    return `[save::${func.name}]`;
};

export const defaultOptionsInfo: Required<SaveOptionsInfo> = {
    path: '',
    filePath: 'Info.dat',
    optimise: { enabled: true },
};

export const defaultOptionsDifficulty: Required<SaveOptionsDifficulty> = {
    path: '',
    filePath: 'UnnamedPath.dat',
    optimise: { enabled: true },
};

export const defaultOptionsDifficultyList: Required<SaveOptionsDifficultyList> = {
    path: '',
    optimise: { enabled: true },
};

/** Asynchronously save beatmap info.
 * ```ts
 * await save.info(info);
 * ```
 */
export const info = async (
    infoData: InfoData,
    options: SaveOptionsInfo = defaultOptionsInfo
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
        filePath: options.filePath ?? 'Info.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag(info), `Async saving info`);
    if (opt.optimise.enabled) {
        logger.info(tag(info), `Optimising info data`);
        performInfo(infoData, opt.optimise);
    }
    logger.info(tag(info), tag(difficulty), `Writing to ${opt.path + opt.filePath}`);
    await Deno.writeTextFile(opt.path + opt.filePath, JSON.stringify(infoData));
};

/** Synchronously save beatmap info.
 * ```ts
 * save.infoSync(info);
 * ```
 */
export const infoSync = (
    infoData: InfoData,
    options: SaveOptionsInfo = defaultOptionsInfo
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
        filePath: options.filePath ?? 'Info.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag(infoSync), `Sync saving info`);
    if (opt.optimise.enabled) {
        logger.info(tag(infoSync), `Optimising info data`);
        performInfo(infoData, opt.optimise);
    }
    logger.info(tag(infoSync), `Writing to ${opt.path + opt.filePath}`);
    Deno.writeTextFileSync(opt.path + opt.filePath, JSON.stringify(infoData));
};

/** Asynchronously save beatmap difficulty.
 * ```ts
 * await save.difficulty(difficulty);
 * ```
 */
export const difficulty = async (
    difficultyData: DifficultyData,
    options: SaveOptionsDifficulty = defaultOptionsDifficulty
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsDifficulty.path),
        filePath: options.filePath ?? 'UnnamedPath.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag(difficulty), `Async saving difficulty`);
    if (opt.optimise.enabled) {
        performDifficulty(difficultyData, opt.optimise);
    }
    logger.info(tag(difficulty), `Writing to ${opt.path + opt.filePath}`);
    await Deno.writeTextFile(opt.path + opt.filePath, JSON.stringify(difficultyData));
};

/** Synchronously save beatmap difficulty.
 * ```ts
 * save.difficultySync(difficulty);
 * ```
 */
export const difficultySync = (
    difficultyData: DifficultyData,
    options: SaveOptionsDifficulty = defaultOptionsDifficulty
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsDifficulty.path),
        filePath: options.filePath ?? 'UnnamedPath.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag(difficultySync), `Sync saving difficulty`);
    if (opt.optimise.enabled) {
        performDifficulty(difficultyData, opt.optimise);
    }
    logger.info(tag(difficultySync), `Writing to ${opt.path + opt.filePath}`);
    Deno.writeTextFileSync(opt.path + opt.filePath, JSON.stringify(difficultyData));
};

/** Asynchronously save multiple beatmap difficulties.
 * ```ts
 * await save.difficultyList(difficulties);
 * ```
 */
export const difficultyList = (
    difficulties: DifficultyList,
    options: SaveOptionsDifficultyList = defaultOptionsDifficultyList
) => {
    logger.info(tag(difficultyList), `Async saving list of difficulty`);
    difficulties.forEach(async (dl) => {
        const opt: Required<SaveOptionsDifficultyList> = {
            path: options.path ?? (globals.path || defaultOptionsDifficultyList.path),
            optimise: options.optimise ?? { enabled: true },
        };
        logger.info(
            tag(difficultyListSync),
            `Saving ${dl.characteristic} ${dl.difficulty}`
        );
        if (opt.optimise.enabled) {
            performDifficulty(dl.data, opt.optimise);
        }
        logger.info(tag(difficultyList), `Writing to ${opt.path + dl.fileName}`);
        await Deno.writeTextFile(opt.path + dl.fileName, JSON.stringify(difficulty));
    });
};

/** Synchronously save multiple beatmap difficulties.
 * ```ts
 * save.difficultyList(difficulties);
 * ```
 */
export const difficultyListSync = (
    difficulties: DifficultyList,
    options: SaveOptionsDifficultyList = defaultOptionsDifficultyList
) => {
    logger.info(tag(difficultyListSync), `Sync saving list of difficulty`);
    difficulties.forEach((dl) => {
        const opt: Required<SaveOptionsDifficultyList> = {
            path: options.path ?? (globals.path || defaultOptionsDifficultyList.path),
            optimise: options.optimise ?? { enabled: true },
        };
        logger.info(
            tag(difficultyListSync),
            `Saving ${dl.characteristic} ${dl.difficulty}`
        );
        if (opt.optimise.enabled) {
            performDifficulty(dl.data, opt.optimise);
        }
        logger.info(tag(difficultyListSync), `Writing to ${opt.path + dl.fileName}`);
        Deno.writeTextFileSync(opt.path + dl.fileName, JSON.stringify(difficulty));
    });
};
