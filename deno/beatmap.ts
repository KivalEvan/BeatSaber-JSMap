import * as beatmap from './beatmap/index.ts';

// TODO: probably rethink how to structure these stuff again
// also should not export literally everything
export * as bookmark from './beatmap/bookmark.ts';
export * as bpm from './beatmap/bpm.ts';
export * as characteristic from './beatmap/characteristic.ts';
export * as chroma from './beatmap/chroma.ts';
export * as contributor from './beatmap/contributor.ts';
export * as customData from './beatmap/customData.ts';
export * as difficulty from './beatmap/difficulty.ts';
export * as editor from './beatmap/editor.ts';
export * as environment from './beatmap/environment.ts';
export * as info from './beatmap/info.ts';
export * as njs from './beatmap/njs.ts';
export * as noodleExtensions from './beatmap/noodleExtensions.ts';
export * as parse from './beatmap/parse.ts';
export * as note from './beatmap/note.ts';
export * as swing from './beatmap/swing.ts';
export * as obstacle from './beatmap/obstacle.ts';
export * as event from './beatmap/event.ts';
export * as waypoint from './beatmap/waypoint.ts';
export * as score from './beatmap/score.ts';
export * as version from './beatmap/version.ts';

export * as utils from './utils.ts';
export * as colors from './colors.ts';

export const readMap = async (
    path: string
): Promise<beatmap.difficulty.DifficultyData> => {
    return await new Promise((resolve, reject) => {
        try {
            resolve(beatmap.parse.difficulty(JSON.parse(Deno.readTextFileSync(path))));
        } catch (e) {
            reject(new Error(e));
        }
    });
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

export const readInfo = async (path: string): Promise<beatmap.info.InfoData> => {
    return await new Promise((resolve, reject) => {
        try {
            resolve(beatmap.parse.info(JSON.parse(Deno.readTextFileSync(path))));
        } catch (e) {
            reject(new Error(e));
        }
    });
};

export const readInfoSync = (path: string) => {
    return beatmap.parse.info(JSON.parse(Deno.readTextFileSync(path)));
};

export const saveInfo = async (path: string, info: beatmap.info.InfoData) => {
    await Deno.writeTextFile(path, JSON.stringify(info));
};

export const saveInfoSync = (path: string, info: beatmap.info.InfoData) => {
    Deno.writeTextFileSync(path, JSON.stringify(info));
};
