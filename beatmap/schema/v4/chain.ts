import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IChainContainer } from '../../../types/beatmap/container/v4.ts';
import type { IWrapChainAttribute } from '../../../types/beatmap/wrapper/chain.ts';
import type { DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';

const defaultValue = {
   object: {
      hb: 0,
      hr: 0,
      tb: 0,
      tr: 0,
      i: 0,
      ci: 0,
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
   chainData: {
      tx: 0,
      ty: 0,
      c: 0,
      s: 0,
      customData: {},
   },
} as DeepRequiredIgnore<IChainContainer, 'customData'>;
export const chain: ISchemaContainer<IWrapChainAttribute, IChainContainer> = {
   defaultValue,
   serialize(data: IWrapChainAttribute): IChainContainer {
      return {
         object: {
            hb: data.time,
            hr: data.laneRotation,
            tb: data.tailTime,
            tr: data.tailLaneRotation,
            i: 0,
            ci: 0,
            customData: {},
         },
         data: {
            c: data.color,
            x: data.posX,
            y: data.posY,
            d: data.direction,
            a: 0,
            customData: {},
         },
         chainData: {
            tx: data.tailPosX,
            ty: data.tailPosY,
            c: data.sliceCount,
            s: data.squish,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(
      data: Partial<IChainContainer> = {},
   ): Partial<IWrapChainAttribute> {
      return {
         time: data.object?.hb ?? defaultValue.object.hb,
         laneRotation: data.object?.hr ?? defaultValue.object.hr,
         color: data.data?.c ?? defaultValue.data.c,
         posX: data.data?.x ?? defaultValue.data.x,
         posY: data.data?.y ?? defaultValue.data.y,
         direction: data.data?.d ?? defaultValue.data.d,
         tailTime: data.object?.tb ?? defaultValue.object.tb,
         tailLaneRotation: data.object?.tr ?? defaultValue.object.tr,
         tailPosX: data.chainData?.tx ?? defaultValue.chainData.tx,
         tailPosY: data.chainData?.ty ?? defaultValue.chainData.ty,
         sliceCount: data.chainData?.c ?? defaultValue.chainData.c,
         squish: data.chainData?.s ?? defaultValue.chainData.s,
         customData: deepCopy(
            data.chainData?.customData ?? defaultValue.chainData.customData,
         ),
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
