import { DataCheckOption } from '../beatmap/shared/dataCheck.ts';
import { IOptimizeOptionsDifficulty, IOptimizeOptionsInfo } from './optimize.ts';
import { IBaseOptions } from './options.ts';

export interface ISaveValidate {
   enabled: boolean;
   reparse?: boolean;
}

export interface ISaveOptionsInfo extends IBaseOptions {
   /** Set info destination file path/name. */
   filePath?: string;
   format?: number;
   optimize?: IOptimizeOptionsInfo;
   validate?: ISaveValidate;
   dataCheck?: DataCheckOption;
}

export interface ISaveOptionsDifficulty extends IBaseOptions {
   /**
    * Set difficulty destination file path.
    *
    * **NOTE:** Overrides class file name.
    */
   filePath?: string;
   format?: number;
   optimize?: IOptimizeOptionsDifficulty;
   validate?: ISaveValidate;
   dataCheck?: DataCheckOption;
}

export interface ISaveOptionsDifficultyList extends IBaseOptions {
   format?: number;
   optimize?: IOptimizeOptionsDifficulty;
   validate?: ISaveValidate;
   dataCheck?: DataCheckOption;
}
