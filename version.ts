import logger from './logger.ts';

export const major = 1;
export const minor = 4;
export const patch = 2;

export const string = `${major}.${minor}.${patch}`;

export function print() {
   logger.tInfo(['version', print.name], 'BSMap version:', string);
}
