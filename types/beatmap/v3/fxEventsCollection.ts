import { IFxEventFloat } from './fxEventFloat.ts';
import { IFxEventInt } from './fxEventInt.ts';

// does this exist in beatmap schema?
export interface IFxEventsCollection {
   _fl: IFxEventFloat[];
   _il: IFxEventInt[];
}
