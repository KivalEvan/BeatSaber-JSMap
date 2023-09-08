// deno-lint-ignore-file no-explicit-any
import { assertAlmostEquals, assertEquals, AssertionError } from './deps.ts';
import { EPSILON } from './constants.ts';

export function assertClassObjectMatch(
   actual: Record<PropertyKey, any>,
   expected: Record<PropertyKey, unknown>,
   msg?: string,
): void {
   try {
      for (const key in expected) {
         const original = actual[key];
         const compare = expected[key] as any;
         if (Array.isArray(original)) {
            if (Array.isArray(compare)) {
               if (original.length !== compare.length) {
                  throw new AssertionError(msg ?? `expected ${key} array to be same length`);
               }
               if (
                  original.every(
                     (el) =>
                        typeof el === 'number' || typeof el === 'string' || typeof el === 'boolean',
                  )
               ) {
                  assertEquals(original, compare, msg?.concat(':', key));
               } else {
                  original.forEach((_, i) =>
                     assertClassObjectMatch(original[i], compare[i], msg?.concat(':', key))
                  );
               }
            } else throw new AssertionError(msg ?? `expected ${key} to be array`);
            continue;
         }
         if (!Array.isArray(original) && typeof original === 'object') {
            if (!Array.isArray(compare) && typeof compare === 'object') {
               assertClassObjectMatch(original, compare, msg);
            } else throw new AssertionError(msg ?? `expected ${key} to be object`);
            continue;
         }
         if (typeof original === 'number' && typeof compare === 'number') {
            assertAlmostEquals(original, compare, EPSILON, msg?.concat(':', key));
         }
         assertEquals(original, compare, msg?.concat(':', key));
      }
   } catch (e) {
      throw e;
   }
}
