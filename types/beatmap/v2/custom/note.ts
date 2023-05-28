import { ICustomDataBase } from '../../shared/custom/customData.ts';
import { IAnimation } from './animation.ts';
import { IChromaNote } from './chroma.ts';
import { IHeckBase } from './heck.ts';
import { INENote } from './noodleExtensions.ts';

export type ICustomDataNote = ICustomDataBase & IHeckBase & IChromaNote & INENote & IAnimation;
