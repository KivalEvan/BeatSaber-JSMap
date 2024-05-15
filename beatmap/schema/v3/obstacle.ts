import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IObstacle } from '../../../types/beatmap/v3/obstacle.ts';
import type { IWrapObstacleAttribute } from '../../../types/beatmap/wrapper/obstacle.ts';
import { deepCopy } from '../../../utils/misc.ts';

const defaultValue = {
   b: 0,
   x: 0,
   y: 0,
   d: 0,
   w: 0,
   h: 0,
   customData: {},
} as Required<IObstacle>;
export const obstacle: ISchemaContainer<IWrapObstacleAttribute, IObstacle> = {
   defaultValue,
   serialize(data: IWrapObstacleAttribute): IObstacle {
      return {
         b: data.time,
         x: data.posX,
         y: data.posY,
         d: data.duration,
         w: data.width,
         h: data.height,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IObstacle> = {}): Partial<IWrapObstacleAttribute> {
      return {
         time: data.b ?? defaultValue.b,
         posX: data.x ?? defaultValue.x,
         posY: data.y ?? defaultValue.y,
         duration: data.d ?? defaultValue.d,
         width: data.w ?? defaultValue.w,
         height: data.h ?? defaultValue.h,
         customData: deepCopy(data.customData ?? defaultValue.customData),
      };
   },
   isChroma(data: IWrapObstacleAttribute): boolean {
      return Array.isArray(data.customData.color);
   },
   isNoodleExtensions(data: IWrapObstacleAttribute): boolean {
      return (
         Array.isArray(data.customData.animation) ||
         typeof data.customData.uninteractable === 'boolean' ||
         Array.isArray(data.customData.localRotation) ||
         typeof data.customData.noteJumpMovementSpeed === 'number' ||
         typeof data.customData.noteJumpStartBeatOffset === 'number' ||
         Array.isArray(data.customData.coordinates) ||
         Array.isArray(data.customData.worldRotation) ||
         Array.isArray(data.customData.size)
      );
   },
   isMappingExtensions(data: IWrapObstacleAttribute): boolean {
      return (
         data.posY < 0 ||
         data.posY > 2 ||
         data.posX <= -1000 ||
         data.posX >= 1000 ||
         data.width <= -1000 ||
         data.width >= 1000 ||
         data.height <= -1000 ||
         data.height >= 1000
      );
   },
};
