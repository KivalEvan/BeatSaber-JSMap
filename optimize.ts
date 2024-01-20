import {
   IOptimizeOptionsDifficulty,
   IOptimizeOptionsInfo,
   IOptimizeOptionsLightshow,
} from './types/bsmap/optimize.ts';
import logger from './logger.ts';
import {
   cleanDifficulty as cleanV1Difficulty,
   cleanInfo as cleanV1Info,
} from './beatmap/v1/clean.ts';
import {
   cleanDifficulty as cleanV2Difficulty,
   cleanInfo as cleanV2Info,
} from './beatmap/v2/clean.ts';
import {
   cleanDifficulty as cleanV3Difficulty,
   cleanLightshow as cleanV3Lightshow,
} from './beatmap/v3/clean.ts';
import {
   cleanDifficulty as cleanV4Difficulty,
   cleanInfo as cleanV4Info,
   cleanLightshow as cleanV4Lightshow,
} from './beatmap/v4/clean.ts';
import { ICleanOptions } from './types/beatmap/shared/clean.ts';

function tag(name: string): string[] {
   return ['optimize', name];
}

const optionsInfo: Required<IOptimizeOptionsInfo> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   purgeZeros: true,
   throwError: true,
};
const optionsDifficulty: Required<IOptimizeOptionsDifficulty> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   purgeZeros: true,
   throwError: true,
};
const optionsLightshow: Required<IOptimizeOptionsLightshow> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   purgeZeros: true,
   throwError: true,
};

/** Set default option value for optimize function. */
export const defaultOptions = {
   info: optionsInfo,
   difficulty: optionsDifficulty,
   lightshow: optionsLightshow,
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
      purgeZeros: options.purgeZeros ?? defaultOptions.info.purgeZeros,
      throwError: options.throwError ?? defaultOptions.info.throwError,
   };

   logger.tInfo(tag('info'), `Optimising info data`);

   // deno-lint-ignore no-explicit-any
   const clean: (data: any, opt: ICleanOptions) => void = version === 4
      ? cleanV4Info
      : version === 2
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
      purgeZeros: options.purgeZeros ?? defaultOptions.difficulty.purgeZeros,
      throwError: options.throwError ?? defaultOptions.difficulty.throwError,
   };

   logger.tInfo(tag('difficulty'), `Optimising difficulty data`);

   // deno-lint-ignore no-explicit-any
   const clean: (data: any, opt: ICleanOptions) => void = version === 4
      ? cleanV4Difficulty
      : version === 3
      ? cleanV3Difficulty
      : version === 2
      ? cleanV2Difficulty
      : version === 1
      ? cleanV1Difficulty
      : () => {};
   clean(difficulty, opt);
}

export function lightshow(
   // deno-lint-ignore no-explicit-any
   lightshow: Record<string, any>,
   version: number,
   options: IOptimizeOptionsLightshow = {},
) {
   const opt: Required<IOptimizeOptionsLightshow> = {
      enabled: options.enabled ?? defaultOptions.lightshow.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.lightshow.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.lightshow.stringTrim,
      purgeZeros: options.purgeZeros ?? defaultOptions.lightshow.purgeZeros,
      throwError: options.throwError ?? defaultOptions.lightshow.throwError,
   };

   logger.tInfo(tag('lightshow'), `Optimising lightshow data`);

   // deno-lint-ignore no-explicit-any
   const clean: (data: any, opt: ICleanOptions) => void = version === 4
      ? cleanV4Lightshow
      : version === 3
      ? cleanV3Lightshow
      : () => {};
   clean(lightshow, opt);
}
