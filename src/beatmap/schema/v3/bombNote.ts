import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBombNote } from '../../../types/beatmap/v3/bombNote.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createBombNote } from '../../core/bombNote.ts';

/**
 * Schema serialization for v3 `Bomb Note`.
 */
export const bombNote: ISchemaContainer<IWrapBombNoteAttribute, IBombNote> = {
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
