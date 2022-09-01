import { IInfo } from './types/beatmap/shared/info.ts';
import { Difficulty as DifficultyV2 } from './beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from './beatmap/v3/difficulty.ts';
import { ISaveOptionsDifficulty, ISaveOptionsDifficultyList, ISaveOptionsInfo } from './types/bsmap/save.ts';
import { IDifficultyList } from './types/bsmap/list.ts';
import * as optimize from './optimize.ts';
import globals from './globals.ts';
import logger from './logger.ts';
import { deepCheck } from './beatmap/shared/dataCheck.ts';
import { DifficultyCheck as DifficultyCheckV2 } from './beatmap/v2/dataCheck.ts';
import { DifficultyCheck } from './beatmap/v3/dataCheck.ts';
import { IDifficulty as IDifficultyV2 } from './types/beatmap/v2/difficulty.ts';
import { IDifficulty } from './types/beatmap/v3/difficulty.ts';

const tag = (name: string) => {
    return `[save::${name}]`;
};

const optionsInfo: Required<ISaveOptionsInfo> = {
    directory: '',
    filePath: 'Info.dat',
    format: 0,
    optimise: { enabled: true },
};

const optionsDifficulty: Required<ISaveOptionsDifficulty> = {
    directory: '',
    filePath: 'UnnamedPath.dat',
    format: 0,
    optimise: { enabled: true },
    dataCheck: {
        enable: true,
        throwError: true,
    },
};

const optionsDifficultyList: Required<ISaveOptionsDifficultyList> = {
    directory: '',
    format: 0,
    optimise: { enabled: true },
    dataCheck: {
        enable: true,
        throwError: true,
    },
};

/** Set default option value for save function. */
export const defaultOptions = {
    info: optionsInfo,
    difficulty: optionsDifficulty,
    difficultyList: optionsDifficultyList,
};

/** Asynchronously save beatmap info.
 * ```ts
 * await save.info(info);
 * ```
 */
export async function info(data: IInfo, options: Partial<ISaveOptionsInfo> = {}) {
    const opt: Required<ISaveOptionsInfo> = {
        directory: options.directory ?? (globals.directory || defaultOptions.info.directory),
        filePath: options.filePath ?? (defaultOptions.info.filePath || 'Info.dat'),
        format: options.format ?? defaultOptions.info.format,
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag('info'), `Async saving info`);
    if (opt.optimise.enabled) {
        optimize.info(data, opt.optimise);
    }
    logger.info(tag('info'), `Writing to ${opt.directory + opt.filePath}`);
    await Deno.writeTextFile(
        opt.directory + opt.filePath,
        opt.format ? JSON.stringify(data, null, opt.format) : JSON.stringify(data),
    );
}

/** Synchronously save beatmap info.
 * ```ts
 * save.infoSync(info);
 * ```
 */
export function infoSync(data: IInfo, options: Partial<ISaveOptionsInfo> = {}) {
    const opt: Required<ISaveOptionsInfo> = {
        directory: options.directory ?? (globals.directory || defaultOptions.info.directory),
        filePath: options.filePath ?? (defaultOptions.info.filePath || 'Info.dat'),
        format: options.format ?? defaultOptions.info.format,
        optimise: options.optimise ?? { enabled: true },
    };
    logger.info(tag('infoSync'), `Sync saving info`);
    if (opt.optimise.enabled) {
        optimize.info(data, opt.optimise);
    }
    logger.info(tag('infoSync'), `Writing to ${opt.directory + opt.filePath}`);
    Deno.writeTextFileSync(
        opt.directory + opt.filePath,
        opt.format ? JSON.stringify(data, null, opt.format) : JSON.stringify(data),
    );
}

/** Asynchronously save beatmap difficulty.
 * ```ts
 * await save.difficulty(difficulty);
 * ```
 */
