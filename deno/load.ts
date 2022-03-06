import { DifficultyList } from './types.ts';
import { InfoData } from './beatmap/shared/types/info.ts';
import { DifficultyData as DifficultyDataV2 } from './beatmap/v2/types/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from './beatmap/v3/types/difficulty.ts';
import { info as parseInfo } from './beatmap/shared/parse.ts';
import { difficulty as parseDifficultyV2 } from './beatmap/v2/parse.ts';
import { difficulty as parseDifficultyV3 } from './beatmap/v3/parse.ts';
import globals from './globals.ts';
import logger from './logger.ts';
import { isV3 } from './beatmap/version.ts';
import { Either } from './utils.ts';

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

/** Asynchronously load legacy v2 beatmap difficulty file.
 * ```ts
 * const difficultyLegacy = await load.difficultyLegacy('ExpertPlusStandard.dat');
 * console.log(difficultyLegacy);
 * ```
 */
export const difficultyLegacy = async (
    filePath: string,
    path = globals.path
): Promise<DifficultyDataV2> => {
    logger.info(
        tag(difficultyLegacy),
        `Async loading difficulty from ${path + filePath}`
    );
    return await new Promise((resolve, reject) => {
        try {
            resolve(
                parseDifficultyV2(JSON.parse(Deno.readTextFileSync(path + filePath)))
            );
        } catch (e) {
            reject(new Error(e));
        }
    });
};

/** Synchronously load legacy v2 beatmap difficulty file.
 * ```ts
 * const difficultyLegacy = load.difficultyLegacySync('ExpertPlusStandard.dat');
 * console.log(difficultyLegacy);
 * ```
 */
export const difficultyLegacySync = (filePath: string, path = globals.path) => {
    logger.info(
        tag(difficultyLegacySync),
        `Sync loading difficulty from ${path + filePath}`
    );
    return parseDifficultyV2(JSON.parse(Deno.readTextFileSync(path + filePath)));
};

/** Asynchronously load v3 beatmap difficulty file.
 * ```ts
 * const difficultyLegacy = await load.difficultyLegacy('ExpertPlusStandard.dat');
 * console.log(difficultyLegacy);
 * ```
 */
export const difficulty = async (
    filePath: string,
    path = globals.path
): Promise<DifficultyDataV3> => {
    logger.info(tag(difficulty), `Async loading difficulty from ${path + filePath}`);
    return await new Promise((resolve, reject) => {
        try {
            resolve(
                parseDifficultyV3(JSON.parse(Deno.readTextFileSync(path + filePath)))
            );
        } catch (e) {
            reject(new Error(e));
        }
    });
};

/** Synchronously load v3 beatmap difficulty file.
 * ```ts
 * const difficulty = load.difficultySync('ExpertPlusStandard.dat');
 * console.log(difficulty);
 * ```
 */
export const difficultySync = (filePath: string, path = globals.path) => {
    logger.info(tag(difficultySync), `Sync loading difficulty from ${path + filePath}`);
    return parseDifficultyV3(JSON.parse(Deno.readTextFileSync(path + filePath)));
};

/** Asynchronously load multiple v3 beatmap difficulties given beatmap info.
 * ```ts
 * const difficultyList = await load.difficultyFromInfo();
 * difficultyList.forEach((d) => { console.log(d) })
 * ```
 * ---
 * Info difficulty reference is also given to allow further control.
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
                    logger.info(
                        tag(difficultyFromInfo),
                        `Loading difficulty from ${path + d._beatmapFilename}`
                    );
                    const diffJSON = JSON.parse(
                        Deno.readTextFileSync(path + d._beatmapFilename)
                    ) as Either<DifficultyDataV2, DifficultyDataV3>;
                    difficulties.push({
                        characteristic: set._beatmapCharacteristicName,
                        difficulty: d._difficulty,
                        fileName: d._beatmapFilename,
                        settings: d,
                        data: isV3(diffJSON)
                            ? parseDifficultyV3(diffJSON)
                            : parseDifficultyV2(diffJSON),
                    });
                }
            }
            resolve(difficulties);
        } catch (e) {
            reject(new Error(e));
        }
    });
};

/** Asynchronously load multiple v3 beatmap difficulties given beatmap info.
 * ```ts
 * const difficultyList = load.difficultyFromInfoSync();
 * difficultyList.forEach((d) => { console.log(d) })
 * ```
 * ---
 * Info difficulty reference is also given to allow further control.
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
            logger.info(
                tag(difficultyFromInfoSync),
                `Loading difficulty from ${path + d._beatmapFilename}`
            );
            const diffJSON = JSON.parse(
                Deno.readTextFileSync(path + d._beatmapFilename)
            ) as Either<DifficultyDataV2, DifficultyDataV3>;
            difficulties.push({
                characteristic: set._beatmapCharacteristicName,
                difficulty: d._difficulty,
                fileName: d._beatmapFilename,
                settings: d,
                data: isV3(diffJSON)
                    ? parseDifficultyV3(diffJSON)
                    : parseDifficultyV2(diffJSON),
            });
        }
    }
    return difficulties;
};
