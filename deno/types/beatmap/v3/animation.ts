import { IChromaAnimation } from './chroma.ts';
import { INEAnimation } from './noodleExtensions.ts';

export interface IAnimation {
    animation?: INEAnimation | IChromaAnimation;
}
