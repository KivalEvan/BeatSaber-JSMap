import { IDifficultyList } from './types/bsmap/list.ts';
import { GenericFileName, IInfoData } from './types/beatmap/shared/info.ts';
import { IDifficulty as IDifficultyV2 } from './types/beatmap/v2/difficulty.ts';
import { IDifficulty as IDifficultyV3 } from './types/beatmap/v3/difficulty.ts';
import { Difficulty as DifficultyV2 } from './beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from './beatmap/v3/difficulty.ts';
import { info as parseInfo } from './beatmap/shared/parse.ts';
import { difficulty as parseDifficultyV2 } from './beatmap/v2/parse.ts';
import { difficulty as parseDifficultyV3 } from './beatmap/v3/parse.ts';
import globals from './globals.ts';
import logger from './logger.ts';
import { Either, LooseAutocomplete } from './types/utils.ts';
import { ILoadOptionsDifficulty, ILoadOptionsInfo } from './types/bsmap/load.ts';
import { V3toV2 } from './converter/V3toV2.ts';
import { V2toV3 } from './converter/V2toV3.ts';
import { fixDirectory } from './utils/fs.ts';

const tag = (name: string) => {
    return `[load::${name}]`;
};

const optionsInfo: Required<ILoadOptionsInfo> = {
    directory: '',
    filePath: 'Info.dat',
};

const optionsDifficulty: Required<ILoadOptionsDifficulty> = {
    directory: '',
    forceConvert: true,
    dataCheck: {
        enable: true,
        throwError: true,
    },
};

const optionsDifficultyList: Required<ILoadOptionsDifficulty> = {
    directory: '',
    forceConvert: false,
    dataCheck: {
        enable: true,
        throwError: true,
    },
};

/** Set default option value for load function. */
export const defaultOptions = {
    info: optionsInfo,
    difficulty: optionsDifficulty,
    difficultyList: optionsDifficultyList,
};

/** Asynchronously load beatmap info file.
 * ```ts
 * const info = await load.info();
 * console.log(info);
 * ```
 */
export async function info(options: ILoadOptionsInfo = {}): Promise<IInfoData> {
    const opt: Required<ILoadOptionsInfo> = {
        directory: fixDirectory(options.directory ?? (globals.directory || defaultOptions.info.directory)),
        filePath: options.filePath ?? 'Info.dat',
    };
    logger.info(tag('info'), `Async loading info from ${opt.directory + opt.filePath}`);
    return await new Promise((resolve, reject) => {
        try {
            resolve(parseInfo(JSON.parse(Deno.readTextFileSync(opt.directory + opt.filePath))));
        } catch (e) {
            reject(new Error(e));
        }
    });
}

/** Synchronously load beatmap info file.
 * ```ts
 * const info = load.infoSync();
 * console.log(info);
 * ```
 */
export function infoSync(options: ILoadOptionsInfo = {}): IInfoData {
    const opt: Required<ILoadOptionsInfo> = {
        directory: fixDirectory(options.directory ?? (globals.directory || defaultOptions.info.directory)),
        filePath: options.filePath ?? 'Info.dat',
    };
    logger.info(tag('infoSync'), `Sync loading info from ${opt.directory + opt.filePath}`);
    return parseInfo(JSON.parse(Deno.readTextFileSync(opt.directory + opt.filePath)));
}

/** Asynchronously load beatmap difficulty file.
 * ```ts
 * const difficulty = await load.difficulty('EasyStandard.dat', 3);
 * console.log(difficulty);
 * ```
 * ---
 * Unmatched beatmap version will be automatically converted; default to version 3.
 */
