import type { GetAngleFn, MirrorFn } from '../schema/shared/types/functions.ts';
import type { IWrapArc } from './types/arc.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { mirrorArcMidAnchor } from '../helpers/core/arc.ts';
import { mirrorNoteDirectionHorizontally, resolveNoteAngle } from '../helpers/core/baseNote.ts';
import { BaseSlider } from './abstract/baseSlider.ts';

export function createArc(
   data: DeepPartial<IWrapArc> = {},
): IWrapArc {
   return {
      time: data.time ?? 0,
      posX: data.posX ?? 0,
      posY: data.posY ?? 0,
      color: data.color ?? 0,
      direction: data.direction ?? 0,
      lengthMultiplier: data.lengthMultiplier ?? 0,
      tailTime: data.tailTime ?? 0,
      tailPosX: data.tailPosX ?? 0,
      tailPosY: data.tailPosY ?? 0,
      tailDirection: data.tailDirection ?? 0,
      tailLengthMultiplier: data.tailLengthMultiplier ?? 0,
      midAnchor: data.midAnchor ?? 0,
      laneRotation: data.laneRotation ?? 0,
      tailLaneRotation: data.tailLaneRotation ?? 0,
      customData: deepCopy(data.customData ?? {}),
   };
}

/**
 * Core beatmap arc.
 */
export class Arc extends BaseSlider implements IWrapArc {
   static defaultValue: IWrapArc = createArc();

   static createOne(data: Partial<IWrapArc> = {}): Arc {
      return new this(data);
   }
   static create(...data: Partial<IWrapArc>[]): Arc[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapArc> = {}) {
      super();
      this.time = data.time ?? Arc.defaultValue.time;
      this.posX = data.posX ?? Arc.defaultValue.posX;
      this.posY = data.posY ?? Arc.defaultValue.posY;
      this.color = data.color ?? Arc.defaultValue.color;
      this.direction = data.direction ?? Arc.defaultValue.direction;
      this.lengthMultiplier = data.lengthMultiplier ?? Arc.defaultValue.lengthMultiplier;
      this.tailTime = data.tailTime ?? Arc.defaultValue.tailTime;
      this.tailPosX = data.tailPosX ?? Arc.defaultValue.tailPosX;
      this.tailPosY = data.tailPosY ?? Arc.defaultValue.tailPosY;
      this.tailDirection = data.tailDirection ?? Arc.defaultValue.tailDirection;
      this.tailLengthMultiplier = data.tailLengthMultiplier ??
         Arc.defaultValue.tailLengthMultiplier;
      this.midAnchor = data.midAnchor ?? Arc.defaultValue.midAnchor;
      this.laneRotation = data.laneRotation ?? Arc.defaultValue.laneRotation;
      this.tailLaneRotation = data.tailLaneRotation ?? Arc.defaultValue.tailLaneRotation;
      this.customData = deepCopy(data.customData ?? Arc.defaultValue.customData);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         !(
            this.isInverse() ||
            this.posX < 0 ||
            this.posX > 3 ||
            this.tailPosX < 0 ||
            this.tailPosX > 3 ||
            (this.posX === this.tailPosX &&
               this.posY === this.tailPosY &&
               this.time === this.tailTime)
         );
   }

   lengthMultiplier: IWrapArc['lengthMultiplier'];
   tailLengthMultiplier: IWrapArc['tailLengthMultiplier'];
   tailDirection: IWrapArc['tailDirection'];
   midAnchor: IWrapArc['midAnchor'];

   setLengthMultiplier(value: this['lengthMultiplier']): this {
      this.lengthMultiplier = value;
      return this;
   }
   setTailLengthMultiplier(value: this['tailLengthMultiplier']): this {
      this.tailLengthMultiplier = value;
      return this;
   }
   setTailDirection(value: this['tailDirection']): this {
      this.tailDirection = value;
      return this;
   }
   setMidAnchor(value: this['midAnchor']): this {
      this.midAnchor = value;
      return this;
   }

   override mirror(flipColor = true, fn?: MirrorFn<this>): this {
      fn?.(this);
      this.tailDirection = mirrorNoteDirectionHorizontally(this.direction);
      this.midAnchor = mirrorArcMidAnchor(this.midAnchor);
      return super.mirror(flipColor);
   }

   /**
    * Get standardised tail note angle.
    *
    * @example
    * ```ts
    * import type { IArc } from './arc.ts';
    * let arc!: IArc;
    * const optionalFn = (object: IArc) => object.customData.value;
    * const arcTailAngle = arc.getTailAngle(optionalFn);
    * ```
    *
    * Custom function are used to return any arbitrary data first if value exist, otherwise returns base value.
    */
   getTailAngle(fn?: GetAngleFn<this>): number {
      return fn?.(this) || resolveNoteAngle(this.tailDirection);
   }
}
