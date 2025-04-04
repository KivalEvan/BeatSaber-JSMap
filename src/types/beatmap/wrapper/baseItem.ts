import type { ICustomDataBase } from '../shared/custom/customData.ts';

/**
 * Wrapper attribute for beatmap item.
 */
export interface IWrapBaseItem {
   /**
    * Custom data of beatmap object.
    *
    * This has no type-safety for unsupported data.
    *
    * **Type:** `object`
    */
   customData: ICustomDataBase;
}
