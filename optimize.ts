import { IOptimizeOptionsDifficulty, IOptimizeOptionsInfo } from './types/bsmap/optimize.ts';
import logger from './logger.ts';
import {
   cleanDifficulty as cleanV1Difficulty,
   cleanInfo as cleanV1Info,
} from './beatmap/v1/clean.ts';
import {
   cleanDifficulty as cleanV2Difficulty,
   cleanInfo as cleanV2Info,
} from './beatmap/v2/clean.ts';
import { cleanDifficulty as cleanV3Difficulty } from './beatmap/v3/clean.ts';
import { ICleanOptions } from './types/beatmap/shared/clean.ts';

function tag(name: string): string[] {
   return ['optimize', name];
}

const optionsInfo: Required<IOptimizeOptionsInfo> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   throwError: true,
};
const optionsDifficulty: Required<IOptimizeOptionsDifficulty> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   throwError: true,
};

/** Set default option value for optimize function. */
export const defaultOptions = {
   info: optionsInfo,
   difficulty: optionsDifficulty,
};

export function info(
   // deno-lint-ignore no-explicit-any
   info: Record<string, any>,
   version: number,
   options: IOptimizeOptionsInfo = {},
) {
   const opt: Required<IOptimizeOptionsInfo> = {
      enabled: options.enabled ?? defaultOptions.info.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.info.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.info.stringTrim,
      throwError: options.throwError ?? defaultOptions.info.throwError,
   };

   logger.tInfo(tag('info'), `Optimising info data`);

   // deno-lint-ignore no-explicit-any
   const clean: (data: any, opt: ICleanOptions) => void = version === 2
      ? cleanV2Info
      : version === 1
      ? cleanV1Info
      : () => {};
   clean(info, opt);
}

export function difficulty(
   // deno-lint-ignore no-explicit-any
   difficulty: Record<string, any>,
   version: number,
   options: IOptimizeOptionsDifficulty = {},
) {
   const opt: Required<IOptimizeOptionsDifficulty> = {
      enabled: options.enabled ?? defaultOptions.difficulty.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.difficulty.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.difficulty.stringTrim,
      throwError: options.throwError ?? defaultOptions.difficulty.throwError,
   };

   logger.tInfo(tag('difficulty'), `Optimising difficulty data`);

   // deno-lint-ignore no-explicit-any
   const clean: (data: any, opt: ICleanOptions) => void = version === 3
      ? cleanV3Difficulty
      : version === 2
      ? cleanV2Difficulty
      : version === 1
      ? cleanV1Difficulty
      : () => {};
   clean(difficulty, opt);
}
