import type { ISaveOptionsAudioData } from '../types/bsmap/save.ts';
import type {
   ISaveOptionsDifficulty,
   ISaveOptionsInfo,
   ISaveOptionsLightshow,
   ISaveOptionsList,
} from '../types/bsmap/save.ts';

const optionsInfo: Required<ISaveOptionsInfo> = {
   directory: '',
   filePath: 'Info.dat',
   format: 0,
   optimize: {
      enabled: true,
      floatTrim: 4,
      stringTrim: true,
      purgeZeros: true,
      deduplicate: true,
      throwNullish: true,
   },
   validate: {
      enabled: true,
      vanilla: false,
      dataCheck: {
         throwOn: {
            unused: false,
            missing: true,
            ignoreOptional: false,
            nullish: true,
            wrongType: true,
            notInt: false,
            notUnsigned: false,
         },
      },
   },
   sort: true,
   write: true,
   preprocess: [],
   postprocess: [],
};

const optionsDifficulty: Required<ISaveOptionsDifficulty> = {
   directory: '',
   filePath: 'UnnamedPath.dat',
   format: 0,
   optimize: {
      enabled: true,
      floatTrim: 4,
      stringTrim: true,
      purgeZeros: true,
      deduplicate: true,
      throwNullish: true,
   },
   validate: {
      enabled: true,
      vanilla: false,
      dataCheck: {
         throwOn: {
            unused: false,
            missing: true,
            ignoreOptional: false,
            nullish: true,
            wrongType: true,
            notInt: false,
            notUnsigned: false,
         },
      },
   },
   sort: true,
   write: true,
   preprocess: [],
   postprocess: [],
};

const optionsLightshow: Required<ISaveOptionsLightshow> = {
   directory: '',
   filePath: 'UnnamedPath.dat',
   format: 0,
   optimize: {
      enabled: true,
      floatTrim: 4,
      stringTrim: true,
      purgeZeros: true,
      deduplicate: true,
      throwNullish: true,
   },
   validate: {
      enabled: true,
      vanilla: false,
      dataCheck: {
         throwOn: {
            unused: false,
            missing: true,
            ignoreOptional: false,
            nullish: true,
            wrongType: true,
            notInt: false,
            notUnsigned: false,
         },
      },
   },
   sort: true,
   write: true,
   preprocess: [],
   postprocess: [],
};

const optionsAudioData: Required<ISaveOptionsAudioData> = {
   directory: '',
   filePath: 'UnnamedPath.dat',
   format: 0,
   optimize: {
      enabled: true,
      floatTrim: 4,
      stringTrim: true,
      purgeZeros: true,
      deduplicate: true,
      throwNullish: true,
   },
   validate: {
      enabled: true,
      vanilla: false,
      dataCheck: {
         throwOn: {
            unused: false,
            missing: true,
            ignoreOptional: false,
            nullish: true,
            wrongType: true,
            notInt: false,
            notUnsigned: false,
         },
      },
   },
   sort: true,
   write: true,
   preprocess: [],
   postprocess: [],
};

const optionsList: Required<ISaveOptionsList> = {
   directory: '',
   filePath: 'UnnamedPath.dat',
   format: 0,
   optimize: {
      enabled: true,
      floatTrim: 4,
      stringTrim: true,
      purgeZeros: true,
      deduplicate: true,
      throwNullish: true,
   },
   validate: {
      enabled: true,
      vanilla: false,
      dataCheck: {
         throwOn: {
            unused: false,
            missing: true,
            ignoreOptional: false,
            nullish: true,
            wrongType: true,
            notInt: false,
            notUnsigned: false,
         },
      },
   },
   sort: true,
   write: true,
   preprocess: [],
   postprocess: [],
};

/** Set default option value for save function. */
export const defaultOptions = {
   info: optionsInfo,
   audioData: optionsAudioData,
   difficulty: optionsDifficulty,
   lightshow: optionsLightshow,
   list: optionsList,
};
