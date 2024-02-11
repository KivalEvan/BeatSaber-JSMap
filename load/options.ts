import {
   ILoadOptionsDifficulty,
   ILoadOptionsInfo,
   ILoadOptionsLightshow,
} from '../types/bsmap/load.ts';

const optionsInfo: Required<ILoadOptionsInfo> = {
   directory: '',
   filePath: 'Info.dat',
   forceConvert: true,
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
   preprocess: [],
   postprocess: [],
};

const optionsDifficulty: Required<ILoadOptionsDifficulty> = {
   directory: '',
   forceConvert: true,
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
   preprocess: [],
   postprocess: [],
};

const optionsLightshow: Required<ILoadOptionsLightshow> = {
   directory: '',
   forceConvert: true,
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
   preprocess: [],
   postprocess: [],
};

const optionsList: Required<ILoadOptionsDifficulty> = {
   directory: '',
   forceConvert: false,
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
   preprocess: [],
   postprocess: [],
};

/** Set default option value for load function. */
export const defaultOptions = {
   info: optionsInfo,
   difficulty: optionsDifficulty,
   lightshow: optionsLightshow,
   list: optionsList,
};
