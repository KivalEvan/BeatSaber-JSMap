// deno-lint-ignore-file no-explicit-any
import { LINE_COUNT } from '../shared/constants.ts';
import type {
   IWrapWaypoint,
   IWrapWaypointAttribute,
} from '../../types/beatmap/wrapper/waypoint.ts';
import { GridObject } from './abstract/gridObject.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../utils/misc.ts';

export class Waypoint extends GridObject implements IWrapWaypoint {
   static schema: Record<number, ISchemaContainer<IWrapWaypointAttribute>> = {};
   static defaultValue: IWrapWaypointAttribute = {
      time: 0,
      posX: 0,
      posY: 0,
      direction: 0,
      laneRotation: 0,
      customData: {},
   };

   static create(...data: Partial<IWrapWaypointAttribute>[]): Waypoint[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapWaypointAttribute> = {}) {
      super();
      this.time = data.time ?? Waypoint.defaultValue.time;
      this.posX = data.posX ?? Waypoint.defaultValue.posX;
      this.posY = data.posY ?? Waypoint.defaultValue.posY;
      this.direction = data.direction ?? Waypoint.defaultValue.direction;
      this.laneRotation = data.laneRotation ?? Waypoint.defaultValue.laneRotation;
      this.customData = deepCopy(
         data.customData ?? Waypoint.defaultValue.customData,
      );
   }
   static fromJSON(data: { [key: string]: any }, version: number): Waypoint {
      return new this(Waypoint.schema[version]?.deserialize(data));
   }
   toSchema<T extends { [key: string]: any }>(version?: number): T {
      return (Waypoint.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapWaypointAttribute {
      return {
         time: this.time,
         posX: this.posX,
         posY: this.posY,
         direction: this.direction,
         laneRotation: this.laneRotation,
         customData: deepCopy(this.customData),
      };
   }

   direction: IWrapWaypoint['direction'] = 0;

   setDirection(value: this['direction']): this {
      this.direction = value;
      return this;
   }

   mirror(_flipAlt?: boolean, _flipNoodle?: boolean): this {
      this.posX = LINE_COUNT - 1 - this.posX;
      switch (this.direction) {
         case 2:
            this.direction = 3;
            break;
         case 3:
            this.direction = 2;
            break;
         case 6:
            this.direction = 7;
            break;
         case 7:
            this.direction = 6;
            break;
         case 4:
            this.direction = 5;
            break;
         case 5:
            this.direction = 4;
            break;
      }
      return this;
   }

   isValid(): boolean {
      return (
         this.direction >= 0 &&
         this.direction <= 9 &&
         this.direction !== (8 as 0)
      );
   }
}
