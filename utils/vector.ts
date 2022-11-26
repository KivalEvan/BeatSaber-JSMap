import { Vector2, Vector2Object, Vector3, Vector3Object, Vector4, Vector4Object } from '../types/vector.ts';

export function vectorTranslate(vec: Vector2, translate: Partial<Vector2Object>): Vector2;
export function vectorTranslate(vec: Vector3, translate: Partial<Vector3Object>): Vector3;
export function vectorTranslate(vec: Vector4, translate: Partial<Vector4Object>): Vector4;
export function vectorTranslate<T extends Vector2 | Vector3 | Vector4>(
    vec?: T,
    translate?: Partial<Vector2Object> | Partial<Vector3Object> | Partial<Vector4Object>,
): T | undefined {
    if (!vec) return vec;
    if (translate) {
        switch (vec.length) {
            case 2:
                vec[0] = vec[0] + (translate.x ?? 0);
                vec[1] = vec[1] + (translate.y ?? 0);
            /* falls through */
            case 3:
                vec[2] = vec[2]! + ((translate as Vector3Object).z ?? 0);
            /* falls through */
            case 4:
                vec[3] = vec[3]! + ((translate as Vector4Object).w ?? 0);
        }
    }
    return vec;
}

export function vectorRotate(vec: Vector2, rotate: Partial<Vector2Object>): Vector2;
export function vectorRotate(vec: Vector3, rotate: Partial<Vector3Object>): Vector3;
export function vectorRotate(vec: Vector4, rotate: Partial<Vector4Object>): Vector4;
export function vectorRotate<T extends Vector2 | Vector3 | Vector4>(
    vec?: T,
    rotate?: Partial<Vector2Object> | Partial<Vector3Object> | Partial<Vector4Object>,
): T | undefined {
    if (!vec) return vec;
    if (rotate) {
        switch (vec.length) {
            case 2:
                vec[0] = vec[0] + (rotate.x ?? 0);
                vec[1] = vec[1] + (rotate.y ?? 0);
            /* falls through */
            case 3:
                vec[2] = vec[2]! + ((rotate as Vector3Object).z ?? 0);
            /* falls through */
            case 4:
                vec[3] = vec[3]! + ((rotate as Vector4Object).w ?? 0);
        }
    }
    return vec;
}

export function vectorScale<T extends Vector2 | Vector3 | Vector4>(vec: T, scale: number): T;
export function vectorScale<T extends Vector2 | Vector3 | Vector4>(vec?: T, scale?: number): T | undefined;
export function vectorScale<T extends number[]>(vec: T, scale: number): T;
export function vectorScale<T extends number[]>(vec?: T, scale?: number): T | undefined;
export function vectorScale(vec: Vector2, scale: Partial<Vector2Object>): Vector2;
export function vectorScale(vec: Vector3, scale: Partial<Vector3Object>): Vector3;
export function vectorScale(vec: Vector4, scale: Partial<Vector4Object>): Vector4;
export function vectorScale<T extends Vector2 | Vector3 | Vector4 | number[]>(
    vec?: T,
    scale?: number | Partial<Vector2Object> | Partial<Vector3Object> | Partial<Vector4Object>,
): T | undefined {
    if (!vec) return vec;
    if (typeof scale === 'number') return vec.map((v) => v * scale) as T;
    if (scale) {
        switch (vec.length) {
            case 2:
                vec[0] = vec[0] * (scale.x ?? 1);
                vec[1] = vec[1] * (scale.y ?? 1);
            /* falls through */
            case 3:
                vec[2] = vec[2]! * ((scale as Vector3Object).z ?? 1);
            /* falls through */
            case 4:
                vec[3] = vec[3]! * ((scale as Vector4Object).w ?? 1);
        }
    }
    return vec;
}

export function vectorReflect(vec: Vector2, mirror: Partial<Vector2Object>): Vector2;
export function vectorReflect(vec: Vector3, mirror: Partial<Vector3Object>): Vector3;
export function vectorReflect(vec: Vector4, mirror: Partial<Vector4Object>): Vector4;
export function vectorReflect<T extends Vector2 | Vector3 | Vector4>(
    vec?: T,
    mirror?: Partial<Vector2Object> | Partial<Vector3Object> | Partial<Vector4Object>,
): T | undefined {
    if (!vec) return vec;
    if (mirror) {
        switch (vec.length) {
            case 2:
                vec[0] = vec[0] + (mirror.x ?? 0);
                vec[1] = vec[1] + (mirror.y ?? 0);
            /* falls through */
            case 3:
                vec[2] = vec[2]! + ((mirror as Vector3Object).z ?? 0);
            /* falls through */
            case 4:
                vec[3] = vec[3]! + ((mirror as Vector4Object).w ?? 0);
        }
    }
    return vec;
}
