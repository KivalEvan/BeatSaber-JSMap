import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IObstacle } from '../../../types/beatmap/v3/obstacle.ts';
import type { IWrapObstacleAttribute } from '../../../types/beatmap/wrapper/obstacle.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const obstacle: ISchemaContainer<IWrapObstacleAttribute, IObstacle> = {
   defaultValue: {
      b: 0,
      x: 0,
      y: 0,
      d: 0,
      w: 0,
      h: 0,
      customData: {},
   } as Required<IObstacle>,
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
         time: data.b ?? this.defaultValue.b,
         posX: data.x ?? this.defaultValue.x,
         posY: data.y ?? this.defaultValue.y,
         duration: data.d ?? this.defaultValue.d,
         width: data.w ?? this.defaultValue.w,
         height: data.h ?? this.defaultValue.h,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapObstacleAttribute): boolean {
      return true;
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
