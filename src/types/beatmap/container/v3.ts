import type { FxType } from '../../../beatmap/shared/constants.ts';
import type { IEventBoxGroup } from '../v3/eventBoxGroup.ts';
import type { IFxEventBox } from '../v3/fxEventBox.ts';
import type { IFxEventFloat } from '../v3/fxEventFloat.ts';

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
