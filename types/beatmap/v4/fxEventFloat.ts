import { IItem } from './item.ts';

export interface IFxEventFloat extends IItem {
   /** Use previous event value `<int>` in FX event. */
   p?: 0 | 1;
   /** Ease type `<int>` of FX event. */
   e?: -1 | 0 | 1 | 2 | 3;
   /** Value `<float>` of FX event. */
   v?: number;
}
