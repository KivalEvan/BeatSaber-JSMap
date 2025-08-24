// deno-lint-ignore-file no-explicit-any
import type {
   Vector2,
   Vector2Object,
   Vector3,
   Vector3Object,
   Vector4,
   Vector4Object,
} from '../../types/vector.ts';
import { lerp, nearEqual } from './helpers.ts';

type VectorObject =
   | Partial<Vector2Object>
   | Partial<Vector3Object>
   | Partial<Vector4Object>;

/** Check if value is `Vector2` */
export function isVector2(obj: unknown): obj is Vector2 {
   return (
      Array.isArray(obj) &&
      obj.length === 2 &&
      obj.every((n) => typeof n === 'number')
   );
}

/** Check if value is `Vector3` */
export function isVector3(obj: unknown): obj is Vector3 {
   return (
      Array.isArray(obj) &&
      obj.length === 3 &&
      obj.every((n) => typeof n === 'number')
   );
}

/** Check if value is `Vector4` */
export function isVector4(obj: unknown): obj is Vector4 {
   return (
      Array.isArray(obj) &&
      obj.length === 4 &&
      obj.every((n) => typeof n === 'number')
   );
}

type VectorArgument = Vector2 | Vector3 | Vector4 | number[];
function vectorImpl<TArgs extends any[]>(
   operation: (v: number, value: number, ...args: TArgs) => number,
) {
   return function <
      T extends VectorArgument,
      TValue extends number | VectorArgument | VectorObject,
   >(vec?: T, value?: TValue, ...args: TArgs) {
      if (!vec) return vec;
      if (typeof value === 'number') {
         return vec.map((v) => operation(v, value, ...args)) as T;
      }
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
                  vec[3] = operation(
                     vec[3],
                     (value as Vector4Object).w ?? 0,
                     ...args,
                  );
               }
               /* falls through */
               case 3: {
                  vec[2] = operation(
                     vec[2],
                     (value as Vector4Object).z ?? 0,
                     ...args,
                  );
               }
               /* falls through */
               case 2: {
                  vec[1] = operation(
                     vec[1],
                     (value as Vector4Object).y ?? 0,
                     ...args,
                  );
                  vec[0] = operation(
                     vec[0],
                     (value as Vector4Object).x ?? 0,
                     ...args,
                  );
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
   return vectorImpl((x, n) => (n ? x * n : x))(vec, value);
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
   return vectorImpl((x, n) => (n ? x / n : x))(vec, value);
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
   return vectorImpl<[number]>((x, n, alpha) => lerp(alpha, x, n))(
      vec,
      value,
      alpha,
   );
}

export function vectorDistance<T extends VectorArgument>(v1: T, v2: T): number {
   const diff = vectorSub(v1, v2);
   let acc = 0;
   for (let i = 0; i < diff.length; i++) {
      const x = diff[i] ** 2;
      acc += x;
   }
   return Math.sqrt(acc);
}

export function vectorIsVertical<T extends VectorArgument>(
   v1: T,
   v2: T,
   epsilon = 0.001,
): boolean {
   const [dX] = vectorSub(v1, v2);
   return Math.abs(dX) <= epsilon;
}

export function vectorIsHorizontal<T extends VectorArgument>(
   v1: T,
   v2: T,
   epsilon = 0.001,
): boolean {
   const [, dY] = vectorSub(v1, v2);
   return Math.abs(dY) <= epsilon;
}

export function vectorIsDiagonal<T extends VectorArgument>(
   v1: T,
   v2: T,
   epsilon = 0.001,
): boolean {
   const [dX, dY] = vectorSub(v1, v2);
   return nearEqual(Math.abs(dX), Math.abs(dY), epsilon);
}

export function vectorMagnitude(vec: number[]): number {
   let sum = 0;
   for (let i = 0; i < vec.length; i++) {
      sum += vec[i] * vec[i];
   }
   return Math.sqrt(sum);
}

export function vectorNormalize<T extends number[]>(vec: T): T {
   return vectorDiv(vec, vectorMagnitude(vec));
}

export function vectorEqual<T extends VectorArgument>(v1: T, v2: T): boolean {
   if (v1.length !== v2.length) return false;
   for (let i = 0; i < v1.length; i++) {
      if (v1[i] !== v2[i]) return false;
   }
   return true;
}

export function vectorNearEqual<T extends VectorArgument>(
   v1: T,
   v2: T,
   tolerance = 0.001,
): boolean {
   if (v1.length !== v2.length) return false;
   for (let i = 0; i < v1.length; i++) {
      if (!nearEqual(v1[i], v2[i], tolerance)) return false;
   }
   return true;
}

export function vectorDot<T extends VectorArgument>(v1: T, v2: T): number {
   let acc = 0;
   for (let i = 0; i < v1.length; i++) {
      acc += v1[i] * v2[i];
   }
   return acc;
}

export function vectorCross(v1: Vector3, v2: Vector3): Vector3 {
   return [
      v1[1] * v2[2] - v1[2] * v2[1],
      v1[2] * v2[0] - v1[0] * v2[2],
      v1[0] * v2[1] - v1[1] * v2[0],
   ];
}

export function vector2Rotate(v: Vector2, theta: number): Vector2 {
   const c = Math.cos(theta);
   const s = Math.sin(theta);
   return [v[0] * c - v[1] * s, v[0] * s + v[1] * c];
}

export function vector3RotateX(v: Vector3, theta: number): Vector3 {
   const c = Math.cos(theta);
   const s = Math.sin(theta);
   return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

export function vector3RotateY(v: Vector3, theta: number): Vector3 {
   const c = Math.cos(theta);
   const s = Math.sin(theta);
   return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

export function vector3RotateZ(v: Vector3, theta: number): Vector3 {
   const c = Math.cos(theta);
   const s = Math.sin(theta);
   return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]];
}
