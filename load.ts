import { IDifficultyList } from './types/bsmap/list.ts';
import { GenericFileName, IInfo } from './types/beatmap/shared/info.ts';
import { Difficulty as DifficultyV1 } from './beatmap/v1/difficulty.ts';
import { Difficulty as DifficultyV2 } from './beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from './beatmap/v3/difficulty.ts';
import { info as parseInfo } from './beatmap/shared/parse.ts';
import { difficulty as parseDifficultyV1 } from './beatmap/v1/parse.ts';
import { difficulty as parseDifficultyV2 } from './beatmap/v2/parse.ts';
import { difficulty as parseDifficultyV3 } from './beatmap/v3/parse.ts';
import globals from './globals.ts';
import logger from './logger.ts';
import { LooseAutocomplete } from './types/utils.ts';
import { ILoadOptionsDifficulty, ILoadOptionsInfo } from './types/bsmap/load.ts';
import { WrapDifficulty } from './beatmap/wrapper/difficulty.ts';
import { resolve } from './deps.ts';
import { toV1 } from './converter/toV1.ts';
import { toV2 } from './converter/toV2.ts';
import { toV3 } from './converter/toV3.ts';

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
        enabled: true,
        throwError: true,
    },
};

const optionsDifficultyList: Required<ILoadOptionsDifficulty> = {
    directory: '',
    forceConvert: false,
    dataCheck: {
        enabled: true,
        throwError: true,
    },
};

/** Set default option value for load function. */
export const defaultOptions = {
    info: optionsInfo,
    difficulty: optionsDifficulty,
    difficultyList: optionsDifficultyList,
};

function _info(options: ILoadOptionsInfo) {
    const opt: Required<ILoadOptionsInfo> = {
        directory: options.directory ?? (globals.directory || defaultOptions.info.directory),
        filePath: options.filePath ?? 'Info.dat',
    };
    return parseInfo(JSON.parse(Deno.readTextFileSync(resolve(opt.directory, opt.filePath))));
}

/** Asynchronously load beatmap info file.
 * ```ts
 * load.info().then((data) => console.log(data));
 * ```
 */
