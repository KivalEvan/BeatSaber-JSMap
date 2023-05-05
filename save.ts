// deno-lint-ignore-file require-await
import { IInfo } from './types/beatmap/shared/info.ts';
import {
    ISaveOptionsDifficulty,
    ISaveOptionsDifficultyList,
    ISaveOptionsInfo,
} from './types/bsmap/save.ts';
import { IDifficultyList } from './types/bsmap/list.ts';
import * as optimize from './optimize.ts';
import globals from './globals.ts';
import logger from './logger.ts';
import { deepCheck } from './beatmap/shared/dataCheck.ts';
import { DifficultyCheck as DifficultyCheckV1 } from './beatmap/v1/dataCheck.ts';
import { DifficultyCheck as DifficultyCheckV2 } from './beatmap/v2/dataCheck.ts';
import { DifficultyCheck as DifficultyCheckV3 } from './beatmap/v3/dataCheck.ts';
import { IDifficulty as IDifficultyV1 } from './types/beatmap/v1/difficulty.ts';
import { IDifficulty as IDifficultyV2 } from './types/beatmap/v2/difficulty.ts';
import { IDifficulty as IDifficultyV3 } from './types/beatmap/v3/difficulty.ts';
import { IWrapDifficulty } from './types/beatmap/wrapper/difficulty.ts';
import { resolve } from './deps.ts';

const tag = (name: string) => {
    return `[save::${name}]`;
};

const optionsInfo: Required<ISaveOptionsInfo> = {
    directory: '',
    filePath: 'Info.dat',
    format: 0,
    optimize: { enabled: true },
};

const optionsDifficulty: Required<ISaveOptionsDifficulty> = {
    directory: '',
    filePath: 'UnnamedPath.dat',
    format: 0,
    optimize: { enabled: true },
    dataCheck: {
        enable: true,
        throwError: true,
    },
};