export async function difficulty(data: DifficultyV2 | DifficultyV3, options: Partial<ISaveOptionsDifficulty> = {}) {
    const opt: Required<ISaveOptionsDifficulty> = {
        directory: options.directory ?? (globals.directory || defaultOptions.difficulty.directory),
        filePath: options.filePath ?? (data.fileName || defaultOptions.difficulty.filePath || 'UnnamedDifficulty.dat'),
        format: options.format ?? defaultOptions.info.format,
        optimise: options.optimise ?? { enabled: true },
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    logger.info(tag('difficulty'), `Async saving difficulty`);
    const objectData = data.toJSON();
    if (opt.dataCheck.enable) {
        if ((objectData as IDifficultyV2)._version) {
            deepCheck(
                objectData,
                DifficultyCheckV2,
                'difficulty',
                (objectData as IDifficultyV2)._version,
                opt.dataCheck.throwError,
            );
        }
        if ((objectData as IDifficulty).version) {
            deepCheck(
                objectData,
                DifficultyCheck,
                'difficulty',
                (objectData as IDifficulty).version,
                opt.dataCheck.throwError,
            );
        }
    }
    if (opt.optimise.enabled) {
        optimize.difficulty(objectData, opt.optimise);
    }
    logger.info(tag('difficulty'), `Writing to ${opt.directory + opt.filePath}`);
    await Deno.writeTextFile(
        opt.directory + opt.filePath,
        opt.format ? JSON.stringify(objectData, null, opt.format) : JSON.stringify(objectData),
    );
}

/** Synchronously save beatmap difficulty.
 * ```ts
 * save.difficultySync(difficulty);
 * ```
 */
export function difficultySync(data: DifficultyV2 | DifficultyV3, options: Partial<ISaveOptionsDifficulty> = {}) {
    const opt: Required<ISaveOptionsDifficulty> = {
        directory: options.directory ?? (globals.directory || defaultOptions.difficulty.directory),
        filePath: options.filePath ?? (data.fileName || defaultOptions.difficulty.filePath || 'UnnamedDifficulty.dat'),
        format: options.format ?? defaultOptions.info.format,
        optimise: options.optimise ?? { enabled: true },
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    logger.info(tag('difficultySync'), `Sync saving difficulty`);
    const objectData = data.toJSON();
    if (opt.dataCheck.enable) {
        if ((objectData as IDifficultyV2)._version) {
            deepCheck(
                objectData,
                DifficultyCheckV2,
                'difficulty',
                (objectData as IDifficultyV2)._version,
                opt.dataCheck.throwError,
            );
        }
        if ((objectData as IDifficulty).version) {
            deepCheck(
                objectData,
                DifficultyCheck,
                'difficulty',
                (objectData as IDifficulty).version,
                opt.dataCheck.throwError,
            );
        }
    }
    if (opt.optimise.enabled) {
        optimize.difficulty(objectData, opt.optimise);
    }
    logger.info(tag('difficultySync'), `Writing to ${opt.directory + opt.filePath}`);
    Deno.writeTextFileSync(
        opt.directory + opt.filePath,
        opt.format ? JSON.stringify(objectData, null, opt.format) : JSON.stringify(objectData),
    );
}

/** Asynchronously save multiple beatmap difficulties.
 * ```ts
 * await save.difficultyList(difficulties);
 * ```
 */
export function difficultyList(difficulties: IDifficultyList, options: Partial<ISaveOptionsDifficultyList> = {}) {
    logger.info(tag('difficultyList'), `Async saving list of difficulty`);
    difficulties.forEach(async (dl) => {
        const opt: Required<ISaveOptionsDifficultyList> = {
            directory: options.directory ?? (globals.directory || defaultOptions.difficultyList.directory),
            format: options.format ?? defaultOptions.info.format,
            optimise: options.optimise ?? { enabled: true },
            dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
        };
        logger.info(tag('difficultyListSync'), `Saving ${dl.characteristic} ${dl.difficulty}`);
        const objectData = dl.data.toJSON();
        if (opt.dataCheck.enable) {
            if ((objectData as IDifficultyV2)._version) {
                deepCheck(
                    objectData,
                    DifficultyCheckV2,
                    'difficulty',
                    (objectData as IDifficultyV2)._version,
                    opt.dataCheck.throwError,
                );
            }
            if ((objectData as IDifficulty).version) {
                deepCheck(
                    objectData,
                    DifficultyCheck,
                    'difficulty',
                    (objectData as IDifficulty).version,
                    opt.dataCheck.throwError,
                );
            }
        }
        if (opt.optimise.enabled) {
            optimize.difficulty(objectData, opt.optimise);
        }
        logger.info(tag('difficultyList'), `Writing to ${opt.directory + dl.settings._beatmapFilename}`);
        await Deno.writeTextFile(
            opt.directory + dl.settings._beatmapFilename,
            opt.format ? JSON.stringify(objectData, null, opt.format) : JSON.stringify(objectData),
        );
    });
}

/** Synchronously save multiple beatmap difficulties.
 * ```ts
 * save.difficultyList(difficulties);
 * ```
 */
export function difficultyListSync(difficulties: IDifficultyList, options: Partial<ISaveOptionsDifficultyList> = {}) {
    logger.info(tag('difficultyListSync'), `Sync saving list of difficulty`);
    difficulties.forEach((dl) => {
        const opt: Required<ISaveOptionsDifficultyList> = {
            directory: options.directory ?? (globals.directory || defaultOptions.difficultyList.directory),
            format: options.format ?? defaultOptions.info.format,
            optimise: options.optimise ?? { enabled: true },
            dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
        };
        logger.info(tag('difficultyListSync'), `Saving ${dl.characteristic} ${dl.difficulty}`);
        const objectData = dl.data.toJSON();
        if (opt.dataCheck.enable) {
            if ((objectData as IDifficultyV2)._version) {
                deepCheck(
                    objectData,
                    DifficultyCheckV2,
                    'difficulty',
                    (objectData as IDifficultyV2)._version,
                    opt.dataCheck.throwError,
                );
            }
            if ((objectData as IDifficulty).version) {
                deepCheck(
                    objectData,
                    DifficultyCheck,
                    'difficulty',
                    (objectData as IDifficulty).version,
                    opt.dataCheck.throwError,
                );
            }
        }
        if (opt.optimise.enabled) {
            optimize.difficulty(objectData, opt.optimise);
        }
        logger.info(tag('difficultyList'), `Writing to ${opt.directory + dl.settings._beatmapFilename}`);
        Deno.writeTextFileSync(
            opt.directory + dl.settings._beatmapFilename,
            opt.format ? JSON.stringify(objectData, null, opt.format) : JSON.stringify(objectData),
        );
    });
}
