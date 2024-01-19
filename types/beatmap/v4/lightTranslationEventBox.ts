import { IEventBoxCommon } from './eventBoxCommon.ts';

export interface ILightTranslationEventBox extends IEventBoxCommon {
   /**
    * Axis `<int>` of light translation event box.
    * ```ts
    * 0 -> X
    * 1 -> Y
    * 2 -> Z
    * ```
    */
   a?: 0 | 1 | 2;
   /** Flip translation `<int>` in light translation event box. */
   f?: 0 | 1;
}
