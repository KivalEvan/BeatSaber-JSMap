// deno-lint-ignore-file no-explicit-any
import { BaseSlider } from './abstract/baseSlider.ts';
import type { IWrapChain, IWrapChainAttribute } from '../../types/beatmap/wrapper/chain.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../utils/misc.ts';

export class Chain extends BaseSlider implements IWrapChain {
   static schema: Record<number, ISchemaContainer<IWrapChainAttribute>> = {};
   static defaultValue: IWrapChainAttribute = {
      time: 0,
      posX: 0,
      posY: 0,
      color: 0,
      direction: 0,
      laneRotation: 0,
      tailTime: 0,
      tailPosX: 0,
      tailPosY: 0,
      tailLaneRotation: 0,
      sliceCount: 0,
      squish: 0,
      customData: {},
   };

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
   static fromJSON(data: Record<string, any>, version: number): Chain {
      return new this(Chain.schema[version]?.deserialize(data));
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (Chain.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapChainAttribute {
      return {
         time: this.time,
         posX: this.posX,
         posY: this.posY,
         color: this.color,
         direction: this.direction,
         laneRotation: this.laneRotation,
         tailTime: this.tailTime,
         tailPosX: this.tailPosX,
         tailPosY: this.tailPosY,
         tailLaneRotation: this.tailLaneRotation,
         sliceCount: this.sliceCount,
         squish: this.squish,
         customData: deepCopy(this.customData),
      };
   }

   sliceCount: this['sliceCount'] = 0;
   squish: this['squish'] = 0;

   setSliceCount(value: IWrapChain['sliceCount']): this {
      this.sliceCount = value;
      return this;
   }
   setSquish(value: IWrapChain['squish']): this {
      this.squish = value;
      return this;
   }

   isMappingExtensions(): boolean {
      return (
         this.posY > 2 ||
         this.posY < 0 ||
         this.posX <= -1000 ||
         this.posX >= 1000 ||
         (this.direction >= 1000 && this.direction <= 1360)
      );
   }

   isValid(): boolean {
      return (
         !(
            this.isMappingExtensions() ||
            this.isInverse() ||
            this.posX < 0 ||
            this.posX > 3 ||
            this.tailPosX < 0 ||
            this.tailPosX > 3
         ) && !(this.posX === this.tailPosX && this.posY === this.tailPosY)
      );
   }
}
