import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { INote } from '../../../types/beatmap/v1/note.ts';
import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';

export const colorNote: ISchemaContainer<IWrapColorNoteAttribute, INote> = {
   defaultValue: {
      _time: 0,
      _lineIndex: 0,
      _lineLayer: 0,
      _type: 0,
      _cutDirection: 0,
   } as Required<INote>,
   serialize(data: IWrapColorNoteAttribute): INote {
      return {
         _time: data.time,
         _lineIndex: data.posX,
         _lineLayer: data.posY,
         _type: data.color,
         _cutDirection: data.direction,
      };
   },
   deserialize(data: Partial<INote> = {}): Partial<IWrapColorNoteAttribute> {
      return {
         time: data._time ?? this.defaultValue._time,
         posX: data._lineIndex ?? this.defaultValue._lineIndex,
         posY: data._lineLayer ?? this.defaultValue._lineLayer,
         color: (data._type ?? this.defaultValue._type) as 0,
         direction: data._cutDirection ?? this.defaultValue._cutDirection,
      };
   },
   isValid(_: IWrapColorNoteAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapColorNoteAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapColorNoteAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapColorNoteAttribute): boolean {
      return false;
   },
};
