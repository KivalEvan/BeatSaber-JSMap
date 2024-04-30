// deno-lint-ignore-file no-explicit-any
import type { GenericFilename } from '../types/beatmap/shared/filename.ts';
import type { Difficulty as V1Difficulty } from '../beatmap/schema/v1/schema/difficulty.ts';
import type { Difficulty as V2Difficulty } from '../beatmap/v2/difficulty.ts';
import type { Difficulty as V3Difficulty } from '../beatmap/v3/difficulty.ts';
import type { Difficulty as V4Difficulty } from '../beatmap/v4/difficulty.ts';
import { parseDifficulty as parseV1Difficulty } from '../beatmap/schema/v1/parse.ts';
import { parseDifficulty as parseV2Difficulty } from '../beatmap/schema/v2/parse.ts';
import { parseDifficulty as parseV3Difficulty } from '../beatmap/schema/v3/parse.ts';
import { parseDifficulty as parseV4Difficulty } from '../beatmap/schema/parse.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import type { ILoadOptionsDifficulty } from '../types/bsmap/load.ts';
import { resolve } from '../deps.ts';
import { toV1Difficulty } from '../converter/toV1/difficulty.ts';
import { toV2Difficulty } from '../converter/toV2/difficulty.ts';
import { toV3Difficulty } from '../converter/toV3/difficulty.ts';
import { toV4Difficulty } from '../converter/toV4/difficulty.ts';
import type { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';
import { defaultOptions } from './options.ts';
import { Info, InfoDifficulty } from '../beatmap/schema/v1/schema/info.ts';
import { readJSONFile, readJSONFileSync } from '../utils/_fs.ts';

function tag(name: string): string[] {
   return ['load', name];
}

const parseMap: Record<number, any> = {
   1: parseV1Difficulty,
   2: parseV2Difficulty,
   3: parseV3Difficulty,
   4: parseV4Difficulty,
} as const;
const convertMap: Record<number, any> = {
   1: toV1Difficulty,
   2: toV2Difficulty,
   3: toV3Difficulty,
   4: toV4Difficulty,
} as const;

const dummyInfo = new Info();
const dummyInfoDiff = new InfoDifficulty();

export function _difficulty(
   json: Record<string, unknown>,
   filePath: string,
   targetVer: number | null | undefined,
   options: ILoadOptionsDifficulty,
): IWrapDifficulty {
   const opt: Required<ILoadOptionsDifficulty> = {
      directory: '',
      forceConvert: options.forceConvert ?? defaultOptions.difficulty.forceConvert,
      dataCheck: {
         ...defaultOptions.difficulty.dataCheck,
         ...options.dataCheck,
      },
      sort: options.sort ?? defaultOptions.difficulty.sort,
      preprocess: options.preprocess ?? defaultOptions.difficulty.preprocess,
      postprocess: options.postprocess ?? defaultOptions.difficulty.postprocess,
   };
   opt.preprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_difficulty'),
         'Running preprocess function #' + (i + 1),
      );
      json = fn(json);
   });

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
   const parser = parseMap[jsonVer];
   if (parser) data = parser(json, opt.dataCheck).setFilename(filePath);
   else {
      throw new Error(
         `Beatmap version ${jsonVer} is not supported, this may be an error in JSON or is newer than currently supported.`,
      );
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
      dummyInfoDiff.filename = filePath;
      data = convertMap[targetVer](data, dummyInfo, dummyInfoDiff);
   }

   if (opt.sort) data.sort();

   opt.postprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_difficulty'),
         'Running postprocess function #' + (i + 1),
      );
      data = fn(data);
   });
   return data;
}

