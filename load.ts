import { ILoadInfoData } from './types/bsmap/infoDiff.ts';
import { GenericFileName } from './types/beatmap/shared/filename.ts';
import { Info as V1Info, InfoDifficulty } from './beatmap/v1/info.ts';
import { Info as V2Info } from './beatmap/v2/info.ts';
import { Difficulty as V1Difficulty } from './beatmap/v1/difficulty.ts';
import { Difficulty as V2Difficulty } from './beatmap/v2/difficulty.ts';
import { Difficulty as V3Difficulty } from './beatmap/v3/difficulty.ts';
import {
   parseDifficulty as parseV1Difficulty,
   parseInfo as parseV1Info,
} from './beatmap/v1/parse.ts';
import {
   parseDifficulty as parseV2Difficulty,
   parseInfo as parseV2Info,
} from './beatmap/v2/parse.ts';
import { parseDifficulty as parseV3Difficulty } from './beatmap/v3/parse.ts';
import globals from './globals.ts';
import logger from './logger.ts';
import { LooseAutocomplete } from './types/utils.ts';
import { ILoadOptionsDifficulty, ILoadOptionsInfo } from './types/bsmap/load.ts';
import { resolve } from './deps.ts';
import { toV1Difficulty, toV1Info } from './converter/toV1.ts';
import { toV2Difficulty, toV2Info } from './converter/toV2.ts';
import { toV3Difficulty } from './converter/toV3.ts';
import { IWrapDifficulty } from './types/beatmap/wrapper/difficulty.ts';
import { IWrapInfo } from './types/beatmap/wrapper/info.ts';

function tag(name: string): string[] {
   return ['load', name];
}

const optionsInfo: Required<ILoadOptionsInfo> = {
   directory: '',
   filePath: 'Info.dat',
   forceConvert: true,
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
};

const optionsDifficulty: Required<ILoadOptionsDifficulty> = {
   directory: '',
   forceConvert: true,
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
};

const optionsDifficultyList: Required<ILoadOptionsDifficulty> = {
   directory: '',
   forceConvert: false,
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
};

/** Set default option value for load function. */
export const defaultOptions = {
   info: optionsInfo,
   difficulty: optionsDifficulty,
   difficultyList: optionsDifficultyList,
};

async function _readJSONFile(path: string) {
   logger.tInfo(tag('_readJSONFile'), `Async reading JSON file from ${path}`);
   return JSON.parse(await Deno.readTextFile(path)) as Record<string, unknown>;
}

function _readJSONFileSync(path: string) {
   logger.tInfo(tag('_readJSONFileSync'), `Sync reading JSON file from ${path}`);
   return JSON.parse(Deno.readTextFileSync(path)) as Record<string, unknown>;
}

function _info(
   json: Record<string, unknown>,
   filePath: string,
   targetVer: number | null | undefined,
   options: ILoadOptionsInfo,
) {
   const opt: Required<ILoadOptionsInfo> = {
      filePath: '',
      directory: '',
      forceConvert: options.forceConvert ?? defaultOptions.info.forceConvert,
      dataCheck: options.dataCheck ?? defaultOptions.info.dataCheck,
      sort: options.sort ?? defaultOptions.info.sort,
   };

   const jsonVerStr = typeof json._version === 'string'
      ? json._version.at(0)
      : typeof json.version === 'string'
      ? json.version.at(0)
      : null;
   let jsonVer: number;
   if (jsonVerStr) {
      jsonVer = parseInt(jsonVerStr);
   } else {
      jsonVer = json.songName ? 1 : 2;
      logger.tWarn(
         tag('_info'),
         'Could not identify info version from JSON, assume implicit version',
         jsonVer,
      );
   }

   let data: IWrapInfo;
   switch (jsonVer) {
      case 1: {
         data = parseV1Info(json, opt.dataCheck).setFileName(filePath);
         break;
      }
      case 2: {
         data = parseV2Info(json, opt.dataCheck).setFileName(filePath);
         break;
      }
      default: {
         throw new Error(
            `Info version ${jsonVer} is not supported, this may be an error in JSON or is newer than currently supported.`,
         );
      }
   }

   if (targetVer && jsonVer !== targetVer) {
      if (!opt.forceConvert) {
         throw new Error(`Info version unmatched, expected ${targetVer} but received ${jsonVer}`);
      }
      logger.tWarn(
         tag('_info'),
         'Info version unmatched, expected',
         targetVer,
         'but received',
         jsonVer,
         'for version; Converting to info version',
         targetVer,
      );
      if (targetVer === 1) data = toV1Info(data);
      if (targetVer === 2) data = toV2Info(data);
   }

   return data;
}

