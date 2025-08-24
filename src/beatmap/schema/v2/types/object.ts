import type { ICustomDataBase } from '../../shared/types/custom/customData.ts';

/**
 * Base schema for v2 `Object`.
 */
export interface IBaseObject {
   /**
    * Beat time of beatmap object.
    *
    * **Type:** `f32`
    */
   _time?: number;
   _customData?: ICustomDataBase;
}
