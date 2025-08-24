import type { IWrapArc } from '../../../../beatmap/core/types/arc.ts';
import type { IWrapBombNote } from '../../../../beatmap/core/types/bombNote.ts';
import type { IWrapChain } from '../../../../beatmap/core/types/chain.ts';
import type { IWrapColorNote } from '../../../../beatmap/core/types/colorNote.ts';
import type { IWrapObstacle } from '../../../../beatmap/core/types/obstacle.ts';

export type INEObject =
   | IWrapColorNote
   | IWrapObstacle
   | IWrapBombNote
   | IWrapChain
   | IWrapArc;

export type INENote =
   | IWrapColorNote
   | IWrapBombNote
   | IWrapChain
   | IWrapArc;

export type INESlider =
   | IWrapChain
   | IWrapArc;
