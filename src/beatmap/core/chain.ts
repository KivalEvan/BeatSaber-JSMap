import type { IWrapChain } from '../schema/wrapper/types/chain.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseSlider } from './abstract/baseSlider.ts';
import { createChain } from '../schema/wrapper/chain.ts';

/**
 * Core beatmap chain.
 */
export class Chain extends BaseSlider implements IWrapChain {
   static defaultValue: IWrapChain = /* @__PURE__ */ createChain();

   static createOne(data: Partial<IWrapChain> = {}): Chain {
      return new this(data);
   }
   static create(...data: Partial<IWrapChain>[]): Chain[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapChain> = {}) {
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
