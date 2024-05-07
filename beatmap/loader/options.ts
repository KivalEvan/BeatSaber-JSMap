import type { ILoadOptions } from '../../types/beatmap/options/loader.ts';

export const defaultOptions: Required<ILoadOptions> = {
   directory: '',
   forceConvert: true,
   dataCheck: {},
   sort: true,
   preprocess: [],
   postprocess: [],
};
