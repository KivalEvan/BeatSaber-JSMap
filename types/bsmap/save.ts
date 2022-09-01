import { IOptimizeOptionsDifficulty, IOptimizeOptionsInfo } from './optimize.ts';
import { IBaseOptions } from './options.ts';

export interface ISaveOptionsInfo extends IBaseOptions {
    /** Set info destination file path/name. */
    filePath: string;
    format?: number;
    optimise?: IOptimizeOptionsInfo;
}

export interface ISaveOptionsDifficulty extends IBaseOptions {
    /** Set difficulty destination file path.
     *
     * **NOTE:** Overrides class file name.
     */
    filePath: string;
    format?: number;
    optimise?: IOptimizeOptionsDifficulty;
    dataCheck?: {
        enable: boolean;
        throwError?: boolean;
    };
}

export interface ISaveOptionsDifficultyList extends IBaseOptions {
    format?: number;
    optimise?: IOptimizeOptionsDifficulty;
    dataCheck?: {
        enable: boolean;
        throwError?: boolean;
    };
}
