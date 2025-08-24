import type { EaseType } from '../../schema/shared/types/constants.ts';
import type { IWrapBaseObject } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap light translation event.
 */
export interface IWrapLightTranslationEvent extends IWrapBaseObject {
   /**
    * Relative beat time to event box group.
    *
    * **Type:** `f32`
    */
   time: number;
   /**
    * Ease type of light translation.
    *
    * **Type:** {@linkcode EaseType}
    */
   easing: EaseType;
   /**
    * Use previous event translation value in light translation.
    *
    * **Type:** `i32`
    */
   previous: 0 | 1;
   /**
    * Translation value of light translation.
    *
    * **Type:** `f32`
    */
   translation: number;
}
