import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { INote } from '../../../types/beatmap/v1/note.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import { createBombNote } from '../../core/bombNote.ts';

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
      return createBombNote({
         time: data._time,
         posX: data._lineIndex,
         posY: data._lineLayer,
         direction: data._cutDirection,
      });
   },
};
