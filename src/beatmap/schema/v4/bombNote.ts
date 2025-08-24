import type { IBombNoteContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapBombNote } from '../../core/types/bombNote.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBombNote } from '../../core/bombNote.ts';

/**
 * Schema serialization for v4 `Bomb Note`.
 */
export const bombNote: ISchemaContainer<IWrapBombNote, IBombNoteContainer> = {
   serialize(data) {
      return {
         object: {
            b: data.time,
            i: 0,
            r: data.laneRotation,
            customData: {},
         },
         data: {
            x: data.posX,
            y: data.posY,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(data) {
      return createBombNote({
         time: data.object?.b,
         laneRotation: data.object?.r,
         posX: data.data?.x,
         posY: data.data?.y,
         customData: data.data?.customData,
      });
   },
};
