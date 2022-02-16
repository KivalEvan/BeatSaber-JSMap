import { InfoData } from './beatmap/types/info.ts';
import { DifficultyData } from './beatmap/types/difficulty.ts';
import {
    SaveOptionsDifficulty,
    SaveOptionsDifficultyList,
    SaveOptionsInfo,
    DifficultyList,
} from './types.ts';
import { performDifficulty, performInfo } from './optimize.ts';
import settings from './settings.ts';

export const defaultOptionsInfo: Required<SaveOptionsInfo> = {
    path: '',
    filePath: 'Info.dat',
    optimise: { enabled: true },
};

export const defaultOptionsDifficulty: Required<SaveOptionsDifficulty> = {
    path: '',
    filePath: 'UnnamedPath.dat',
    optimise: { enabled: true },
};

export const defaultOptionsDifficultyList: Required<SaveOptionsDifficultyList> = {
    path: '',
    optimise: { enabled: true },
};

export const info = async (
    info: InfoData,
    options: SaveOptionsInfo = defaultOptionsInfo
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? '',
        filePath: options.filePath ?? 'Info.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    if (opt.optimise.enabled) {
        performInfo(info, opt.optimise);
    }
    await Deno.writeTextFile(settings.path + opt.filePath, JSON.stringify(info));
};

export const infoSync = (
    info: InfoData,
    options: SaveOptionsInfo = defaultOptionsInfo
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? '',
        filePath: options.filePath ?? 'Info.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    if (opt.optimise.enabled) {
        performInfo(info, opt.optimise);
    }
    Deno.writeTextFileSync(settings.path + opt.filePath, JSON.stringify(info));
};

export const difficulty = async (
    difficulty: DifficultyData,
    options: SaveOptionsDifficulty = defaultOptionsDifficulty
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? '',
        filePath: options.filePath ?? 'UnnamedPath.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    if (opt.optimise.enabled) {
        performDifficulty(difficulty, opt.optimise);
    }
    await Deno.writeTextFile(settings.path + opt.filePath, JSON.stringify(difficulty));
};

export const difficultySync = (
    difficulty: DifficultyData,
    options: SaveOptionsDifficulty = defaultOptionsDifficulty
) => {
    const opt: Required<SaveOptionsDifficulty> = {
        path: options.path ?? '',
        filePath: options.filePath ?? 'UnnamedPath.dat',
        optimise: options.optimise ?? { enabled: true },
    };
    if (opt.optimise.enabled) {
        performDifficulty(difficulty, opt.optimise);
    }
    Deno.writeTextFileSync(settings.path + opt.filePath, JSON.stringify(difficulty));
};

export const difficultyList = (
    difficultyList: DifficultyList,
    options: SaveOptionsDifficultyList = defaultOptionsDifficulty
) => {
    difficultyList.forEach(async (dl) => {
        const opt: Required<SaveOptionsDifficultyList> = {
            path: options.path ?? '',
            optimise: options.optimise ?? { enabled: true },
        };
        if (opt.optimise.enabled) {
            performDifficulty(dl.data, opt.optimise);
        }
        await Deno.writeTextFile(
            settings.path + dl.fileName,
            JSON.stringify(difficulty)
        );
    });
};

export const difficultyListSync = (
    difficultyList: DifficultyList,
    options: SaveOptionsDifficultyList = defaultOptionsDifficulty
) => {
    difficultyList.forEach((dl) => {
        const opt: Required<SaveOptionsDifficultyList> = {
            path: options.path ?? '',
            optimise: options.optimise ?? { enabled: true },
        };
        if (opt.optimise.enabled) {
            performDifficulty(dl.data, opt.optimise);
        }
        Deno.writeTextFileSync(settings.path + dl.fileName, JSON.stringify(difficulty));
    });
};
