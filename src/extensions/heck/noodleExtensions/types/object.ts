import type { IWrapArc } from '../../../../beatmap/schema/wrapper/types/arc.ts';
import type { IWrapBombNote } from '../../../../beatmap/schema/wrapper/types/bombNote.ts';
import type { IWrapChain } from '../../../../beatmap/schema/wrapper/types/chain.ts';
import type { IWrapColorNote } from '../../../../beatmap/schema/wrapper/types/colorNote.ts';
import type { IWrapObstacle } from '../../../../beatmap/schema/wrapper/types/obstacle.ts';

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
