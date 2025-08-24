import type { IEventBoxGroup } from './eventBoxGroup.ts';
import type { IFxEventBox } from './fxEventBox.ts';

/**
 * Schema for v3 `FX Event Box Group`.
 */
export interface IFxEventBoxGroup extends IEventBoxGroup<IFxEventBox> {
   /**
    * Type of FX event.
    * ```ts
    * 0 -> Int
    * 1 -> Float
    * 2 -> Bool
    * ```
    *
    * **Type:** `i32`
    */
   t?: 0 | 1 | 2;
}
