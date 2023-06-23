import { ICustomDataBase } from '../../shared/custom/customData.ts';
import { IAnimation } from './animation.ts';
import { IChromaNote } from './chroma.ts';
import { IHeckBase } from './heck.ts';
import { INESlider } from './noodleExtensions.ts';

export type ICustomDataSlider =
   & ICustomDataBase
   & IHeckBase
   & IChromaNote
   & INESlider
   & IAnimation;
