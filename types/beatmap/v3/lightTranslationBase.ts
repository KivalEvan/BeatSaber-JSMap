import { ICustomDataBase } from '../shared/custom/customData.ts';

export interface ILightTranslationBase {
   /** Relative beat time `<float>` to event box group. */
   b?: number;
   /** Ease type `<int>` of light translation. */
   e?: number;
   /** Use previous event translation value `<int>` in light translation. */
   p?: 0 | 1;
   /** Translation value `<float>` of light translation. */
   t?: number;
   customData?: ICustomDataBase;
}
