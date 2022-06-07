import { IOptimizeOptionsDifficulty, IOptimizeOptionsInfo } from './optimize.ts';
import { IBaseOptions } from './options.ts';

export interface ISaveOptionsInfo extends IBaseOptions {
    filePath: string;
    optimise?: IOptimizeOptionsInfo;
}

export interface ISaveOptionsDifficulty extends IBaseOptions {
    filePath: string;
    optimise?: IOptimizeOptionsDifficulty;
}

export interface ISaveOptionsDifficultyList extends IBaseOptions {
    optimise?: IOptimizeOptionsDifficulty;
}
