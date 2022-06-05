import { DifficultyList } from './types/bsmap/list.ts';
import { IInfoData } from './types/beatmap/shared/info.ts';
import { IDifficultyData as IDifficultyDataV2 } from './types/beatmap/v2/difficulty.ts';
import { IDifficultyData as IDifficultyDataV3 } from './types/beatmap/v3/difficulty.ts';
import { DifficultyData as DifficultyDataV2 } from './beatmap/v2/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from './beatmap/v3/difficulty.ts';
import { info as parseInfo } from './beatmap/shared/parse.ts';
import { difficulty as parseDifficultyV2 } from './beatmap/v2/parse.ts';
import { difficulty as parseDifficultyV3 } from './beatmap/v3/parse.ts';
import globals from './globals.ts';
import logger from './logger.ts';
import { Either } from './types/utils.ts';
import { ILoadOptionsInfo } from './types/bsmap/load.ts';
import { V3toV2 } from './converter/V3toV2.ts';
import { V2toV3 } from './converter/V2toV3.ts';
import { IBaseOptions } from './types/bsmap/options.ts';

const tag = (name: string) => {
    return `[load::${name}]`;
};

export const defaultOptionsInfo: Required<ILoadOptionsInfo> = {
    path: '',
    filePath: 'Info.dat',
};

export const defaultOptionsDifficulty: Required<IBaseOptions> = {
    path: '',
};

export const defaultOptionsDifficultyList: Required<IBaseOptions> = {
    path: '',
};

/** Asynchronously load beatmap info file.
 * ```ts
 * const info = await load.info();
 * console.log(info);
 * ```
 */
export const info = async (options: ILoadOptionsInfo = {}): Promise<IInfoData> => {
    const opt: Required<ILoadOptionsInfo> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
        filePath: options.filePath ?? 'Info.dat',
    };
    logger.info(tag('info'), `Async loading info from ${opt.path + opt.filePath}`);
    return await new Promise((resolve, reject) => {
        try {
            resolve(parseInfo(JSON.parse(Deno.readTextFileSync(opt.path + opt.filePath))));
        } catch (e) {
            reject(new Error(e));
        }
    });
};

/** Synchronously load beatmap info file.
 * ```ts
 * const info = load.infoSync();
 * console.log(info);
 * ```
 */
export const infoSync = (options: ILoadOptionsInfo = {}) => {
    const opt: Required<ILoadOptionsInfo> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
        filePath: options.filePath ?? 'Info.dat',
    };
    logger.info(tag('infoSync'), `Sync loading info from ${opt.path + opt.filePath}`);
    return parseInfo(JSON.parse(Deno.readTextFileSync(opt.path + opt.filePath)));
};

/** Asynchronously load v3 beatmap difficulty file.
 * ```ts
 * const difficulty = await load.difficulty('ExpertPlusStandard.dat');
 * console.log(difficulty);
 * ```
 */
export async function difficulty(filePath: string, version?: 3, options?: IBaseOptions): Promise<DifficultyDataV3>;
export async function difficulty(filePath: string, version?: 2, options?: IBaseOptions): Promise<DifficultyDataV2>;
export async function difficulty(filePath: string, version = 3, options: IBaseOptions = {}) {
    const opt: Required<IBaseOptions> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
    };
    logger.info(
        tag('difficulty'),
        `Async loading difficulty as beatmap version ${version} from ${opt.path + filePath}`,
    );
    return await new Promise((resolve, reject) => {
        try {
            const diffJSON = JSON.parse(Deno.readTextFileSync(opt.path + filePath)) as Either<
                IDifficultyDataV2,
                IDifficultyDataV3
            >;
            const diffVersion = parseInt(diffJSON._version?.at(0)! ?? parseInt(diffJSON.version?.at(0)! ?? '2'));
            if (diffVersion !== version) {
                logger.warn(
                    tag('difficulty'),
                    'Beatmap version unmatched, expected',
                    version,
                    'but received',
                    diffVersion,
                    '; Converting to beatmap version',
                    version,
                );
                if (diffVersion === 3 && version == 2) {
                    resolve(V3toV2(parseDifficultyV3(diffJSON as IDifficultyDataV3), true));
                } else {
                    resolve(V2toV3(parseDifficultyV2(diffJSON as IDifficultyDataV2), true));
                }
            } else {
                if (version === 3) {
                    resolve(parseDifficultyV3(diffJSON as IDifficultyDataV3));
                }
                if (version === 2) {
                    resolve(parseDifficultyV2(diffJSON as IDifficultyDataV2));
                }
            }
        } catch (e) {
            reject(new Error(e));
        }
    });
}

/** Synchronously load v3 beatmap difficulty file.
 * ```ts
 * const difficulty = load.difficultySync('ExpertPlusStandard.dat');
 * console.log(difficulty);
 * ```
 */
