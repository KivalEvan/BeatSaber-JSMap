import { GenericFileName } from '../types/beatmap/shared/filename.ts';
import { Difficulty as V1Difficulty } from '../beatmap/v1/difficulty.ts';
import { Difficulty as V2Difficulty } from '../beatmap/v2/difficulty.ts';
import { Difficulty as V3Difficulty } from '../beatmap/v3/difficulty.ts';
import { Difficulty as V4Difficulty } from '../beatmap/v4/difficulty.ts';
import { parseDifficulty as parseV1Difficulty } from '../beatmap/v1/parse.ts';
import { parseDifficulty as parseV2Difficulty } from '../beatmap/v2/parse.ts';
import { parseDifficulty as parseV3Difficulty } from '../beatmap/v3/parse.ts';
import { parseDifficulty as parseV4Difficulty } from '../beatmap/v4/parse.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { LooseAutocomplete } from '../types/utils.ts';
import { ILoadOptionsDifficulty } from '../types/bsmap/load.ts';
import { resolve } from '../deps.ts';
import { toV1Difficulty } from '../converter/toV1/mod.ts';
import { toV2Difficulty } from '../converter/toV2/mod.ts';
import { toV3Difficulty } from '../converter/toV3/mod.ts';
import { toV4Difficulty } from '../converter/toV4/mod.ts';
import { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';
import { defaultOptions } from './options.ts';
import { Info, InfoDifficulty } from '../beatmap/v1/info.ts';
import { readJSONFile, readJSONFileSync } from '../utils/_fs.ts';

function tag(name: string): string[] {
   return ['load', name];
}

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
      case 4: {
         data = parseV4Difficulty(json, opt.dataCheck).setFileName(filePath);
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
         data = toV1Difficulty(
            data,
            new Info(),
            new InfoDifficulty({ jsonPath: filePath }),
         );
      }
      if (targetVer === 2) data = toV2Difficulty(data);
      if (targetVer === 3) data = toV3Difficulty(data);
      if (targetVer === 4) data = toV4Difficulty(data);
   }

   if (opt.sort) data.sort();

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
   filePath: LooseAutocomplete<GenericFileName>,
   version?: null,
   options?: ILoadOptionsDifficulty,
): Promise<IWrapDifficulty>;
export function difficulty(
   filePath: LooseAutocomplete<GenericFileName>,
   version: 4,
   options?: ILoadOptionsDifficulty,
): Promise<V4Difficulty>;
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
   src: LooseAutocomplete<GenericFileName> | Record<string, unknown>,
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
      return new Promise(() => _difficulty(src, 'LoadJSON.dat', version!, options));
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
   filePath: LooseAutocomplete<GenericFileName>,
   version?: null,
   options?: ILoadOptionsDifficulty,
): IWrapDifficulty;
export function difficultySync(
   filePath: LooseAutocomplete<GenericFileName>,
   version: 4,
   options?: ILoadOptionsDifficulty,
): V4Difficulty;
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
   src: LooseAutocomplete<GenericFileName> | Record<string, unknown>,
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
