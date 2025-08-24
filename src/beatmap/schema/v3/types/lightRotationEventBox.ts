import type { Axis, DistributionType } from '../../shared/types/constants.ts';
import type { IEventBox } from './eventBox.ts';
import type { ILightRotationEvent } from './lightRotationEvent.ts';

export interface ILightRotationEventBox extends IEventBox {
   /**
    * Rotation distribution of light rotation event box.
    *
    * **Type:** `f32`
    */
   s?: number;
   /**
    * Rotation distribution type of light rotation event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    *
    * **Type:** {@linkcode DistributionType}
    */
   t?: DistributionType;
   /**
    * Axis of light rotation event box.
    * ```ts
    * 0 -> X
    * 1 -> Y
    * 2 -> Z
    * ```
    *
    * **Type:** {@linkcode Axis}
    */
   a?: Axis;
   /**
    * Flip rotation in light rotation event box.
    *
    * **Type:** `i32`
    */
   r?: 0 | 1;
   /**
    * Rotation distribution should affect first event of light rotation event box.
    *
    * **Type:** `i32`
    */
   b?: 0 | 1;
   /** Light rotation base data list. */
   l?: ILightRotationEvent[];
}
