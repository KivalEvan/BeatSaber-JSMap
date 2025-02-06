import type { RandomType } from '../shared/constants.ts';
import type { IndexFilterType } from '../shared/constants.ts';
import type { LimitAlsoAffectsType } from '../shared/constants.ts';
import type { IWrapBaseItem } from './baseItem.ts';

/**
 * Wrapper attribute for beatmap index filter.
 */
export interface IWrapIndexFilter extends IWrapBaseItem {
   /**
    * Type of index filter.
    * ```ts
    * 1 -> Division
    * 2 -> Step And Offset
    * ```
    *
    * **Type:** {@linkcode IndexFilterType}
    */
   type: IndexFilterType;
   /**
    * Parameter 0 in index filter.
    * ```ts
    * Division -> Section
    * Step And Offset -> ID
    * ```
    *
    * **Type:** `i32`
    */
   p0: number;
   /**
    * Parameter 1 in index filter.
    * ```ts
    * Division -> ID
    * Step And Offset -> Step
    * ```
    *
    * **Type:** `i32`
    */
   p1: number;
   /**
    * Reversed in index filter.
    *
    * Reverse the order for distribution, does not reverse selection.
    *
    * **Type:** `i32`
    */
   reverse: 0 | 1;
   /**
    * Chunks of index filter.
    *
    * Pairs next ID by available denominator.
    *
    * **Type:** `i32`
    */
   chunks: number;
   /**
    * Random type of index filter.
    * ```ts
    * 0 -> No Random
    * 1 -> Keep Order
    * 2 -> Random Elements
    * 3 -> All
    * ```
    *
    * **Type:** {@linkcode RandomType}
    */
   random: RandomType;
   /**
    * Random seed in index filter.
    *
    * **Type:** `i32`
    */
   seed: number;
   /**
    * Limit (percentage) of index filter.
    *
    * Select ID by percentage, rounded up to nearest ID. Defaults to 100% if value is 0.
    *
    * **RANGE:** `0-1` (0% to 100%) strict.
    *
    * **Type:** `f32`
    */
   limit: number;
   /**
    * Limit also affects type in index filter.
    * ```ts
    * 0 -> None
    * 1 -> Duration
    * 2 -> Distribution
    * 3 -> All
    * ```
    *
    * Adjust to limited ID list and has no effect with `Step` type.
    *
    * **Type:** {@linkcode LimitAlsoAffectsType}
    */
   limitAffectsType: LimitAlsoAffectsType;
}
