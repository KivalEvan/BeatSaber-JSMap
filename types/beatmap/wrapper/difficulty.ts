// deno-lint-ignore-file no-explicit-any
import type { IWrapBPMEvent, IWrapBPMEventAttribute } from './bpmEvent.ts';
import type { IWrapRotationEvent, IWrapRotationEventAttribute } from './rotationEvent.ts';
import type { IWrapColorNote, IWrapColorNoteAttribute } from './colorNote.ts';
import type { IWrapBombNote, IWrapBombNoteAttribute } from './bombNote.ts';
import type { IWrapObstacle, IWrapObstacleAttribute } from './obstacle.ts';
import type { IWrapArc, IWrapArcAttribute } from './arc.ts';
import type { IWrapChain, IWrapChainAttribute } from './chain.ts';
import type { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';
import type { LooseAutocomplete } from '../../utils.ts';
import type { GenericFilename } from '../shared/filename.ts';
import type { IFileInfo } from '../shared/filename.ts';

export interface IWrapDifficultyAttribute extends IWrapBaseItemAttribute, IFileInfo {
   bpmEvents: IWrapBPMEventAttribute[];
   rotationEvents: IWrapRotationEventAttribute[];
   colorNotes: IWrapColorNoteAttribute[];
   bombNotes: IWrapBombNoteAttribute[];
   obstacles: IWrapObstacleAttribute[];
   arcs: IWrapArcAttribute[];
   chains: IWrapChainAttribute[];
}

export interface IWrapDifficulty<
   T extends Record<string, any> = IWrapDifficultyAttribute,
> extends IWrapBaseItem<T>, IWrapDifficultyAttribute {
   bpmEvents: IWrapBPMEvent[];
   rotationEvents: IWrapRotationEvent[];
   colorNotes: IWrapColorNote[];
   bombNotes: IWrapBombNote[];
   obstacles: IWrapObstacle[];
   arcs: IWrapArc[];
   chains: IWrapChain[];

   setFilename(filename: LooseAutocomplete<GenericFilename>): this;

   /** Sort beatmap object(s) accordingly. */
   sort(): this;

   addBpmEvents(...data: Partial<IWrapBPMEventAttribute>[]): this;
   addRotationEvents(...data: Partial<IWrapRotationEventAttribute>[]): this;
   addColorNotes(...data: Partial<IWrapColorNoteAttribute>[]): this;
   addBombNotes(...data: Partial<IWrapBombNoteAttribute>[]): this;
   addObstacles(...data: Partial<IWrapObstacleAttribute>[]): this;
   addArcs(...data: Partial<IWrapArcAttribute>[]): this;
   addChains(...data: Partial<IWrapChainAttribute>[]): this;
}
