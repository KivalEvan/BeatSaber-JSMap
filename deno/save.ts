import { IInfoData } from './types/beatmap/shared/info.ts';
import { DifficultyData as DifficultyDataV2 } from './beatmap/v2/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from './beatmap/v3/difficulty.ts';
import { ISaveOptionsDifficulty, ISaveOptionsDifficultyList, ISaveOptionsInfo } from './types/bsmap/save.ts';
import { DifficultyList } from './types/bsmap/list.ts';
import { performDifficulty, performInfo } from './optimize.ts';
import globals from './globals.ts';
import logger from './logger.ts';

const tag = (name: string) => {
    return `[save::${name}]`;
};

export const defaultOptionsInfo: Required<ISaveOptionsInfo> = {
    path: '',
    filePath: 'Info.dat',
    optimise: { enabled: true },
};

export const defaultOptionsDifficulty: Required<ISaveOptionsDifficulty> = {
    path: '',
    filePath: 'UnnamedPath.dat',
    optimise: { enabled: true },
};

export const defaultOptionsDifficultyList: Required<ISaveOptionsDifficultyList> = {
    path: '',
    optimise: { enabled: true },
};

/** Asynchronously save beatmap info.
 * ```ts
 * await save.info(info);
 * ```
 */
export const info = async (data: IInfoData, options: Partial<ISaveOptionsInfo> = {}) => {
    const opt: Required<ISaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
        filePath: options.filePath ?? 'Info.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag('info'), `Async saving info`);
    if (opt.optimise.enabled) {
        logger.info(tag('info'), `Optimising info data`);
        performInfo(data, opt.optimise);
    }
    logger.info(tag('info'), `Writing to ${opt.path + opt.filePath}`);
    await Deno.writeTextFile(opt.path + opt.filePath, JSON.stringify(data));
};

/** Synchronously save beatmap info.
 * ```ts
 * save.infoSync(info);
 * ```
 */
export const infoSync = (data: IInfoData, options: Partial<ISaveOptionsInfo> = {}) => {
    const opt: Required<ISaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
        filePath: options.filePath ?? 'Info.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag('infoSync'), `Sync saving info`);
    if (opt.optimise.enabled) {
        logger.info(tag('infoSync'), `Optimising info data`);
        performInfo(data, opt.optimise);
    }
    logger.info(tag('infoSync'), `Writing to ${opt.path + opt.filePath}`);
    Deno.writeTextFileSync(opt.path + opt.filePath, JSON.stringify(data));
};

/** Asynchronously save beatmap difficulty.
 * ```ts
 * await save.difficulty(difficulty);
 * ```
 */
export const difficulty = async (
    data: DifficultyDataV2 | DifficultyDataV3,
    options: Partial<ISaveOptionsDifficulty> = {},
) => {
    const opt: Required<ISaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsDifficulty.path),
        filePath: options.filePath ?? 'UnnamedPath.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag('difficulty'), `Async saving difficulty`);
    const objectData = data.toObject();
    if (opt.optimise.enabled) {
        performDifficulty(objectData, opt.optimise);
    }
    logger.info(tag('difficulty'), `Writing to ${opt.path + opt.filePath}`);
    await Deno.writeTextFile(opt.path + opt.filePath, JSON.stringify(objectData));
};

/** Synchronously save beatmap difficulty.
 * ```ts
 * save.difficultySync(difficulty);
 * ```
 */
export const difficultySync = (
    data: DifficultyDataV2 | DifficultyDataV3,
    options: Partial<ISaveOptionsDifficulty> = {},
) => {
    const opt: Required<ISaveOptionsDifficulty> = {
        path: options.path ?? (globals.path || defaultOptionsDifficulty.path),
        filePath: options.filePath ?? 'UnnamedPath.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag('difficultySync'), `Sync saving difficulty`);
    const objectData = data.toObject();
    if (opt.optimise.enabled) {
        performDifficulty(objectData, opt.optimise);
    }
    logger.info(tag('difficultySync'), `Writing to ${opt.path + opt.filePath}`);
    Deno.writeTextFileSync(opt.path + opt.filePath, JSON.stringify(objectData));
};

/** Asynchronously save multiple beatmap difficulties.
 * ```ts
 * await save.difficultyList(difficulties);
 * ```
 */
export const difficultyList = (difficulties: DifficultyList, options: Partial<ISaveOptionsDifficultyList> = {}) => {
    logger.info(tag('difficultyList'), `Async saving list of difficulty`);
    difficulties.forEach(async (dl) => {
        const opt: Required<ISaveOptionsDifficultyList> = {
            path: options.path ?? (globals.path || defaultOptionsDifficultyList.path),
            optimise: options.optimise ?? { enabled: true },
        };
        logger.info(tag('difficultyListSync'), `Saving ${dl.characteristic} ${dl.difficulty}`);
        const objectData = dl.data.toObject();
        if (opt.optimise.enabled) {
            performDifficulty(objectData, opt.optimise);
        }
        logger.info(tag('difficultyList'), `Writing to ${opt.path + dl.fileName}`);
        await Deno.writeTextFile(opt.path + dl.fileName, JSON.stringify(objectData));
    });
};

/** Synchronously save multiple beatmap difficulties.
 * ```ts
 * save.difficultyList(difficulties);
 * ```
 */
export const difficultyListSync = (difficulties: DifficultyList, options: Partial<ISaveOptionsDifficultyList> = {}) => {
    logger.info(tag('difficultyListSync'), `Sync saving list of difficulty`);
    difficulties.forEach((dl) => {
        const opt: Required<ISaveOptionsDifficultyList> = {
            path: options.path ?? (globals.path || defaultOptionsDifficultyList.path),
            optimise: options.optimise ?? { enabled: true },
        };
        logger.info(tag('difficultyListSync'), `Saving ${dl.characteristic} ${dl.difficulty}`);
        const objectData = dl.data.toObject();
        if (opt.optimise.enabled) {
            performDifficulty(objectData, opt.optimise);
        }
        logger.info(tag('difficultyList'), `Writing to ${opt.path + dl.fileName}`);
        Deno.writeTextFileSync(opt.path + dl.fileName, JSON.stringify(objectData));
    });
};
