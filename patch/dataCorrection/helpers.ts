import { ColorPointDefinition } from '../../types/beatmap/shared/chroma.ts';
import {
    PercentPointDefinition,
    Vector2,
    Vector2PointDefinition,
    Vector3,
    Vector3PointDefinition,
} from '../../types/beatmap/shared/heck.ts';
import { ColorArray } from '../../types/colors.ts';

export function fixBoolean(value: unknown): boolean {
    switch (typeof value) {
        case 'boolean':
            return value;
        case 'number':
            if (value) return true;
            return false;
        case 'string': {
            if (value.toLowerCase() === 'true') return true;
            if (value.toLowerCase() === 'false') return false;
            throw new TypeError(`Could not evaluate boolean for ${value}`);
        }
        default:
            throw new TypeError(`Could not determine type of value ${value}`);
    }
}

export function fixInt<T extends number>(value: unknown): T {
    switch (typeof value) {
        case 'number':
            return Math.round(value) as T;
        case 'string': {
            const val = parseInt(value);
            if (isNaN(val)) {
                throw new TypeError(`Could not evaluate number for ${value}`);
            }
            return val as T;
        }
        case 'boolean':
            throw new TypeError('Could not evaluate float value from boolean');
        default:
            throw new TypeError(`Could not determine type of value ${value}`);
    }
}

export function fixFloat(value: unknown): number {
    switch (typeof value) {
        case 'number':
            return value;
        case 'string': {
            const val = parseFloat(value);
            if (isNaN(val)) {
                throw new TypeError(`Could not evaluate number for ${value}`);
            }
            return val;
        }
        case 'boolean':
            throw new TypeError('Could not evaluate float value from boolean');
        default:
            throw new TypeError(`Could not determine type of value ${value}`);
    }
}

export function fixString(value: unknown): string {
    switch (typeof value) {
        case 'string':
            return value;
        case 'number':
            return value.toString();
        case 'boolean':
            throw new TypeError('Could not evaluate string value from boolean');
        default:
            throw new TypeError(`Could not determine type of value ${value}`);
    }
}

export function fixStringAry(value: unknown[]): string[] {
    return value.map(fixString);
}

// export function fixPercentPointDefinition(value: unknown): PercentPointDefinition[] {}

// export function fixVector2(value: unknown): Vector2 {
//     return value.map(fixFloat);
// }

// export function fixVector2PointDefinition(value: unknown): Vector2PointDefinition[] {}

// export function fixVector3(value: unknown): Vector3 {}

// export function fixVector3PointDefinition(value: unknown): Vector3PointDefinition[] {}

// export function fixColor(value: unknown): ColorArray {}

// export function fixColorPointDefinition(value: unknown): ColorPointDefinition[] {}
