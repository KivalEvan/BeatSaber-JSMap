import { IDataCheckOption } from '../beatmap/shared/dataCheck.ts';
import { IOptimizeOptionsDifficulty, IOptimizeOptionsInfo } from './optimize.ts';
import { IBaseOptions } from './options.ts';

export interface ISaveValidate {
   enabled: boolean;
   reparse?: boolean;
}

export interface ISaveOptionsInfo extends IBaseOptions {
   /**
    * Set info destination file path/name.
    *
    * **NOTE:** Overrides class file name.
    *
    * @default 'Info.dat'
    */
   filePath?: string;
   /**
    * Prettify format JSON.
    *
    * @default 0
    */
   format?: number;
   /** Optimization option when saving. */
   optimize?: IOptimizeOptionsInfo;
   /** Validation option when saving. */
   validate?: ISaveValidate;
   /** Data check option when saving. */
   dataCheck?: IDataCheckOption;
}

export interface ISaveOptionsDifficulty extends IBaseOptions {
   /**
    * Set difficulty destination file path.
    *
    * **NOTE:** Overrides class file name.
    *
    * @default ''
    */
   filePath?: string;
   /**
    * Prettify format JSON.
    *
    * @default 0
    */
   format?: number;
   /** Optimization option when saving. */
   optimize?: IOptimizeOptionsDifficulty;
   /** Validation option when saving. */
   validate?: ISaveValidate;
   /** Data check option when saving. */
   dataCheck?: IDataCheckOption;
}

export interface ISaveOptionsDifficultyList extends IBaseOptions {
   /**
    * Prettify format JSON.
    *
    * @default 0
    */
   format?: number;
   /** Optimization option when saving. */
   optimize?: IOptimizeOptionsDifficulty;
   /** Validation option when saving. */
   validate?: ISaveValidate;
   /** Data check option when saving. */
   dataCheck?: IDataCheckOption;
}
