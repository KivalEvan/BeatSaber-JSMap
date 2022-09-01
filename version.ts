import logger from './logger.ts';

export const major = 1;
export const minor = 2;
export const patch = 2;

export const string = `${major}.${minor}.${patch}`;

export function print() {
    logger.info('BSMap version:', string);
}
