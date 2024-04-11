import type {
   IOptimizeOptionsAudioData,
   IOptimizeOptionsDifficulty,
   IOptimizeOptionsInfo,
   IOptimizeOptionsLightshow,
} from '../types/bsmap/optimize.ts';

const optionsInfo: Required<IOptimizeOptionsInfo> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   purgeZeros: true,
   deduplicate: true,
   throwError: true,
};
const optionsDifficulty: Required<IOptimizeOptionsDifficulty> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   purgeZeros: true,
   deduplicate: true,
   throwError: true,
};
const optionsLightshow: Required<IOptimizeOptionsLightshow> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   purgeZeros: true,
   deduplicate: true,
   throwError: true,
};
const optionsAudioData: Required<IOptimizeOptionsAudioData> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   purgeZeros: true,
   deduplicate: true,
   throwError: true,
};

/** Set default option value for optimize function. */
export const defaultOptions = {
   info: optionsInfo,
   audioData: optionsAudioData,
   difficulty: optionsDifficulty,
   lightshow: optionsLightshow,
};
