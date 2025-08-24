import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IBombNote } from './types/bombNote.ts';
import type { IWrapBombNote } from '../../core/types/bombNote.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBombNote } from '../../core/bombNote.ts';

/**
 * Schema serialization for v3 `Bomb Note`.
 */
export const bombNote: ISchemaContainer<IWrapBombNote, IBombNote> = {
   serialize(data) {
      return {
         b: data.time,
         x: data.posX,
         y: data.posY,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createBombNote({
         time: data.b,
         posX: data.x,
         posY: data.y,
         customData: data.customData,
      });
   },
};
