import { IOptimizeOptionsDifficulty, IOptimizeOptionsInfo } from './optimize.ts';
import { IBaseOptions } from './options.ts';

export interface ISaveOptionsInfo extends IBaseOptions {
    /** Set info destination file path/name. */
    filePath?: string;
    format?: number;
    optimize?: IOptimizeOptionsInfo;
}

export interface ISaveOptionsDifficulty extends IBaseOptions {
    /** Set difficulty destination file path.
     *
     * **NOTE:** Overrides class file name.
     */
    filePath?: string;
    format?: number;
    optimize?: IOptimizeOptionsDifficulty;
    dataCheck?: {
        enable: boolean;
        throwError?: boolean;
    };
}

export interface ISaveOptionsDifficultyList extends IBaseOptions {
    format?: number;
    optimize?: IOptimizeOptionsDifficulty;
    dataCheck?: {
        enable: boolean;
        throwError?: boolean;
    };
}