/**
 * Asynchronously load beatmap difficulty file.
 * ```ts
 * load.difficulty('EasyStandard.dat', 4).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function difficulty(
   filePath: LooseAutocomplete<GenericFilename>,
   version?: null,
   options?: ILoadOptionsDifficulty,
): Promise<IWrapDifficulty>;
export function difficulty(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 4,
   options?: ILoadOptionsDifficulty,
): Promise<V4Difficulty>;
export function difficulty(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 3,
   options?: ILoadOptionsDifficulty,
): Promise<V3Difficulty>;
export function difficulty(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 2,
   options?: ILoadOptionsDifficulty,
): Promise<V2Difficulty>;
export function difficulty(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 1,
   options?: ILoadOptionsDifficulty,
): Promise<V1Difficulty>;
export function difficulty(
   filePath: Record<string, unknown>,
   version?: null,
   options?: ILoadOptionsDifficulty,
): Promise<IWrapDifficulty>;
export function difficulty(
   filePath: Record<string, unknown>,
   version: 4,
   options?: ILoadOptionsDifficulty,
): Promise<V4Difficulty>;
export function difficulty(
   filePath: Record<string, unknown>,
   version: 3,
   options?: ILoadOptionsDifficulty,
): Promise<V3Difficulty>;
export function difficulty(
   filePath: Record<string, unknown>,
   version: 2,
   options?: ILoadOptionsDifficulty,
): Promise<V2Difficulty>;
export function difficulty(
   filePath: Record<string, unknown>,
   version: 1,
   options?: ILoadOptionsDifficulty,
): Promise<V1Difficulty>;
export function difficulty(
   src: LooseAutocomplete<GenericFilename> | Record<string, unknown>,
   version?: number | null,
   options: ILoadOptionsDifficulty = {},
) {
   logger.tInfo(tag('difficulty'), 'Async loading difficulty');
   if (typeof src === 'string') {
      const path = resolve(
         options.directory ??
            (defaultOptions.difficulty.directory || globals.directory),
         src,
      );
      return readJSONFile(path).then((data) => _difficulty(data, src, version!, options));
   } else {
      return new Promise<IWrapDifficulty>((resolve) =>
         resolve(_difficulty(src, 'LoadJSON.dat', version!, options))
      );
   }
}

/**
 * Synchronously load beatmap difficulty file.
 * ```ts
 * const difficulty = load.difficultySync('EasyStandard.dat', 4);
 * console.log(difficulty);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function difficultySync(
   filePath: LooseAutocomplete<GenericFilename>,
   version?: null,
   options?: ILoadOptionsDifficulty,
): IWrapDifficulty;
export function difficultySync(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 4,
   options?: ILoadOptionsDifficulty,
): V4Difficulty;
export function difficultySync(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 3,
   options?: ILoadOptionsDifficulty,
): V3Difficulty;
export function difficultySync(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 2,
   options?: ILoadOptionsDifficulty,
): V2Difficulty;
export function difficultySync(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 1,
   options?: ILoadOptionsDifficulty,
): V1Difficulty;
export function difficultySync(
   json: Record<string, unknown>,
   version?: null,
   options?: ILoadOptionsDifficulty,
): IWrapDifficulty;
export function difficultySync(
   json: Record<string, unknown>,
   version: 4,
   options?: ILoadOptionsDifficulty,
): V4Difficulty;
export function difficultySync(
   json: Record<string, unknown>,
   version: 3,
   options?: ILoadOptionsDifficulty,
): V3Difficulty;
export function difficultySync(
   json: Record<string, unknown>,
   version: 2,
   options?: ILoadOptionsDifficulty,
): V2Difficulty;
export function difficultySync(
   json: Record<string, unknown>,
   version: 1,
   options?: ILoadOptionsDifficulty,
): V1Difficulty;
export function difficultySync(
   src: LooseAutocomplete<GenericFilename> | Record<string, unknown>,
   version?: number | null,
   options: ILoadOptionsDifficulty = {},
) {
   logger.tInfo(tag('difficultySync'), 'Sync loading difficulty');
   if (typeof src === 'string') {
      const path = resolve(
         options.directory ??
            (defaultOptions.difficulty.directory || globals.directory),
         src,
      );
      return _difficulty(readJSONFileSync(path), src, version!, options);
   } else {
      return _difficulty(src, 'LoadJSON.dat', version!, options);
   }
}
