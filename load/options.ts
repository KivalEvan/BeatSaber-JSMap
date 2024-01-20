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

const optionsLightshow: Required<ILoadOptionsLightshow> = {
   directory: '',
   forceConvert: true,
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
};

const optionsList: Required<ILoadOptionsDifficulty> = {
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
   lightshow: optionsLightshow,
   list: optionsList,
};
