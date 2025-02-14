import type { DeepWritable, Writable } from '../../types/utils.ts';

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
   const newObj: any = Array.isArray(object) ? new Array(object.length) : {};
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

/** Check if an object has key/value pairs */
export function isRecord<T extends Record<string, unknown>>(data: unknown): data is T {
   return !!data && typeof data === 'object';
}

/** Check if object is empty. */
export function isEmpty(obj: Record<string, unknown>): boolean {
   for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
         return false;
      }
   }
   return true;
}
