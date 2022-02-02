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

// Fisher–Yates shuffle
// deno-lint-ignore no-explicit-any
export const shuffle = (array: any[]) => {
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

export const normalize = (x: number, min: number, max: number) => {
    return max - min > 0 ? (x - min) / (max - min) : 0;
};

/**
 * Alpha number range 0-1
 */
export const lerp = (alpha: number, start: number, end: number) => {
    return start + (end - start) * alpha;
};
