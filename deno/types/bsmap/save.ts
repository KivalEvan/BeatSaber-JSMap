import { OptimizeOptionsDifficulty, OptimizeOptionsInfo } from './optimize.ts';

export interface SaveOptions {
    path?: string;
}

export interface SaveOptionsInfo extends SaveOptions {
    filePath: string;
    optimise?: OptimizeOptionsInfo;
}

export interface SaveOptionsDifficulty extends SaveOptions {
    filePath: string;
    optimise?: OptimizeOptionsDifficulty;
}

export interface SaveOptionsDifficultyList extends SaveOptions {
    optimise?: OptimizeOptionsDifficulty;
}
