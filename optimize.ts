import { IInfoData } from './types/beatmap/shared/info.ts';
import { IDifficultyData as DifficultyDataV2 } from './types/beatmap/v2/difficulty.ts';
import { IDifficultyData as DifficultyDataV3 } from './types/beatmap/v3/difficulty.ts';
import { IOptimizeOptions, IOptimizeOptionsDifficulty, IOptimizeOptionsInfo } from './types/bsmap/optimize.ts';
import { Either } from './types/utils.ts';
import { round } from './utils/math.ts';
import logger from './logger.ts';

const tag = (name: string) => {
    return `[optimize::${name}]`;
};

export const defaultOptionsInfo: Required<IOptimizeOptionsInfo> = {
    enabled: true,
    floatTrim: 4,
    stringTrim: true,
    throwError: true,
    removeDuplicate: true,
};
export const defaultOptionsDifficulty: Required<IOptimizeOptionsDifficulty> = {
    enabled: true,
    floatTrim: 4,
    stringTrim: true,
    throwError: true,
    optimiseLight: false,
    sort: true,
};

const ignoreObjectRemove = [
    '_notes',
    '_sliders',
    '_events',
    '_obstacles',
    '_waypoints',
    '_difficultyBeatmapSets',
    'bpmEvents',
    'rotationEvents',
    'colorNotes',
    'bombNotes',
    'obstacles',
    'sliders',
    'burstSliders',
    'waypoints',
    'basicBeatmapEvents',
    'colorBoostBeatmapEvents',
    'lightColorEventBoxGroups',
    'lightRotationEventBoxGroups',
    'basicEventTypesWithKeywords',
    'useNormalEventsAsCompatibleEvents',
    'd',
];
export const deepClean = (
    // deno-lint-ignore no-explicit-any
    obj: { [key: string | number]: any } | any[],
    options: IOptimizeOptions,
    name = '',
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
            deepClean(obj[k], options, `${name}.${k}`);
            // if it's lightID array, sort it
            if (
                k === '_lightID' &&
                Array.isArray(obj[k]) &&
                // deno-lint-ignore no-explicit-any
                obj[k].every((x: any) => typeof x === 'number')
            ) {
                obj[k] = obj[k].sort((a: number, b: number) => a - b);
            }
        }
        // remove empty array/object property
        if (
            !ignoreObjectRemove.includes(k) &&
            ((Array.isArray(obj[k]) && !obj[k].length) ||
                (typeof obj[k] === 'object' && !Array.isArray(obj[k]) && JSON.stringify(obj[k]) === '{}'))
        ) {
            delete obj[k];
            continue;
        }
        // throw or remove null
        if (obj[k] === null) {
            if (options.throwError) {
                throw new Error(`null value found in object key ${name}.${k}.`);
            } else {
                if (Array.isArray(obj)) {
                    logger.error(tag('deepClean'), `null value found in array ${name}[${k}], defaulting to 0...`);
                    obj[k] = 0;
                } else {
                    logger.error(tag('deepClean'), `null value found in object key ${name}.${k}, deleting property...`);
                    delete obj[k];
                }
            }
        }
    }
};

export const performInfo = (info: IInfoData, options: IOptimizeOptionsInfo = { enabled: true }) => {
    const opt: Required<IOptimizeOptionsInfo> = {
        enabled: options.enabled,
        floatTrim: options.floatTrim ?? defaultOptionsInfo.floatTrim,
        stringTrim: options.stringTrim ?? defaultOptionsInfo.stringTrim,
        throwError: options.throwError ?? defaultOptionsInfo.throwError,
        removeDuplicate: options.removeDuplicate ?? defaultOptionsInfo.removeDuplicate,
    };

    if (!opt.enabled) {
        return info;
    }
    logger.info(tag('performInfo'), `Optimising info data`);

    logger.debug(tag('performInfo'), 'Applying deep clean');
    deepClean(info, opt);
    return info;
};

export const performDifficulty = (
    difficulty: Either<DifficultyDataV2, DifficultyDataV3>,
    options: IOptimizeOptionsDifficulty = { enabled: true },
) => {
    const opt: Required<IOptimizeOptionsDifficulty> = {
        enabled: options.enabled,
        floatTrim: options.floatTrim ?? defaultOptionsDifficulty.floatTrim,
        stringTrim: options.stringTrim ?? defaultOptionsDifficulty.stringTrim,
        throwError: options.throwError ?? defaultOptionsDifficulty.throwError,
        optimiseLight: options.optimiseLight ?? defaultOptionsDifficulty.optimiseLight,
        sort: options.sort ?? defaultOptionsDifficulty.sort,
    };

    if (!opt.enabled) {
        return difficulty;
    }
    logger.info(tag('performDifficulty'), `Optimising difficulty data`);

    logger.debug(tag('performDifficulty'), 'Applying deep clean');
    deepClean(difficulty, opt);

    if (opt.sort) {
        logger.debug(tag('performDifficulty'), 'Sorting objects');
        const sortPrec = Math.pow(10, opt.floatTrim);
        difficulty._notes?.sort(
            (a, b) =>
                Math.round((a._time + Number.EPSILON) * sortPrec) / sortPrec -
                    Math.round((b._time + Number.EPSILON) * sortPrec) / sortPrec ||
                a._lineIndex - b._lineIndex ||
                a._lineLayer - b._lineLayer,
        );
        difficulty._obstacles?.sort((a, b) => a._time - b._time);
        difficulty._events?.sort((a, b) => a._time - b._time);
        difficulty.colorNotes?.sort(
            (a, b) =>
                Math.round((a.b + Number.EPSILON) * sortPrec) / sortPrec -
                    Math.round((b.b + Number.EPSILON) * sortPrec) / sortPrec ||
                a.x - b.x ||
                a.y - b.y,
        );
        difficulty.bombNotes?.sort((a, b) => a.b - b.b);
        difficulty.obstacles?.sort((a, b) => a.b - b.b);
        difficulty.bpmEvents?.sort((a, b) => a.b - b.b);
        difficulty.rotationEvents?.sort((a, b) => a.b - b.b);
        difficulty.colorBoostBeatmapEvents?.sort((a, b) => a.b - b.b);
        difficulty.basicBeatmapEvents?.sort((a, b) => a.b - b.b);
        difficulty.sliders?.sort((a, b) => a.b - b.b);
        difficulty.burstSliders?.sort((a, b) => a.b - b.b);
        difficulty.lightColorEventBoxGroups?.sort((a, b) => a.b - b.b);
        difficulty.lightRotationEventBoxGroups?.sort((a, b) => a.b - b.b);
        difficulty.waypoints?.sort((a, b) => a.b - b.b);
    }

    return difficulty;
};
