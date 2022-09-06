import { ColorPointDefinition } from '../../types/beatmap/shared/chroma.ts';
import {
    PercentPointDefinition,
    Vector2,
    Vector2PointDefinition,
    Vector3,
    Vector3PointDefinition,
} from '../../types/beatmap/shared/heck.ts';
import { ColorArray } from '../../types/colors.ts';
import { Easings } from '../../types/easings.ts';
import { easings } from '../../utils/easings.ts';
import { clamp } from '../../utils/math.ts';

export function fixBoolean(value: unknown): boolean;
export function fixBoolean(value: unknown, defaultValue: boolean): boolean;
export function fixBoolean(value: unknown, defaultValue?: boolean): boolean {
    switch (typeof value) {
        case 'boolean':
            return value;
        case 'number':
            if (value) return true;
            return false;
        case 'string': {
            if (value.toLowerCase() === 'true') return true;
            if (value.toLowerCase() === 'false') return false;
            if (typeof defaultValue === 'boolean') return defaultValue;
            throw new TypeError(`Could not evaluate boolean for ${value}`);
        }
        default:
            throw new TypeError(`Could not determine type of value ${value}`);
    }
}

export function fixInt<T extends number>(value: unknown): T;
export function fixInt<T extends number>(value: unknown, defaultValue: T): T;
export function fixInt<T extends number>(value: unknown, defaultValue: T | [T, T], range: T[]): T;
export function fixInt<T extends number>(value: unknown, defaultValue?: T | [T, T], range?: T[]): T {
    if (typeof defaultValue === 'number' && !Number.isInteger(defaultValue)) {
        throw new TypeError(`Default value must be integer; received ${value}`);
    }
    if (Array.isArray(defaultValue) && defaultValue.some((dv) => !Number.isInteger(dv))) {
        throw new TypeError(`Default value in array must be integer; received ${defaultValue}`);
    }
    if (range && range.some((n) => !Number.isInteger(n))) {
        throw new TypeError(`Range value must be integer; received ${range}`);
    }
    switch (typeof value) {
        case 'number':
            if (isNaN(value)) {
                if (range && !range.includes(value as T)) {
                    if (typeof defaultValue === 'number') {
                        value = defaultValue;
                    } else if (Array.isArray(defaultValue)) {
                        value = clamp(value as T, defaultValue[0], defaultValue[1]);
                    } else {
                        value = clamp(value as T, range.at(0) ?? 0, range.at(-1) ?? 0);
                    }
                    return value as T;
                }
                throw new TypeError(`Could not evaluate number for ${value}`);
            }
            value = Math.round(value);
            if (range && !range.includes(value as T)) {
                if (typeof defaultValue === 'number') {
                    value = defaultValue;
                } else if (Array.isArray(defaultValue)) {
                    value = clamp(value as T, defaultValue[0], defaultValue[1]);
                } else {
                    value = clamp(value as T, range.at(0) ?? 0, range.at(-1) ?? 0);
                }
            }
            return value as T;
        case 'string': {
            const val = parseInt(value);
            if (isNaN(val)) {
                throw new TypeError(`Could not evaluate number for ${value}`);
            }
            if (range && !range.includes(val as T)) {
                if (typeof defaultValue === 'number') {
                    value = defaultValue;
                } else if (Array.isArray(defaultValue)) {
                    value = clamp(val as T, defaultValue[0], defaultValue[1]);
                } else {
                    value = clamp(val, range.at(0) ?? 0, range.at(-1) ?? 0);
                }
            }
            return val as T;
        }
        case 'boolean':
            if (typeof defaultValue === 'number') {
                value = defaultValue;
            } else if (Array.isArray(defaultValue)) {
                value = defaultValue[0];
            } else if (range) {
                value = range.at(0) ?? 0;
            }
            throw new TypeError('Could not evaluate float value from boolean');
        default:
            if (typeof defaultValue === 'number') {
                value = defaultValue;
            } else if (Array.isArray(defaultValue)) {
                value = defaultValue[0];
            } else if (range) {
                value = range.at(0) ?? 0;
            }
            throw new TypeError(`Could not determine type of value ${value}`);
    }
}

export function fixFloat(value: unknown): number;
export function fixFloat(value: unknown, defaultValue: number): number;
export function fixFloat(value: unknown, defaultValue: number, min: number, max: number): number;
export function fixFloat(value: unknown, defaultValue?: number, min?: number, max?: number): number {
    if (typeof defaultValue === 'number' && isNaN(defaultValue)) {
        throw new TypeError(`Default value must not be NaN`);
    }
    switch (typeof value) {
        case 'number':
            if (typeof min === 'number' && typeof max === 'number') {
                return clamp(value, min, max);
            }
            return value;
        case 'string': {
            const val = parseFloat(value);
            if (isNaN(val)) {
                throw new TypeError(`Could not evaluate number for ${value}`);
            }
            if (typeof min === 'number' && typeof max === 'number') {
                return clamp(val, min, max);
            }
            return val;
        }
        case 'boolean':
            if (typeof defaultValue === 'number') {
                return defaultValue;
            }
            throw new TypeError('Could not evaluate float value from boolean');
        default:
            if (typeof defaultValue === 'number') {
                return defaultValue;
            }
            throw new TypeError(`Could not determine type of value ${value}`);
    }
}

