import { IWrapBombNote } from '../../../types/beatmap/wrapper/bombNote.ts';
import { IWrapColorNote } from '../../../types/beatmap/wrapper/colorNote.ts';
import { IWrapChain } from '../../../types/beatmap/wrapper/chain.ts';
import { IWrapArc } from '../../../types/beatmap/wrapper/arc.ts';
import { IWrapObstacle } from '../../../types/beatmap/wrapper/obstacle.ts';

export type INEObject = IWrapColorNote | IWrapObstacle | IWrapBombNote | IWrapChain | IWrapArc;

export type INENote = IWrapColorNote | IWrapBombNote | IWrapChain | IWrapArc;
