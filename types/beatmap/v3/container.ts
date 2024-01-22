import { IEventBoxGroup } from './eventBoxGroup.ts';
import { IFxEventBox } from './fxEventBox.ts';
import { IFxEventFloat } from './fxEventFloat.ts';

export interface IEventBoxGroupContainer<TBox, TEvent> {
   object: IEventBoxGroup<TBox>;
   boxData: TEvent[];
}

export interface IFxEventFloatBoxContainer {
   data: IFxEventBox;
   eventData: IFxEventFloat[];
}
