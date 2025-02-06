import type { IWrapChain, IWrapChainAttribute } from '../../types/beatmap/wrapper/chain.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseSlider } from './abstract/baseSlider.ts';

export function createChain(
   data: DeepPartial<IWrapChainAttribute> = {},
): IWrapChainAttribute {
   return {
      time: data.time ?? 0,
      posX: data.posX ?? 0,
      posY: data.posY ?? 0,
      color: data.color ?? 0,
      direction: data.direction ?? 0,
      laneRotation: data.laneRotation ?? 0,
      tailTime: data.tailTime ?? 0,
      tailPosX: data.tailPosX ?? 0,
      tailPosY: data.tailPosY ?? 0,
      tailLaneRotation: data.tailLaneRotation ?? 0,
      sliceCount: data.sliceCount ?? 0,
      squish: data.squish ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap chain.
 */
export class Chain extends BaseSlider implements IWrapChain {
   static defaultValue: IWrapChainAttribute = createChain();

   static createOne(data: Partial<IWrapChainAttribute> = {}): Chain {
      return new this(data);
   }
   static create(...data: Partial<IWrapChainAttribute>[]): Chain[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapChainAttribute> = {}) {
      super();
      this.time = data.time ?? Chain.defaultValue.time;
      this.posX = data.posX ?? Chain.defaultValue.posX;
      this.posY = data.posY ?? Chain.defaultValue.posY;
      this.color = data.color ?? Chain.defaultValue.color;
      this.direction = data.direction ?? Chain.defaultValue.direction;
      this.laneRotation = data.laneRotation ?? Chain.defaultValue.laneRotation;
      this.tailTime = data.tailTime ?? Chain.defaultValue.tailTime;
      this.tailPosX = data.tailPosX ?? Chain.defaultValue.tailPosX;
      this.tailPosY = data.tailPosY ?? Chain.defaultValue.tailPosY;
      this.tailLaneRotation = data.tailLaneRotation ?? Chain.defaultValue.tailLaneRotation;
      this.sliceCount = data.sliceCount ?? Chain.defaultValue.sliceCount;
      this.squish = data.squish ?? Chain.defaultValue.squish;
      this.customData = deepCopy(data.customData ?? Chain.defaultValue.customData);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (!this.isInverse() ||
            this.posY >= 0 ||
            this.posY <= 2 ||
            this.tailPosY >= 0 ||
            this.tailPosY <= 2);
   }

   sliceCount: IWrapChain['sliceCount'];
   squish: IWrapChain['squish'];

   setSliceCount(value: this['sliceCount']): this {
      this.sliceCount = value;
      return this;
   }
   setSquish(value: this['squish']): this {
      this.squish = value;
      return this;
   }
}
