import { IBaseOptions } from './options.ts';

export interface ILoadOptionsInfo extends IBaseOptions {
   /** Set info source file path/name. */
   filePath?: string;
}

export interface ILoadOptionsDifficulty extends IBaseOptions {
   forceConvert?: boolean;
   dataCheck?: {
      enabled: boolean;
      throwError?: boolean;
   };
}