/**
 * Asynchronously load beatmap info file.
 * ```ts
 * load.info().then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export async function info(version?: null, options?: ILoadOptionsInfo): Promise<IWrapInfo>;
export async function info(version: 2, options?: ILoadOptionsInfo): Promise<V2Info>;
export async function info(version: 1, options?: ILoadOptionsInfo): Promise<V1Info>;
export async function info(version?: number | null, options: ILoadOptionsInfo = {}) {
   logger.tInfo(tag('info'), 'Async loading info');
   const filePath = options.filePath ?? defaultOptions.info.filePath;
   const path = resolve(
      options.directory ?? (defaultOptions.info.directory || globals.directory),
      options.filePath ?? defaultOptions.info.filePath,
   );
   return _info(await _readJSONFile(path), filePath, version, options);
}

/**
 * Synchronously load beatmap info file.
 * ```ts
 * const info = load.infoSync();
 * console.log(info);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function infoSync(version?: null, options?: ILoadOptionsInfo): IWrapInfo;
export function infoSync(version: 2, options?: ILoadOptionsInfo): V2Info;
export function infoSync(version: 1, options?: ILoadOptionsInfo): V1Info;
export function infoSync(version?: number | null, options: ILoadOptionsInfo = {}) {
   logger.tInfo(tag('infoSync'), 'Sync loading info');
   const filePath = options.filePath ?? defaultOptions.info.filePath;
   const path = resolve(
      options.directory ?? (defaultOptions.info.directory || globals.directory),
      options.filePath ?? defaultOptions.info.filePath,
   );
   return _info(_readJSONFileSync(path), filePath, version, options);
}

function _difficulty(
   json: Record<string, unknown>,
   filePath: string,
   targetVer: number | null | undefined,
   options: ILoadOptionsDifficulty,
): IWrapDifficulty {
   const opt: Required<ILoadOptionsDifficulty> = {
      directory: '',
      forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
      dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
      sort: options.sort ?? defaultOptions.difficulty.sort,
   };

   const jsonVerStr = typeof json._version === 'string'
      ? json._version.at(0)
      : typeof json.version === 'string'
      ? json.version.at(0)
      : null;
   let jsonVer: number;
   if (jsonVerStr) {
      jsonVer = parseInt(jsonVerStr);
   } else {
      logger.tWarn(
         tag('_difficulty'),
         'Could not identify beatmap version from JSON, assume implicit version',
         2,
      );
      jsonVer = 2;
   }

   let data: IWrapDifficulty;
   switch (jsonVer) {
      case 1: {
         data = parseV1Difficulty(json, opt.dataCheck).setFileName(filePath);
         break;
      }
      case 2: {
         data = parseV2Difficulty(json, opt.dataCheck).setFileName(filePath);
         break;
      }
      case 3: {
         data = parseV3Difficulty(json, opt.dataCheck).setFileName(filePath);
         break;
      }
      default: {
         throw new Error(
            `Beatmap version ${jsonVer} is not supported, this may be an error in JSON or is newer than currently supported.`,
         );
      }
   }

   if (targetVer && jsonVer !== targetVer) {
      if (!opt.forceConvert) {
         throw new Error(
            `Beatmap version unmatched, expected ${targetVer} but received ${jsonVer}`,
         );
      }
      logger.tWarn(
         tag('_difficulty'),
         'Beatmap version unmatched, expected',
         targetVer,
         'but received',
         jsonVer,
         'for version; Converting to beatmap version',
         targetVer,
      );
      if (targetVer === 1) {
         data = toV1Difficulty(data, new V1Info(), new InfoDifficulty({ jsonPath: filePath }));
      }
      if (targetVer === 2) data = toV2Difficulty(data);
      if (targetVer === 3) data = toV3Difficulty(data);
   }

   if (opt.sort) data.sort();

   return data;
}

/**
 * Asynchronously load beatmap difficulty file.
 * ```ts
 * load.difficulty('EasyStandard.dat', 3).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export async function difficulty(
   filePath: LooseAutocomplete<GenericFileName>,
   version?: null,
   options?: ILoadOptionsDifficulty,
): Promise<IWrapDifficulty>;
export async function difficulty(
   filePath: LooseAutocomplete<GenericFileName>,
   version: 3,
   options?: ILoadOptionsDifficulty,
): Promise<V3Difficulty>;
export async function difficulty(
   filePath: LooseAutocomplete<GenericFileName>,
   version: 2,
   options?: ILoadOptionsDifficulty,
): Promise<V2Difficulty>;
export async function difficulty(
   filePath: LooseAutocomplete<GenericFileName>,
   version: 1,
   options?: ILoadOptionsDifficulty,
): Promise<V1Difficulty>;
export async function difficulty(
   filePath: LooseAutocomplete<GenericFileName>,
   version?: number | null,
   options: ILoadOptionsDifficulty = {},
) {
   logger.tInfo(tag('difficulty'), 'Async loading difficulty');
   const path = resolve(
      options.directory ?? (defaultOptions.difficulty.directory || globals.directory),
      filePath,
   );
   return _difficulty(await _readJSONFile(path), filePath, version!, options);
}

/**
 * Synchronously load beatmap difficulty file.
 * ```ts
 * const difficulty = load.difficultySync('EasyStandard.dat', 3);
 * console.log(difficulty);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function difficultySync(
   filePath: LooseAutocomplete<GenericFileName>,
   version?: null,
   options?: ILoadOptionsDifficulty,
): IWrapDifficulty;
export function difficultySync(
   filePath: LooseAutocomplete<GenericFileName>,
   version: 3,
   options?: ILoadOptionsDifficulty,
): V3Difficulty;
export function difficultySync(
   filePath: LooseAutocomplete<GenericFileName>,
   version: 2,
   options?: ILoadOptionsDifficulty,
): V2Difficulty;
export function difficultySync(
   filePath: LooseAutocomplete<GenericFileName>,
   version: 1,
   options?: ILoadOptionsDifficulty,
): V1Difficulty;
export function difficultySync(
   filePath: LooseAutocomplete<GenericFileName>,
   version?: number | null,
   options: ILoadOptionsDifficulty = {},
) {
   logger.tInfo(tag('difficultySync'), 'Sync loading difficulty');
   const path = resolve(
      options.directory ?? (defaultOptions.difficulty.directory || globals.directory),
      filePath,
   );
   return _difficulty(_readJSONFileSync(path), filePath, version!, options);
}

/**
 * Asynchronously load multiple beatmap difficulties given beatmap info.
 *
 * Automatically omits difficulty that could not be loaded or does not exist.
 * ```ts
 * load.difficultyFromInfo().then((data) => data.forEach((d) => console.log(d)));
 * ```
 *
 * Info difficulty reference is also given to allow further control.
 */
