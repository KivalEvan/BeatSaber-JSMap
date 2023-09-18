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
}

export interface ILoadOptionsInfo extends ILoadOptionsDifficulty {
   /**
    * Set difficulty destination file path.
    *
    * **NOTE:** Overrides class file name.
    *
    * @default 'Info.dat'
    */
   filePath?: string;
}
