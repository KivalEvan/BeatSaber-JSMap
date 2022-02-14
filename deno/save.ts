import { InfoData } from './beatmap/types/info.ts';
import { DifficultyData } from './beatmap/types/difficulty.ts';
import { SaveOptionsInfo, SaveOptionsDifficulty } from './types.ts';
import { performInfo, performDifficulty } from './optimize.ts';
import settings from './settings.ts';

export const defaultOptionsInfo: Required<SaveOptionsInfo> = {
    optimise: { enabled: true },
};

export const defaultOptionsDifficulty: Required<SaveOptionsDifficulty> = {
    optimise: { enabled: true },
};

export const info = async (
    path: string,
    info: InfoData,
    options: SaveOptionsInfo = defaultOptionsInfo
) => {
    if (options.optimise?.enabled) {
        performInfo(info, options.optimise);
    }
    await Deno.writeTextFile(settings.mapDirectory + path, JSON.stringify(info));
};

export const infoSync = (
    path: string,
    info: InfoData,
    options: SaveOptionsInfo = defaultOptionsInfo
) => {
    if (options.optimise?.enabled) {
        performInfo(info, options.optimise);
    }
    Deno.writeTextFileSync(settings.mapDirectory + path, JSON.stringify(info));
};

export const difficulty = async (
    path: string,
    difficulty: DifficultyData,
    options: SaveOptionsDifficulty = defaultOptionsDifficulty
) => {
    if (options.optimise?.enabled) {
        performDifficulty(difficulty, options.optimise);
    }
    await Deno.writeTextFile(settings.mapDirectory + path, JSON.stringify(difficulty));
};

export const difficultySync = (
    path: string,
    difficulty: DifficultyData,
    options: SaveOptionsDifficulty = defaultOptionsDifficulty
) => {
    if (options.optimise?.enabled) {
        performDifficulty(difficulty, options.optimise);
    }
    Deno.writeTextFileSync(settings.mapDirectory + path, JSON.stringify(difficulty));
};
