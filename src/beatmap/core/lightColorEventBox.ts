import type { IWrapLightColorEventBox } from '../../types/beatmap/wrapper/lightColorEventBox.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { EventBox } from './abstract/eventBox.ts';
import { createIndexFilter, IndexFilter } from './indexFilter.ts';
import { createLightColorEvent, LightColorEvent } from './lightColorEvent.ts';

export function createLightColorEventBox(
   data: DeepPartial<IWrapLightColorEventBox> = {},
): IWrapLightColorEventBox {
   return {
      filter: createIndexFilter(data.filter),
      beatDistribution: data.beatDistribution ?? 0,
      beatDistributionType: data.beatDistributionType ?? 1,
      brightnessDistribution: data.brightnessDistribution ?? 0,
      brightnessDistributionType: data.brightnessDistributionType ?? 1,
      affectFirst: data.affectFirst ?? 0,
      easing: data.easing ?? 0,
      events: data.events?.map((o) => createLightColorEvent(o)) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap light color event box.
 */
export class LightColorEventBox extends EventBox implements IWrapLightColorEventBox {
   static defaultValue: IWrapLightColorEventBox = createLightColorEventBox();

   static createOne(data: Partial<IWrapLightColorEventBox> = {}): LightColorEventBox {
      return new this(data);
   }
   static create(...data: Partial<IWrapLightColorEventBox>[]): LightColorEventBox[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapLightColorEventBox, 'customData'> = {}) {
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
