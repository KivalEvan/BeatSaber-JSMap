import type { IWrapDifficulty } from './types/difficulty.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createArc } from './arc.ts';
import { createBombNote } from './bombNote.ts';
import { createBPMEvent } from './bpmEvent.ts';
import { createChain } from './chain.ts';
import { createColorNote } from './colorNote.ts';
import { createNJSEvent } from './njsEvent.ts';
import { createObstacle } from './obstacle.ts';
import { createRotationEvent } from './rotationEvent.ts';

export function createDifficulty(
   data: DeepPartial<IWrapDifficulty> = {},
): IWrapDifficulty {
   return {
      bpmEvents: data.bpmEvents?.map(createBPMEvent) ?? [],
      rotationEvents: data.rotationEvents?.map(createRotationEvent) ?? [],
      colorNotes: data.colorNotes?.map(createColorNote) ?? [],
      bombNotes: data.bombNotes?.map(createBombNote) ?? [],
      obstacles: data.obstacles?.map(createObstacle) ?? [],
      arcs: data.arcs?.map(createArc) ?? [],
      chains: data.chains?.map(createChain) ?? [],
      njsEvents: data.njsEvents?.map(createNJSEvent) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}
