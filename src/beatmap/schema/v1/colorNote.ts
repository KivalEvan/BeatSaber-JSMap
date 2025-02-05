import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { INote } from '../../../types/beatmap/v1/note.ts';
import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';
import { createColorNote } from '../../core/colorNote.ts';
import { NoteColor } from '../../shared/constants.ts';

/**
 * Schema serialization for v1 `Color Note`.
 */
export const colorNote: ISchemaContainer<IWrapColorNoteAttribute, INote> = {
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
