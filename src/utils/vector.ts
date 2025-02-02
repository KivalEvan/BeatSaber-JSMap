import { EPSILON } from '../../tests/constants.ts';
import type {
   Vector2,
   Vector2Object,
   Vector3,
   Vector3Object,
   Vector4,
   Vector4Object,
} from '../types/vector.ts';
import { lerp, nearEqual } from './math.ts';

type VectorObject = Partial<Vector2Object> | Partial<Vector3Object> | Partial<Vector4Object>;

/** Check if value is `Vector2` */
export function isVector2(obj: unknown): obj is Vector2 {
   return Array.isArray(obj) && obj.length === 2 && obj.every((n) => typeof n === 'number');
}

/** Check if value is `Vector3` */
export function isVector3(obj: unknown): obj is Vector3 {
   return Array.isArray(obj) && obj.length === 3 && obj.every((n) => typeof n === 'number');
}

/** Check if value is `Vector4` */
export function isVector4(obj: unknown): obj is Vector4 {
   return Array.isArray(obj) && obj.length === 4 && obj.every((n) => typeof n === 'number');
}

type VectorArgument = Vector2 | Vector3 | Vector4 | number[];
function vectorImpl<TArgs extends any[]>(
   operation: (v: number, value: number, ...args: TArgs) => number,
) {
   return function <
      T extends VectorArgument,
      TValue extends number | VectorArgument | VectorObject,
   >(
      vec?: T,
      value?: TValue,
      ...args: TArgs
   ) {
      if (!vec) return vec;
      if (typeof value === 'number') return vec.map((v) => operation(v, value, ...args)) as T;
      vec = [...vec];
      if (value) {
         if (Array.isArray(value)) {
            for (let i = 0; i < vec.length; i++) {
               if (typeof value[i] === 'number') {
                  vec[i] = operation(vec[i], value[i], ...args);
               }
            }
         } else {
            switch (vec.length) {
               case 4: {
                  vec[3] = operation(vec[3], (value as Vector4Object).w ?? 0, ...args);
               }
               /* falls through */
               case 3: {
                  vec[2] = operation(vec[2], (value as Vector4Object).z ?? 0, ...args);
               }
               /* falls through */
               case 2: {
                  vec[1] = operation(vec[1], (value as Vector4Object).y ?? 0, ...args);
                  vec[0] = operation(vec[0], (value as Vector4Object).x ?? 0, ...args);
               }
            }
         }
      }
      return vec;
   };
}

export function vectorAdd<T extends VectorArgument | undefined>(
   vec: T,
   value?: number | number[],
): T;
export function vectorAdd(vec?: Vector2, value?: VectorObject): Vector2;
export function vectorAdd(vec?: Vector3, value?: VectorObject): Vector3;
export function vectorAdd(vec?: Vector4, value?: VectorObject): Vector4;
export function vectorAdd<T extends VectorArgument>(
   vec?: T,
   value?: number | T | VectorObject,
): T | undefined {
   return vectorImpl((x, n) => x + n)(vec, value);
}

export function vectorSub<T extends VectorArgument | undefined>(
   vec: T,
   value?: number | number[],
): T;
export function vectorSub(vec?: Vector2, value?: VectorObject): Vector2;
export function vectorSub(vec?: Vector3, value?: VectorObject): Vector3;
export function vectorSub(vec?: Vector4, value?: VectorObject): Vector4;
export function vectorSub<T extends VectorArgument>(
   vec?: T,
   value?: number | T | VectorObject,
): T | undefined {
   return vectorImpl((x, n) => x - n)(vec, value);
}

export function vectorMul<T extends VectorArgument | undefined>(
   vec: T,
   value?: number | number[],
): T;
export function vectorMul(vec?: Vector2, value?: VectorObject): Vector2;
export function vectorMul(vec?: Vector3, value?: VectorObject): Vector3;
export function vectorMul(vec?: Vector4, value?: VectorObject): Vector4;
export function vectorMul<T extends VectorArgument>(
   vec?: T,
   value?: number | T | VectorObject,
): T | undefined {
   return vectorImpl((x, n) => n ? x * n : x)(vec, value);
}

export function vectorDiv<T extends VectorArgument | undefined>(
   vec: T,
   value?: number | number[],
): T;
export function vectorDiv(vec?: Vector2, value?: VectorObject): Vector2;
export function vectorDiv(vec?: Vector3, value?: VectorObject): Vector3;
export function vectorDiv(vec?: Vector4, value?: VectorObject): Vector4;
export function vectorDiv<T extends VectorArgument>(
   vec?: T,
   value?: number | T | VectorObject,
): T | undefined {
   return vectorImpl((x, n) => n ? x / n : x)(vec, value);
}

export function lerpVector<T extends VectorArgument | undefined>(
   alpha: number,
   vec: T,
   value?: number[],
): T;
export function lerpVector(
   valpha: number,
   ec?: Vector2,
   value?: VectorObject,
): Vector2;
export function lerpVector(
   alpha: number,
   vec?: Vector3,
   value?: VectorObject,
): Vector3;
export function lerpVector(
   alpha: number,
   vec?: Vector4,
   value?: VectorObject,
): Vector4;
export function lerpVector<T extends VectorArgument>(
   alpha: number,
   vec?: T,
   value?: T | VectorObject,
): T | undefined {
   return vectorImpl<[number]>((x, n, alpha) => lerp(alpha, x, n))(vec, value, alpha);
}

export function vectorDistance<T extends VectorArgument>(v1: T, v2: T) {
   const diff = vectorSub(v1, v2);
   let acc = 0;
   for (let i = 0; i < diff.length; i++) {
      const x = diff[i] ** 2;
      acc += x;
   }
   return Math.sqrt(acc);
}

export function vectorIsVertical<T extends VectorArgument>(v1: T, v2: T, epsilon = EPSILON) {
   const [dX] = vectorSub(v1, v2);
   return Math.abs(dX) <= epsilon;
}
export function vectorIsHorizontal<T extends VectorArgument>(v1: T, v2: T, epsilon = EPSILON) {
   const [, dY] = vectorSub(v1, v2);
   return Math.abs(dY) <= epsilon;
}
export function vectorIsDiagonal<T extends VectorArgument>(v1: T, v2: T, epsilon = EPSILON) {
   const [dX, dY] = vectorSub(v1, v2);
   return nearEqual(Math.abs(dX), Math.abs(dY), epsilon);
}

export function vectorIsInline<T extends VectorArgument>(v1: T, v2: T, lapping = 0.5) {
   const distance = vectorDistance(v1, v2);
   return distance <= lapping;
}
export function vectorIsAdjacent<T extends VectorArgument>(v1: T, v2: T, epsilon = EPSILON) {
   const distance = vectorDistance(v1, v2);
   return distance > (0.5 - epsilon) && distance < (1 + epsilon);
}
export function vectorIsWindow<T extends VectorArgument>(v1: T, v2: T, gap = 1.8) {
   const distance = vectorDistance(v1, v2);
   return distance > gap;
}

export function vectorIsSlantedWindow<T extends VectorArgument>(v1: T, v2: T, gap = 1.8) {
   return (
      vectorIsWindow(v1, v2, 1.8) &&
      !vectorIsDiagonal(v1, v2, 0.001) &&
      !vectorIsHorizontal(v1, v2, 0.001) &&
      !vectorIsVertical(v1, v2, 0.001)
   );
}
