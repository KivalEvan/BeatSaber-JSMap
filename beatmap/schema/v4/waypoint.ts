import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWaypointContainer } from '../../../types/beatmap/container/v4.ts';
import type { IWrapWaypointAttribute } from '../../../types/beatmap/wrapper/waypoint.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const waypoint: ISchemaContainer<
   IWrapWaypointAttribute,
   IWaypointContainer
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
         d: 0,
         customData: {},
      },
   } as DeepRequiredIgnore<IWaypointContainer, 'customData'>,
   serialize(data: IWrapWaypointAttribute): Required<IWaypointContainer> {
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
            d: data.direction,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(
      data: DeepPartial<IWaypointContainer> = {},
   ): Partial<IWrapWaypointAttribute> {
      return {
         time: data.object?.b ?? this.defaultValue.object.b,
         laneRotation: data.object?.r ?? this.defaultValue.object.r,
         posX: data.data?.x ?? this.defaultValue.data.x,
         posY: data.data?.y ?? this.defaultValue.data.y,
         direction: data.data?.d ?? this.defaultValue.data.d,
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData,
         ),
      };
   },
   isValid(_: IWrapWaypointAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapWaypointAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapWaypointAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapWaypointAttribute): boolean {
      return false;
   },
};
