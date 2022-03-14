import { InfoData } from './beatmap/shared/types/info.ts';
import { DifficultyData as DifficultyDataV2 } from './beatmap/v2/types/difficulty.ts';
import {
    IDifficultyData as IDifficultyDataV3,
    DifficultyData as DifficultyDataV3,
} from './beatmap/v3/types/difficulty.ts';
import {
    SaveOptionsDifficulty,
    SaveOptionsDifficultyList,
    SaveOptionsInfo,
    DifficultyList,
} from './types.ts';
import { performDifficulty, performInfo } from './optimize.ts';
import { Either } from './utils.ts';
import globals from './globals.ts';
import logger from './logger.ts';
import { isV3 } from './beatmap/version.ts';

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
export const info = async (data: InfoData, options: Partial<SaveOptionsInfo> = {}) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
        filePath: options.filePath ?? 'Info.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag(info), `Async saving info`);
    if (opt.optimise.enabled) {
        logger.info(tag(info), `Optimising info data`);
        performInfo(data, opt.optimise);
    }
    logger.info(tag(info), tag(difficulty), `Writing to ${opt.path + opt.filePath}`);
    await Deno.writeTextFile(opt.path + opt.filePath, JSON.stringify(data));
};

/** Synchronously save beatmap info.
 * ```ts
 * save.infoSync(info);
 * ```
 */
export const infoSync = (data: InfoData, options: Partial<SaveOptionsInfo> = {}) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
        filePath: options.filePath ?? 'Info.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag(infoSync), `Sync saving info`);
    if (opt.optimise.enabled) {
        logger.info(tag(infoSync), `Optimising info data`);
        performInfo(data, opt.optimise);
    }
    logger.info(tag(infoSync), `Writing to ${opt.path + opt.filePath}`);
    Deno.writeTextFileSync(opt.path + opt.filePath, JSON.stringify(data));
};

/** Asynchronously save beatmap difficulty.
 * ```ts
 * await save.difficulty(difficulty);
 * ```
 */
export const difficulty = async (
    data: Either<DifficultyDataV2, DifficultyDataV3>,
    options: Partial<SaveOptionsDifficulty> = {}
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsDifficulty.path),
        filePath: options.filePath ?? 'UnnamedPath.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag(difficulty), `Async saving difficulty`);
    let newData = data as Either<DifficultyDataV2, IDifficultyDataV3>;
    if (isV3(data)) {
        newData = data.toObject();
    } else {
        newData = data;
    }
    if (opt.optimise.enabled) {
        performDifficulty(newData, opt.optimise);
    }
    logger.info(tag(difficulty), `Writing to ${opt.path + opt.filePath}`);
    await Deno.writeTextFile(opt.path + opt.filePath, JSON.stringify(newData));
};

/** Synchronously save beatmap difficulty.
 * ```ts
 * save.difficultySync(difficulty);
 * ```
 */
export const difficultySync = (
    data: Either<DifficultyDataV2, DifficultyDataV3>,
    options: Partial<SaveOptionsDifficulty> = {}
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsDifficulty.path),
        filePath: options.filePath ?? 'UnnamedPath.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag(difficultySync), `Sync saving difficulty`);
    let newData = data as Either<DifficultyDataV2, IDifficultyDataV3>;
    if (isV3(data)) {
        newData = data.toObject();
    } else {
        newData = data;
    }
    if (opt.optimise.enabled) {
        performDifficulty(newData, opt.optimise);
    }
    logger.info(tag(difficultySync), `Writing to ${opt.path + opt.filePath}`);
    Deno.writeTextFileSync(opt.path + opt.filePath, JSON.stringify(newData));
};

/** Asynchronously save multiple beatmap difficulties.
 * ```ts
 * await save.difficultyList(difficulties);
 * ```
 */
export const difficultyList = (
    difficulties: DifficultyList,
    options: Partial<SaveOptionsDifficultyList> = {}
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
        let data;
        if (opt.optimise.enabled) {
            if (isV3(dl.data)) {
                data = dl.data.toObject();
                performDifficulty(data, opt.optimise);
            } else {
                data = dl.data;
                performDifficulty(dl.data, opt.optimise);
            }
        }
        logger.info(tag(difficultyList), `Writing to ${opt.path + dl.fileName}`);
        await Deno.writeTextFile(opt.path + dl.fileName, JSON.stringify(data));
    });
};

/** Synchronously save multiple beatmap difficulties.
 * ```ts
 * save.difficultyList(difficulties);
 * ```
 */
export const difficultyListSync = (
    difficulties: DifficultyList,
    options: Partial<SaveOptionsDifficultyList> = {}
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
        let data;
        if (opt.optimise.enabled) {
            if (isV3(dl.data)) {
                data = dl.data.toObject();
                performDifficulty(data, opt.optimise);
            } else {
                data = dl.data;
                performDifficulty(dl.data, opt.optimise);
            }
        }
        logger.info(tag(difficultyList), `Writing to ${opt.path + dl.fileName}`);
        Deno.writeTextFileSync(opt.path + dl.fileName, JSON.stringify(data));
    });
};
