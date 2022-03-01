import * as types from './types/mod.ts';
import logger from '../../logger.ts';

// deno-lint-ignore ban-types
const tag = (func: Function) => {
    return `[v3::parse::${func.name}]`;
};

export const difficulty = (
    difficultyData: types.DifficultyData
): types.DifficultyData => {
    logger.info(tag(difficulty), 'Parsing difficulty');
    return difficultyData;
};
