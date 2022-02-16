import { DifficultyList } from './types.ts';
import { InfoData } from './beatmap/types/info.ts';
import { DifficultyData } from './beatmap/types/difficulty.ts';
import { difficulty as parseDifficulty, info as parseInfo } from './beatmap/parse.ts';
import settings from './settings.ts';

export const info = async (path = 'Info.dat'): Promise<InfoData> => {
    return await new Promise((resolve, reject) => {
        try {
            resolve(parseInfo(JSON.parse(Deno.readTextFileSync(settings.path + path))));
        } catch (e) {
            reject(new Error(e));
        }
    });
};

export const infoSync = (path = 'Info.dat') => {
    return parseInfo(JSON.parse(Deno.readTextFileSync(settings.path + path)));
};

export const difficulty = async (path: string): Promise<DifficultyData> => {
    return await new Promise((resolve, reject) => {
        try {
            resolve(
                parseDifficulty(JSON.parse(Deno.readTextFileSync(settings.path + path)))
            );
        } catch (e) {
            reject(new Error(e));
        }
    });
};

export const difficultySync = (path: string) => {
    return parseDifficulty(JSON.parse(Deno.readTextFileSync(settings.path + path)));
};

export const difficultyFromInfo = async (
    info: InfoData,
    path?: string
): Promise<DifficultyList> => {
    return await new Promise((resolve, reject) => {
        const difficulties: DifficultyList = [];
        try {
            for (const set of info._difficultyBeatmapSets) {
                for (const d of set._difficultyBeatmaps) {
                    const difficulty = difficultySync(path + d._beatmapFilename);
                    difficulties.push({
                        characteristic: set._beatmapCharacteristicName,
                        difficulty: d._difficulty,
                        fileName: d._beatmapFilename,
                        data: difficulty,
                    });
                }
            }
            resolve(difficulties);
        } catch (e) {
            reject(new Error(e));
        }
    });
};

export const difficultyFromInfoSync = (
    info: InfoData,
    path?: string
): DifficultyList => {
    const difficulties: DifficultyList = [];
    for (const set of info._difficultyBeatmapSets) {
        for (const d of set._difficultyBeatmaps) {
            const difficulty = difficultySync(path + d._beatmapFilename);
            difficulties.push({
                characteristic: set._beatmapCharacteristicName,
                difficulty: d._difficulty,
                fileName: d._beatmapFilename,
                data: difficulty,
            });
        }
    }
    return difficulties;
};
