import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { INote } from './types/note.ts';
import type { IWrapColorNote } from '../wrapper/types/colorNote.ts';
import { createColorNote } from '../wrapper/colorNote.ts';
import { NoteColor } from '../shared/types/constants.ts';

/**
 * Schema serialization for v1 `Color Note`.
 */
export const colorNote: ISchemaContainer<IWrapColorNote, INote> = {
   serialize(data) {
      return {
         _time: data.time,
         _lineIndex: data.posX,
         _lineLayer: data.posY,
         _type: data.color,
         _cutDirection: data.direction,
      };
   },
   deserialize(data) {
      return createColorNote({
         time: data._time,
         posX: data._lineIndex,
         posY: data._lineLayer,
         color: [NoteColor.RED, NoteColor.BLUE][data._type ?? 0],
         direction: data._cutDirection,
      });
   },
};
