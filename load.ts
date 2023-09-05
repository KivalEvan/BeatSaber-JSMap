import { ILoadInfoData } from './types/bsmap/infoDiff.ts';
import { GenericFileName } from './types/beatmap/shared/filename.ts';
import { Info as IV1nfo, InfoDifficulty } from './beatmap/v1/info.ts';
import { Info as IV2nfo } from './beatmap/v2/info.ts';
import { Difficulty as V1Difficulty } from './beatmap/v1/difficulty.ts';
import { Difficulty as V2Difficulty } from './beatmap/v2/difficulty.ts';
import { Difficulty as V3Difficulty } from './beatmap/v3/difficulty.ts';
import { difficulty as parseV1Difficulty, info as parseIV1nfo } from './beatmap/v1/parse.ts';
import { difficulty as parseV2Difficulty, info as parseIV2nfo } from './beatmap/v2/parse.ts';
import { difficulty as parseV3Difficulty } from './beatmap/v3/parse.ts';
import globals from './globals.ts';
import logger from './logger.ts';
import { LooseAutocomplete } from './types/utils.ts';
import { ILoadOptionsDifficulty, ILoadOptionsInfo } from './types/bsmap/load.ts';
import { resolve } from './deps.ts';
import { toIV1nfo, toV1Difficulty } from './converter/toV1.ts';
import { toIV2nfo, toV2Difficulty } from './converter/toV2.ts';
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

function _info(version: number | null | undefined, options: ILoadOptionsInfo) {
   const opt: Required<ILoadOptionsInfo> = {
      filePath: options.filePath ?? defaultOptions.info.filePath,
      directory: options.directory ?? (globals.directory || defaultOptions.info.directory),
      forceConvert: options.forceConvert ?? defaultOptions.info.forceConvert,
      dataCheck: options.dataCheck ?? defaultOptions.info.dataCheck,
   };
   const p = resolve(opt.directory, opt.filePath);
   logger.tInfo(tag('_info'), `Loading info as beatmap version ${version} from ${p}`);
   const infoJSON = JSON.parse(Deno.readTextFileSync(p)) as Record<string, unknown>;

   const jsonVersion = parseInt(
      typeof infoJSON._version === 'string'
         ? infoJSON._version.at(0)!
         : typeof infoJSON.version === 'string'
         ? infoJSON.version?.at(0)!
         : '2',
   );

   if (version && jsonVersion !== version) {
      if (!opt.forceConvert) {
         throw new Error(
            `Beatmap version unmatched, expected ${version} but received ${jsonVersion}`,
         );
      }
      logger.tWarn(
         tag('_info'),
         'Beatmap version unmatched, expected',
         version,
         'but received',
         jsonVersion,
         'for version; Converting to beatmap version',
         version,
      );
      if (jsonVersion === 1) {
         const n = parseIV1nfo(infoJSON, opt.dataCheck).setFileName(opt.filePath);
         if (version === 2) return toIV2nfo(n);
      }
      if (jsonVersion === 2) {
         const n = parseIV2nfo(infoJSON, opt.dataCheck).setFileName(opt.filePath);
         if (version === 1) {
            return toIV1nfo(n);
         }
      }
      return parseIV2nfo(infoJSON, opt.dataCheck).setFileName(opt.filePath);
   } else {
      if (version === 1) {
         return parseIV1nfo(infoJSON, opt.dataCheck).setFileName(opt.filePath);
      }
      return parseIV2nfo(infoJSON, opt.dataCheck).setFileName(opt.filePath);
   }
}

