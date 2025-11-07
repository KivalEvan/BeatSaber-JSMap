import type { IWrapFxEventBox } from '../schema/wrapper/types/fxEventBox.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { EventBox } from './abstract/eventBox.ts';
import { FxEventFloat } from './fxEventFloat.ts';
import { IndexFilter } from './indexFilter.ts';
import { createFxEventBox } from '../schema/wrapper/fxEventBox.ts';

/**
 * Core beatmap FX event box.
 */
export class FxEventBox extends EventBox implements IWrapFxEventBox {
   static defaultValue: IWrapFxEventBox = /* @__PURE__ */ createFxEventBox();

   static createOne(data: DeepPartial<IWrapFxEventBox> = {}): FxEventBox {
      return new this(data);
   }
   static create(...data: DeepPartial<IWrapFxEventBox>[]): FxEventBox[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapFxEventBox> = {}) {
      super();
      this.filter = new IndexFilter(data.filter ?? FxEventBox.defaultValue.filter);
      this.beatDistribution = data.beatDistribution ?? FxEventBox.defaultValue.beatDistribution;
      this.beatDistributionType = data.beatDistributionType ??
         FxEventBox.defaultValue.beatDistributionType;
      this.fxDistribution = data.fxDistribution ?? FxEventBox.defaultValue.fxDistribution;
      this.fxDistributionType = data.fxDistributionType ??
         FxEventBox.defaultValue.fxDistributionType;
      this.affectFirst = data.affectFirst ?? FxEventBox.defaultValue.affectFirst;
      this.easing = data.easing ?? FxEventBox.defaultValue.easing;
      this.events = (data.events ?? FxEventBox.defaultValue.events).map(
         (obj) => new FxEventFloat(obj),
      );
      this.customData = deepCopy(data.customData ?? FxEventBox.defaultValue.customData);
   }

   override reconcile(): this {
      this.filter = reconcileClassObject(this.filter, IndexFilter);
      this.events = reconcileClassObject(this.events, FxEventFloat);
      return this;
   }

   fxDistribution: IWrapFxEventBox['fxDistribution'];
   fxDistributionType: IWrapFxEventBox['fxDistributionType'];
   events: FxEventFloat[];

   setFxDistribution(value: this['fxDistribution']): this {
      this.fxDistribution = value;
      return this;
   }
   setFxDistributionType(value: this['fxDistributionType']): this {
      this.fxDistributionType = value;
      return this;
   }
   setEvents(value: this['events']): this {
      this.events = value;
      return this;
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.fxDistributionType === 1 || this.fxDistributionType === 2) &&
         (this.affectFirst === 0 || this.affectFirst === 1);
   }
}
