// deno-lint-ignore-file no-explicit-any
import type { GenericFilename } from '../types/beatmap/shared/filename.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import type { ILoadOptionsDifficulty } from '../types/bsmap/load.ts';
import { resolve } from '../deps.ts';
import { toV1Beatmap } from '../converter/toV1/beatmap.ts';
import { toV2Beatmap } from '../converter/toV2/beatmap.ts';
import { toV3Beatmap } from '../converter/toV3/beatmap.ts';
import { toV4Beatmap } from '../converter/toV4/beatmap.ts';
import type { IWrapBeatmap } from '../types/beatmap/wrapper/beatmap.ts';
import { defaultOptions } from './options.ts';
import { readJSONFile, readJSONFileSync } from '../utils/_fs.ts';
import { retrieveVersion } from '../beatmap/shared/version.ts';

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
   1: toV1Beatmap,
   2: toV2Beatmap,
   3: toV3Beatmap,
   4: toV4Beatmap,
} as const;

export function _difficulty(
   json: Record<string, unknown>,
   filePath: string,
   targetVer: number | null | undefined,
   options: ILoadOptionsDifficulty,
): IWrapBeatmap {
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

   const jsonVerStr = retrieveVersion(json)?.at(0);
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

   let data: IWrapBeatmap;
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
      data = convertMap[targetVer](data, targetVer);
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
): Promise<IWrapBeatmap>;
export function difficulty(
   filePath: Record<string, unknown>,
   version?: null,
   options?: ILoadOptionsDifficulty,
): Promise<IWrapBeatmap>;
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
      return new Promise<IWrapBeatmap>((resolve) =>
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
): IWrapBeatmap;
export function difficultySync(
   json: Record<string, unknown>,
   version?: null,
   options?: ILoadOptionsDifficulty,
): IWrapBeatmap;
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