const optionsDifficultyList: Required<ISaveOptionsDifficultyList> = {
    directory: '',
    format: 0,
    optimize: { enabled: true },
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

function _info(data: IInfo, options: ISaveOptionsInfo) {
    const opt: Required<ISaveOptionsInfo> = {
        directory: options.directory ?? (globals.directory || defaultOptions.info.directory),
        filePath: options.filePath ?? (defaultOptions.info.filePath || 'Info.dat'),
        format: options.format ?? defaultOptions.info.format,
        optimize: options.optimize ?? { enabled: true },
    };
    if (opt.optimize.enabled) {
        optimize.info(data, opt.optimize);
    }
    const p = resolve(opt.directory, opt.filePath);
    logger.info(tag('_info'), `Writing to ${p}`);
    Deno.writeTextFileSync(
        p,
        opt.format ? JSON.stringify(data, null, opt.format) : JSON.stringify(data),
    );
}

/** Asynchronously save beatmap info.
 * ```ts
 * await save.info(info);
 * ```
 */
export async function info(data: IInfo, options: ISaveOptionsInfo = {}) {
    logger.info(tag('info'), `Async saving info`);
    _info(data, options);
}

/** Synchronously save beatmap info.
 * ```ts
 * save.infoSync(info);
 * ```
 */
export function infoSync(data: IInfo, options: ISaveOptionsInfo = {}) {
    logger.info(tag('infoSync'), `Sync saving info`);
    _info(data, options);
}

function _difficulty(data: IWrapDifficulty, options: ISaveOptionsDifficulty) {
    const opt: Required<ISaveOptionsDifficulty> = {
        directory: options.directory ?? (globals.directory || defaultOptions.difficulty.directory),
        filePath: options.filePath ??
            (data.fileName || defaultOptions.difficulty.filePath || 'UnnamedDifficulty.dat'),
        format: options.format ?? defaultOptions.info.format,
        optimize: options.optimize ?? { enabled: true },
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    const objectData = data.toJSON();
    if (opt.optimize.enabled) {
        optimize.difficulty(objectData as IDifficultyV2, opt.optimize);
    }
    if (opt.dataCheck.enable) {
        if ((objectData as IDifficultyV1)._version?.startsWith('1')) {
            deepCheck(
                objectData,
                DifficultyCheckV1,
                'difficulty',
                (objectData as IDifficultyV1)._version,
                opt.dataCheck.throwError,
            );
        }
        if ((objectData as IDifficultyV2)._version?.startsWith('2')) {
            deepCheck(
                objectData,
                DifficultyCheckV2,
                'difficulty',
                (objectData as IDifficultyV2)._version,
                opt.dataCheck.throwError,
            );
        }
        if ((objectData as IDifficultyV3).version?.startsWith('3')) {
            deepCheck(
                objectData,
                DifficultyCheckV3,
                'difficulty',
                (objectData as IDifficultyV3).version,
                opt.dataCheck.throwError,
            );
        }
    }
    const p = resolve(opt.directory, opt.filePath);
    logger.info(tag('_difficulty'), `Writing to ${p}`);
    Deno.writeTextFileSync(
        p,
        opt.format ? JSON.stringify(objectData, null, opt.format) : JSON.stringify(objectData),
    );
}

/** Asynchronously save beatmap difficulty.
 * ```ts
 * await save.difficulty(difficulty);
 * ```
 */
export async function difficulty(data: IWrapDifficulty, options: ISaveOptionsDifficulty = {}) {
    logger.info(tag('difficulty'), `Async saving difficulty`);
    _difficulty(data, options);
}

/** Synchronously save beatmap difficulty.
 * ```ts
 * save.difficultySync(difficulty);
 * ```
 */
export function difficultySync(data: IWrapDifficulty, options: ISaveOptionsDifficulty = {}) {
    logger.info(tag('difficultySync'), `Sync saving difficulty`);
    _difficulty(data, options);
}

function _difficultyList(difficulties: IDifficultyList, options: ISaveOptionsDifficultyList) {
    const opt: Required<ISaveOptionsDifficultyList> = {
        directory: options.directory ??
            (globals.directory || defaultOptions.difficultyList.directory),
        format: options.format ?? defaultOptions.info.format,
        optimize: options.optimize ?? { enabled: true },
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    difficulties.forEach((dl) => {
        logger.info(tag('_difficultyList'), `Saving ${dl.characteristic} ${dl.difficulty}`);
        const objectData = dl.data.toJSON();
        if (opt.optimize.enabled) {
            optimize.difficulty(objectData, opt.optimize);
        }
        if (opt.dataCheck.enable) {
            if ((objectData as IDifficultyV1)._version?.startsWith('1')) {
                deepCheck(
                    objectData,
                    DifficultyCheckV1,
                    'difficulty',
                    (objectData as IDifficultyV1)._version,
                    opt.dataCheck.throwError,
                );
            }
            if ((objectData as IDifficultyV2)._version?.startsWith('2')) {
                deepCheck(
                    objectData,
                    DifficultyCheckV2,
                    'difficulty',
                    (objectData as IDifficultyV2)._version,
                    opt.dataCheck.throwError,
                );
            }
            if ((objectData as IDifficultyV3).version?.startsWith('3')) {
                deepCheck(
                    objectData,
                    DifficultyCheckV3,
                    'difficulty',
                    (objectData as IDifficultyV3).version,
                    opt.dataCheck.throwError,
                );
            }
        }
        const p = resolve(opt.directory, dl.settings._beatmapFilename);
        logger.info(tag('_difficultyList'), `Writing to ${p}`);
        Deno.writeTextFileSync(
            p,
            opt.format ? JSON.stringify(objectData, null, opt.format) : JSON.stringify(objectData),
        );
    });
}

/** Asynchronously save multiple beatmap difficulties.
 * ```ts
 * await save.difficultyList(difficulties);
 * ```
 */
export async function difficultyList(
    difficulties: IDifficultyList,
    options: ISaveOptionsDifficultyList = {},
) {
    logger.info(tag('difficultyList'), `Async saving list of difficulty`);
    _difficultyList(difficulties, options);
}

/** Synchronously save multiple beatmap difficulties.
 * ```ts
 * save.difficultyList(difficulties);
 * ```
 */
export function difficultyListSync(
    difficulties: IDifficultyList,
    options: ISaveOptionsDifficultyList = {},
) {
    logger.info(tag('difficultyListSync'), `Sync saving list of difficulty`);
    _difficultyList(difficulties, options);
}
