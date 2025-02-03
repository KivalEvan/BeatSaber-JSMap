import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBombNote } from '../../../types/beatmap/v3/bombNote.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import { deepCopy } from '../../../utils/misc.ts';

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
      return {
         time: data.b ?? 0,
         laneRotation: 0,
         posX: data.x ?? 0,
         posY: data.y ?? 0,
         color: -1,
         direction: 0,
         customData: data.customData ?? {},
      };
   },
};
