import { InfoData } from './beatmap/types/info.ts';
import { DifficultyData } from './beatmap/types/difficulty.ts';
import { SaveOptionsInfo, SaveOptionsDifficulty } from './types.ts';
import { performInfo, performDifficulty } from './optimize.ts';

export const defaultOptionsInfo: Required<SaveOptionsInfo> = {
    path: '',
    optimise: { enabled: false },
};

export const defaultOptionsDifficulty: Required<SaveOptionsDifficulty> = {
    path: '',
    optimise: { enabled: false },
};

export const info = async (
    path: string,
    info: InfoData,
    options: SaveOptionsInfo = {}
) => {
    if (options.optimise?.enabled) {
        performInfo(info, options.optimise);
    }
    await Deno.writeTextFile(path, JSON.stringify(info));
};

export const infoSync = (
    path: string,
    info: InfoData,
    options: SaveOptionsInfo = {}
) => {
    if (options.optimise?.enabled) {
        performInfo(info, options.optimise);
    }
    Deno.writeTextFileSync(path, JSON.stringify(info));
};

export const difficulty = async (
    path: string,
    difficulty: DifficultyData,
    options: SaveOptionsDifficulty = {}
) => {
    if (options.optimise?.enabled) {
        performDifficulty(difficulty, options.optimise);
    }
    await Deno.writeTextFile(path, JSON.stringify(difficulty));
};

export const difficultySync = (
    path: string,
    difficulty: DifficultyData,
    options: SaveOptionsDifficulty = {}
) => {
    if (options.optimise?.enabled) {
        performDifficulty(difficulty, options.optimise);
    }
    Deno.writeTextFileSync(path, JSON.stringify(difficulty));
};
