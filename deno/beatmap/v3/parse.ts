import { BaseObject } from './types/baseObject.ts';
import { DifficultyData } from './types/difficulty.ts';
import { DataCheck, DifficultyDataCheck, DataCheckObject } from './types/dataCheck.ts';
import logger from '../../logger.ts';

// deno-lint-ignore ban-types
const tag = (func: Function) => {
    return `[v3::parse::${func.name}]`;
};

const deepCheck = (
    // deno-lint-ignore no-explicit-any
    data: { [key: string]: any },
    check: { [key: string]: DataCheck },
    name: string
) => {
    logger.debug(tag(deepCheck), `Looking up ${name}`);
    if (Array.isArray(data)) {
        data.forEach((d, i) => deepCheck(d, check, name + i));
        return;
    }
    for (const key in check) {
        if (typeof data[key] === 'undefined') {
            if (check[key].optional) {
                continue;
            }
            throw Error(`Missing ${key} in property ${name}!`);
        }
        if (data[key] == null) {
            throw Error(`${key} contain null value in property ${name}!`);
        }
        if (check[key].type === 'array') {
            if (!Array.isArray(data[key])) {
                throw Error(`${key} is not an array in property ${name}!`);
            }
            deepCheck(data[key], (check[key] as DataCheckObject).check, key);
        }
        if (check[key].type === 'object') {
            if (!Array.isArray(data[key]) && !(typeof data[key] === 'object')) {
                throw Error(`${key} is not an object in property ${name}!`);
            } else {
                deepCheck(data[key], (check[key] as DataCheckObject).check, key);
            }
        }
        if (check[key].type !== 'array' && typeof data[key] !== check[key].type) {
            throw Error(`${key} is not ${check[key].type} in property ${name}!`);
        }
    }
};

const sortObjectTime = (a: BaseObject, b: BaseObject) => a.b - b.b;

export const difficulty = (data: DifficultyData): DifficultyData => {
    logger.info(tag(difficulty), 'Parsing beatmap difficulty v3.x.x');
    deepCheck(data, DifficultyDataCheck, 'difficulty file');
    if (data.version !== '3.0.0') {
        logger.warn(tag(difficulty), 'Unidentified beatmap version');
    }

    data.bpmEvents.sort(sortObjectTime);
    data.rotationEvents.sort(sortObjectTime);
    data.colorNotes.sort(sortObjectTime);
    data.bombNotes.sort(sortObjectTime);
    data.obstacles.sort(sortObjectTime);
    data.sliders.sort(sortObjectTime);
    data.burstSliders.sort(sortObjectTime);
    data.waypoints.sort(sortObjectTime);
    data.basicBeatmapEvents.sort(sortObjectTime);
    data.colorBoostBeatmapEvents.sort(sortObjectTime);
    data.lightColorEventBoxGroups.sort(sortObjectTime);
    data.lightRotationEventBoxGroups.sort(sortObjectTime);

    return data;
};
