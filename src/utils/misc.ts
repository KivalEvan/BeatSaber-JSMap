import type { DeepWritable, Writable } from '../types/utils.ts';

/**
 * Shuffle array in-place.
 *
 * Using Fisher–Yates shuffle algorithm.
 */
export function shuffle<T>(array: T[], fn = Math.random): T[] {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(fn() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
}

/**
 * Interleave two arrays.
 *
 * ```ts
 * interleave([1, 2, 3], [4, 5, 6]); // [1, 4, 2, 5, 3, 6]
 * ```
 */
export function interleave<T, U>([x, ...xs]: T[], ys: U[] = []): (T | U)[] {
   return x === undefined
      ? ys // base: no x
      : [x, ...interleave(ys, xs)]; // inductive: some x
}

/** Pick random element from array */
export function pickRandom<T>(ary: T[], fn = Math.random): T {
   return ary[Math.floor(fn() * ary.length)];
}

/**
 * Fast and simple copy for flat object like `{ name: 'hello' }`, `[0, 1, 2]` or any other primitives.
 *
 * **WARNING:** Avoid using if contain nested object.
 */
export function shallowCopy<T>(object: T): T;
export function shallowCopy<T>(object: T, omitReadonly: true): Writable<T>;
export function shallowCopy<T>(object: T, omitReadonly: boolean): T;
export function shallowCopy<T>(object: T) {
   if (object === null || object === undefined || typeof object !== 'object') {
      return object;
   }
   if (Array.isArray(object)) return [...object] as T;
   return { ...object };
}

/**
 * Recursive copy, used for nested object.
 *
 * Works best with only primitive object. Use `structuredClone()` for more complicated objects, or `clone()` or similar object method if available.
 */
export function deepCopy<T>(object: T): T;
export function deepCopy<T>(object: T, omitReadonly: true): DeepWritable<T>;
export function deepCopy<T>(object: T, omitReadonly: boolean): T;
export function deepCopy<T>(object: T) {
   if (object === null || object === undefined || typeof object !== 'object') {
      return object;
   }
   // deno-lint-ignore no-explicit-any
   const newObj: any = Array.isArray(object) ? Array(object.length) : {};
   for (const k in object) {
      newObj[k] = deepCopy(object[k]);
   }
   return newObj;
}

/**
 * Simple old-fashioned deep copy JSON object or JSON array.
 *
 * Works best with only primitive object. Use `structuredClone()` for more complicated objects, or `clone()` or similar object method if available.
 *
 * **WARNING:** Memory intensive operation especially for very large object.
 */
export function jsonCopy<T>(object: T): T;
export function jsonCopy<T>(object: T, omitReadonly: true): DeepWritable<T>;
export function jsonCopy<T>(object: T, omitReadonly: boolean): T;
export function jsonCopy<T>(object: T): DeepWritable<T> {
   return JSON.parse(JSON.stringify(object));
}

/** Check if string is valid hexadecimal */
export function isHex(hex: string): boolean {
   return /^[a-fA-F0-9]+$/g.test(hex);
}
/** Check if an object has key/value pairs */
export function isRecord<T extends Record<string, unknown>>(data: unknown): data is T {
   return !!data && typeof data === 'object';
}

/** Convert hexadecimal to decimal */
export function hexToDec(hex: string): number {
   return parseInt(hex, 16);
}

/** Convert decimal to hexadecimal */
export function decToHex(val: number): string {
   const hex = val.toString(16);
   return hex;
}
