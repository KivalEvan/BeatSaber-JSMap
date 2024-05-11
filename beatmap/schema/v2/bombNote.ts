import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import type { INote } from '../../../types/beatmap/v2/note.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const bombNote: ISchemaContainer<IWrapBombNoteAttribute, INote> = {
   defaultValue: {
      _time: 0,
      _lineIndex: 0,
      _lineLayer: 0,
      _type: 3,
      _cutDirection: 0,
      _customData: {},
   } as Required<INote>,
   serialize(data: IWrapBombNoteAttribute): INote {
      return {
         _time: data.time,
         _type: 3,
         _lineIndex: data.posX,
         _lineLayer: data.posY,
         _cutDirection: data.direction,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<INote> = {}): Partial<IWrapBombNoteAttribute> {
      return {
         time: data._time ?? this.defaultValue._time,
         posX: data._lineIndex ?? this.defaultValue._lineIndex,
         posY: data._lineLayer ?? this.defaultValue._lineLayer,
         customData: deepCopy(
            data._customData ?? this.defaultValue._customData,
         ),
      };
   },
   isValid(_: IWrapBombNoteAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapBombNoteAttribute): boolean {
      return (
         Array.isArray(data.customData._color) ||
         typeof data.customData._disableSpawnEffect === 'boolean'
      );
   },
   isNoodleExtensions(data: IWrapBombNoteAttribute): boolean {
      return (
         Array.isArray(data.customData._animation) ||
         typeof data.customData._cutDirection === 'number' ||
         typeof data.customData._disableNoteGravity === 'boolean' ||
         typeof data.customData._disableNoteLook === 'boolean' ||
         typeof data.customData._fake === 'boolean' ||
         Array.isArray(data.customData._flip) ||
         typeof data.customData._interactable === 'boolean' ||
         Array.isArray(data.customData._localRotation) ||
         typeof data.customData._noteJumpMovementSpeed === 'number' ||
         typeof data.customData._noteJumpStartBeatOffset === 'number' ||
         Array.isArray(data.customData._position) ||
         Array.isArray(data.customData._rotation)
      );
   },
   isMappingExtensions(_: IWrapBombNoteAttribute): boolean {
      return false;
   },
};
