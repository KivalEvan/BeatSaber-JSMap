import {
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
      deduplicate: false,
      throwError: true,
   },
   validate: { enabled: true, reparse: true },
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
   write: true,
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
      deduplicate: false,
      throwError: true,
   },
   validate: { enabled: true, reparse: true },
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
   write: true,
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
      deduplicate: false,
      throwError: true,
   },
   validate: { enabled: true, reparse: true },
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
   write: true,
};

const optionsList: Required<ISaveOptionsList> = {
   directory: '',
   format: 0,
   optimize: { enabled: true },
   validate: { enabled: true, reparse: true },
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
   write: true,
};

/** Set default option value for save function. */
export const defaultOptions = {
   info: optionsInfo,
   difficulty: optionsDifficulty,
   lightshow: optionsLightshow,
   list: optionsList,
};
