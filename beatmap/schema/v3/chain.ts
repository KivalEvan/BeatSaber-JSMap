import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IChain } from '../../../types/beatmap/v3/chain.ts';
import type { IWrapChainAttribute } from '../../../types/beatmap/wrapper/chain.ts';
import { deepCopy } from '../../../utils/misc.ts';

const defaultValue = {
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
} as Required<IChain>;
export const chain: ISchemaContainer<IWrapChainAttribute, IChain> = {
   defaultValue,
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
         time: data.b ?? defaultValue.b,
         color: data.c ?? defaultValue.c,
         posX: data.x ?? defaultValue.x,
         posY: data.y ?? defaultValue.y,
         direction: data.d ?? defaultValue.d,
         tailTime: data.tb ?? defaultValue.tb,
         tailPosX: data.tx ?? defaultValue.tx,
         tailPosY: data.ty ?? defaultValue.ty,
         sliceCount: data.sc ?? defaultValue.sc,
         squish: data.s ?? defaultValue.s,
         customData: deepCopy(data.customData ?? defaultValue.customData),
      };
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
};
