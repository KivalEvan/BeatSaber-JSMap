// deno-lint-ignore-file no-explicit-any
import type { IFilter } from './types/filter.ts';
import type { DeepPartial } from '../../types/utils.ts';

function compareValue(origin: any, compare: any): boolean {
   if (
      Array.isArray(compare) &&
      Array.isArray(origin) &&
      compare.length === origin.length
   ) {
      return compare.every((v, i) => compareValue(origin[i], v));
   }
   if (
      typeof origin === 'object' &&
      typeof compare === 'object' &&
      Object.keys(origin).length === Object.keys(compare).length
   ) {
      for (const k in compare) {
         if (!(k in origin)) {
            return false;
         }
         if (!compareValue(origin[k], compare[k])) {
            return false;
         }
      }
      return true;
   }
   return origin === compare;
}

/**
 * Query function on class object array.
 * ```ts
 * const notesFilter = where(notes, { include: { x: 2, y: [1, 0] }, exclude: { customData: ['color'] } });
 * console.log(...notesFilter);
 * ```
 */
export function where<T extends Record<string, any>, U extends DeepPartial<T>>(
   objects: T[],
   filter: IFilter<U> = {},
): T[] {
   return objects
      .filter((o) => {
         let result = false;
         for (const k in filter.include) {
            const key = k as keyof T;
            const value = filter.include[k];
            if (Array.isArray(value)) {
               result = value.some((p) => compareValue(p, o[key]));
            } else {
               result = compareValue(value, o[key]);
            }
            if (result) {
               break;
            }
         }
         return result;
      })
      .filter((o) => {
         let result = false;
         for (const k in filter.exclude) {
            const key = k as keyof T;
            const value = filter.exclude[k];
            if (Array.isArray(value)) {
               result = value.some((p) => compareValue(p, o[key]));
            } else {
               result = compareValue(value, o[key]);
            }
            if (result) {
               break;
            }
         }
         return !result;
      });
}
