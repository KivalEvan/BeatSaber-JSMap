import { ICustomDataBase } from '../../shared/custom/customData.ts';
import { IAnimation } from './animation.ts';
import { IChromaObstacle } from './chroma.ts';
import { IHeckBase } from './heck.ts';
import { INEObstacle } from './noodleExtensions.ts';

export type ICustomDataObstacle =
    & ICustomDataBase
    & IHeckBase
    & IChromaObstacle
    & INEObstacle
    & IAnimation;
