import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { INote } from './types/note.ts';
import type { IWrapBombNote } from '../wrapper/types/bombNote.ts';
import { createBombNote } from '../wrapper/bombNote.ts';

/**
 * Schema serialization for v1 `Bomb Note`.
 */
export const bombNote: ISchemaContainer<IWrapBombNote, INote> = {
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
