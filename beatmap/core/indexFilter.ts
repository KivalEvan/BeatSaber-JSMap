// deno-lint-ignore-file no-explicit-any
import type {
   IWrapIndexFilter,
   IWrapIndexFilterAttribute,
} from '../../types/beatmap/wrapper/indexFilter.ts';
import { LimitAlsoAffectsType, RandomType } from '../../types/beatmap/shared/constants.ts';
import { BaseItem } from './abstract/baseItem.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../utils/misc.ts';

export class IndexFilter extends BaseItem implements IWrapIndexFilter {
   static schema: Record<number, ISchemaContainer<IWrapIndexFilterAttribute>> = {};
   static defaultValue: IWrapIndexFilterAttribute = {
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
   };

   static create(...data: Partial<IWrapIndexFilterAttribute>[]): IndexFilter[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapIndexFilterAttribute> = {}) {
      super();
      this.type = data.type ?? IndexFilter.defaultValue.type;
      this.p0 = data.p0 ?? IndexFilter.defaultValue.p0;
      this.p1 = data.p1 ?? IndexFilter.defaultValue.p1;
      this.reverse = data.reverse ?? IndexFilter.defaultValue.reverse;
      this.chunks = data.chunks ?? IndexFilter.defaultValue.chunks;
      this.random = data.random ?? IndexFilter.defaultValue.random;
      this.seed = data.seed ?? IndexFilter.defaultValue.seed;
      this.limit = data.limit ?? IndexFilter.defaultValue.limit;
      this.limitAffectsType = data.limitAffectsType ?? IndexFilter.defaultValue.limitAffectsType;
      this.customData = deepCopy(
         data.customData ?? IndexFilter.defaultValue.customData,
      );
   }
   static fromJSON(data: { [key: string]: any }, version: number): IndexFilter {
      return new this(IndexFilter.schema[version]?.deserialize(data));
   }
   toSchema<T extends { [key: string]: any }>(version?: number): T {
      return (IndexFilter.schema[version || 0]?.serialize(this) || this.toJSON()) as T;
   }
   toJSON(): IWrapIndexFilterAttribute {
      return {
         type: this.type,
         p0: this.p0,
         p1: this.p1,
         reverse: this.reverse,
         chunks: this.chunks,
         random: this.random,
         seed: this.seed,
         limit: this.limit,
         limitAffectsType: this.limitAffectsType,
         customData: deepCopy(this.customData),
      };
   }

   type: IWrapIndexFilter['type'] = 1;
   p0: IWrapIndexFilter['p0'] = 0;
   p1: IWrapIndexFilter['p1'] = 0;
   reverse: IWrapIndexFilter['reverse'] = 0;
   chunks: IWrapIndexFilter['chunks'] = 0;
   limit: IWrapIndexFilter['limit'] = 0;
   limitAffectsType: IWrapIndexFilter['limitAffectsType'] = 0;
   random: IWrapIndexFilter['random'] = 0;
   seed: IWrapIndexFilter['seed'] = 0;

   setType(value: this['type']): this {
      this.type = value;
      return this;
   }
   setP0(value: this['p0']): this {
      this.p0 = value;
      return this;
   }
   setP1(value: this['p1']): this {
      this.p1 = value;
      return this;
   }
   setReverse(value: this['reverse']): this {
      this.reverse = value;
      return this;
   }
   setChunks(value: this['chunks']): this {
      this.chunks = value;
      return this;
   }
   setRandom(value: this['random']): this {
      this.random = value;
      return this;
   }
   setSeed(value: this['seed']): this {
      this.seed = value;
      return this;
   }
   setLimit(value: this['limit']): this {
      this.limit = value;
      return this;
   }
   setLimitAffectsType(value: this['limitAffectsType']): this {
      this.limitAffectsType = value;
      return this;
   }

   isValid(): boolean {
      return (
         (this.type === 1 || this.type === 2) &&
         this.p0 >= 0 &&
         this.p1 >= 0 &&
         (this.reverse === 0 || this.reverse === 1) &&
         this.chunks >= 0 &&
         this.random >= 0 &&
         this.random <= RandomType.ALL &&
         this.limit >= 0 &&
         this.limit <= 0 &&
         this.limitAffectsType >= 0 &&
         this.limitAffectsType <= LimitAlsoAffectsType.ALL
      );
   }
}
