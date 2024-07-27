import type { IFxEventFloat } from './fxEventFloat.ts';
import type { IFxEventInt } from './fxEventInt.ts';

/**
 * Schema for v3 `FX Events Collection`.
 */
export interface IFxEventsCollection {
   _fl?: IFxEventFloat[];
   _il?: IFxEventInt[];
}
