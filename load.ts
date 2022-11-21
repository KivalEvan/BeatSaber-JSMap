import { IDifficultyList } from './types/bsmap/list.ts';
import { GenericFileName, IInfo } from './types/beatmap/shared/info.ts';
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
import { sanitizeDir } from './utils/fs.ts';

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

function internalInfo(options: ILoadOptionsInfo) {
    const opt: Required<ILoadOptionsInfo> = {
        directory: sanitizeDir(options.directory ?? (globals.directory || defaultOptions.info.directory)),
        filePath: options.filePath ?? 'Info.dat',
    };
    return parseInfo(JSON.parse(Deno.readTextFileSync(opt.directory + opt.filePath)));
}

/** Asynchronously load beatmap info file.
 * ```ts
 * load.info().then((data) => console.log(data));
 * ```
 */
export async function info(options: ILoadOptionsInfo = {}): Promise<IInfo> {
    const opt: Required<ILoadOptionsInfo> = {
        directory: sanitizeDir(options.directory ?? (globals.directory || defaultOptions.info.directory)),
        filePath: options.filePath ?? 'Info.dat',
    };
    logger.info(tag('info'), `Async loading info from ${opt.directory + opt.filePath}`);
    return await new Promise((resolve, reject) => {
        try {
            resolve(internalInfo(opt));
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
export function infoSync(options: ILoadOptionsInfo = {}): IInfo {
    const opt: Required<ILoadOptionsInfo> = {
        directory: sanitizeDir(options.directory ?? (globals.directory || defaultOptions.info.directory)),
        filePath: options.filePath ?? 'Info.dat',
    };
    logger.info(tag('infoSync'), `Sync loading info from ${opt.directory + opt.filePath}`);
    return internalInfo(opt);
}

function internalDifficulty(filePath: string, version: number, options: ILoadOptionsDifficulty) {
    const opt: Required<ILoadOptionsDifficulty> = {
        directory: sanitizeDir(options.directory ?? (globals.directory || defaultOptions.difficulty.directory)),
        forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    const diffJSON = JSON.parse(Deno.readTextFileSync(opt.directory + filePath)) as Either<
        IDifficultyV2,
        IDifficultyV3
    >;
    logger.info(
        tag('internalDifficulty'),
        `Loading difficulty as beatmap version ${version} from ${opt.directory + filePath}`
    );
    const diffVersion = parseInt(diffJSON._version?.at(0)! ?? parseInt(diffJSON.version?.at(0)! ?? '2'));
    if (diffVersion !== version) {
        if (!opt.forceConvert) {
            throw new Error(`Beatmap version unmatched, expected ${version} but received ${diffVersion}`);
        }
        logger.warn(
            tag('internalDifficulty'),
            'Beatmap version unmatched, expected',
            version,
            'but received',
            diffVersion,
            'for version; Converting to beatmap version',
            version
        );
        if (diffVersion === 3 && version == 2) {
            return V3toV2(parseDifficultyV3(diffJSON as IDifficultyV3, opt.dataCheck).setFileName(filePath), true);
        } else {
            return V2toV3(parseDifficultyV2(diffJSON as IDifficultyV2, opt.dataCheck).setFileName(filePath), true);
        }
    } else {
        if (version === 3) {
            return parseDifficultyV3(diffJSON as IDifficultyV3, opt.dataCheck).setFileName(filePath);
        }
        if (version === 2) {
            return parseDifficultyV2(diffJSON as IDifficultyV2, opt.dataCheck).setFileName(filePath);
        }
    }
}

/** Asynchronously load beatmap difficulty file.
 * ```ts
 * load.difficulty('EasyStandard.dat', 3).then((data) => console.log(data));
 * ```
 * ---
 * Unmatched beatmap version will be automatically converted; default to version 3.
 */
export async function difficulty(
    filePath: LooseAutocomplete<GenericFileName>,
    version?: null,
    options?: ILoadOptionsDifficulty
): Promise<DifficultyV3>;
export async function difficulty(
    filePath: LooseAutocomplete<GenericFileName>,
    version: 3,
    options?: ILoadOptionsDifficulty
): Promise<DifficultyV3>;
export async function difficulty(
    filePath: LooseAutocomplete<GenericFileName>,
    version: 2,
    options?: ILoadOptionsDifficulty
): Promise<DifficultyV2>;
export async function difficulty(
    filePath: LooseAutocomplete<GenericFileName>,
    version: number | null = 3,
    options: ILoadOptionsDifficulty = {}
) {
    version ??= 3;
    return await new Promise((resolve, reject) => {
        try {
            resolve(internalDifficulty(filePath, version!, options));
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
    version?: null,
    options?: ILoadOptionsDifficulty
): DifficultyV3;
export function difficultySync(
    filePath: LooseAutocomplete<GenericFileName>,
    version: 3,
    options?: ILoadOptionsDifficulty
): DifficultyV3;
export function difficultySync(
    filePath: LooseAutocomplete<GenericFileName>,
    version: 2,
    options?: ILoadOptionsDifficulty
): DifficultyV2;
export function difficultySync(
    filePath: LooseAutocomplete<GenericFileName>,
    version: number | null = 3,
    options: ILoadOptionsDifficulty = {}
) {
    version ??= 3;
    return internalDifficulty(filePath, version, options);
}

function internalDifficultyFromInfo(info: IInfo, options: ILoadOptionsDifficulty) {
    const opt: Required<ILoadOptionsDifficulty> = {
        directory: sanitizeDir(options.directory ?? (globals.directory || defaultOptions.difficulty.directory)),
        forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    const difficulties: IDifficultyList = [];
    for (const set of info._difficultyBeatmapSets) {
        for (const d of set._difficultyBeatmaps) {
            try {
                logger.info(
                    tag('internalDifficultyFromInfo'),
                    `Loading difficulty from ${opt.directory + d._beatmapFilename}`
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
                        data: parseDifficultyV2(diffJSON, opt.dataCheck).setFileName(d._beatmapFilename),
                    });
                } else {
                    difficulties.push({
                        characteristic: set._beatmapCharacteristicName,
                        difficulty: d._difficulty,
                        settings: d,
                        version: 3,
                        data: parseDifficultyV3(diffJSON, opt.dataCheck).setFileName(d._beatmapFilename),
                    });
                }
            } catch {
                logger.warn(
                    tag('internalDifficultyFromInfo'),
                    `Could not load difficulty from ${opt.directory + d._beatmapFilename}, skipping...`
                );
            }
        }
    }
    return difficulties;
}

/** Asynchronously load multiple beatmap difficulties given beatmap info.
 *
 * Automatically omits difficulty that could not be loaded or does not exist.
 * ```ts
 * load.difficultyFromInfo().then((data) => data.forEach((d) => console.log(d)));
 * ```
 * ---
 * Info difficulty reference is also given to allow further control.
 */
export async function difficultyFromInfo(info: IInfo, options: ILoadOptionsDifficulty = {}): Promise<IDifficultyList> {
    logger.info(tag('difficultyFromInfo'), 'Async loading difficulty from map info...');
    return await new Promise((resolve, reject) => {
        try {
            resolve(internalDifficultyFromInfo(info, options));
        } catch (e) {
            reject(new Error(e));
        }
    });
}

/** Synchronously load multiple beatmap difficulties given beatmap info.
 *
 * Automatically omits difficulty that could not be loaded or does not exist.
 * ```ts
 * const difficultyList = load.difficultyFromInfoSync();
 * difficultyList.forEach((d) => console.log(d));
 * ```
 * ---
 * Info difficulty reference is also given to allow further control.
 */
export function difficultyFromInfoSync(info: IInfo, options: ILoadOptionsDifficulty = {}): IDifficultyList {
    logger.info(tag('difficultyFromInfoSync'), 'Sync loading difficulty from map info...');
    return internalDifficultyFromInfo(info, options);
}
