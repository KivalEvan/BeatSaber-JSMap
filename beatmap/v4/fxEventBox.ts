import {
   IFxEventFloatBoxContainer,
   IFxEventFloatContainer,
} from '../../types/beatmap/container/v4.ts';
import { IIndexFilter } from '../../types/beatmap/v4/indexFilter.ts';
import { IFxEventFloat } from '../../types/beatmap/v4/fxEventFloat.ts';
import { IFxEventBox } from '../../types/beatmap/v4/fxEventBox.ts';
import { IWrapFxEventBoxAttribute } from '../../types/beatmap/wrapper/fxEventBox.ts';
import { DeepPartial, DeepRequiredIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapFxEventBox } from '../wrapper/fxEventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { FxEventFloat } from './fxEventFloat.ts';

/** Fx event box beatmap v4 class object. */
export class FxEventBox extends WrapFxEventBox<
   IFxEventFloatBoxContainer,
   IFxEventFloatContainer,
   IIndexFilter
> {
   static default: DeepRequiredIgnore<IFxEventFloatBoxContainer, 'customData'> = {
      data: {
         w: 0,
         d: 1,
         s: 0,
         t: 1,
         b: 0,
         e: 0,
         customData: {},
      },
      eventData: [],
      filterData: { ...IndexFilter.default },
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapFxEventBoxAttribute<
            IFxEventFloatBoxContainer,
            IFxEventFloatContainer,
            IIndexFilter
         >
      >,
   );
   constructor(
      data: Partial<IFxEventBox>,
      events?: Partial<IFxEventFloat>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   );
   constructor(
      data:
         & Partial<IFxEventBox>
         & DeepPartial<
            IWrapFxEventBoxAttribute<
               IFxEventFloatBoxContainer,
               IFxEventFloatContainer,
               IIndexFilter
            >
         >,
      events?: Partial<IFxEventFloat>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   );
   constructor(
      data:
         & Partial<IFxEventBox>
         & DeepPartial<
            IWrapFxEventBoxAttribute<
               IFxEventFloatBoxContainer,
               IFxEventFloatContainer,
               IIndexFilter
            >
         > = {},
      events?: Partial<IFxEventFloat>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   ) {
      super();

      this._filter = new IndexFilter(
         filter ??
            (data.filter as IIndexFilter) ??
            FxEventBox.default.filterData,
      );
      this._beatDistribution = data.w ?? data.beatDistribution ?? FxEventBox.default.data.w;
      this._beatDistributionType = data.d ??
         data.beatDistributionType ??
         FxEventBox.default.data.d;
      this._fxDistribution = data.s ??
         data.fxDistribution ??
         FxEventBox.default.data.s;
      this._fxDistributionType = data.t ??
         data.fxDistributionType ??
         FxEventBox.default.data.t;
      this._affectFirst = data.b ?? data.affectFirst ?? FxEventBox.default.data.b;
      this._easing = data.e ?? data.easing ?? FxEventBox.default.data.e;
      this._events = (
         events! ??
            data.events ??
            FxEventBox.default.eventData
      ).map((obj, i) => new FxEventFloat(obj, times?.[i]));
      this._customData = deepCopy(
         data.customData ?? FxEventBox.default.data.customData,
      );
   }

   static create(): FxEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapFxEventBoxAttribute<
            IFxEventFloatBoxContainer,
            IFxEventFloatContainer,
            IIndexFilter
         >
      >[]
   ): FxEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapFxEventBoxAttribute<
            IFxEventFloatBoxContainer,
            IFxEventFloatContainer,
            IIndexFilter
         >
      >[]
   ): FxEventBox[] {
      const result: FxEventBox[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IFxEventFloatBoxContainer> {
      return {
         data: {
            w: this.beatDistribution,
            d: this.beatDistributionType,
            s: this.fxDistribution,
            t: this.fxDistributionType,
            b: this.affectFirst,
            e: this.easing,
            customData: deepCopy(this.customData),
         },
         eventData: this.events.map((e) => e.toJSON()),
         filterData: this.filter.toJSON(),
      };
   }

   get filter(): IndexFilter {
      return this._filter as IndexFilter;
   }
   set filter(value: IndexFilter) {
      this._filter = value;
   }

   get events(): FxEventFloat[] {
      return this._events as FxEventFloat[];
   }
   set events(value: FxEventFloat[]) {
      this._events = value;
   }

   get customData(): NonNullable<IFxEventBox['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IFxEventBox['customData']>) {
      this._customData = value;
   }

   setEvents(value: FxEventFloat[]): this {
      this.events = value;
      return this;
   }
}
