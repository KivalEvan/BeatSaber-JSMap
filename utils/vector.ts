import {
    Vector2,
    Vector2Object,
    Vector3,
    Vector3Object,
    Vector4,
    Vector4Object,
} from '../types/vector.ts';

type VectorObject = Partial<Vector2Object> | Partial<Vector3Object> | Partial<Vector4Object>;

export function isVector2(obj: unknown): obj is Vector2 {
    return Array.isArray(obj) && obj.every((n) => typeof n === 'number') && obj.length === 2;
}

export function isVector3(obj: unknown): obj is Vector3 {
    return Array.isArray(obj) && obj.every((n) => typeof n === 'number') && obj.length === 3;
}

export function isVector4(obj: unknown): obj is Vector4 {
    return Array.isArray(obj) && obj.every((n) => typeof n === 'number') && obj.length === 4;
}

export function vectorAdd<T extends Vector2 | Vector3 | Vector4 | number[] | undefined>(
    vec: T,
    translate?: number[],
): T;
export function vectorAdd(vec?: Vector2, translate?: VectorObject): Vector2;
export function vectorAdd(vec?: Vector3, translate?: VectorObject): Vector3;
export function vectorAdd(vec?: Vector4, translate?: VectorObject): Vector4;
export function vectorAdd<T extends Vector2 | Vector3 | Vector4 | number[]>(
    vec?: T,
    translate?: T | VectorObject,
): T | undefined {
    if (!vec) return vec;
    if (translate) {
        if (Array.isArray(translate)) {
            for (let i = 0; i < vec.length; i++) {
                if (typeof translate[i] === 'number') {
                    vec[i] += translate[i];
                }
            }
        } else {
            switch (vec.length) {
                case 4:
                    vec[3] = vec[3]! + ((translate as Vector4Object).w ?? 0);
                /* falls through */
                case 3:
                    vec[2] = vec[2]! + ((translate as Vector3Object).z ?? 0);
                /* falls through */
                case 2:
                    // manually tested and verified, why does coverage not see past this?
                    vec[1] = vec[1] + (translate.y ?? 0);
                    vec[0] = vec[0] + (translate.x ?? 0);
            }
        }
    }
    return vec;
}

export function vectorSub<T extends Vector2 | Vector3 | Vector4 | number[] | undefined>(
    vec: T,
    rotate?: number[],
): T;
export function vectorSub(vec?: Vector2, rotate?: VectorObject): Vector2;
export function vectorSub(vec?: Vector3, rotate?: VectorObject): Vector3;
export function vectorSub(vec?: Vector4, rotate?: VectorObject): Vector4;
export function vectorSub<T extends Vector2 | Vector3 | Vector4 | number[]>(
    vec?: T,
    rotate?: T | VectorObject,
): T | undefined {
    if (!vec) return vec;
    if (rotate) {
        if (Array.isArray(rotate)) {
            for (let i = 0; i < vec.length; i++) {
                if (typeof rotate[i] === 'number') {
                    vec[i] -= rotate[i];
                }
            }
        } else {
            switch (vec.length) {
                case 4:
                    vec[3] = vec[3]! - ((rotate as Vector4Object).w ?? 0);
                /* falls through */
                case 3:
                    vec[2] = vec[2]! - ((rotate as Vector3Object).z ?? 0);
                /* falls through */
                case 2:
                    vec[1] = vec[1] - (rotate.y ?? 0);
                    vec[0] = vec[0] - (rotate.x ?? 0);
            }
        }
    }
    return vec;
}

export function vectorMul<T extends Vector2 | Vector3 | Vector4 | number[] | undefined>(
    vec: T,
    scale?: number | number[],
): T;
export function vectorMul(vec?: Vector2, scale?: VectorObject): Vector2;
export function vectorMul(vec?: Vector3, scale?: VectorObject): Vector3;
export function vectorMul(vec?: Vector4, scale?: VectorObject): Vector4;
export function vectorMul<T extends Vector2 | Vector3 | Vector4 | number[]>(
    vec?: T,
    scale?: number | T | VectorObject,
): T | undefined {
    if (!vec) return vec;
    if (typeof scale === 'number') return vec.map((v) => v * scale) as T;
    if (scale) {
        if (Array.isArray(scale)) {
            for (let i = 0; i < vec.length; i++) {
                if (typeof scale[i] === 'number') {
                    vec[i] *= scale[i];
                }
            }
        } else {
            switch (vec.length) {
                case 4:
                    vec[3] = vec[3]! * ((scale as Vector4Object).w ?? 1);
                /* falls through */
                case 3:
                    vec[2] = vec[2]! * ((scale as Vector3Object).z ?? 1);
                /* falls through */
                case 2:
                    vec[1] = vec[1] * (scale.y ?? 1);
                    vec[0] = vec[0] * (scale.x ?? 1);
            }
        }
    }
    return vec;
}
