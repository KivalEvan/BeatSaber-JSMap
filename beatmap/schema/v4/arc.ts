import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapArcAttribute } from '../../../types/beatmap/wrapper/arc.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IArcContainer } from '../../../types/beatmap/container/v4.ts';
import type { DeepRequiredIgnore } from '../../../types/utils.ts';

export const arc: ISchemaContainer<IWrapArcAttribute, IArcContainer> = {
   defaultValue: {
      object: {
         ai: 0,
         hb: 0,
         hi: 0,
         hr: 0,
         tb: 0,
         ti: 0,
         tr: 0,
         customData: {},
      },
      data: {
         m: 0,
         tm: 0,
         a: 0,
         customData: {},
      },
      headData: {
         c: 0,
         x: 0,
         y: 0,
         d: 0,
         a: 0,
         customData: {},
      },
      tailData: {
         c: 0,
         x: 0,
         y: 0,
         d: 0,
         a: 0,
         customData: {},
      },
   } as DeepRequiredIgnore<IArcContainer, 'customData'>,
   serialize(data: IWrapArcAttribute): IArcContainer {
      return {
         object: {
            ai: 0,
            hb: data.time,
            hi: 0,
            hr: data.laneRotation,
            tb: data.tailTime,
            ti: 0,
            tr: data.tailLaneRotation,
            customData: {},
         },
         data: {
            m: data.lengthMultiplier,
            tm: data.tailLengthMultiplier,
            a: data.midAnchor,
            customData: deepCopy(data.customData),
         },
         headData: {
            c: data.color,
            x: data.posX,
            y: data.posY,
            d: data.direction,
            a: 0,
            customData: {},
         },
         tailData: {
            c: data.color,
            x: data.tailPosX,
            y: data.tailPosY,
            d: data.tailDirection,
            a: 0,
            customData: {},
         },
      };
   },
   deserialize(data: Partial<IArcContainer> = {}): Partial<IWrapArcAttribute> {
      return {
         time: data.object?.hb ?? this.defaultValue.object.hb,
         laneRotation: data.object?.hr ?? this.defaultValue.object.hr,
         tailTime: data.object?.tb ?? this.defaultValue.object.tb,
         tailLaneRotation: data.object?.tr ?? this.defaultValue.object.tr,
         color: data.headData?.c ?? this.defaultValue.headData.c,
         posX: data.headData?.x ?? this.defaultValue.headData.x,
         posY: data.headData?.y ?? this.defaultValue.headData.y,
         direction: data.headData?.d ?? this.defaultValue.headData.d,
         lengthMultiplier: data.data?.m ?? this.defaultValue.data.m,
         tailPosX: data.tailData?.x ?? this.defaultValue.tailData.x,
         tailPosY: data.tailData?.y ?? this.defaultValue.tailData.y,
         tailDirection: data.tailData?.d ?? this.defaultValue.tailData.c,
         tailLengthMultiplier: data.data?.tm ?? this.defaultValue.data.tm,
         midAnchor: data.data?.a ?? this.defaultValue.data.a,
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData
         ),
      };
   },
   isValid(data: IWrapArcAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapArcAttribute): boolean {
      return (
         Array.isArray(data.customData.color) ||
         typeof data.customData.spawnEffect === 'boolean' ||
         typeof data.customData.disableDebris === 'boolean'
      );
   },
   isNoodleExtensions(data: IWrapArcAttribute): boolean {
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
         Array.isArray(data.customData.tailCoordinates) ||
         Array.isArray(data.customData.worldRotation) ||
         typeof data.customData.worldRotation === 'number' ||
         typeof data.customData.link === 'string'
      );
   },
   isMappingExtensions(data: IWrapArcAttribute): boolean {
      return false;
   },
};
