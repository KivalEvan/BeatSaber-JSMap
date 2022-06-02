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
    logger.info(tag('difficulty'), `Async loading difficulty from ${opt.path + filePath}`);
    return await new Promise((resolve, reject) => {
        try {
            const diffJSON = JSON.parse(Deno.readTextFileSync(opt.path + filePath)) as Either<
                IDifficultyDataV2,
                IDifficultyDataV3
            >;
            if (diffJSON._version) {
                if (version === parseInt(diffJSON._version.at(0)!)) {
                    resolve(parseDifficultyV2(diffJSON));
                } else {
                    logger.warn(
                        tag('difficulty'),
                        `Version unmatched, expected ${version}, got ${
                            parseInt(
                                diffJSON._version.at(0)!,
                            )
                        }; Converting to beatmap version ${version}`,
                    );
                    // shut up
                    // deno-lint-ignore no-explicit-any
                    resolve(V3toV2(parseDifficultyV3(diffJSON as any)));
                }
            } else {
                if (version === parseInt(diffJSON.version?.at(0)!)) {
                    resolve(parseDifficultyV3(diffJSON));
                } else {
                    logger.warn(
                        tag('difficulty'),
                        `Version unmatched, expected ${version}, got ${
                            parseInt(
                                diffJSON.version?.at(0)!,
                            )
                        }; Converting to beatmap version ${version}`,
                    );
                    // shut up
                    // deno-lint-ignore no-explicit-any
                    resolve(V2toV3(parseDifficultyV2(diffJSON as any)));
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
        `Sync loading difficulty from ${opt.path + filePath} as beatmap version ${version}`,
    );
    const diffJSON = JSON.parse(Deno.readTextFileSync(opt.path + filePath)) as Either<
        IDifficultyDataV2,
        IDifficultyDataV3
    >;
    if (diffJSON._version) {
        if (version === parseInt(diffJSON._version.at(0)!)) {
            return parseDifficultyV2(diffJSON);
        } else {
            // shut up
            // deno-lint-ignore no-explicit-any
            return V3toV2(parseDifficultyV3(diffJSON as any));
        }
    } else {
        if (version === parseInt(diffJSON.version?.at(0)!)) {
            return parseDifficultyV3(diffJSON);
        } else {
            // shut up
            // deno-lint-ignore no-explicit-any
            return V2toV3(parseDifficultyV2(diffJSON as any));
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
export const difficultyFromInfo = async (info: IInfoData, path = globals.path): Promise<DifficultyList> => {
    logger.info(tag('difficultyFromInfo'), 'Async loading difficulty from map Info...');
    return await new Promise((resolve, reject) => {
        const difficulties: DifficultyList = [];
        try {
            for (const set of info._difficultyBeatmapSets) {
                for (const d of set._difficultyBeatmaps) {
                    logger.info(tag('difficultyFromInfo'), `Loading difficulty from ${path + d._beatmapFilename}`);
                    const diffJSON = JSON.parse(Deno.readTextFileSync(path + d._beatmapFilename)) as Either<
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
export const difficultyFromInfoSync = (info: IInfoData, path = globals.path): DifficultyList => {
    logger.info(tag('difficultyFromInfoSync'), 'Sync loading difficulty from map Info...');
    const difficulties: DifficultyList = [];
    for (const set of info._difficultyBeatmapSets) {
        for (const d of set._difficultyBeatmaps) {
            logger.info(tag('difficultyFromInfoSync'), `Loading difficulty from ${path + d._beatmapFilename}`);
            const diffJSON = JSON.parse(Deno.readTextFileSync(path + d._beatmapFilename)) as Either<
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