export async function difficultyFromInfo(
   info: IWrapInfo,
   options: ILoadOptionsDifficulty = {},
): Promise<ILoadInfoData[]> {
   logger.tInfo(tag('difficultyFromInfo'), 'Async loading difficulty from info');
   const opt: Required<ILoadOptionsDifficulty> = {
      directory: options.directory ??
         (globals.directory || defaultOptions.difficultyList.directory),
      forceConvert: options.forceConvert ?? defaultOptions.difficultyList.forceConvert,
      dataCheck: options.dataCheck ?? defaultOptions.difficultyList.dataCheck,
      sort: options.sort ?? defaultOptions.difficultyList.sort,
   };
   return await Promise.all(
      info.listMap().map(async ([mode, beatmap]) => {
         let p;
         try {
            const json = await _readJSONFile(resolve(opt.directory, beatmap.filename));

            const jsonVerStr = typeof json._version === 'string'
               ? json._version.at(0)
               : typeof json.version === 'string'
               ? json.version.at(0)
               : null;
            let jsonVer: number;
            if (jsonVerStr) {
               jsonVer = parseInt(jsonVerStr);
            } else {
               jsonVer = 2;
            }

            return {
               characteristic: mode,
               difficulty: beatmap.difficulty,
               settings: beatmap,
               version: jsonVer,
               data: _difficulty(json, beatmap.filename, jsonVer, opt),
            };
         } catch {
            logger.tWarn(
               tag('difficultyFromInfo'),
               `Could not load difficulty from ${p}, skipping...`,
            );
         }
      }),
   ).then((d) => d.filter((e) => e) as ILoadInfoData[]);
}

/**
 * Synchronously load multiple beatmap difficulties given beatmap info.
 *
 * Automatically omits difficulty that could not be loaded or does not exist.
 * ```ts
 * const difficultyList = load.difficultyFromInfoSync();
 * difficultyList.forEach((d) => console.log(d));
 * ```
 *
 * Info difficulty reference is also given to allow further control.
 */
export function difficultyFromInfoSync(
   info: IWrapInfo,
   options: ILoadOptionsDifficulty = {},
): ILoadInfoData[] {
   logger.tInfo(tag('difficultyFromInfoSync'), 'Sync loading difficulty from info');
   const opt: Required<ILoadOptionsDifficulty> = {
      directory: options.directory ??
         (globals.directory || defaultOptions.difficultyList.directory),
      forceConvert: options.forceConvert ?? defaultOptions.difficultyList.forceConvert,
      dataCheck: options.dataCheck ?? defaultOptions.difficultyList.dataCheck,
      sort: options.sort ?? defaultOptions.difficultyList.sort,
   };
   return info
      .listMap()
      .map(([mode, beatmap]) => {
         let p;
         try {
            const json = _readJSONFileSync(resolve(opt.directory, beatmap.filename));

            const jsonVerStr = typeof json._version === 'string'
               ? json._version.at(0)
               : typeof json.version === 'string'
               ? json.version.at(0)
               : null;
            let jsonVer: number;
            if (jsonVerStr) {
               jsonVer = parseInt(jsonVerStr);
            } else {
               jsonVer = 2;
            }

            return {
               characteristic: mode,
               difficulty: beatmap.difficulty,
               settings: beatmap,
               version: jsonVer,
               data: _difficulty(json, beatmap.filename, jsonVer, opt),
            };
         } catch {
            logger.tWarn(
               tag('difficultyFromInfoSync'),
               `Could not load difficulty from ${p}, skipping...`,
            );
         }
      })
      .filter((e) => e) as ILoadInfoData[];
}
