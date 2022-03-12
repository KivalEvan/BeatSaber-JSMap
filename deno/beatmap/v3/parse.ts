import { IBaseObject } from './types/baseObject.ts';
import { DifficultyData, IDifficultyData } from './types/difficulty.ts';
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
    logger.verbose(tag(deepCheck), `Looking up ${name}`);
    if (Array.isArray(data)) {
        data.forEach((d, i) => deepCheck(d, check, name + i));
        return;
    }
    const dataCheckKey = Object.keys(check);
    for (const key in data) {
        if (!dataCheckKey.length) {
            break;
        }
        if (!dataCheckKey.includes(key)) {
            logger.warn(tag(deepCheck), `Foreign property ${key} found in ${name}`);
        }
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
            deepCheck(
                data[key],
                (check[key] as DataCheckObject).check,
                `${name} ${key}`
            );
        }
        if (check[key].type === 'object') {
            if (!Array.isArray(data[key]) && !(typeof data[key] === 'object')) {
                throw Error(`${key} is not an object in property ${name}!`);
            } else {
                deepCheck(
                    data[key],
                    (check[key] as DataCheckObject).check,
                    `${name} ${key}`
                );
            }
        }
        if (check[key].type !== 'array' && typeof data[key] !== check[key].type) {
            throw Error(`${key} is not ${check[key].type} in property ${name}!`);
        }
    }
};

const sortObjectTime = (a: IBaseObject, b: IBaseObject) => a.b - b.b;

export const difficulty = (data: IDifficultyData): DifficultyData => {
    logger.info(tag(difficulty), 'Parsing beatmap difficulty v3.x.x');
    deepCheck(data, DifficultyDataCheck, 'difficulty');
    if (data.version !== '3.0.0') {
        logger.warn(tag(difficulty), 'Unidentified beatmap version');
    }

    // haha why do i have to do this, beat games
    data.bpmEvents = data.bpmEvents ?? [];
    data.rotationEvents = data.rotationEvents ?? [];
    data.colorNotes = data.colorNotes ?? [];
    data.bombNotes = data.bombNotes ?? [];
    data.obstacles = data.obstacles ?? [];
    data.sliders = data.sliders ?? [];
    data.burstSliders = data.burstSliders ?? [];
    data.waypoints = data.waypoints ?? [];
    data.basicBeatmapEvents = data.basicBeatmapEvents ?? [];
    data.colorBoostBeatmapEvents = data.colorBoostBeatmapEvents ?? [];
    data.lightColorEventBoxGroups = data.lightColorEventBoxGroups ?? [];
    data.lightRotationEventBoxGroups = data.lightRotationEventBoxGroups ?? [];

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

    return DifficultyData.create(data);
};
