import { InfoData } from './beatmap/types/info.ts';
import { DifficultyData } from './beatmap/types/difficulty.ts';
import { SaveOptionsInfo, SaveOptionsDifficulty } from './types.ts';
import { performInfo, performDifficulty } from './optimize.ts';
import settings from './settings.ts';

export const defaultOptionsInfo: Required<SaveOptionsInfo> = {
    path: 'Info.dat',
    optimise: { enabled: true },
};

export const defaultOptionsDifficulty: Required<SaveOptionsDifficulty> = {
    path: 'UnnamedPath.dat',
    optimise: { enabled: true },
};

export const info = async (
    info: InfoData,
    options: SaveOptionsInfo = defaultOptionsInfo
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? 'Info.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    if (opt.optimise.enabled) {
        performInfo(info, opt.optimise);
    }
    await Deno.writeTextFile(settings.mapDirectory + opt.path, JSON.stringify(info));
};

export const infoSync = (
    info: InfoData,
    options: SaveOptionsInfo = defaultOptionsInfo
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? 'Info.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    if (opt.optimise.enabled) {
        performInfo(info, opt.optimise);
    }
    Deno.writeTextFileSync(settings.mapDirectory + opt.path, JSON.stringify(info));
};

export const difficulty = async (
    difficulty: DifficultyData,
    options: SaveOptionsDifficulty = defaultOptionsDifficulty
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? 'UnnamedPath.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    if (opt.optimise.enabled) {
        performDifficulty(difficulty, opt.optimise);
    }
    await Deno.writeTextFile(
        settings.mapDirectory + opt.path,
        JSON.stringify(difficulty)
    );
};

export const difficultySync = (
    difficulty: DifficultyData,
    options: SaveOptionsDifficulty = defaultOptionsDifficulty
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? 'UnnamedPath.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    if (opt.optimise.enabled) {
        performDifficulty(difficulty, opt.optimise);
    }
    Deno.writeTextFileSync(
        settings.mapDirectory + opt.path,
        JSON.stringify(difficulty)
    );
};
