import type { IWrapLightColorEventBox } from '../schema/wrapper/types/lightColorEventBox.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { EventBox } from './abstract/eventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightColorEvent } from './lightColorEvent.ts';
import { createLightColorEventBox } from '../schema/wrapper/lightColorEventBox.ts';

/**
 * Core beatmap light color event box.
 */
export class LightColorEventBox extends EventBox implements IWrapLightColorEventBox {
   static defaultValue: IWrapLightColorEventBox = /* @__PURE__ */ createLightColorEventBox();

   static createOne(data: DeepPartial<IWrapLightColorEventBox> = {}): LightColorEventBox {
      return new this(data);
   }
   static create(...data: DeepPartial<IWrapLightColorEventBox>[]): LightColorEventBox[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapLightColorEventBox> = {}) {
      super();
      this.filter = new IndexFilter(data.filter ?? LightColorEventBox.defaultValue.filter);
      this.beatDistribution = data.beatDistribution ??
         LightColorEventBox.defaultValue.beatDistribution;
      this.beatDistributionType = data.beatDistributionType ??
         LightColorEventBox.defaultValue.beatDistributionType;
      this.brightnessDistribution = data.brightnessDistribution ??
         LightColorEventBox.defaultValue.brightnessDistribution;
      this.brightnessDistributionType = data.brightnessDistributionType ??
         LightColorEventBox.defaultValue.brightnessDistributionType;
      this.affectFirst = data.affectFirst ?? LightColorEventBox.defaultValue.affectFirst;
      this.easing = data.easing ?? LightColorEventBox.defaultValue.easing;
      this.events = (data.events ?? LightColorEventBox.defaultValue.events).map(
         (obj) => new LightColorEvent(obj),
      );
      this.customData = deepCopy(data.customData ?? LightColorEventBox.defaultValue.customData);
   }

   override reconcile(): this {
      this.events = reconcileClassObject(this.events, LightColorEvent);
      return this;
   }

   brightnessDistribution: IWrapLightColorEventBox['brightnessDistribution'];
   brightnessDistributionType: IWrapLightColorEventBox['brightnessDistributionType'];
   events: LightColorEvent[];

   setBrightnessDistribution(value: this['brightnessDistribution']): this {
      this.brightnessDistribution = value;
      return this;
   }
   setBrightnessDistributionType(value: this['brightnessDistributionType']): this {
      this.brightnessDistributionType = value;
      return this;
   }
   setEvents(value: this['events']): this {
      this.events = value;
      return this;
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.brightnessDistributionType === 1 || this.brightnessDistributionType === 2) &&
         (this.affectFirst === 0 || this.affectFirst === 1);
   }
}
