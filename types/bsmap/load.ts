import { IDataCheckOption } from '../beatmap/shared/dataCheck.ts';
import { IBaseOptions } from './options.ts';

export interface ILoadOptionsDifficulty extends IBaseOptions {
   /**
    * Force version conversion if loaded difficulty version is mismatched.
    *
    * @default true
    */
   forceConvert?: boolean;
   /** Data check option when loading. */
   dataCheck?: IDataCheckOption;
   /** Sort object(s) on load. */
   sort?: boolean;
}

export interface ILoadOptionsInfo extends ILoadOptionsDifficulty {
   /**
    * Set info source file path.
    *
    * @default 'Info.dat'
    */
   filePath?: string;
}