export async function difficulty(
    filePath: LooseAutocomplete<GenericFileName>,
    version?: 3,
    options?: ILoadOptionsDifficulty,
): Promise<DifficultyV3>;
export async function difficulty(
    filePath: LooseAutocomplete<GenericFileName>,
    version?: 2,
    options?: ILoadOptionsDifficulty,
): Promise<DifficultyV2>;
export async function difficulty(
    filePath: LooseAutocomplete<GenericFileName>,
    version = 3,
    options: ILoadOptionsDifficulty = {},
) {
    const opt: Required<ILoadOptionsDifficulty> = {
        directory: fixDirectory(options.directory ?? (globals.directory || defaultOptions.difficulty.directory)),
        forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    logger.info(
        tag('difficulty'),
        `Async loading difficulty as beatmap version ${version} from ${opt.directory + filePath}`,
    );
    return await new Promise((resolve, reject) => {
        try {
            const diffJSON = JSON.parse(Deno.readTextFileSync(opt.directory + filePath)) as Either<
                IDifficultyV2,
                IDifficultyV3
            >;
            const diffVersion = parseInt(diffJSON._version?.at(0)! ?? parseInt(diffJSON.version?.at(0)! ?? '2'));
            if (diffVersion !== version) {
                if (!opt.forceConvert) {
                    throw new Error(`Beatmap version unmatched, expected ${version} but received ${diffVersion}`);
                }
                logger.warn(
                    tag('difficulty'),
                    'Beatmap version unmatched, expected',
                    version,
                    'but received',
                    diffVersion,
                    'for version; Converting to beatmap version',
                    version,
                );
                if (diffVersion === 3 && version == 2) {
                    resolve(V3toV2(parseDifficultyV3(diffJSON as IDifficultyV3).setFileName(filePath), true));
                } else {
                    resolve(V2toV3(parseDifficultyV2(diffJSON as IDifficultyV2).setFileName(filePath), true));
                }
            } else {
                if (version === 3) {
                    resolve(parseDifficultyV3(diffJSON as IDifficultyV3).setFileName(filePath));
                }
                if (version === 2) {
                    resolve(parseDifficultyV2(diffJSON as IDifficultyV2).setFileName(filePath));
                }
            }
        } catch (e) {
            reject(new Error(e));
        }
    });
}

/** Synchronously load beatmap difficulty file.
 * ```ts
 * const difficulty = load.difficultySync('EasyStandard.dat', 3);
 * console.log(difficulty);
 * ```
 * ---
 * Unmatched beatmap version will be automatically converted; default to version 3.
 */
export function difficultySync(
    filePath: LooseAutocomplete<GenericFileName>,
    version?: 3,
    options?: ILoadOptionsDifficulty,
): DifficultyV3;
export function difficultySync(
    filePath: LooseAutocomplete<GenericFileName>,
    version?: 2,
    options?: ILoadOptionsDifficulty,
): DifficultyV2;
export function difficultySync(
    filePath: LooseAutocomplete<GenericFileName>,
    version = 3,
    options: ILoadOptionsDifficulty = {},
) {
    const opt: Required<ILoadOptionsDifficulty> = {
        directory: fixDirectory(options.directory ?? (globals.directory || defaultOptions.difficulty.directory)),
        forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    logger.info(
        tag('difficultySync'),
        `Sync loading difficulty as beatmap version ${version} from ${opt.directory + filePath}`,
    );
    const diffJSON = JSON.parse(Deno.readTextFileSync(opt.directory + filePath)) as Either<
        IDifficultyV2,
        IDifficultyV3
    >;
    const diffVersion = parseInt(diffJSON._version?.at(0)! ?? parseInt(diffJSON.version?.at(0)! ?? '2'));
    if (diffVersion !== version) {
        if (!opt.forceConvert) {
            throw new Error(`Beatmap version unmatched, expected ${version} but received ${diffVersion}`);
        }
        logger.warn(
            tag('difficultySync'),
            'Beatmap version unmatched, expected',
            version,
            'but received',
            diffVersion,
            'for version; Converting to beatmap version',
            version,
        );
        if (diffVersion === 3 && version == 2) {
            return V3toV2(parseDifficultyV3(diffJSON as IDifficultyV3).setFileName(filePath), true);
        } else {
            return V2toV3(parseDifficultyV2(diffJSON as IDifficultyV2).setFileName(filePath), true);
        }
    } else {
        if (version === 3) {
            return parseDifficultyV3(diffJSON as IDifficultyV3).setFileName(filePath);
        }
        if (version === 2) {
            return parseDifficultyV2(diffJSON as IDifficultyV2).setFileName(filePath);
        }
    }
}

/** Asynchronously load multiple beatmap difficulties given beatmap info.
 * ```ts
 * const difficultyList = await load.difficultyFromInfo();
 * difficultyList.forEach((d) => { console.log(d) })
 * ```
 * ---
 * Info difficulty reference is also given to allow further control.
 */
export async function difficultyFromInfo(
    info: IInfoData,
    options: ILoadOptionsDifficulty = {},
): Promise<IDifficultyList> {
    const opt: Required<ILoadOptionsDifficulty> = {
        directory: fixDirectory(options.directory ?? (globals.directory || defaultOptions.difficulty.directory)),
        forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    logger.info(tag('difficultyFromInfo'), 'Async loading difficulty from map Info...');
    return await new Promise((resolve, reject) => {
        const difficulties: IDifficultyList = [];
        try {
            for (const set of info._difficultyBeatmapSets) {
                for (const d of set._difficultyBeatmaps) {
                    logger.info(
                        tag('difficultyFromInfo'),
                        `Loading difficulty from ${opt.directory + d._beatmapFilename}`,
                    );
                    const diffJSON = JSON.parse(Deno.readTextFileSync(opt.directory + d._beatmapFilename)) as Either<
                        IDifficultyV2,
                        IDifficultyV3
                    >;
                    if (diffJSON._version) {
                        difficulties.push({
                            characteristic: set._beatmapCharacteristicName,
                            difficulty: d._difficulty,
                            settings: d,
                            version: 2,
                            data: parseDifficultyV2(diffJSON).setFileName(d._beatmapFilename),
                        });
                    } else {
                        difficulties.push({
                            characteristic: set._beatmapCharacteristicName,
                            difficulty: d._difficulty,
                            settings: d,
                            version: 3,
                            data: parseDifficultyV3(diffJSON).setFileName(d._beatmapFilename),
                        });
                    }
                }
            }
            resolve(difficulties);
        } catch (e) {
            reject(new Error(e));
        }
    });
}

/** Synchronously load multiple beatmap difficulties given beatmap info.
 * ```ts
 * const difficultyList = load.difficultyFromInfoSync();
 * difficultyList.forEach((d) => { console.log(d) })
 * ```
 * ---
 * Info difficulty reference is also given to allow further control.
 */
export function difficultyFromInfoSync(info: IInfoData, options: ILoadOptionsDifficulty = {}): IDifficultyList {
    const opt: Required<ILoadOptionsDifficulty> = {
        directory: fixDirectory(options.directory ?? (globals.directory || defaultOptions.difficulty.directory)),
        forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    logger.info(tag('difficultyFromInfoSync'), 'Sync loading difficulty from map Info...');
    const difficulties: IDifficultyList = [];
    for (const set of info._difficultyBeatmapSets) {
        for (const d of set._difficultyBeatmaps) {
            logger.info(tag('difficultyFromInfoSync'), `Loading difficulty from ${opt.directory + d._beatmapFilename}`);
            const diffJSON = JSON.parse(Deno.readTextFileSync(opt.directory + d._beatmapFilename)) as Either<
                IDifficultyV2,
                IDifficultyV3
            >;
            if (diffJSON._version) {
                difficulties.push({
                    characteristic: set._beatmapCharacteristicName,
                    difficulty: d._difficulty,
                    settings: d,
                    version: 2,
                    data: parseDifficultyV2(diffJSON).setFileName(d._beatmapFilename),
                });
            } else {
                difficulties.push({
                    characteristic: set._beatmapCharacteristicName,
                    difficulty: d._difficulty,
                    settings: d,
                    version: 3,
                    data: parseDifficultyV3(diffJSON).setFileName(d._beatmapFilename),
                });
            }
        }
    }
    return difficulties;
}
