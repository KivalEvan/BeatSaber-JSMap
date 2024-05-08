import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { INote } from '../../../types/beatmap/v1/note.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';

export const bombNote: ISchemaContainer<IWrapBombNoteAttribute, INote> = {
   defaultValue: {
      _time: 0,
      _lineIndex: 0,
      _lineLayer: 0,
      _type: 3,
      _cutDirection: 0,
   } as Required<INote>,
   serialize(data: IWrapBombNoteAttribute): INote {
      return {
         _time: data.time,
         _lineIndex: data.posX,
         _lineLayer: data.posY,
         _type: 3,
         _cutDirection: data.direction,
      };
   },
   deserialize(data: Partial<INote> = {}): Partial<IWrapBombNoteAttribute> {
      return {
         time: data._time ?? this.defaultValue._time,
         posX: data._lineIndex ?? this.defaultValue._lineIndex,
         posY: data._lineLayer ?? this.defaultValue._lineLayer,
         direction: data.direction
      };
   },
   isValid(_: IWrapBombNoteAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapBombNoteAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapBombNoteAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapBombNoteAttribute): boolean {
      return false;
   },
};
