import type { GetPositionFn, MirrorFn } from '../schema/shared/types/functions.ts';
import type { IWrapObstacle } from './types/obstacle.ts';
import type { DeepPartial } from '../../types/utils.ts';
import type { Vector2 } from '../../types/vector.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { vectorAdd } from '../../utils/math/vector.ts';
import { mirrorCoordinate, resolveGridPosition } from '../helpers/core/gridObject.ts';
import {
   isInteractiveObstacle,
   isNegativeValueObstacle,
   isZeroValueObstacle,
} from '../helpers/core/obstacle.ts';
import { LINE_COUNT } from '../misc/remaps.ts';
import { GridObject } from './abstract/gridObject.ts';

export function createObstacle(
   data: DeepPartial<IWrapObstacle> = {},
): IWrapObstacle {
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
   static defaultValue: IWrapObstacle = createObstacle();

   static createOne(data: Partial<IWrapObstacle> = {}): Obstacle {
      return new this(data);
   }
   static create(...data: Partial<IWrapObstacle>[]): Obstacle[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapObstacle> = {}) {
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

   /**
    * Check if obstacle is interactive.
    * ```ts
    * if (wall.isInteractive()) {}
    * ```
    */
   isInteractive(): boolean {
      return isInteractiveObstacle(this);
   }

   /**
    * Check if obstacle has zero value.
    * ```ts
    * if (wall.hasZero()) {}
    * ```
    */
   hasZero(): boolean {
      return isZeroValueObstacle(this);
   }

   /**
    * Check if obstacle has negative value.
    * ```ts
    * if (wall.hasNegative()) {}
    * ```
    */
   hasNegative(): boolean {
      return isNegativeValueObstacle(this);
   }
}
