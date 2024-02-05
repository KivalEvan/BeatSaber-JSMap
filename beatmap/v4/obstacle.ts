import { ModType } from '../../types/beatmap/shared/modCheck.ts';
import { IObstacle } from '../../types/beatmap/v4/obstacle.ts';
import { IObstacleContainer } from '../../types/beatmap/container/v4.ts';
import { IObjectLane } from '../../types/beatmap/v4/object.ts';
import { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import { DeepRequiredIgnore } from '../../types/utils.ts';
import { Vector2 } from '../../types/vector.ts';
import { deepCopy } from '../../utils/misc.ts';
import { isVector3 } from '../../utils/vector.ts';
import { WrapObstacle } from '../wrapper/obstacle.ts';

/** Obstacle beatmap v4 class object. */
export class Obstacle extends WrapObstacle<IObstacleContainer> {
   static default: DeepRequiredIgnore<IObstacleContainer, 'customData'> = {
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
         w: 0,
         h: 0,
         customData: {},
      },
   };

   constructor();
   constructor(object: Partial<IWrapObstacleAttribute<IObstacleContainer>>);
   constructor(object: Partial<IObjectLane>, data?: Partial<IObstacle>);
   constructor(
      object:
         & Partial<IObjectLane>
         & Partial<IWrapObstacleAttribute<IObstacleContainer>>,
      data?: Partial<IObstacle>,
   );
   constructor(
      object:
         & Partial<IObjectLane>
         & Partial<IWrapObstacleAttribute<IObstacleContainer>> = {},
      data: Partial<IObstacle> = {},
   ) {
      super();

      this._time = object.b ?? object.time ?? Obstacle.default.object.b;
      this._laneRotation = object.r ?? object.laneRotation ?? Obstacle.default.object.r;
      this._posX = data.x ?? object.posX ?? Obstacle.default.data.x;
      this._posY = data.y ?? object.posY ?? Obstacle.default.data.y;
      this._duration = data.d ?? object.duration ?? Obstacle.default.data.d;
      this._width = data.w ?? object.width ?? Obstacle.default.data.w;
      this._height = data.h ?? object.height ?? Obstacle.default.data.h;
      this._customData = deepCopy(
         object.customData ?? Obstacle.default.data.customData,
      );
   }

   static create(): Obstacle[];
   static create(
      ...data: Partial<IWrapObstacleAttribute<IObstacle>>[]
   ): Obstacle[];
   static create(
      ...data: Partial<IWrapObstacleAttribute<IObstacle>>[]
   ): Obstacle[] {
      const result: Obstacle[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IObstacleContainer> {
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
            d: this.duration,
            w: this.width,
            h: this.height,
            customData: deepCopy(this.customData),
         },
      };
   }

   get customData(): NonNullable<IObstacle['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IObstacle['customData']>) {
      this._customData = value;
   }

   mirror(_?: boolean, flipNoodle?: boolean) {
      if (flipNoodle) {
         const width = this.customData.size?.[0] ?? this.width;
         if (this.customData.coordinates) {
            this.customData.coordinates[0] = -1 - this.customData.coordinates[0];
         }
         if (this.customData.animation) {
            if (Array.isArray(this.customData.animation.definitePosition)) {
               if (isVector3(this.customData.animation.definitePosition)) {
                  this.customData.animation.definitePosition[0] =
                     -this.customData.animation.definitePosition[0] -
                     (this.posX + width - 1);
               } else {
                  this.customData.animation.definitePosition.forEach((dp) => {
                     dp[0] = -dp[0] - (this.posX + width - 1);
                  });
               }
            }
            if (Array.isArray(this.customData.animation.offsetPosition)) {
               if (isVector3(this.customData.animation.offsetPosition)) {
                  this.customData.animation.offsetPosition[0] =
                     -this.customData.animation.offsetPosition[0] -
                     (this.posX + width - 1);
               } else {
                  this.customData.animation.offsetPosition.forEach((op) => {
                     op[0] = -op[0] - (this.posX + width - 1);
                  });
               }
            }
         }
      }
      return super.mirror();
   }

   getPosition(type?: ModType): Vector2 {
      switch (type) {
         case 'vanilla':
            return super.getPosition();
         case 'ne':
            if (this.customData.coordinates) {
               return [
                  this.customData.coordinates[0],
                  this.customData.coordinates[1],
               ];
            }
         /** falls through */
         case 'me':
         default:
            return [
               (this.posX <= -1000
                  ? this.posX / 1000 + 1
                  : this.posX >= 1000
                  ? this.posX / 1000 - 1
                  : this.posX) - 2,
               (this.posY <= -1000
                  ? this.posY / 1000
                  : this.posY >= 1000
                  ? this.posY / 1000
                  : this.posY) - 0.5,
            ];
      }
   }

   isChroma(): boolean {
      return Array.isArray(this.customData.color);
   }

   isNoodleExtensions(): boolean {
      return (
         Array.isArray(this.customData.animation) ||
         typeof this.customData.uninteractable === 'boolean' ||
         Array.isArray(this.customData.localRotation) ||
         typeof this.customData.noteJumpMovementSpeed === 'number' ||
         typeof this.customData.noteJumpStartBeatOffset === 'number' ||
         Array.isArray(this.customData.coordinates) ||
         Array.isArray(this.customData.worldRotation) ||
         Array.isArray(this.customData.size)
      );
   }

   isMappingExtensions(): boolean {
      return (
         this.posY < 0 ||
         this.posY > 2 ||
         this.posX <= -1000 ||
         this.posX >= 1000 ||
         this.width <= -1000 ||
         this.width >= 1000 ||
         this.height <= -1000 ||
         this.height >= 1000
      );
   }
}
