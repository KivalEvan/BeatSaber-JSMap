import { InfoData } from './beatmap/types/info.ts';
import { DifficultyData } from './beatmap/types/difficulty.ts';
import { info as parseInfo, difficulty as parseDifficulty } from './beatmap/parse.ts';
import settings from './settings.ts';

export const info = async (path: string): Promise<InfoData> => {
    return await new Promise((resolve, reject) => {
        try {
            resolve(
                parseInfo(
                    JSON.parse(Deno.readTextFileSync(settings.mapDirectory + path))
                )
            );
        } catch (e) {
            reject(new Error(e));
        }
    });
};

export const infoSync = (path: string) => {
    return parseInfo(JSON.parse(Deno.readTextFileSync(settings.mapDirectory + path)));
};

export const difficulty = async (path: string): Promise<DifficultyData> => {
    return await new Promise((resolve, reject) => {
        try {
            resolve(
                parseDifficulty(
                    JSON.parse(Deno.readTextFileSync(settings.mapDirectory + path))
                )
            );
        } catch (e) {
            reject(new Error(e));
        }
    });
};

export const difficultySync = (path: string) => {
    return parseDifficulty(
        JSON.parse(Deno.readTextFileSync(settings.mapDirectory + path))
    );
};