export function difficultySync(filePath: string, version?: 3, options?: IBaseOptions): DifficultyDataV3;
export function difficultySync(filePath: string, version?: 2, options?: IBaseOptions): DifficultyDataV2;
export function difficultySync(filePath: string, version = 3, options: IBaseOptions = {}) {
    const opt: Required<IBaseOptions> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
    };
    logger.info(
        tag('difficultySync'),
        `Sync loading difficulty as beatmap version ${version} from ${opt.path + filePath}`,
    );
    const diffJSON = JSON.parse(Deno.readTextFileSync(opt.path + filePath)) as Either<
        IDifficultyDataV2,
        IDifficultyDataV3
    >;
    const diffVersion = parseInt(diffJSON._version?.at(0)! ?? parseInt(diffJSON.version?.at(0)! ?? '2'));
    if (diffVersion !== version) {
        logger.warn(
            tag('difficulty'),
            'Beatmap version unmatched, expected',
            version,
            'but received',
            diffVersion,
            '; Converting to beatmap version',
            version,
        );
        if (diffVersion === 3 && version == 2) {
            return V3toV2(parseDifficultyV3(diffJSON as IDifficultyDataV3), true);
        } else {
            return V2toV3(parseDifficultyV2(diffJSON as IDifficultyDataV2), true);
        }
    } else {
        if (version === 3) {
            return parseDifficultyV3(diffJSON as IDifficultyDataV3);
        }
        if (version === 2) {
            return parseDifficultyV2(diffJSON as IDifficultyDataV2);
        }
    }
}

/** Asynchronously load multiple v3 beatmap difficulties given beatmap info.
 * ```ts
 * const difficultyList = await load.difficultyFromInfo();
 * difficultyList.forEach((d) => { console.log(d) })
 * ```
 * ---
 * Info difficulty reference is also given to allow further control.
 */
export const difficultyFromInfo = async (info: IInfoData, options: IBaseOptions = {}): Promise<DifficultyList> => {
    const opt: Required<IBaseOptions> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
    };
    logger.info(tag('difficultyFromInfo'), 'Async loading difficulty from map Info...');
    return await new Promise((resolve, reject) => {
        const difficulties: DifficultyList = [];
        try {
            for (const set of info._difficultyBeatmapSets) {
                for (const d of set._difficultyBeatmaps) {
                    logger.info(tag('difficultyFromInfo'), `Loading difficulty from ${opt.path + d._beatmapFilename}`);
                    const diffJSON = JSON.parse(Deno.readTextFileSync(opt.path + d._beatmapFilename)) as Either<
                        IDifficultyDataV2,
                        IDifficultyDataV3
                    >;
                    if (diffJSON._version) {
                        difficulties.push({
                            characteristic: set._beatmapCharacteristicName,
                            difficulty: d._difficulty,
                            fileName: d._beatmapFilename,
                            settings: d,
                            version: 2,
                            data: parseDifficultyV2(diffJSON),
                        });
                    } else {
                        difficulties.push({
                            characteristic: set._beatmapCharacteristicName,
                            difficulty: d._difficulty,
                            fileName: d._beatmapFilename,
                            settings: d,
                            version: 3,
                            data: parseDifficultyV3(diffJSON),
                        });
                    }
                }
            }
            resolve(difficulties);
        } catch (e) {
            reject(new Error(e));
        }
    });
};

/** Asynchronously load multiple v3 beatmap difficulties given beatmap info.
 * ```ts
 * const difficultyList = load.difficultyFromInfoSync();
 * difficultyList.forEach((d) => { console.log(d) })
 * ```
 * ---
 * Info difficulty reference is also given to allow further control.
 */
export const difficultyFromInfoSync = (info: IInfoData, options: IBaseOptions = {}): DifficultyList => {
    const opt: Required<IBaseOptions> = {
        path: options.path ?? (globals.path || defaultOptionsInfo.path),
    };
    logger.info(tag('difficultyFromInfoSync'), 'Sync loading difficulty from map Info...');
    const difficulties: DifficultyList = [];
    for (const set of info._difficultyBeatmapSets) {
        for (const d of set._difficultyBeatmaps) {
            logger.info(tag('difficultyFromInfoSync'), `Loading difficulty from ${opt.path + d._beatmapFilename}`);
            const diffJSON = JSON.parse(Deno.readTextFileSync(opt.path + d._beatmapFilename)) as Either<
                IDifficultyDataV2,
                IDifficultyDataV3
            >;
            if (diffJSON._version) {
                difficulties.push({
                    characteristic: set._beatmapCharacteristicName,
                    difficulty: d._difficulty,
                    fileName: d._beatmapFilename,
                    settings: d,
                    version: 2,
                    data: parseDifficultyV2(diffJSON),
                });
            } else {
                difficulties.push({
                    characteristic: set._beatmapCharacteristicName,
                    difficulty: d._difficulty,
                    fileName: d._beatmapFilename,
                    settings: d,
                    version: 3,
                    data: parseDifficultyV3(diffJSON),
                });
            }
        }
    }
    return difficulties;
};
