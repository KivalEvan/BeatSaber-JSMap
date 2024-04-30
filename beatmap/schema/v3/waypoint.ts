import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWaypoint } from '../../../types/beatmap/v3/waypoint.ts';
import type { IWrapWaypointAttribute } from '../../../types/beatmap/wrapper/waypoint.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const waypoint: ISchemaContainer<IWrapWaypointAttribute, IWaypoint> = {
   defaultValue: {
      b: 0,
      x: 0,
      y: 0,
      d: 0,
      customData: {},
   } as Required<IWaypoint>,
   serialize(data: IWrapWaypointAttribute): IWaypoint {
      return {
         b: data.time,
         x: data.posX,
         y: data.posY,
         d: data.direction,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IWaypoint> = {}): Partial<IWrapWaypointAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         posX: data.x ?? this.defaultValue.x,
         posY: data.y ?? this.defaultValue.y,
         direction: data.d ?? this.defaultValue.d,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapWaypointAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapWaypointAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapWaypointAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapWaypointAttribute): boolean {
      return false;
   },
};
