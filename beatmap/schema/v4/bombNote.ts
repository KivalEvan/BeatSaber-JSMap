import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import type { IBombNoteContainer } from '../../../types/beatmap/container/v4.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';

export const bombNote: ISchemaContainer<
   IWrapBombNoteAttribute,
   IBombNoteContainer
> = {
   defaultValue: {
      object: {
         b: 0,
         i: 0,
         r: 0,
         customData: {},
      },
      data: {
         x: 0,
         y: 0,
         customData: {},
      },
   } as DeepRequiredIgnore<IBombNoteContainer, 'customData'>,
   serialize(data: IWrapBombNoteAttribute): Required<IBombNoteContainer> {
      return {
         object: {
            b: data.time,
            i: 0,
            r: data.laneRotation,
            customData: {},
         },
         data: {
            x: data.posX,
            y: data.posY,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(
      data: DeepPartial<IBombNoteContainer> = {}
   ): Partial<IWrapBombNoteAttribute> {
      return {
         time: data.object?.b ?? this.defaultValue.object.b,
         laneRotation: data.object?.r ?? this.defaultValue.object.r,
         posX: data.data?.x ?? this.defaultValue.data.x,
         posY: data.data?.y ?? this.defaultValue.data.y,
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData
         ),
      };
   },
   isValid(data: IWrapBombNoteAttribute): boolean {
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
