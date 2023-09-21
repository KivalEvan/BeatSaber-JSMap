import { IDataCheckOption } from '../beatmap/shared/dataCheck.ts';
import { IOptimizeOptionsDifficulty, IOptimizeOptionsInfo } from './optimize.ts';
import { IBaseOptions } from './options.ts';

export interface ISaveBaseOptions extends IBaseOptions {
   /**
    * Prettify format JSON.
    *
    * @default 0
    */
   format?: number;
   /** Validate class object integrity when saving. */
   validate?: ISaveValidate;
   /** Optimization option when saving. */
   optimize?: IOptimizeOptionsInfo;
   /** Data check option when saving. */
   dataCheck?: IDataCheckOption;
   /**
    * Sort the objects in array with the correct order.
    *
    * @default true
    */
   sort?: boolean;
}

export interface ISaveValidate {
   /**
    * Enable class object validation check.
    *
    * @default true
    */
   enabled: boolean;
   /**
    * Allow class to reparse itself to contain valid class object.
    *
    * @default true
    */
   reparse?: boolean;
}

export interface ISaveOptionsInfo extends ISaveBaseOptions {
   /**
    * Set info destination file path/name.
    *
    * **NOTE:** Overrides class file name.
    *
    * @default 'Info.dat'
    */
   filePath?: string;
}

export interface ISaveOptionsDifficulty extends ISaveBaseOptions {
   /**
    * Set difficulty destination file path.
    *
    * **NOTE:** Overrides class file name.
    *
    * @default ''
    */
   filePath?: string;
}

// deno-lint-ignore no-empty-interface
export interface ISaveOptionsDifficultyList extends ISaveBaseOptions {}
