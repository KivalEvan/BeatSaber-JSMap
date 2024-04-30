import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';
import type { IColorNoteContainer } from '../../../types/beatmap/container/v4.ts';
import type { DeepRequiredIgnore } from '../../../types/utils.ts';
import type { DeepPartial } from '../../../types/utils.ts';

export const colorNote: ISchemaContainer<
   IWrapColorNoteAttribute,
   IColorNoteContainer
> = {
   defaultValue: {
      object: {
         b: 0,
         i: 0,
         r: 0,
         customData: {},
      },
      data: {
         c: 0,
         x: 0,
         y: 0,
         d: 0,
         a: 0,
         customData: {},
      },
   } as DeepRequiredIgnore<IColorNoteContainer, 'customData'>,
   serialize(data: IWrapColorNoteAttribute): IColorNoteContainer {
      return {
         object: {
            b: data.time,
            i: 0,
            r: data.laneRotation,
            customData: {},
         },
         data: {
            c: data.color,
            x: data.posX,
            y: data.posY,
            d: data.direction,
            a: data.angleOffset,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(
      data: DeepPartial<IColorNoteContainer> = {}
   ): Partial<IWrapColorNoteAttribute> {
      return {
         time: data.object?.b ?? this.defaultValue.object.b,
         laneRotation: data.object?.r ?? this.defaultValue.object.r,
         posX: data.data?.x ?? this.defaultValue.data.x,
         posY: data.data?.y ?? this.defaultValue.data.y,
         color: data.data?.c ?? this.defaultValue.data.c,
         direction: data.data?.d ?? this.defaultValue.data.d,
         angleOffset: data.data?.a ?? this.defaultValue.data.a,
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData
         ),
      };
   },
   isValid(data: IWrapColorNoteAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapColorNoteAttribute): boolean {
      return (
         Array.isArray(data.customData.color) ||
         typeof data.customData.spawnEffect === 'boolean' ||
         typeof data.customData.disableDebris === 'boolean'
      );
   },
   isNoodleExtensions(data: IWrapColorNoteAttribute): boolean {
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
   isMappingExtensions(data: IWrapColorNoteAttribute): boolean {
      return true;
   },
};
