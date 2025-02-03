import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { INote } from '../../../types/beatmap/v2/note.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v2 `Bomb Note`.
 */
export const bombNote: ISchemaContainer<IWrapBombNoteAttribute, INote> = {
   serialize(data) {
      return {
         _time: data.time,
         _type: 3,
         _lineIndex: data.posX,
         _lineLayer: data.posY,
         _cutDirection: data.direction,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data._time ?? 0,
         laneRotation: 0,
         posX: data._lineIndex ?? 0,
         posY: data._lineLayer ?? 0,
         color: -1,
         direction: 0,
         customData: data._customData ?? {},
      };
   },
};
