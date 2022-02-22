import { CharacteristicName } from './beatmap/types/characteristic.ts';
import { DifficultyData, DifficultyName } from './beatmap/types/difficulty.ts';

export type DifficultyList = {
    characteristic: CharacteristicName;
    difficulty: DifficultyName;
    fileName: string;
    data: DifficultyData;
}[];

export interface OptimizeOptions {
    enabled: boolean;
    floatTrim?: number;
    stringTrim?: boolean;
    throwError?: boolean;
}

export interface OptimizeOptionsInfo extends OptimizeOptions {
    removeDuplicate?: boolean;
}

export interface OptimizeOptionsDifficulty extends OptimizeOptions {
    optimiseLight?: boolean;
    sort?: boolean;
}

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
