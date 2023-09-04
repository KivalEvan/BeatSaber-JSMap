/** Fisher–Yates shuffle algorithm. */
export function shuffle<T>(array: T[], fn = Math.random): void {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(fn() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
}

export function interleave<T, U>([x, ...xs]: T[], ys: U[] = []): (T | U)[] {
   return x === undefined
      ? ys // base: no x
      : [x, ...interleave(ys, xs)]; // inductive: some x
}

export function pickRandom<T>(ary: T[], fn = Math.random): T {
   return ary[Math.floor(fn() * ary.length)];
}

/**
 * Simple old-fashioned deep copy JSON object or JSON array.
 *
 * Works best with only primitive object. Use `structuredClone()` for more complicated objects, or `clone()` or similar object method if available.
 *
 * **WARNING:** Slow and memory intensive operation especially for very large object.
 */
export function deepCopy<T>(object: T): T {
   if (typeof object !== 'object' || typeof object === null || typeof object === undefined) {
      return object;
   }
   return JSON.parse(JSON.stringify(object));
}

/**
 * Fast and simple copy.
 *
 * Works best for flat object like `{ name: 'hello' }`, `[0, 1, 2]` or any other primitives.
 *
 * **WARNING:** Avoid using if contain nested reference.
 */
export function shallowCopy<T>(object: T): T {
   if (typeof object !== 'object' || typeof object === null || typeof object === undefined) {
      return object;
   }
   if (Array.isArray(object)) return [...object] as T;
   return { ...object };
}

export function isHex(hex: string): boolean {
   return /^[a-fA-F0-9]+$/g.test(hex);
}

export function hexToDec(hex: string): number {
   return parseInt(hex, 16);
}

export function decToHex(val: number): string {
   const hex = val.toString(16);
   return hex;
}
