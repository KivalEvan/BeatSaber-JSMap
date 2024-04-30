// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type { IWrapLightColorEvent } from '../../types/beatmap/wrapper/lightColorEvent.ts';
import type {
   IWrapLightColorEventBox,
   IWrapLightColorEventBoxAttribute,
} from '../../types/beatmap/wrapper/lightColorEventBox.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { EventBox } from './abstract/eventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightColorEvent } from './lightColorEvent.ts';

export class LightColorEventBox extends EventBox implements IWrapLightColorEventBox {
   static schema: Record<
      number,
      ISchemaContainer<IWrapLightColorEventBoxAttribute>
   > = {};
   static defaultValue: IWrapLightColorEventBoxAttribute = {
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
         _deprData: {},
      },
      beatDistribution: 0,
      beatDistributionType: 1,
      brightnessDistribution: 0,
      brightnessDistributionType: 1,
      affectFirst: 0,
      easing: 0,
      events: [],
      customData: {},
      _deprData: {},
   };

   static create(
      ...data: Partial<IWrapLightColorEventBoxAttribute>[]
   ): LightColorEventBox[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapLightColorEventBoxAttribute> = {}) {
      super();
      this.filter = new IndexFilter(
         data.filter ?? LightColorEventBox.defaultValue.filter,
      );
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
      this.customData = deepCopy(
         data.customData ?? LightColorEventBox.defaultValue.customData,
      );
      this._deprData = deepCopy(
         data._deprData ?? LightColorEventBox.defaultValue._deprData,
      );
   }
   static fromJSON(
      data: Record<string, any>,
      version: number,
   ): LightColorEventBox {
      return new this(LightColorEventBox.schema[version]?.deserialize(data));
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (LightColorEventBox.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapLightColorEventBoxAttribute {
      return {
         filter: this.filter.toJSON(),
         beatDistribution: this.beatDistribution,
         beatDistributionType: this.beatDistributionType,
         brightnessDistribution: this.brightnessDistribution,
         brightnessDistributionType: this.brightnessDistributionType,
         affectFirst: this.affectFirst,
         easing: this.easing,
         events: this.events.map((e) => e.toJSON()),
         customData: deepCopy(this.customData),
         _deprData: deepCopy(this._deprData),
      };
   }

   brightnessDistribution: IWrapLightColorEventBox['brightnessDistribution'] = 0;
   brightnessDistributionType: IWrapLightColorEventBox['brightnessDistributionType'] = 1;
   events!: IWrapLightColorEvent[];

   setBrightnessDistribution(value: this['brightnessDistribution']): this {
      this.brightnessDistribution = value;
      return this;
   }
   setBrightnessDistributionType(
      value: this['brightnessDistributionType'],
   ): this {
      this.brightnessDistributionType = value;
      return this;
   }
   setEvents(value: this['events']): this {
      this.events = value;
      return this;
   }

   isValid(): boolean {
      return (
         super.isValid() &&
         (this.brightnessDistributionType === 1 ||
            this.brightnessDistributionType === 2) &&
         (this.affectFirst === 0 || this.affectFirst === 1)
      );
   }
}