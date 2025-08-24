import type { IWrapBPMEvent } from './bpmEvent.ts';
import type { IWrapRotationEvent } from './rotationEvent.ts';
import type { IWrapColorNote } from './colorNote.ts';
import type { IWrapBombNote } from './bombNote.ts';
import type { IWrapObstacle } from './obstacle.ts';
import type { IWrapArc } from './arc.ts';
import type { IWrapChain } from './chain.ts';
import type { ICustomDataDifficulty } from './custom/difficulty.ts';
import type { IWrapBaseItem } from './baseItem.ts';
import type { IWrapNJSEvent } from './njsEvent.ts';

/**
 * Wrapper attribute for beatmap difficulty.
 */
export interface IWrapDifficulty extends IWrapBaseItem {
   bpmEvents: IWrapBPMEvent[];
   rotationEvents: IWrapRotationEvent[];
   colorNotes: IWrapColorNote[];
   bombNotes: IWrapBombNote[];
   obstacles: IWrapObstacle[];
   arcs: IWrapArc[];
   chains: IWrapChain[];
   njsEvents: IWrapNJSEvent[];
   customData: ICustomDataDifficulty;
}
