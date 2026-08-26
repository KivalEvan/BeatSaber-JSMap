/**
 * Resolve a non-nullish element from an indexed array.
 *
 * @example resolveIndexed([{ id: 1 }], 0, 'events');
 * @throws If the array, index, or element is invalid.
 */
export function resolveIndexed<T>(
   array: T[] | undefined,
   index: unknown,
   arrayName: string,
): T {
   if (array === undefined) {
      throw new Error(
         `Invalid beatmap data: "${arrayName}" is required by index ${
            JSON.stringify(index)
         } but missing.`,
      );
   }
   if (!Array.isArray(array)) {
      throw new Error(
         `Invalid beatmap data: "${arrayName}" is expected to be an array but received ${
            JSON.stringify(array)
         }.`,
      );
   }
   if (
      typeof index !== 'number' || !Number.isInteger(index) || index < 0 ||
      index >= array.length
   ) {
      throw new Error(
         `Invalid beatmap data: index ${
            JSON.stringify(index)
         } is out of range for "${arrayName}" (length ${array.length}).`,
      );
   }
   const value = array[index];
   if (value === undefined || value === null) {
      throw new Error(
         `Invalid beatmap data: "${arrayName}[${index}]" is missing.`,
      );
   }
   return value;
}
