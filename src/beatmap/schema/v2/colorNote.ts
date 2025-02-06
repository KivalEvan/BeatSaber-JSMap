import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { INote } from '../../../types/beatmap/v2/note.ts';
import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createColorNote } from '../../core/colorNote.ts';
import { NoteColor } from '../../shared/constants.ts';

/**
 * Schema serialization for v2 `Color Note`.
 */
export const colorNote: ISchemaContainer<IWrapColorNoteAttribute, INote> = {
   serialize(data) {
      return {
         _time: data.time,
         _type: data.color,
         _lineIndex: data.posX,
         _lineLayer: data.posY,
         _cutDirection: data.direction,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createColorNote({
         time: data._time,
         posX: data._lineIndex,
         posY: data._lineLayer,
         color: [NoteColor.RED, NoteColor.BLUE][data._type ?? 0],
         direction: data._cutDirection,
         customData: data._customData,
      });
   },
};
