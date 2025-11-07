import type { IWrapLightRotationEventBox } from '../schema/wrapper/types/lightRotationEventBox.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { EventBox } from './abstract/eventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightRotationEvent } from './lightRotationEvent.ts';
import { createLightRotationEventBox } from '../schema/wrapper/lightRotationEventBox.ts';

/**
 * Core beatmap light rotation event box.
 */
export class LightRotationEventBox extends EventBox implements IWrapLightRotationEventBox {
   static defaultValue: IWrapLightRotationEventBox = /* @__PURE__ */ createLightRotationEventBox();

   static createOne(
      data: DeepPartial<IWrapLightRotationEventBox> = {},
   ): LightRotationEventBox {
      return new this(data);
   }
   static create(
      ...data: DeepPartial<IWrapLightRotationEventBox>[]
   ): LightRotationEventBox[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapLightRotationEventBox> = {}) {
      super();
      this.filter = new IndexFilter(
         data.filter ?? LightRotationEventBox.defaultValue.filter,
      );
      this.axis = data.axis ?? LightRotationEventBox.defaultValue.axis;
      this.flip = data.flip ?? LightRotationEventBox.defaultValue.flip;
      this.beatDistribution = data.beatDistribution ??
         LightRotationEventBox.defaultValue.beatDistribution;
      this.beatDistributionType = data.beatDistributionType ??
         LightRotationEventBox.defaultValue.beatDistributionType;
      this.rotationDistribution = data.rotationDistribution ??
         LightRotationEventBox.defaultValue.rotationDistribution;
      this.rotationDistributionType = data.rotationDistributionType ??
         LightRotationEventBox.defaultValue.rotationDistributionType;
      this.affectFirst = data.affectFirst ?? LightRotationEventBox.defaultValue.affectFirst;
      this.easing = data.easing ?? LightRotationEventBox.defaultValue.easing;
      this.events = (
         data.events ?? LightRotationEventBox.defaultValue.events
      ).map((obj) => new LightRotationEvent(obj));
      this.customData = deepCopy(
         data.customData ?? LightRotationEventBox.defaultValue.customData,
      );
   }

   override reconcile(): this {
      this.events = reconcileClassObject(this.events, LightRotationEvent);
      return this;
   }

   rotationDistribution: IWrapLightRotationEventBox['rotationDistribution'];
   rotationDistributionType: IWrapLightRotationEventBox['rotationDistributionType'];
   axis: IWrapLightRotationEventBox['axis'];
   flip: IWrapLightRotationEventBox['flip'];
   events: LightRotationEvent[];

   setRotationDistribution(value: this['rotationDistribution']): this {
      this.rotationDistribution = value;
      return this;
   }
   setRotationDistributionType(value: this['rotationDistributionType']): this {
      this.rotationDistributionType = value;
      return this;
   }
   setAxis(value: this['axis']): this {
      this.axis = value;
      return this;
   }
   setFlip(value: this['flip']): this {
      this.flip = value;
      return this;
   }
   setEvents(value: this['events']): this {
      this.events = value;
      return this;
   }

   override isValid(
      fn?: (object: this) => boolean,
      override?: boolean,
   ): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.rotationDistributionType === 1 ||
            this.rotationDistributionType === 2) &&
         (this.axis === 0 || this.axis === 1 || this.axis === 2) &&
         (this.flip === 0 || this.flip === 1) &&
         (this.affectFirst === 0 || this.affectFirst === 1);
   }
}
