import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IChain } from '../../../types/beatmap/v3/chain.ts';
import type { IWrapChainAttribute } from '../../../types/beatmap/wrapper/chain.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const chain: ISchemaContainer<IWrapChainAttribute, IChain> = {
   defaultValue: {
      b: 0,
      c: 0,
      x: 0,
      y: 0,
      d: 0,
      tb: 0,
      tx: 0,
      ty: 0,
      sc: 0,
      s: 0,
      customData: {},
   } satisfies Required<IChain>,
   serialize(data: IWrapChainAttribute): IChain {
      return {
         b: data.time,
         c: data.color,
         x: data.posX,
         y: data.posY,
         d: data.direction,
         tb: data.tailTime,
         tx: data.tailPosX,
         ty: data.tailPosY,
         sc: data.sliceCount,
         s: data.squish,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IChain> = {}): Partial<IWrapChainAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         color: data.c ?? this.defaultValue.c,
         posX: data.x ?? this.defaultValue.x,
         posY: data.y ?? this.defaultValue.y,
         direction: data.d ?? this.defaultValue.d,
         tailTime: data.tb ?? this.defaultValue.tb,
         tailPosX: data.tx ?? this.defaultValue.tx,
         tailPosY: data.ty ?? this.defaultValue.ty,
         sliceCount: data.sc ?? this.defaultValue.sc,
         squish: data.s ?? this.defaultValue.s,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapChainAttribute) {
      return true;
   },
   isChroma(data: IWrapChainAttribute): boolean {
      return (
         Array.isArray(data.customData.color) ||
         typeof data.customData.spawnEffect === 'boolean' ||
         typeof data.customData.disableDebris === 'boolean'
      );
   },
   isNoodleExtensions(data: IWrapChainAttribute): boolean {
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
   isMappingExtensions(data: IWrapChainAttribute): boolean {
      return false;
   },
};
