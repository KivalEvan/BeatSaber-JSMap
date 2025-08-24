import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { INote } from '../../schema/v2/types/note.ts';
import type { IWrapColorNote } from '../../core/types/colorNote.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createColorNote } from '../../core/colorNote.ts';
import { NoteColor } from '../shared/types/constants.ts';

/**
 * Schema serialization for v2 `Color Note`.
 */
export const colorNote: ISchemaContainer<IWrapColorNote, INote> = {
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
