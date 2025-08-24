import type { IWrapLightTranslationEventBox } from '../schema/wrapper/types/lightTranslationEventBox.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { EventBox } from './abstract/eventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightTranslationEvent } from './lightTranslationEvent.ts';
import { createLightTranslationEventBox } from '../schema/wrapper/lightTranslationEventBox.ts';

/**
 * Core beatmap light translation event box.
 */
export class LightTranslationEventBox extends EventBox implements IWrapLightTranslationEventBox {
   static defaultValue: IWrapLightTranslationEventBox = createLightTranslationEventBox();

   static createOne(
      data: DeepPartial<IWrapLightTranslationEventBox> = {},
   ): LightTranslationEventBox {
      return new this(data);
   }
   static create(
      ...data: DeepPartial<IWrapLightTranslationEventBox>[]
   ): LightTranslationEventBox[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapLightTranslationEventBox> = {}) {
      super();
      this.filter = new IndexFilter(data.filter ?? LightTranslationEventBox.defaultValue.filter);
      this.axis = data.axis ?? LightTranslationEventBox.defaultValue.axis;
      this.flip = data.flip ?? LightTranslationEventBox.defaultValue.flip;
      this.beatDistribution = data.beatDistribution ??
         LightTranslationEventBox.defaultValue.beatDistribution;
      this.beatDistributionType = data.beatDistributionType ??
         LightTranslationEventBox.defaultValue.beatDistributionType;
      this.gapDistribution = data.gapDistribution ??
         LightTranslationEventBox.defaultValue.gapDistribution;
      this.gapDistributionType = data.gapDistributionType ??
         LightTranslationEventBox.defaultValue.gapDistributionType;
      this.affectFirst = data.affectFirst ?? LightTranslationEventBox.defaultValue.affectFirst;
      this.easing = data.easing ?? LightTranslationEventBox.defaultValue.easing;
      this.events = (data.events ?? LightTranslationEventBox.defaultValue.events).map(
         (obj) => new LightTranslationEvent(obj),
      );
      this.customData = deepCopy(
         data.customData ?? LightTranslationEventBox.defaultValue.customData,
      );
   }

   override reconcile(): this {
      this.events = reconcileClassObject(this.events, LightTranslationEvent);
      return this;
   }

   gapDistribution: IWrapLightTranslationEventBox['gapDistribution'];
   gapDistributionType: IWrapLightTranslationEventBox['gapDistributionType'];
   axis: IWrapLightTranslationEventBox['axis'];
   flip: IWrapLightTranslationEventBox['flip'];
   events: LightTranslationEvent[];

   setGapDistribution(value: this['gapDistribution']): this {
      this.gapDistribution = value;
      return this;
   }
   setGapDistributionType(value: this['gapDistributionType']): this {
      this.gapDistributionType = value;
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

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.gapDistributionType === 1 || this.gapDistributionType === 2) &&
         (this.axis === 0 || this.axis === 1 || this.axis === 2) &&
         (this.flip === 0 || this.flip === 1) &&
         (this.affectFirst === 0 || this.affectFirst === 1);
   }
}
