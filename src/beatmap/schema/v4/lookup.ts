// deno-lint-ignore-file no-explicit-any
import type { DeepPartial } from '../../../types/utils.ts';
import { resolveIndexed } from '../shared/lookup.ts';

/**
 * Resolve an object from an index in a v4 data array.
 *
 * An omitted array and index resolves to an empty object; an omitted index
 * defaults to 0. Any explicit reference that cannot be resolved throws,
 * including explicit non-array values.
 *
 * @param array The data array to look up from.
 * @param index The index to resolve.
 * @param arrayName Name of the array for error reporting.
 * @returns The resolved object.
 * @throws Error when an explicit reference is missing, unresolvable, or the
 * array is not an array.
 */
export function lookupIndexed<T extends Record<string, any>>(
   array: T[] | undefined,
   index: unknown,
   arrayName: string,
): DeepPartial<T> {
   if (array === undefined && index === undefined) {
      return {} as DeepPartial<T>;
   }
   return resolveIndexed<T>(array, index === undefined ? 0 : index, arrayName) as DeepPartial<T>;
}
