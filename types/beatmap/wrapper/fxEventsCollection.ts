import type { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';
import type { IWrapFxEventFloat, IWrapFxEventFloatAttribute } from './fxEventFloat.ts';
import type { IWrapFxEventInt, IWrapFxEventIntAttribute } from './fxEventInt.ts';

/**
 * Wrapper attribute for beatmap FX events collection.
 */
export interface IWrapFxEventsCollectionAttribute extends IWrapBaseItemAttribute {
   floatList: IWrapFxEventFloatAttribute[];
   intList: IWrapFxEventIntAttribute[];
}

/**
 * Wrapper for beatmap FX events collection.
 */
export interface IWrapFxEventsCollection extends IWrapBaseItem, IWrapBaseItemAttribute {
   floatList: IWrapFxEventFloat[];
   intList: IWrapFxEventInt[];
}
