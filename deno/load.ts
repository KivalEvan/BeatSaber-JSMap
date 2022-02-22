import { DifficultyList } from './types.ts';
import { InfoData } from './beatmap/types/info.ts';
import { DifficultyData } from './beatmap/types/difficulty.ts';
import { difficulty as parseDifficulty, info as parseInfo } from './beatmap/parse.ts';
import globals from './globals.ts';
import logger from './logger.ts';

// deno-lint-ignore ban-types
const tag = (func: Function) => {
    return `[load::${func.name}]`;
};

/** Asynchronously load beatmap info file.
 * ```ts
 * const info = await load.info();
 * console.log(info);
 * ```
 */
export const info = async (
    filePath = 'Info.dat',
    path = globals.path
): Promise<InfoData> => {
    logger.info(tag(info), `Async loading info from ${path + filePath}`);
    return await new Promise((resolve, reject) => {
        try {
            resolve(parseInfo(JSON.parse(Deno.readTextFileSync(path + filePath))));
        } catch (e) {
            reject(new Error(e));
        }
    });
};

/** Synchronously load beatmap info file.
 * ```ts
 * const info = load.infoSync();
 * console.log(info);
 * ```
 */
export const infoSync = (filePath = 'Info.dat', path = globals.path) => {
    logger.info(tag(infoSync), `Sync loading info from ${path + filePath}`);
    return parseInfo(JSON.parse(Deno.readTextFileSync(path + filePath)));
};

/** Asynchronously load beatmap difficulty file.
 * ```ts
 * const difficulty = await load.difficulty('ExpertPlusStandard.dat');
 * console.log(difficulty);
 * ```
 */
export const difficulty = async (
    filePath: string,
    path = globals.path
): Promise<DifficultyData> => {
    logger.info(tag(difficulty), `Async loading difficulty from ${path + filePath}`);
    return await new Promise((resolve, reject) => {
        try {
            resolve(
                parseDifficulty(JSON.parse(Deno.readTextFileSync(path + filePath)))
            );
        } catch (e) {
            reject(new Error(e));
        }
    });
};

/** Synchronously load beatmap difficulty file.
 * ```ts
 * const difficulty = load.difficultySync('ExpertPlusStandard.dat');
 * console.log(difficulty);
 * ```
 */
export const difficultySync = (filePath: string, path?: string) => {
    logger.info(tag(difficultySync), `Sync loading difficulty from ${path + filePath}`);
    return parseDifficulty(JSON.parse(Deno.readTextFileSync(path + filePath)));
};

/** Asynchronously load multiple beatmap difficulties given beatmap info.
 * ```ts
 * const difficultyList = await load.difficultyFromInfo();
 * difficultyList.forEach((d) => { console.log(d) })
 * ```
 */
export const difficultyFromInfo = async (
    info: InfoData,
    path = globals.path
): Promise<DifficultyList> => {
    logger.info(tag(difficultyFromInfo), 'Async loading difficulty from map Info...');
    return await new Promise((resolve, reject) => {
        const difficulties: DifficultyList = [];
        try {
            for (const set of info._difficultyBeatmapSets) {
                for (const d of set._difficultyBeatmaps) {
                    logger.debug(
                        tag(difficultyFromInfo),
                        `Loading difficulty from ${path + d._beatmapFilename}`
                    );
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

/** Asynchronously load multiple beatmap difficulties given beatmap info.
 * ```ts
 * const difficultyList = load.difficultyFromInfoSync();
 * difficultyList.forEach((d) => { console.log(d) })
 * ```
 */
export const difficultyFromInfoSync = (
    info: InfoData,
    path = globals.path
): DifficultyList => {
    logger.info(
        tag(difficultyFromInfoSync),
        'Sync loading difficulty from map Info...'
    );
    const difficulties: DifficultyList = [];
    for (const set of info._difficultyBeatmapSets) {
        for (const d of set._difficultyBeatmaps) {
            logger.debug(
                tag(difficultyFromInfoSync),
                `Loading difficulty from ${path + d._beatmapFilename}`
            );
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
