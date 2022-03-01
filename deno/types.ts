import { CharacteristicName } from './beatmap/shared/types/characteristic.ts';
import { DifficultyName } from './beatmap/shared/types/difficulty.ts';
import { DifficultyData as DifficultyDataV2 } from './beatmap/v2/types/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from './beatmap/v3/types/difficulty.ts';

export type DifficultyList = {
    characteristic: CharacteristicName;
    difficulty: DifficultyName;
    fileName: string;
    data: DifficultyDataV3;
}[];

export type DifficultyLegacyList = {
    characteristic: CharacteristicName;
    difficulty: DifficultyName;
    fileName: string;
    data: DifficultyDataV2;
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
