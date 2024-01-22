import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { IFxEventBox } from '../../types/beatmap/v3/fxEventBox.ts';
import { IWrapFxEventBoxAttribute } from '../../types/beatmap/wrapper/fxEventBox.ts';
import { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapFxEventBox } from '../wrapper/fxEventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { IFxEventFloat } from '../../types/beatmap/v3/fxEventFloat.ts';
import { FxEventFloat } from './fxEventFloat.ts';
import { IFxEventFloatBoxContainer } from '../../types/beatmap/v3/container.ts';
import { DeepRequiredIgnore } from '../../types/utils.ts';

/** FX event box beatmap v3 class object. */
export class FxEventBox extends WrapFxEventBox<
   IFxEventFloatBoxContainer,
   IFxEventFloat,
   IIndexFilter
> {
   static default: DeepRequiredIgnore<IFxEventFloatBoxContainer, 'customData'> = {
      data: {
         f: { ...IndexFilter.default },
         w: 0,
         d: 1,
         s: 0,
         t: 1,
         b: 0,
         i: 0,
         l: [],
         customData: {},
      },
      eventData: [],
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapFxEventBoxAttribute<
            IFxEventFloatBoxContainer,
            IFxEventFloat,
            IIndexFilter
         >
      >,
   );
   constructor(
      data: DeepPartial<IFxEventBox>,
      events?: Partial<IFxEventFloat>[],
   );
   constructor(
      data:
         & DeepPartial<IFxEventBox>
         & DeepPartial<
            IWrapFxEventBoxAttribute<
               IFxEventFloatBoxContainer,
               IFxEventFloat,
               IIndexFilter
            >
         >,
      events?: Partial<IFxEventFloat>[],
   );
   constructor(
      data:
         & DeepPartial<IFxEventBox>
         & DeepPartial<
            IWrapFxEventBoxAttribute<
               IFxEventFloatBoxContainer,
               IFxEventFloat,
               IIndexFilter
            >
         > = {},
      events?: Partial<IFxEventFloat>[],
   ) {
      super();

      this._filter = new IndexFilter(
         (data as IFxEventBox).f ??
            (data.filter as IIndexFilter) ??
            FxEventBox.default.data.f,
      );
      this._beatDistribution = data.w ?? data.beatDistribution ?? FxEventBox.default.data.w;
      this._beatDistributionType = data.d ?? data.beatDistributionType ?? FxEventBox.default.data.d;
      this._fxDistribution = data.s ?? data.fxDistribution ?? FxEventBox.default.data.s;
      this._fxDistributionType = data.t ?? data.fxDistributionType ?? FxEventBox.default.data.t;
      this._affectFirst = data.b ?? data.affectFirst ?? FxEventBox.default.data.b;
      this._easing = data.i ?? data.easing ?? FxEventBox.default.data.i;
      if (events) {
         for (const n of data.l || []) {
            this._events.push(new FxEventFloat(events[n]));
         }
      } else {
         this._events = (
            (data.events as IFxEventFloat[]) ?? FxEventBox.default.eventData
         ).map((obj) => new FxEventFloat(obj));
      }
      this._customData = deepCopy(
         data.customData ?? FxEventBox.default.data.customData,
      );
   }

   static create(): FxEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapFxEventBoxAttribute<IFxEventBox, IFxEventFloat, IIndexFilter>
      >[]
   ): FxEventBox[];
   static create(...data: DeepPartial<IFxEventBox>[]): FxEventBox[];
   static create(
      ...data: (
         & DeepPartial<IFxEventBox>
         & DeepPartial<
            IWrapFxEventBoxAttribute<IFxEventBox, IFxEventFloat, IIndexFilter>
         >
      )[]
   ): FxEventBox[];
   static create(
      ...data: (
         & DeepPartial<IFxEventBox>
         & DeepPartial<
            IWrapFxEventBoxAttribute<IFxEventBox, IFxEventFloat, IIndexFilter>
         >
      )[]
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
            f: this.filter.toJSON(),
            w: this.beatDistribution,
            d: this.beatDistributionType,
            s: this.fxDistribution,
            t: this.fxDistributionType,
            b: this.affectFirst,
            i: this.easing,
            l: [],
            customData: deepCopy(this.customData),
         },
         eventData: this.events.map((l) => l.toJSON()),
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
