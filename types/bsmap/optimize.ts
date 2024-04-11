import type { ICleanOptions } from '../beatmap/shared/clean.ts';

export interface IOptimizeOptions extends ICleanOptions {
   /**
    * Allow JSON optimisation to take place.
    *
    * @default true
    */
   enabled?: boolean;
   /**
    * Round number in JSON by decimal point.
    *
    * @default 4
    */
   floatTrim?: number;
   /**
    * Trim string.
    *
    * @default true
    */
   stringTrim?: boolean;
   /**
    * Remove zero-valued attribute in JSON.
    *
    * @default true
    */
   purgeZeros?: boolean;
   /**
    * Deduplicate object in beatmap V4. (EXPERIMENTAL)
    *
    * @default true
    */
   deduplicate?: boolean;
   /**
    * Throw error when encountering null or undefined value.
    *
    * @default true
    */
   throwError?: boolean;
}

export interface IOptimizeOptionsInfo extends IOptimizeOptions {}

export interface IOptimizeOptionsDifficulty extends IOptimizeOptions {}

export interface IOptimizeOptionsLightshow extends IOptimizeOptions {}

export interface IOptimizeOptionsAudioData extends IOptimizeOptions {}
