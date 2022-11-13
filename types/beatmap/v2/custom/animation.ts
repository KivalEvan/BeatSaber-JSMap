import { IChromaAnimation } from './chroma.ts';
import { INEAnimation } from './noodleExtensions.ts';

export interface IAnimation {
    _animation?: INEAnimation & IChromaAnimation;
}
