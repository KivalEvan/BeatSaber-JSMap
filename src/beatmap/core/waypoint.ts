import type { MirrorFn } from '../../types/beatmap/shared/functions.ts';
import type { IWrapWaypoint } from '../../types/beatmap/wrapper/waypoint.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { mirrorCoordinate } from '../helpers/core/gridObject.ts';
import { LINE_COUNT } from '../shared/constants.ts';
import { GridObject } from './abstract/gridObject.ts';

export function createWaypoint(
   data: DeepPartial<IWrapWaypoint> = {},
): IWrapWaypoint {
   return {
      time: data.time ?? 0,
      posX: data.posX ?? 0,
      posY: data.posY ?? 0,
      direction: data.direction ?? 0,
      laneRotation: data.laneRotation ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap waypoint.
 */
export class Waypoint extends GridObject implements IWrapWaypoint {
   static defaultValue: IWrapWaypoint = createWaypoint();

   static createOne(data: Partial<IWrapWaypoint> = {}): Waypoint {
      return new this(data);
   }
   static create(...data: Partial<IWrapWaypoint>[]): Waypoint[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapWaypoint> = {}) {
      super();
      this.time = data.time ?? Waypoint.defaultValue.time;
      this.posX = data.posX ?? Waypoint.defaultValue.posX;
      this.posY = data.posY ?? Waypoint.defaultValue.posY;
      this.direction = data.direction ?? Waypoint.defaultValue.direction;
      this.laneRotation = data.laneRotation ?? Waypoint.defaultValue.laneRotation;
      this.customData = deepCopy(data.customData ?? Waypoint.defaultValue.customData);
   }

   direction: IWrapWaypoint['direction'] = 0;

   setDirection(value: this['direction']): this {
      this.direction = value;
      return this;
   }

   override mirror(_flipAlt?: boolean, fn?: MirrorFn<this>): this {
      fn?.(this);
      this.posX = mirrorCoordinate(this.posX, LINE_COUNT);
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

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         this.direction >= 0 &&
         this.direction <= 9 &&
         this.direction !== (8 as 0);
   }
}
