import type {
   IWrapFxEventBox,
   IWrapFxEventBoxAttribute,
} from '../../types/beatmap/wrapper/fxEventBox.ts';
import type { IWrapFxEventFloat } from '../../types/beatmap/wrapper/fxEventFloat.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { EventBox } from './abstract/eventBox.ts';
import { createFxEventFloat, FxEventFloat } from './fxEventFloat.ts';
import { createIndexFilter, IndexFilter } from './indexFilter.ts';

export function createFxEventBox(
   data: DeepPartial<IWrapFxEventBoxAttribute> = {},
): IWrapFxEventBoxAttribute {
   return {
      filter: createIndexFilter(data.filter),
      beatDistribution: data.beatDistribution ?? 0,
      beatDistributionType: data.beatDistributionType ?? 1,
      fxDistribution: data.fxDistribution ?? 0,
      fxDistributionType: data.fxDistributionType ?? 1,
      affectFirst: data.affectFirst ?? 0,
      easing: data.easing ?? 0,
      events: data.events?.map(createFxEventFloat) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap FX event box.
 */
export class FxEventBox extends EventBox implements IWrapFxEventBox {
   static defaultValue: IWrapFxEventBoxAttribute = createFxEventBox();

   static createOne(data: Partial<IWrapFxEventBoxAttribute> = {}): FxEventBox {
      return new this(data);
   }
   static create(...data: Partial<IWrapFxEventBoxAttribute>[]): FxEventBox[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapFxEventBoxAttribute, 'customData'> = {}) {
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

   fxDistribution: IWrapFxEventBox['fxDistribution'];
   fxDistributionType: IWrapFxEventBox['fxDistributionType'];
   events: IWrapFxEventFloat[];

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
