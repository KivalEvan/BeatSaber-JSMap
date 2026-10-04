import { getLogger } from '../../logger.ts';
import { stableJsonKey } from '../../utils/misc/json.ts';
import { hasOwn } from '../../utils/misc/hasOwn.ts';
import { round } from '../../utils/math/helpers.ts';
import type { IOptimizeOptions } from '../mapping/types/optimize.ts';

function tag(name: string): string[] {
   return ['helpers', name];
}

/**
 * Remap and deduplicate data in array.
 *
 * @param data The data array to remap and deduplicate.
 * @param keySelector The function that gets the deduplication key for each item.
 * @returns The remapped and deduplicated data and a map of the original index to the new index.
 */
export function remapDedupe<T>(
   data: T[],
   keySelector: (item: T) => string = stableJsonKey,
): [T[], number[]] {
   if (data.length < 2) {
      return [data.slice(), data.map((_, i) => i)];
   }

   const seen: Map<string, number> = new Map();
   const unique: T[] = [];
   const indexMap: number[] = new Array(data.length);

   for (let oldIndex = 0; oldIndex < data.length; oldIndex++) {
      const item = data[oldIndex];
      const key = keySelector(item);

      let newIndex = seen.get(key);

      if (newIndex === undefined) {
         newIndex = unique.length;
         seen.set(key, newIndex);
         unique.push(item);
      }

      indexMap[oldIndex] = newIndex;
   }

   return [unique, indexMap];
}

/**
 * Delete props with zero values.
 *
 * @param data The data to purge props.
 */
// deno-lint-ignore no-explicit-any
export function purgeZeros(data: Record<string, any>) {
   for (const k in data) {
      if (
         (typeof data[k] === 'number' || typeof data[k] === 'boolean') &&
         !data[k]
      ) {
         delete data[k];
      }
   }
}

function isEmptyJsonObject(obj: Record<string, unknown>): boolean {
   for (const key in obj) {
      if (!hasOwn(obj, key)) continue;
      // JSON omits these property values, even when the key is present.
      const type = typeof obj[key];
      if (type !== 'undefined' && type !== 'function' && type !== 'symbol') {
         return false;
      }
   }
   return true;
}

/** Recursively clean plain JSON object data in place. */
export function deepClean(
   // deno-lint-ignore no-explicit-any
   obj: { [key: string | number]: any } | any[],
   name: string,
   options: IOptimizeOptions,
) {
   const logger = getLogger();

   for (const k in obj) {
      const d = obj[k];
      if (typeof d === 'number' && options.floatTrim) {
         obj[k] = round(d, options.floatTrim);
         continue;
      }

      if (typeof d === 'string' && options.stringTrim) {
         obj[k] = d.trim();
         continue;
      }

      if (typeof obj[k] === 'boolean') {
         continue;
      }

      // throw or default null to 0
      if (d === null) {
         if (options.throwNullish) {
            throw new Error(`null value found in object key ${name}.${k}.}`);
         } else {
            if (Array.isArray(obj)) {
               logger?.tError(
                  tag('deepClean'),
                  `null value found in array ${name}[${k}], defaulting to 0...`,
               );
               obj[k] = 0;
            } else {
               logger?.tError(
                  tag('deepClean'),
                  `null value found in object key ${name}.${k}, deleting...`,
               );
               delete obj[k];
            }
         }
         continue;
      }

      // recursion stuff
      if (typeof d === 'object') {
         // includes also detects sparse holes. Allocate only when filtering is needed.
         if (Array.isArray(d) && d.includes(undefined)) {
            if (options.throwNullish) {
               throw new Error(
                  `undefined found in array key ${name}.${k}.}`,
               );
            } else {
               const newAry = d.filter((e: unknown) => e !== undefined);
               logger?.tError(
                  tag('deepClean'),
                  `undefined found in array key ${name}.${k}, replacing array with no undefined...`,
               );
               obj[k] = newAry;
            }
         }
         // Preserve cleanup of the original array after replacing the parent's reference.
         deepClean(
            // deno-lint-ignore ban-types
            d as {},
            Array.isArray(obj) ? `${name}[${k}]` : `${name}.${k}`,
            options,
         );

         // remove unnecessary empty array/object property if exist and not part of schema
         if (Array.isArray(d) ? !d.length : isEmptyJsonObject(d)) {
            delete obj[k];
         }
      }
   }
}
