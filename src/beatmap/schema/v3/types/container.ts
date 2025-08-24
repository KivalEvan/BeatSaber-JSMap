import type { FxType } from '../../../schema/shared/types/constants.ts';
import type { IEventBoxGroup } from './eventBoxGroup.ts';
import type { IFxEventBox } from './fxEventBox.ts';
import type { IFxEventFloat } from './fxEventFloat.ts';

/**
 * Schema container for v3 `Event Box Group`.
 *
 * Contains generic `TBox` and `TEvent`.
 */
export interface IEventBoxGroupContainer<TBox, TEvent> {
   object: IEventBoxGroup<TBox> & { t: FxType };
   boxData: TEvent[];
}

/**
 * Schema container for v3 `FX Event Float Box Group`.
 *
 * Contains `IFxEventBox` and `IFxEventFloat[]`.
 */
export interface IFxEventFloatBoxContainer {
   data: IFxEventBox;
   eventData: IFxEventFloat[];
}
