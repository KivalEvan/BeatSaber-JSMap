/**
 * Return array of numbers given arguments.
 * ```ts
 * range(5); // [0, 1, 2, 3, 4]
 * range(5, true); // [0, 1, 2, 3, 4, 5]
 * range(5, 10); // [5, 6, 7, 8, 9]
 * range(5, 10, true); // [5, 6, 7, 8, 9, 10]
 * range(5, 10, 2); // [5, 7, 9]
 * ```
 */
export function range(n: number, inclusive?: boolean): number[];
export function range(
   start: number,
   end: number,
   inclusive?: boolean,
): number[];
export function range(
   start: number,
   end: number,
   step: number,
   inclusive?: boolean,
): number[];
export function range(
   arg0: number,
   arg1?: number | boolean,
   arg2?: number | boolean,
   arg3?: boolean,
): number[] {
   let start = arg0;
   let inc = arg3;
   let end!: number;
   let step!: number;
   if (typeof arg1 === 'boolean') {
      end = 0;
      inc = arg1;
   } else if (typeof arg1 === 'number') {
      end = arg1;
   } else {
      end = start;
      start = 0;
   }
   if (typeof arg2 === 'boolean') {
      inc = arg2;
   } else {
      step = arg2!;
   }
   if (!step) step = start > end ? -1 : 1;
   const ary = new Array(
      Math.abs(Math.ceil((end - start) / step)) + (inc ? 1 : 0),
   );
   for (let i = 0; i < ary.length; i++) {
      ary[i] = start + i * step;
   }
   return ary;
}

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

/** Move to the next item in an iterable object programatically. */
export function cycle<T extends string | number | symbol>(
   iter: Iterable<T>,
   current: T,
   step = 1,
): T {
   const arr = Object.values(iter);
   const index = arr.indexOf(current);
   if (!(current in arr)) return current;
   return arr[(index + arr.length + step) % arr.length];
}
