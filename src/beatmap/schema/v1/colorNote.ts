import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { INote } from '../../../types/beatmap/v1/note.ts';
import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';

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
      return {
         time: data._time ?? 0,
         laneRotation: 0,
         posX: data._lineIndex ?? 0,
         posY: data._lineLayer ?? 0,
         color: data._type as 0 ?? 0,
         direction: data._cutDirection ?? 0,
         angleOffset: 0,
         customData: {},
      };
   },
};
