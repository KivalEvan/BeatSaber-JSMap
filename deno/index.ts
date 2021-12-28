import * as beatmap from './beatmap/index.ts';

export const readMap = async (path: string) => {
    return beatmap.parse.difficulty(JSON.parse(await Deno.readTextFile(path)));
};

export const readMapSync = (path: string) => {
    return beatmap.parse.difficulty(JSON.parse(Deno.readTextFileSync(path)));
};

export const saveMap = async (path: string, map: beatmap.difficulty.DifficultyData) => {
    await Deno.writeTextFile(path, JSON.stringify(map));
};

export const saveMapSync = (path: string, map: beatmap.difficulty.DifficultyData) => {
    Deno.writeTextFileSync(path, JSON.stringify(map));
};
