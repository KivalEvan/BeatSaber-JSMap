import { FxType } from '../../../beatmap/shared/constants.ts';
import { IEventBoxGroup } from '../v3/eventBoxGroup.ts';
import { IFxEventBox } from '../v3/fxEventBox.ts';
import { IFxEventFloat } from '../v3/fxEventFloat.ts';

export interface IEventBoxGroupContainer<TBox, TEvent> {
   object: IEventBoxGroup<TBox> & { t: FxType };
   boxData: TEvent[];
}

export interface IFxEventFloatBoxContainer {
   data: IFxEventBox;
   eventData: IFxEventFloat[];
}
