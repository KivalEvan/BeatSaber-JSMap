/** Clamp value between min and max. */
export function clamp(value: number, min: number, max: number): number {
   return Math.min(Math.max(min, value), max);
}

/**
 * Normalize value to 0-1 from given min and max value.
 *
 * Returns 1 if `min == max`, values beyond will be extrapolated.
 */
export function normalize(value: number, min: number, max: number): number {
   if (min === max) return 1;
   return (value - min) / (max - min);
}

/**
 * Linear interpolate between start to end time given alpha value.
 * ```ts
 * const num = lerp(0.5, 4, 8); // returns 6
 * ```
 *
 * Alpha value must be in range of `0-1`, otherwise extrapolated.
 */
export function lerp(alpha: number, from: number, to: number): number {
   return from + (to - from) * alpha;
}

/**
 * Returns alpha value from interpolated value.
 * ```ts
 * const num = invLerp(6, 4, 8); // returns 0.5
 * ```
 */
export function invLerp(value: number, from: number, to: number): number {
   return (value - from) / (to - from);
}

/**
 * Remap the value from original range to target range.
 * ```ts
 * const num = remap(6, 4, 8, 40, 60); // returns 50
 * ```
 */
export function remap(
   value: number,
   origFrom: number,
   origTo: number,
   targetFrom: number,
   targetTo: number,
): number {
   const alpha = invLerp(value, origFrom, origTo);
   return lerp(alpha, targetFrom, targetTo);
}

/** Returns true if both value are approximately equal within given tolerance. */
export function nearEqual(
   n1: number,
   n2: number,
   tolerance = Number.EPSILON,
): boolean {
   return Math.abs(n1 - n2) <= tolerance;
}

/** Generate 32-bit hash with Java implementation. */
export function hashCode(str: string | number | bigint): number {
   str = str.toString();
   let hash = 0;
   for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
   }
   return hash;
}

/** Return number tuple in order. */
export function rearrangeTuple(
   min: number,
   max: number,
   inverse?: boolean,
): [number, number] {
   if (!inverse && min > max) {
      return [max, min];
   }
   if (inverse && min < max) {
      return [max, min];
   }
   return [min, max];
}

/** Round number to given decimal places. */
export function round(num: number, d = 0): number {
   const r = Math.pow(10, d);
   return Math.round(num * r) / r;
}

/** Sum numbers in an array. */
export function sumAry(nums: number[]): number {
   let sum = 0;
   for (const n of nums) sum += n;
   return sum;
}

/** Product numbers in an array. */
export function productAry(nums: number[]): number {
   if (!nums.length) {
      return 0;
   }
   let prod = 1;
   for (const n of nums) prod *= n;
   return prod;
}

/** Mean of numbers in an array. */
export function mean(nums: number[]): number {
   if (!nums.length) {
      return 0;
   }
   return sumAry(nums) / nums.length;
}

/** Median of numbers in an array. */
export function median(nums: number[]): number {
   if (!nums.length) {
      return 0;
   }
   const ary = nums.map((n: number) => n).sort((a: number, b: number) => a - b);
   const mid = Math.floor(ary.length / 2);
   if (ary.length % 2) {
      return ary[mid];
   }
   return (ary[mid - 1] + ary[mid]) / 2;
}

// thanks Top_Cat#1961 for math guidance
/**
 * Modulo function that can handle negative number.
 */
export function mod(x: number, m: number): number {
   if (m < 0) m = -m;
   const r = x % m;
   return r < 0 ? r + m : r;
}

/**
 * Get lowest difference between two numbers modulo m.
 */
export function lowestDifferenceMod(a: number, b: number, m: number): number {
   return Math.min(mod(a - b, m), mod(b - a, m));
}
