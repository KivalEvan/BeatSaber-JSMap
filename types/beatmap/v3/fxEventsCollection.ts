import { IFxEventFloat } from './fxEventFloat.ts';
import { IFxEventInt } from './fxEventInt.ts';

export interface IFxEventsCollection {
   _fl: IFxEventFloat[];
   _il: IFxEventInt[];
}
