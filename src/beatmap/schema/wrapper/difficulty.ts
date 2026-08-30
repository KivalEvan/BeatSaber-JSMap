import type { IWrapDifficulty } from './types/difficulty.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';
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
   options?: DeserializationOptions,
): IWrapDifficulty {
   return {
      bpmEvents: data.bpmEvents?.map((item) => createBPMEvent(item, options)) ?? [],
      rotationEvents: data.rotationEvents?.map((item) => createRotationEvent(item, options)) ?? [],
      colorNotes: data.colorNotes?.map((item) => createColorNote(item, options)) ?? [],
      bombNotes: data.bombNotes?.map((item) => createBombNote(item, options)) ?? [],
      obstacles: data.obstacles?.map((item) => createObstacle(item, options)) ?? [],
      arcs: data.arcs?.map((item) => createArc(item, options)) ?? [],
      chains: data.chains?.map((item) => createChain(item, options)) ?? [],
      njsEvents: data.njsEvents?.map((item) => createNJSEvent(item, options)) ?? [],
      customData: copyCustomData(data.customData, options),
   };
}
