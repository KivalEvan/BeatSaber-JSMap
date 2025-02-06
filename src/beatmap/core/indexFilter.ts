import { LimitAlsoAffectsType, RandomType } from '../../types/beatmap/shared/constants.ts';
import type { IWrapIndexFilter } from '../../types/beatmap/wrapper/indexFilter.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseItem } from './abstract/baseItem.ts';

export function createIndexFilter(
   data: DeepPartial<IWrapIndexFilter> = {},
): IWrapIndexFilter {
   return {
      type: data.type ?? 1,
      p0: data.p0 ?? 0,
      p1: data.p1 ?? 0,
      reverse: data.reverse ?? 0,
      chunks: data.chunks ?? 0,
      random: data.random ?? 0,
      seed: data.seed ?? 0,
      limit: data.limit ?? 0,
      limitAffectsType: data.limitAffectsType ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap index filter.
 */
export class IndexFilter extends BaseItem implements IWrapIndexFilter {
   static defaultValue: IWrapIndexFilter = createIndexFilter();

   static createOne(
      data: Partial<IWrapIndexFilter> = {},
   ): IndexFilter {
      return new this(data);
   }
   static create(...data: Partial<IWrapIndexFilter>[]): IndexFilter[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapIndexFilter> = {}) {
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

   type: IWrapIndexFilter['type'];
   p0: IWrapIndexFilter['p0'];
   p1: IWrapIndexFilter['p1'];
   reverse: IWrapIndexFilter['reverse'];
   chunks: IWrapIndexFilter['chunks'];
   limit: IWrapIndexFilter['limit'];
   limitAffectsType: IWrapIndexFilter['limitAffectsType'];
   random: IWrapIndexFilter['random'];
   seed: IWrapIndexFilter['seed'];

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

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.type === 1 || this.type === 2) &&
         this.p0 >= 0 &&
         this.p1 >= 0 &&
         (this.reverse === 0 || this.reverse === 1) &&
         this.chunks >= 0 &&
         this.random >= 0 &&
         this.random <= RandomType.ALL &&
         this.limit >= 0 &&
         this.limit <= 1 &&
         this.limitAffectsType >= 0 &&
         this.limitAffectsType <= LimitAlsoAffectsType.ALL;
   }
}
