// deno-lint-ignore-file no-empty-interface
import { ICleanOptions } from '../beatmap/shared/clean.ts';

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
    * Throw error when encountering null or undefined value.
    *
    * @default true
    */
   throwError?: boolean;
}

export interface IOptimizeOptionsInfo extends IOptimizeOptions {}

export interface IOptimizeOptionsDifficulty extends IOptimizeOptions {}
