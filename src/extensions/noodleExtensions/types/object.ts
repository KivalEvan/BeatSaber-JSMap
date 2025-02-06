import type { IWrapArcAttribute } from '../../../types/beatmap/wrapper/arc.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import type { IWrapChainAttribute } from '../../../types/beatmap/wrapper/chain.ts';
import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';
import type { IWrapObstacleAttribute } from '../../../types/beatmap/wrapper/obstacle.ts';

export type INEObject =
   | IWrapColorNoteAttribute
   | IWrapObstacleAttribute
   | IWrapBombNoteAttribute
   | IWrapChainAttribute
   | IWrapArcAttribute;

export type INENote =
   | IWrapColorNoteAttribute
   | IWrapBombNoteAttribute
   | IWrapChainAttribute
   | IWrapArcAttribute;

export type INESlider =
   | IWrapChainAttribute
   | IWrapArcAttribute;
