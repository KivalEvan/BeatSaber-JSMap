import type {
   IndexFilterType,
   LimitAlsoAffectsType,
   RandomType,
} from '../../shared/types/constants.ts';
import type { IBaseItem } from './baseItem.ts';

interface IIndexFilterBase extends IBaseItem {
   /**
    * Type of index filter.
    * ```ts
    * 1 -> Division
    * 2 -> Step And Offset
    * ```
    *
    * **Type:** {@linkcode IndexFilterType}
    */
   f?: IndexFilterType;
   /**
    * Parameter 0 in index filter.
    *
    * **Type:** `i32`
    */
   p?: number;
   /**
    * Parameter 1 in index filter.
    *
    * **Type:** `i32`
    */
   t?: number;
   /**
    * Reversed in index filter.
    *
    * Reverse the order for distribution, does not reverse selection.
    *
    * **Type:** `i32`
    */
   r?: 0 | 1;
   /**
    * Chunks of index filter.
    *
    * Pairs next ID by available denominator.
    *
    * **Type:** `i32`
    */
   c?: number;
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
   n?: RandomType;
   /**
    * Random seed `<int>` in index filter.
    *
    * **Type:** `i32`
    */
   s?: number;
   /**
    * Limit (percentage) `<float>` of index filter.
    *
    * Select ID by percentage, rounded up to nearest ID. Disabled if 0.
    *
    * **RANGE:** `0-1` (0% to 100%) strict.
    *
    * **Type:** `f32`
    */
   l?: number;
   /**
    * Limit also affects type `<bitmask>` in index filter.
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
   d?: LimitAlsoAffectsType;
}

interface IIndexFilterSection extends IIndexFilterBase {
   f?: typeof IndexFilterType.DIVISION;
   /**
    * Divide into sections in index filter.
    *
    * **Type:** `i32`
    */
   p?: number;
   /**
    * Get section by ID in index filter.
    *
    * Similar to typical array index starting from `0`.
    *
    * **Type:** `i32`
    */
   t?: number;
}

interface IIndexFilterStepOffset extends IIndexFilterBase {
   f?: typeof IndexFilterType.STEP_AND_OFFSET;
   /**
    * Light ID  in index filter.
    *
    * Select the start ID in group event starting from `0`.
    *
    * **Type:** `i32`
    */
   p?: number;
   /**
    * Skip step in index filter.
    *
    * Jump by amount of step starting from start light ID.
    *
    * **Type:** `i32`
    */
   t?: number;
}

/**
 * Schema for v3 `Index Filter`.
 */
export type IIndexFilter = IIndexFilterSection | IIndexFilterStepOffset;
