import { InfoData } from './beatmap/types/info.ts';
import { DifficultyData } from './beatmap/types/difficulty.ts';
import {
    OptimizeOptions,
    OptimizeOptionsInfo,
    OptimizeOptionsDifficulty,
} from './types.ts';
import { round } from './utils.ts';

export const defaultOptionsInfo: Required<OptimizeOptionsInfo> = {
    enabled: true,
    floatTrim: 3,
    stringTrim: true,
    throwError: true,
    removeDuplicate: true,
};
export const defaultOptionsDifficulty: Required<OptimizeOptionsDifficulty> = {
    enabled: true,
    floatTrim: 3,
    stringTrim: true,
    throwError: true,
    optimiseLight: false,
    orderNote: true,
};

const ignoreRemove = [
    '_notes',
    '_events',
    '_obstacles',
    '_waypoints',
    '_difficultyBeatmapSets',
];
export const deepClean = (
    // deno-lint-ignore no-explicit-any
    obj: { [key: string | number]: any } | any[],
    options: OptimizeOptions
) => {
    for (const k in obj) {
        // shorten number
        if (typeof obj[k] === 'number') {
            obj[k] = round(obj[k], options.floatTrim);
        }
        // trim that string space
        if (typeof obj[k] === 'string' && options.stringTrim) {
            obj[k] = obj[k].trim();
        }
        // recursion
        if ((typeof obj[k] === 'object' || Array.isArray(obj[k])) && obj[k] !== null) {
            deepClean(obj[k], options);
        }
        // remove empty array
        if (Array.isArray(obj[k]) && !ignoreRemove.includes(k) && !obj[k].length) {
            delete obj[k];
        }
        // throw or remove null
        if (obj[k] === null) {
            if (options.throwError) {
                throw new Error(`null value found in object key ${obj} ${k}.`);
            } else {
                if (Array.isArray(obj)) {
                    console.error(
                        `null value found in array index ${obj} ${k}, defaulting to 0...`
                    );
                    obj[k] = 0;
                } else {
                    console.error(
                        `null value found in object key ${obj} ${k}, deleting property...`
                    );
                    delete obj[k];
                }
            }
        }
    }
};

export const performInfo = (
    info: InfoData,
    options: OptimizeOptionsInfo = { enabled: true }
) => {
    const opt: Required<OptimizeOptionsInfo> = {
        enabled: options.enabled,
        floatTrim: options.floatTrim ?? defaultOptionsInfo.floatTrim,
        stringTrim: options.stringTrim ?? defaultOptionsInfo.stringTrim,
        throwError: options.throwError ?? defaultOptionsInfo.throwError,
        removeDuplicate: options.removeDuplicate ?? defaultOptionsInfo.removeDuplicate,
    };
    if (!opt.enabled) {
        return info;
    }
    deepClean(info, opt);
    return info;
};

export const performDifficulty = (
    difficulty: DifficultyData,
    options: OptimizeOptionsDifficulty = { enabled: true }
) => {
    const opt: Required<OptimizeOptionsDifficulty> = {
        enabled: options.enabled,
        floatTrim: options.floatTrim ?? defaultOptionsDifficulty.floatTrim,
        stringTrim: options.stringTrim ?? defaultOptionsDifficulty.stringTrim,
        throwError: options.throwError ?? defaultOptionsDifficulty.throwError,
        optimiseLight: options.optimiseLight ?? defaultOptionsDifficulty.optimiseLight,
        orderNote: options.orderNote ?? defaultOptionsDifficulty.orderNote,
    };
    if (!opt.enabled) {
        return difficulty;
    }
    deepClean(difficulty, opt);
    const sortPrec = Math.pow(10, opt.floatTrim);
    difficulty._notes.sort(
        (a, b) =>
            Math.round((a._time + Number.EPSILON) * sortPrec) / sortPrec -
                Math.round((b._time + Number.EPSILON) * sortPrec) / sortPrec ||
            a._lineIndex - b._lineIndex ||
            a._lineLayer - b._lineLayer
    );
    difficulty._obstacles.sort((a, b) => a._time - b._time);
    difficulty._events.sort((a, b) => a._time - b._time);
    return difficulty;
};
