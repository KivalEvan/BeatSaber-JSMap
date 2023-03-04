import logger from './logger.ts';

export const major = 1;
export const minor = 3;
export const patch = 3;

export const string = `${major}.${minor}.${patch}`;

export function print() {
    logger.info('BSMap version:', string);
}
