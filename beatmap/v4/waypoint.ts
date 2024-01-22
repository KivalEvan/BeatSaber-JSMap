import { IWaypointContainer } from '../../types/beatmap/v4/container.ts';
import { IObjectLane } from '../../types/beatmap/v4/object.ts';
import { IWaypoint } from '../../types/beatmap/v4/waypoint.ts';
import { IWrapWaypointAttribute } from '../../types/beatmap/wrapper/waypoint.ts';
import { DeepRequiredIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapWaypoint } from '../wrapper/waypoint.ts';

/** Waypoint beatmap v4 class object. */
export class Waypoint extends WrapWaypoint<IWaypointContainer> {
   static default: DeepRequiredIgnore<IWaypointContainer, 'customData'> = {
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
   };

   constructor();
   constructor(object: Partial<IWrapWaypointAttribute<IWaypointContainer>>);
   constructor(object: Partial<IObjectLane>, data?: Partial<IWaypoint>);
   constructor(
      object:
         & Partial<IObjectLane>
         & Partial<IWrapWaypointAttribute<IWaypointContainer>>,
      data?: Partial<IWaypoint>,
   );
   constructor(
      object:
         & Partial<IObjectLane>
         & Partial<IWrapWaypointAttribute<IWaypointContainer>> = {},
      data: Partial<IWaypoint> = {},
   ) {
      super();

      this._time = object.b ?? object.time ?? Waypoint.default.object.b;
      this._laneRotation = object.r ?? object.laneRotation ?? Waypoint.default.object.r;
      this._posX = data.x ?? object.posX ?? Waypoint.default.data.x;
      this._posY = data.y ?? object.posY ?? Waypoint.default.data.y;
      this._direction = data.d ?? object.direction ?? Waypoint.default.data.d;
      this._customData = deepCopy(
         object.customData ?? Waypoint.default.data.customData,
      );
   }

   static create(): Waypoint[];
   static create(
      ...data: Partial<IWrapWaypointAttribute<IWaypointContainer>>[]
   ): Waypoint[];
   static create(
      ...data: Partial<IWrapWaypointAttribute<IWaypointContainer>>[]
   ): Waypoint[] {
      const result: Waypoint[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IWaypointContainer> {
      return {
         object: {
            b: this.time,
            i: 0,
            r: this.laneRotation,
            customData: {},
         },
         data: {
            x: this.posX,
            y: this.posY,
            d: this.direction,
            customData: deepCopy(this.customData),
         },
      };
   }

   get customData(): NonNullable<IWaypoint['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IWaypoint['customData']>) {
      this._customData = value;
   }
}
