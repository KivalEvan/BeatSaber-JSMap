import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWaypoint } from '../../../types/beatmap/v2/waypoint.ts';
import type { IWrapWaypointAttribute } from '../../../types/beatmap/wrapper/waypoint.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const waypoint: ISchemaContainer<IWrapWaypointAttribute, IWaypoint> = {
   defaultValue: {
      _time: 0,
      _lineIndex: 0,
      _lineLayer: 0,
      _offsetDirection: 0,
      _customData: {},
   } as Required<IWaypoint>,
   serialize(data: IWrapWaypointAttribute): IWaypoint {
      return {
         _time: data.time,
         _lineIndex: data.posX,
         _lineLayer: data.posY,
         _offsetDirection: data.direction,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IWaypoint> = {}): Partial<IWrapWaypointAttribute> {
      return {
         time: data._time ?? this.defaultValue._time,
         posX: data._lineIndex ?? this.defaultValue._lineIndex,
         posY: data._lineLayer ?? this.defaultValue._lineLayer,
         direction: data._offsetDirection ?? this.defaultValue._offsetDirection,
         customData: deepCopy(
            data._customData ?? this.defaultValue._customData,
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
