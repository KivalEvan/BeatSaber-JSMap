import type { IBombNote } from '../../../types/beatmap/v3/bombNote.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';

export const bombNote: ISchemaContainer<IWrapBombNoteAttribute, IBombNote> = {
   defaultValue: {
      b: 0,
      x: 0,
      y: 0,
      customData: {},
   } as Required<IBombNote>,
   serialize(data: IWrapBombNoteAttribute): IBombNote {
      return {
         b: data.time,
         x: data.posX,
         y: data.posY,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IBombNote> = {}): Partial<IWrapBombNoteAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         posX: data.x ?? this.defaultValue.x,
         posY: data.y ?? this.defaultValue.y,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapBombNoteAttribute) {
      return true;
   },
   isChroma(data: IWrapBombNoteAttribute): boolean {
      return (
         Array.isArray(data.customData.color) ||
         typeof data.customData.spawnEffect === 'boolean' ||
         typeof data.customData.disableDebris === 'boolean'
      );
   },
   isNoodleExtensions(data: IWrapBombNoteAttribute): boolean {
      return (
         Array.isArray(data.customData.animation) ||
         typeof data.customData.disableNoteGravity === 'boolean' ||
         typeof data.customData.disableNoteLook === 'boolean' ||
         typeof data.customData.disableBadCutDirection === 'boolean' ||
         typeof data.customData.disableBadCutSaberType === 'boolean' ||
         typeof data.customData.disableBadCutSpeed === 'boolean' ||
         Array.isArray(data.customData.flip) ||
         typeof data.customData.uninteractable === 'boolean' ||
         Array.isArray(data.customData.localRotation) ||
         typeof data.customData.noteJumpMovementSpeed === 'number' ||
         typeof data.customData.noteJumpStartBeatOffset === 'number' ||
         Array.isArray(data.customData.coordinates) ||
         Array.isArray(data.customData.worldRotation) ||
         typeof data.customData.worldRotation === 'number' ||
         typeof data.customData.link === 'string'
      );
   },
   isMappingExtensions(data: IWrapBombNoteAttribute): boolean {
      return false;
   },
};
