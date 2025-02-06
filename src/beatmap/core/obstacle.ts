import type { GetPositionFn, MirrorFn } from '../../types/beatmap/shared/functions.ts';
import type {
   IWrapObstacle,
   IWrapObstacleAttribute,
} from '../../types/beatmap/wrapper/obstacle.ts';
import type { DeepPartial } from '../../types/utils.ts';
import type { Vector2 } from '../../types/vector.ts';
import { deepCopy } from '../../utils/misc.ts';
import { vectorAdd } from '../../utils/vector.ts';
import { mirrorCoordinate, resolveGridPosition } from '../helpers/core/gridObject.ts';
import {
   isInteractiveObstacle,
   isNegativeValueObstacle,
   isZeroValueObstacle,
} from '../helpers/core/obstacle.ts';
import { LINE_COUNT } from '../shared/constants.ts';
import { GridObject } from './abstract/gridObject.ts';

export function createObstacle(
   data: DeepPartial<IWrapObstacleAttribute> = {},
): IWrapObstacleAttribute {
   return {
      time: data.time ?? 0,
      posX: data.posX ?? 0,
      posY: data.posY ?? 0,
      width: data.width ?? 0,
      height: data.height ?? 0,
      duration: data.duration ?? 0,
      laneRotation: data.laneRotation ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap obstacle.
 */
export class Obstacle extends GridObject implements IWrapObstacle {
   static defaultValue: IWrapObstacleAttribute = createObstacle();

   static createOne(data: Partial<IWrapObstacleAttribute> = {}): Obstacle {
      return new this(data);
   }
   static create(...data: Partial<IWrapObstacleAttribute>[]): Obstacle[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapObstacleAttribute> = {}) {
      super();
      this.time = data.time ?? Obstacle.defaultValue.time;
      this.posX = data.posX ?? Obstacle.defaultValue.posX;
      this.posY = data.posY ?? Obstacle.defaultValue.posY;
      this.width = data.width ?? Obstacle.defaultValue.width;
      this.height = data.height ?? Obstacle.defaultValue.height;
      this.duration = data.duration ?? Obstacle.defaultValue.duration;
      this.laneRotation = data.laneRotation ?? Obstacle.defaultValue.laneRotation;
      this.customData = deepCopy(data.customData ?? Obstacle.defaultValue.customData);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override
         ? super.isValid(fn, override)
         : super.isValid(fn, override) && !this.hasZero() && !this.hasNegative();
   }

   duration: IWrapObstacle['duration'] = 0;
   width: IWrapObstacle['width'] = 0;
   height: IWrapObstacle['height'] = 0;

   setDuration(value: this['duration']): this {
      this.duration = value;
      return this;
   }
   setWidth(value: this['width']): this {
      this.width = value;
      return this;
   }
   setHeight(value: this['height']): this {
      this.height = value;
      return this;
   }

   override mirror(_flipAlt?: boolean, fn?: MirrorFn<this>): this {
      fn?.(this);
      this.posX = mirrorCoordinate(this.posX + this.width - 1, LINE_COUNT);
      return this;
   }

   override getPosition(fn?: GetPositionFn<this>): Vector2 {
      return fn?.(this) ?? vectorAdd(resolveGridPosition(this), [-2, -0.5]);
   }

   // FIXME: there are a lot more other variables
   isInteractive(): boolean {
      return isInteractiveObstacle(this);
   }

   hasZero(): boolean {
      return isZeroValueObstacle(this);
   }

   hasNegative(): boolean {
      return isNegativeValueObstacle(this);
   }
}
