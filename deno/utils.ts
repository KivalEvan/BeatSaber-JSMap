import logger from './logger.ts';

// deno-lint-ignore ban-types
const tag = (func: Function) => {
    return `[utils::${func.name}]`;
};

export const toMMSS = (seconds: number): string => {
    if (!seconds) {
        return '0:00';
    }
    const numr = Math.floor(seconds);
    const temp = numr / 60;
    const min =
        temp < 0 ? `-${Math.ceil(temp).toString()}` : Math.floor(temp).toString();
    const sec = Math.abs(numr % 60)
        .toString()
        .padStart(2, '0');
    return `${min}:${sec}`;
};

export const toHHMMSS = (minutes: number): string => {
    if (!minutes) {
        return '0:00:00';
    }
    const sec = Math.round((minutes * 60) % 60)
        .toString()
        .padStart(2, '0');
    return `${toMMSS(minutes)}:${sec}`;
};

export const toMMSSMS = (seconds: number): string => {
    if (!seconds) {
        return '0:00.000';
    }
    const dec =
        (seconds % 1).toString().split('.')[1]?.padEnd(3, '0').slice(0, 3) || '000';
    return `${toMMSS(seconds)}.${dec}`;
};

export const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const round = (num: number, d = 0): number => {
    return Math.round(num * Math.pow(10, d)) / Math.pow(10, d);
};

export const radToDeg = (rad: number) => {
    return rad * (180 / Math.PI);
};

export const degToRad = (deg: number) => {
    return deg * (Math.PI / 180);
};

// thanks Top_Cat#1961
export const mod = (x: number, m: number): number => {
    if (m < 0) {
        m = -m;
    }
    const r = x % m;
    return r < 0 ? r + m : r;
};
export const shortRotDistance = (a: number, b: number, m: number): number => {
    return Math.min(mod(a - b, m), mod(b - a, m));
};

export const median = (numArr: number[]): number => {
    if (numArr.length === 0) {
        return 0;
    }
    numArr.sort((a: number, b: number) => a - b);
    const mid = Math.floor(numArr.length / 2);
    if (numArr.length % 2) {
        return numArr[mid];
    }
    return (numArr[mid - 1] + numArr[mid]) / 2;
};

export const isHex = (hex: string): boolean => {
    return /[a-fA-F0-9]*/g.test(hex);
};

export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(min, value), max);
};

/** Fisher–Yates shuffle algorithm. */
// deno-lint-ignore no-explicit-any
export const shuffle = (array: any[]): void => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

export const interleave = ([x, ...xs]: number[], ys: number[] = []): number[] => {
    return x === undefined
        ? ys // base: no x
        : [x, ...interleave(ys, xs)]; // inductive: some x
};

/** Normalize value to 0-1 from given min and max value. */
export const normalize = (value: number, min: number, max: number): number => {
    if (min >= max) {
        logger.warn(
            tag(normalize),
            'Min value is equal or more than max value, returning 1'
        );
        return 1;
    }
    const result = (value - min) / (max - min);
    logger.verbose(tag(normalize), `Obtained ${result}`);
    return result;
};

/** Linear interpolate between start to end time given alpha value.
 * Alpha value must be around 0-1.
 */
export const lerp = (
    alpha: number,
    start: number,
    end: number,
    easing?: (x: number) => number
): number => {
    if (!easing) {
        easing = (x) => x;
    }
    if (alpha > 1) {
        logger.warn(
            tag(lerp),
            'Alpha value is larger than 1, may have unintended result'
        );
    }
    if (alpha < 0) {
        logger.warn(
            tag(lerp),
            'Alpha value is smaller than 0, may have unintended result'
        );
    }
    const result = start + (end - start) * easing(alpha);
    logger.verbose(tag(lerp), `Obtained ${result}`);
    return result;
};

/** Simple deep copy JSON object or JSON array.
 * Works best with only primitive objects.
 */

export const deepCopy = <T>(object: T): T => {
    if (typeof object !== 'object') {
        logger.error(tag(deepCopy), 'Received non-object type');
    }
    return JSON.parse(JSON.stringify(object));
};

export type Only<T, U> = {
    [P in keyof T]: T[P];
} & {
    [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type DeepPartial<T> = {
    // deno-lint-ignore ban-types
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ObjectToReturn<T> = {
    // deno-lint-ignore ban-types
    [P in keyof T]: T[P] extends object ? () => T[P] : T[P];
};
