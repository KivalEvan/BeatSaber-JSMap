// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type {
   IWrapFxEventBox,
   IWrapFxEventBoxAttribute,
} from '../../types/beatmap/wrapper/fxEventBox.ts';
import type { IWrapFxEventFloat } from '../../types/beatmap/wrapper/fxEventFloat.ts';
import type { DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { EventBox } from './abstract/eventBox.ts';
import { FxEventFloat } from './fxEventFloat.ts';
import { IndexFilter } from './indexFilter.ts';

export class FxEventBox extends EventBox implements IWrapFxEventBox {
   static schema: Record<number, ISchemaContainer<IWrapFxEventBoxAttribute>> = {};
   static defaultValue: IWrapFxEventBoxAttribute = {
      filter: {
         type: 1,
         p0: 0,
         p1: 0,
         reverse: 0,
         chunks: 0,
         random: 0,
         seed: 0,
         limit: 0,
         limitAffectsType: 0,
         customData: {},
      },
      beatDistribution: 0,
      beatDistributionType: 1,
      fxDistribution: 0,
      fxDistributionType: 1,
      affectFirst: 0,
      easing: 0,
      events: [],
      customData: {},
   };

   static create(...data: Partial<IWrapFxEventBoxAttribute>[]): FxEventBox[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapFxEventBoxAttribute, 'customData'> = {}) {
      super();
      this.filter = new IndexFilter(
         data.filter ?? FxEventBox.defaultValue.filter,
      );
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
      this.customData = deepCopy(
         data.customData ?? FxEventBox.defaultValue.customData,
      );
   }
   static fromJSON(data: { [key: string]: any }, version: number): FxEventBox {
      return new this(FxEventBox.schema[version]?.deserialize(data));
   }
   toSchema<T extends { [key: string]: any }>(version?: number): T {
      return (FxEventBox.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapFxEventBoxAttribute {
      return {
         filter: this.filter.toJSON(),
         beatDistribution: this.beatDistribution,
         beatDistributionType: this.beatDistributionType,
         fxDistribution: this.fxDistribution,
         fxDistributionType: this.fxDistributionType,
         affectFirst: this.affectFirst,
         easing: this.easing,
         events: this.events.map((obj) => obj.toJSON()),
         customData: this.customData,
      };
   }

   fxDistribution: IWrapFxEventBox['fxDistribution'] = 0;
   fxDistributionType: IWrapFxEventBox['fxDistributionType'] = 1;
   events!: IWrapFxEventFloat[];

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

   isValid(): boolean {
      return (
         super.isValid() &&
         (this.fxDistributionType === 1 || this.fxDistributionType === 2) &&
         (this.affectFirst === 0 || this.affectFirst === 1)
      );
   }
}