export function fixString<T extends string>(value: unknown): T;
export function fixString<T extends string>(value: unknown, defaultValue: T): T;
export function fixString<T extends string>(value: unknown, defaultValue?: T): T {
    if (typeof defaultValue === 'string' && !defaultValue.trim()) {
        throw new TypeError(`Default string cannot be empty`);
    }
    switch (typeof value) {
        case 'string':
            return value as T;
        case 'number':
            return value.toString() as T;
        case 'boolean':
            if (typeof defaultValue === 'string') {
                return defaultValue;
            }
            throw new TypeError('Could not evaluate string value from boolean');
        default:
            if (typeof defaultValue === 'string') {
                return defaultValue;
            }
            throw new TypeError(`Could not determine type of value ${value}`);
    }
}

export function fixStringAry(value: unknown[], defaultValue: string): string[] {
    return value.map(fixString, defaultValue);
}

const easingsList = Object.keys(easings).concat('easeStep') as Easings[];

export function fixPercentPointDefinition(value: unknown, defaultValue: number): PercentPointDefinition[] {
    if (Array.isArray(value)) {
        return value
            .filter((ary) => Array.isArray(ary))
            .map((elm: unknown[]) => {
                const temp = [
                    fixFloat(elm.at(0), defaultValue),
                    fixFloat(elm.at(1), 1, 0, 1),
                ] as PercentPointDefinition;
                if (elm.length > 2) {
                    const attr = elm
                        .slice(2)
                        .filter((e) => typeof e === 'string')
                        .find((e) => easingsList.includes(e as Easings));
                    if (attr) {
                        temp[2] = attr as Easings;
                    }
                }
                return temp as PercentPointDefinition;
            });
    }
    return [];
}

export function fixVector2(value: unknown, defaultValue: Vector2): Vector2 {
    if (Array.isArray(value)) {
        return [fixFloat(value.at(0), defaultValue[0]), fixFloat(value.at(1), defaultValue[1])];
    }
    return defaultValue;
}

export function fixVector2PointDefinition(value: unknown, defaultValue: Vector2): Vector2PointDefinition[] {
    if (Array.isArray(value)) {
        return value
            .filter((ary) => Array.isArray(ary))
            .map((elm: unknown[]) => {
                const temp = [
                    fixFloat(elm.at(0), defaultValue[0]),
                    fixFloat(elm.at(1), defaultValue[1]),
                    fixFloat(elm.at(2), 1, 0, 1),
                ] as Vector2PointDefinition;
                if (elm.length > 3) {
                    const attr = elm.slice(3).filter((e) => typeof e === 'string');
                    const ease = attr.find((e) => easingsList.includes(e as Easings));
                    const spline = attr.find((e) => e === 'splineCatmullRom');
                    if (ease) {
                        temp[3] = ease as Easings;
                    }
                    if (spline) {
                        temp[4] = spline as Easings;
                    }
                }
                return temp as Vector2PointDefinition;
            });
    }
    return [];
}

export function fixVector3(value: unknown, defaultValue: Vector3): Vector3 {
    if (Array.isArray(value)) {
        return [
            fixFloat(value.at(0), defaultValue[0]),
            fixFloat(value.at(1), defaultValue[1]),
            fixFloat(value.at(2), defaultValue[2]),
        ];
    }
    return defaultValue;
}

export function fixVector3PointDefinition(value: unknown, defaultValue: Vector3): Vector3PointDefinition[] {
    if (Array.isArray(value)) {
        return value
            .filter((ary) => Array.isArray(ary))
            .map((elm: unknown[]) => {
                const temp = [
                    fixFloat(elm.at(0), defaultValue[0]),
                    fixFloat(elm.at(1), defaultValue[1]),
                    fixFloat(elm.at(2), defaultValue[2]),
                    fixFloat(elm.at(3), 1, 0, 1),
                ] as Vector3PointDefinition;
                if (elm.length > 4) {
                    const attr = elm.slice(4).filter((e) => typeof e === 'string');
                    const ease = attr.find((e) => easingsList.includes(e as Easings));
                    const spline = attr.find((e) => e === 'splineCatmullRom');
                    if (ease) {
                        temp[4] = ease as Easings;
                    }
                    if (spline) {
                        temp[5] = spline as Easings;
                    }
                }
                return temp as Vector3PointDefinition;
            });
    }
    return [];
}

export function fixColor(value: unknown, defaultValue: ColorArray): ColorArray {
    if (Array.isArray(value)) {
        return [
            fixFloat(value.at(0), defaultValue[0]),
            fixFloat(value.at(1), defaultValue[1]),
            fixFloat(value.at(2), defaultValue[2]),
            fixFloat(value.at(3), defaultValue.at(3) ?? 1),
        ];
    }
    return defaultValue;
}

export function fixColorPointDefinition(value: unknown, defaultValue: ColorArray): ColorPointDefinition[] {
    if (Array.isArray(value)) {
        return value
            .filter((ary) => Array.isArray(ary))
            .map((elm: unknown[]) => {
                const temp = [
                    fixFloat(value.at(0), defaultValue[0]),
                    fixFloat(value.at(1), defaultValue[1]),
                    fixFloat(value.at(2), defaultValue[2]),
                    fixFloat(value.at(3), defaultValue[3] ?? 1),
                    fixFloat(elm.at(4), 1, 0, 1),
                ] as ColorPointDefinition;
                if (elm.length > 5) {
                    const attr = elm.slice(5).filter((e) => typeof e === 'string');
                    const ease = attr.find((e) => easingsList.includes(e as Easings));
                    const lerp = attr.find((e) => e === 'lerpHSV');
                    if (ease) {
                        temp[5] = ease as Easings;
                    }
                    if (lerp) {
                        temp[6] = lerp as Easings;
                    }
                }
                return temp as ColorPointDefinition;
            });
    }
    return [];
}
