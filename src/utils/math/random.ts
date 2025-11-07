import { hashCode, rearrangeTuple, round } from './helpers.ts';

// Randomly generate seed if not provided.
let _seed: { ref: number } | undefined;

/**
 * Mulberry32 algorithm.
 *
 * shamelessly taken from stackoverflow
 */
function _pRandom(seed: number | { ref: number }): () => number {
   const _s = typeof seed === 'number' ? { ref: seed } : seed;
   return function () {
      let s = (_s.ref += 0x6d2b79f5);
      s = Math.imul(s ^ (s >>> 15), s | 1);
      s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
      return ((s ^ (s >>> 14)) >>> 0) / 4294967296;
   };
}

let _instPRandom: (() => number) | undefined;

function _random(
   min?: number | boolean,
   max?: number | boolean,
   rounding: number | boolean = false,
   fn: () => number = Math.random,
) {
   if (typeof min === 'boolean' || (!min && typeof min !== 'number')) {
      if (min) {
         return Math.round(fn());
      }
      return fn();
   }
   if (typeof max === 'boolean' || (!max && typeof max !== 'number')) {
      let result = fn() * min;
      if (max) {
         result = Math.round(result);
      }
      return result;
   }
   [min, max] = rearrangeTuple(min, max);
   const result = fn() * (max - min) + min;
   return rounding
      ? round(
         result,
         typeof rounding === 'number' && rounding > 0 ? rounding : 0,
      )
      : result;
}

/**
 * Seeded pseudorandom generator.
 *
 * Based on Mulberry32 PRNG algorithm.
 *
 * **NOTE:** This is globally scoped, any random call elsewhere will affect the consequent call.
 * Consider creating instance of pseudorandom with `pRandomFn` if you need consistency across usage.
 * Reset the random seed to retain same randomness if needed.
 *
 * **WARNING:** This is not meant to be used for security, rather quick and simple for pseudorandom purpose.
 */
export function pRandom(max: number, int?: boolean): number;
export function pRandom(int?: boolean): number;
export function pRandom(min: number, max: number): number;
export function pRandom(min: number, max: number, rounding: boolean): number;
export function pRandom(min: number, max: number, rounding: number): number;
export function pRandom(
   min?: number | boolean,
   max?: number | boolean,
   rounding: number | boolean = false,
): number {
   if (!_instPRandom) {
      if (!_seed) {
         _seed = { ref: hashCode(Math.random()) };
      }
      _instPRandom = _pRandom(_seed);
   }
   return _random(min, max, rounding, _instPRandom);
}

/**
 * Create instance of pseudorandom function.
 * ```ts
 * const pRandom = utils.pRandomFn('seed');
 * console.log(pRandom());
 * ```
 *
 * **NOTE:** Seed cannot be reset.
 */
export function pRandomFn(
   seed: string | number | bigint = Math.random(),
): (
   min?: number | boolean,
   max?: number | boolean,
   rounding?: number | boolean,
) => number {
   const _seed = hashCode(seed);
   const _func = _pRandom(_seed);
   return function (
      min?: number | boolean,
      max?: number | boolean,
      rounding: number | boolean = false,
   ): number {
      return _random(min, max, rounding, _func);
   };
}

/**
 * Set seed for pseudorandom generator.
 *
 * Recalling this resets the seed.
 *
 * If this is never called, defaults to randomly generated seed.
 */
export function pRandomSeed(seed: string | number | bigint): void {
   if (!_seed) {
      _seed = { ref: hashCode(Math.random()) };
   }
   _seed.ref = hashCode(seed);
   if (_instPRandom) {
      _instPRandom = _pRandom(_seed);
   }
}

/** Random number generator helpers using built-in JS Math. */
export function random(max: number, int?: boolean): number;
export function random(int?: boolean): number;
export function random(min: number, max: number): number;
export function random(min: number, max: number, rounding: boolean): number;
export function random(min: number, max: number, rounding: number): number;
export function random(
   min?: number | boolean,
   max?: number | boolean,
   rounding: number | boolean = false,
): number {
   return _random(min, max, rounding, Math.random);
}

/**
 * JS implementation of gaussian random using Box-Muller transformation and skew-normal.
 *
 * This returns value closer to `[-6, 6]` range but can be completely outside of the range due to precision.
 *
 * @link https://spin.atomicobject.com/skew-normal-prng-javascript/
 */
export function randomNormal(
   mean = 0,
   stdev = 1,
   skew = 0,
   rand: () => number = Math.random,
): number {
   let u1 = 0;
   let u2 = 0;
   while (u1 === 0) u1 = rand();
   while (u2 === 0) u2 = rand();

   const mag = Math.sqrt(-2.0 * Math.log(u1));
   const dir = 2.0 * Math.PI * u2;

   const u0 = mag * Math.cos(dir);
   if (!skew) return mean + stdev * u0;

   const v = mag * Math.sin(dir);
   const co = skew / Math.sqrt(1 + skew * skew);
   const u3 = co * u0 + Math.sqrt(1 - co * co) * v;
   const z = u0 >= 0 ? u3 : -u3;
   return mean + stdev * z;
}
