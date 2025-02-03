import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { INote } from '../../../types/beatmap/v1/note.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';

/**
 * Schema serialization for v1 `Bomb Note`.
 */
export const bombNote: ISchemaContainer<IWrapBombNoteAttribute, INote> = {
   serialize(data) {
      return {
         _time: data.time,
         _lineIndex: data.posX,
         _lineLayer: data.posY,
         _type: 3,
         _cutDirection: data.direction,
      };
   },
   deserialize(data) {
      return {
         time: data._time ?? 0,
         laneRotation: 0,
         posX: data._lineIndex ?? 0,
         posY: data._lineLayer ?? 0,
         color: -1,
         direction: data._cutDirection ?? 0,
         customData: {},
      };
   },
};