/**
 * Asynchronously load beatmap info file.
 * ```ts
 * load.info().then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function info(version?: null, options?: ILoadOptionsInfo): Promise<IWrapInfo>;
export function info(version: 2, options?: ILoadOptionsInfo): Promise<IV2nfo>;
export function info(version: 1, options?: ILoadOptionsInfo): Promise<IV1nfo>;
export function info(version?: number | null, options: ILoadOptionsInfo = {}) {
   return new Promise((resolve, reject) => {
      try {
         resolve(_info(version!, options));
      } catch (e) {
         reject(e);
      }
   });
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
export function infoSync(version: 2, options?: ILoadOptionsInfo): IV2nfo;
export function infoSync(version: 1, options?: ILoadOptionsInfo): IV1nfo;
export function infoSync(version?: number | null, options: ILoadOptionsInfo = {}) {
   return _info(version, options);
}

function _difficulty(
   filePath: string,
   version: number | null | undefined,
   options: ILoadOptionsDifficulty,
): IWrapDifficulty {
   const opt: Required<ILoadOptionsDifficulty> = {
      directory: options.directory ?? (globals.directory || defaultOptions.difficulty.directory),
      forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
      dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
   };
   const p = resolve(opt.directory, filePath);
   logger.tInfo(tag('_difficulty'), `Loading difficulty as beatmap version ${version} from ${p}`);
   const diffJSON = JSON.parse(Deno.readTextFileSync(p)) as Record<string, unknown>;

   const jsonVersion = parseInt(
      typeof diffJSON._version === 'string'
         ? diffJSON._version.at(0)!
         : typeof diffJSON.version === 'string'
         ? diffJSON.version.at(0)!
         : '2',
   );

   if (version && jsonVersion !== version) {
      if (!opt.forceConvert) {
         throw new Error(
            `Beatmap version unmatched, expected ${version} but received ${jsonVersion}`,
         );
      }
      logger.tWarn(
         tag('_difficulty'),
         'Beatmap version unmatched, expected',
         version,
         'but received',
         jsonVersion,
         'for version; Converting to beatmap version',
         version,
      );
      if (jsonVersion === 1) {
         const d = parseV1Difficulty(diffJSON, opt.dataCheck).setFileName(filePath);
         if (version === 2) return toV2Difficulty(d);
         if (version === 3) return toV3Difficulty(d);
      }
      if (jsonVersion === 2) {
         const d = parseV2Difficulty(diffJSON, opt.dataCheck).setFileName(filePath);
         if (version === 1) {
            return toV1Difficulty(d, new IV1nfo(), new InfoDifficulty({ jsonPath: filePath }));
         }
         if (version === 3) return toV3Difficulty(d);
      }
      if (jsonVersion === 3) {
         const d = parseV3Difficulty(diffJSON, opt.dataCheck).setFileName(filePath);
         if (version === 2) return toV2Difficulty(d);
         if (version === 1) {
            return toV1Difficulty(d, new IV1nfo(), new InfoDifficulty({ jsonPath: filePath }));
         }
      }
      return parseV2Difficulty(diffJSON, opt.dataCheck).setFileName(filePath);
   } else {
      if (jsonVersion === 1) {
         return parseV1Difficulty(diffJSON, opt.dataCheck).setFileName(filePath);
      }
      if (jsonVersion === 3) {
         return parseV3Difficulty(diffJSON, opt.dataCheck).setFileName(filePath);
      }
      return parseV2Difficulty(diffJSON, opt.dataCheck).setFileName(filePath);
   }
}

/**
 * Asynchronously load beatmap difficulty file.
 * ```ts
 * load.difficulty('EasyStandard.dat', 3).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function difficulty(
   filePath: LooseAutocomplete<GenericFileName>,
   version?: null,
   options?: ILoadOptionsDifficulty,
): Promise<IWrapDifficulty>;
export function difficulty(
   filePath: LooseAutocomplete<GenericFileName>,
   version: 3,
   options?: ILoadOptionsDifficulty,
): Promise<V3Difficulty>;
export function difficulty(
   filePath: LooseAutocomplete<GenericFileName>,
   version: 2,
   options?: ILoadOptionsDifficulty,
): Promise<V2Difficulty>;
export function difficulty(
   filePath: LooseAutocomplete<GenericFileName>,
   version: 1,
   options?: ILoadOptionsDifficulty,
): Promise<V1Difficulty>;
export function difficulty(
   filePath: LooseAutocomplete<GenericFileName>,
   version?: number | null,
   options: ILoadOptionsDifficulty = {},
) {
   return new Promise((resolve, reject) => {
      try {
         resolve(_difficulty(filePath, version!, options));
      } catch (e) {
         reject(e);
      }
   });
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
   return _difficulty(filePath, version, options);
}

function _difficultyFromInfo(info: IWrapInfo, options: ILoadOptionsDifficulty) {
   const opt: Required<ILoadOptionsDifficulty> = {
      directory: options.directory ?? (globals.directory || defaultOptions.difficulty.directory),
      forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
      dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
   };
   const lists: ILoadInfoData[] = [];
   for (const [mode, beatmap] of info.listMap()) {
      const p = resolve(opt.directory, beatmap.filename);
      try {
         logger.tInfo(tag('_difficultyFromInfo'), `Loading difficulty from ${p}`);
         const diffJSON = JSON.parse(Deno.readTextFileSync(p));

         const jsonVersion = parseInt(
            typeof diffJSON._version === 'string'
               ? diffJSON._version.at(0)!
               : typeof diffJSON.version === 'string'
               ? diffJSON.version.at(0)!
               : '2',
         );

         if (jsonVersion === 1) {
            lists.push({
               characteristic: mode,
               difficulty: beatmap.difficulty,
               settings: beatmap,
               version: 1,
               data: parseV1Difficulty(diffJSON, opt.dataCheck).setFileName(beatmap.filename),
            });
         }
         if (jsonVersion === 2) {
            lists.push({
               characteristic: mode,
               difficulty: beatmap.difficulty,
               settings: beatmap,
               version: 2,
               data: parseV2Difficulty(diffJSON, opt.dataCheck).setFileName(beatmap.filename),
            });
         }
         if (jsonVersion === 3) {
            lists.push({
               characteristic: mode,
               difficulty: beatmap.difficulty,
               settings: beatmap,
               version: 3,
               data: parseV3Difficulty(diffJSON, opt.dataCheck).setFileName(beatmap.filename),
            });
         }
      } catch {
         logger.tWarn(
            tag('_difficultyFromInfo'),
            `Could not load difficulty from ${p}, skipping...`,
         );
      }
   }
   return lists;
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
export function difficultyFromInfo(
   info: IWrapInfo,
   options: ILoadOptionsDifficulty = {},
): Promise<ILoadInfoData[]> {
   logger.tInfo(tag('difficultyFromInfo'), 'Async loading difficulty from map info...');
   return new Promise((resolve, reject) => {
      try {
         resolve(_difficultyFromInfo(info, options));
      } catch (e) {
         reject(e);
      }
   });
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
   logger.tInfo(tag('difficultyFromInfoSync'), 'Sync loading difficulty from map info...');
   return _difficultyFromInfo(info, options);
}
