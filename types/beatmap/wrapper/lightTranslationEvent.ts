import type { EaseType } from '../shared/constants.ts';
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap light translation event.
 */
export interface IWrapLightTranslationEventAttribute extends IWrapBaseObjectAttribute {
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

/**
 * Wrapper for beatmap light translation event.
 */
export interface IWrapLightTranslationEvent
   extends IWrapBaseObject, IWrapLightTranslationEventAttribute {
   setPrevious(value: 0 | 1): this;
   setEasing(value: EaseType): this;
   setTranslation(value: number): this;
}
