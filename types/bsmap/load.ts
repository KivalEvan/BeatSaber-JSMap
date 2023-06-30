import { DataCheckOption } from '../beatmap/shared/dataCheck.ts';
import { IBaseOptions } from './options.ts';

export interface ILoadOptionsDifficulty extends IBaseOptions {
   forceConvert?: boolean;
   dataCheck?: DataCheckOption;
}

export interface ILoadOptionsInfo extends ILoadOptionsDifficulty {
   /** Set info source file path/name. */
   filePath?: string;
}
