import { IBaseOptions } from './options.ts';

export interface ILoadOptionsDifficulty extends IBaseOptions {
   forceConvert?: boolean;
   dataCheck?: {
      enabled: boolean;
      throwError?: boolean;
   };
}

export interface ILoadOptionsInfo extends ILoadOptionsDifficulty {
   /** Set info source file path/name. */
   filePath?: string;
}
