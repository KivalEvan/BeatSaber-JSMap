import { InfoData } from './beatmap/types/info.ts';
import { DifficultyData } from './beatmap/types/difficulty.ts';
import { info as parseInfo, difficulty as parseDifficulty } from './beatmap/parse.ts';

export * from './beatmap/mod.ts';
export * as utils from './utils.ts';
export * as colors from './colors.ts';

export const readMap = async (path: string): Promise<DifficultyData> => {
    return await new Promise((resolve, reject) => {
        try {
            resolve(parseDifficulty(JSON.parse(Deno.readTextFileSync(path))));
        } catch (e) {
            reject(new Error(e));
        }
    });
};

export const readMapSync = (path: string) => {
    return parseDifficulty(JSON.parse(Deno.readTextFileSync(path)));
};

interface SaveOptions {
    precision: number;
    optimiseLight: boolean;
}

export const saveMap = async (
    path: string,
    map: DifficultyData,
    options?: SaveOptions
) => {
    await Deno.writeTextFile(path, JSON.stringify(map));
};

export const saveMapSync = (
    path: string,
    map: DifficultyData,
    options?: SaveOptions
) => {
    // save file
    const sortP = Math.pow(10, 2);
    map._notes.sort(
        (a, b) =>
            Math.round((a._time + Number.EPSILON) * sortP) / sortP -
                Math.round((b._time + Number.EPSILON) * sortP) / sortP ||
            a._lineIndex - b._lineIndex ||
            a._lineLayer - b._lineLayer
    );
    map._obstacles.sort((a, b) => a._time - b._time);
    map._events.sort((a, b) => a._time - b._time);
    Deno.writeTextFileSync(path, JSON.stringify(map));
};

export const readInfo = async (path: string): Promise<InfoData> => {
    return await new Promise((resolve, reject) => {
        try {
            resolve(parseInfo(JSON.parse(Deno.readTextFileSync(path))));
        } catch (e) {
            reject(new Error(e));
        }
    });
};

export const readInfoSync = (path: string) => {
    return parseInfo(JSON.parse(Deno.readTextFileSync(path)));
};

export const saveInfo = async (path: string, info: InfoData) => {
    await Deno.writeTextFile(path, JSON.stringify(info));
};

export const saveInfoSync = (path: string, info: InfoData) => {
    Deno.writeTextFileSync(path, JSON.stringify(info));
};
