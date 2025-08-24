import type { IWrapBaseItem } from './baseItem.ts';
import type { IWrapFxEventFloat } from './fxEventFloat.ts';
import type { IWrapFxEventInt } from './fxEventInt.ts';

/**
 * Wrapper attribute for beatmap FX events collection.
 */
export interface IWrapFxEventsCollection extends IWrapBaseItem {
   floatList: IWrapFxEventFloat[];
   intList: IWrapFxEventInt[];
}
