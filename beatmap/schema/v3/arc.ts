import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IArc } from '../../../types/beatmap/v3/arc.ts';
import type { IWrapArcAttribute } from '../../../types/beatmap/wrapper/arc.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const arc: ISchemaContainer<IWrapArcAttribute, IArc> = {
   defaultValue: {
      b: 0,
      c: 0,
      x: 0,
      y: 0,
      d: 0,
      mu: 0,
      tb: 0,
      tx: 0,
      ty: 0,
      tc: 0,
      tmu: 0,
      m: 0,
      customData: {},
   } as Required<IArc>,
   serialize(data: IWrapArcAttribute): IArc {
      return {
         b: data.time,
         c: data.color,
         x: data.posX,
         y: data.posY,
         d: data.direction,
         mu: data.lengthMultiplier,
         tb: data.tailTime,
         tx: data.tailPosX,
         ty: data.tailPosY,
         tc: data.tailDirection,
         tmu: data.tailLengthMultiplier,
         m: data.midAnchor,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IArc> = {}): Partial<IWrapArcAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         color: data.c ?? this.defaultValue.c,
         posX: data.x ?? this.defaultValue.x,
         posY: data.y ?? this.defaultValue.y,
         direction: data.d ?? this.defaultValue.d,
         lengthMultiplier: data.mu ?? this.defaultValue.mu,
         tailTime: data.tb ?? this.defaultValue.tb,
         tailPosX: data.tx ?? this.defaultValue.tx,
         tailPosY: data.ty ?? this.defaultValue.ty,
         tailDirection: data.tc ?? this.defaultValue.tc,
         tailLengthMultiplier: data.tmu ?? this.defaultValue.tmu,
         midAnchor: data.m ?? this.defaultValue.m,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
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