export async function info(options: ILoadOptionsInfo = {}): Promise<IInfo> {
    const opt: Required<ILoadOptionsInfo> = {
        directory: options.directory ?? (globals.directory || defaultOptions.info.directory),
        filePath: options.filePath ?? 'Info.dat',
    };
    logger.info(tag('info'), `Async loading info from ${resolve(opt.directory, opt.filePath)}`);
    return await new Promise((resolve, reject) => {
        try {
            resolve(_info(opt));
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
        directory: options.directory ?? (globals.directory || defaultOptions.info.directory),
        filePath: options.filePath ?? 'Info.dat',
    };
    logger.info(tag('infoSync'), `Sync loading info from ${resolve(opt.directory, opt.filePath)}`);
    return _info(opt);
}

function _difficulty(
    filePath: string,
    version: number,
    options: ILoadOptionsDifficulty,
): WrapDifficulty<Record<string, unknown>> {
    const opt: Required<ILoadOptionsDifficulty> = {
        directory: options.directory ?? (globals.directory || defaultOptions.difficulty.directory),
        forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    const diffJSON = JSON.parse(Deno.readTextFileSync(resolve(opt.directory, filePath))) as Record<
        string,
        unknown
    >;

    const p = resolve(opt.directory, filePath);
    logger.info(tag('_difficulty'), `Loading difficulty as beatmap version ${version} from ${p}`);

    const diffVersion = parseInt(
        typeof diffJSON._version === 'string'
            ? diffJSON._version.at(0)!
            : typeof diffJSON.version === 'string'
            ? diffJSON.version?.at(0)!
            : '2',
    );

    if (diffVersion !== version) {
        if (!opt.forceConvert) {
            throw new Error(
                `Beatmap version unmatched, expected ${version} but received ${diffVersion}`,
            );
        }
        logger.warn(
            tag('_difficulty'),
            'Beatmap version unmatched, expected',
            version,
            'but received',
            diffVersion,
            'for version; Converting to beatmap version',
            version,
        );
        if (diffVersion === 1) {
            const diff = parseDifficultyV1(diffJSON, opt.dataCheck).setFileName(filePath);
            if (version === 2) return toV2(diff);
            if (version === 3) return toV3(diff);
        }
        if (diffVersion === 3) {
            const diff = parseDifficultyV3(diffJSON, opt.dataCheck).setFileName(filePath);
            if (version === 2) return toV2(diff);
            if (version === 1) {
                return toV1(
                    diff,
                    {
                        _version: '2.0.0',
                        _songName: 'placeholder',
                        _songSubName: '',
                        _songAuthorName: 'author',
                        _levelAuthorName: '',
                        _beatsPerMinute: 0,
                        _shuffle: 0,
                        _shufflePeriod: 0.5,
                        _previewStartTime: 12,
                        _previewDuration: 10,
                        _songFilename: 'song.ogg',
                        _coverImageFilename: 'cover.jpg',
                        _environmentName: 'DefaultEnvironment',
                        _allDirectionsEnvironmentName: 'GlassDesertEnvironment',
                        _songTimeOffset: 0,
                        _difficultyBeatmapSets: [],
                    },
                    {
                        _difficulty: 'Easy',
                        _difficultyRank: 1,
                        _beatmapFilename: filePath,
                        _noteJumpMovementSpeed: 0,
                        _noteJumpStartBeatOffset: 0,
                    },
                );
            }
        }
        return parseDifficultyV2(diffJSON, opt.dataCheck).setFileName(filePath);
    } else {
        if (version === 1) {
            return parseDifficultyV1(diffJSON, opt.dataCheck).setFileName(filePath);
        }
        if (version === 3) {
            return parseDifficultyV3(diffJSON, opt.dataCheck).setFileName(filePath);
        }
        return parseDifficultyV2(diffJSON, opt.dataCheck).setFileName(filePath);
    }
}

/** Asynchronously load beatmap difficulty file.
 * ```ts
 * load.difficulty('EasyStandard.dat', 3).then((data) => console.log(data));
 * ```
 * ---
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export async function difficulty(
    filePath: LooseAutocomplete<GenericFileName>,
    version?: null,
    options?: ILoadOptionsDifficulty,
): Promise<WrapDifficulty<Record<string, unknown>>>;
export async function difficulty(
    filePath: LooseAutocomplete<GenericFileName>,
    version: 3,
    options?: ILoadOptionsDifficulty,
): Promise<DifficultyV3>;
export async function difficulty(
    filePath: LooseAutocomplete<GenericFileName>,
    version: 2,
    options?: ILoadOptionsDifficulty,
): Promise<DifficultyV2>;
export async function difficulty(
    filePath: LooseAutocomplete<GenericFileName>,
    version: number | null = 3,
    options: ILoadOptionsDifficulty = {},
) {
    version ??= 3;
    return await new Promise((resolve, reject) => {
        try {
            resolve(_difficulty(filePath, version!, options));
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
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function difficultySync(
    filePath: LooseAutocomplete<GenericFileName>,
    version?: null,
    options?: ILoadOptionsDifficulty,
): WrapDifficulty<Record<string, unknown>>;
export function difficultySync(
    filePath: LooseAutocomplete<GenericFileName>,
    version: 3,
    options?: ILoadOptionsDifficulty,
): DifficultyV3;
export function difficultySync(
    filePath: LooseAutocomplete<GenericFileName>,
    version: 2,
    options?: ILoadOptionsDifficulty,
): DifficultyV2;
export function difficultySync(
    filePath: LooseAutocomplete<GenericFileName>,
    version: 1,
    options?: ILoadOptionsDifficulty,
): DifficultyV1;
export function difficultySync(
    filePath: LooseAutocomplete<GenericFileName>,
    version: number | null = 3,
    options: ILoadOptionsDifficulty = {},
) {
    version ??= 3;
    return _difficulty(filePath, version, options);
}

function _difficultyFromInfo(info: IInfo, options: ILoadOptionsDifficulty) {
    const opt: Required<ILoadOptionsDifficulty> = {
        directory: options.directory ?? (globals.directory || defaultOptions.difficulty.directory),
        forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
        dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
    };
    const difficulties: IDifficultyList = [];
    for (const set of info._difficultyBeatmapSets) {
        for (const d of set._difficultyBeatmaps) {
            const p = resolve(opt.directory, d._beatmapFilename);
            try {
                logger.info(tag('_difficultyFromInfo'), `Loading difficulty from ${p}`);
                const diffJSON = JSON.parse(Deno.readTextFileSync(p)) as Record<string, unknown>;

                const diffVersion = parseInt(
                    typeof diffJSON._version === 'string'
                        ? diffJSON._version.at(0)!
                        : typeof diffJSON.version === 'string'
                        ? diffJSON.version?.at(0)!
                        : '2',
                );

                if (diffVersion === 1) {
                    difficulties.push({
                        characteristic: set._beatmapCharacteristicName,
                        difficulty: d._difficulty,
                        settings: d,
                        version: 1,
                        data: parseDifficultyV1(diffJSON, opt.dataCheck).setFileName(
                            d._beatmapFilename,
                        ),
                    });
                }
                if (diffVersion === 2) {
                    difficulties.push({
                        characteristic: set._beatmapCharacteristicName,
                        difficulty: d._difficulty,
                        settings: d,
                        version: 2,
                        data: parseDifficultyV2(diffJSON, opt.dataCheck).setFileName(
                            d._beatmapFilename,
                        ),
                    });
                }
                if (diffVersion === 3) {
                    difficulties.push({
                        characteristic: set._beatmapCharacteristicName,
                        difficulty: d._difficulty,
                        settings: d,
                        version: 3,
                        data: parseDifficultyV3(diffJSON, opt.dataCheck).setFileName(
                            d._beatmapFilename,
                        ),
                    });
                }
            } catch {
                logger.warn(
                    tag('_difficultyFromInfo'),
                    `Could not load difficulty from ${p}, skipping...`,
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
export async function difficultyFromInfo(
    info: IInfo,
    options: ILoadOptionsDifficulty = {},
): Promise<IDifficultyList> {
    logger.info(tag('difficultyFromInfo'), 'Async loading difficulty from map info...');
    return await new Promise((resolve, reject) => {
        try {
            resolve(_difficultyFromInfo(info, options));
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
export function difficultyFromInfoSync(
    info: IInfo,
    options: ILoadOptionsDifficulty = {},
): IDifficultyList {
    logger.info(tag('difficultyFromInfoSync'), 'Sync loading difficulty from map info...');
    return _difficultyFromInfo(info, options);
}
