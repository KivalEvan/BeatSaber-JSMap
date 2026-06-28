import type { DeepWritable, Writable } from '../../types/utils.ts';

// deno-lint-ignore no-explicit-any
export function stableJsonKey(value: any): string {
   if (value === null || typeof value !== 'object') {
      return JSON.stringify(value);
   }

   if (Array.isArray(value)) {
      let result = '[';
      for (let i = 0; i < value.length; i++) {
         if (i > 0) result += ',';
         result += stableJsonKey(value[i]);
      }
      return result + ']';
   }

   const keys = Object.keys(value).sort();
   let result = '{';
   for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (i > 0) result += ',';
      result += JSON.stringify(key);
      result += ':';
      result += stableJsonKey(value[key]);
   }

   return result + '}';
}

// deno-lint-ignore no-explicit-any
export function deepEqual(a: any, b: any): boolean {
   if (a === b) return true;

   if (
      a === null ||
      b === null ||
      typeof a !== 'object' ||
      typeof b !== 'object'
   ) {
      return false;
   }

   const isArray = Array.isArray(a);

   if (isArray !== Array.isArray(b)) {
      return false;
   }

   if (isArray) {
      const length = a.length;

      if (length !== b.length) return false;

      for (let i = 0; i < length; i++) {
         if (!deepEqual(a[i], b[i])) return false;
      }

      return true;
   }

   const keys = Object.keys(a);

   if (keys.length !== Object.keys(b).length) {
      return false;
   }

   for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (!(key in b)) {
         return false;
      }

      if (!deepEqual(a[key], b[key])) {
         return false;
      }
   }

   return true;
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
   const newObj: any = Array.isArray(object) ? new Array(object.length) : {};
   if (Array.isArray(object)) {
      for (let i = 0; i < object.length; i++) {
         newObj[i] = deepCopy(object[i]);
      }
      return newObj;
   }
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
export function isRecord<T extends Record<string, unknown>>(
   data: unknown,
): data is T {
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
