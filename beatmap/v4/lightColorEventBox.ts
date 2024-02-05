import {
   ILightColorBoxContainer,
   ILightColorEventContainer,
} from '../../types/beatmap/container/v4.ts';
import { IIndexFilter } from '../../types/beatmap/v4/indexFilter.ts';
import { ILightColorEvent } from '../../types/beatmap/v4/lightColorEvent.ts';
import { ILightColorEventBox } from '../../types/beatmap/v4/lightColorEventBox.ts';
import { IWrapLightColorEventBoxAttribute } from '../../types/beatmap/wrapper/lightColorEventBox.ts';
import { DeepPartial, DeepRequiredIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightColorEventBox } from '../wrapper/lightColorEventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightColorEvent } from './lightColorEvent.ts';

/** Light color event box beatmap v4 class object. */
export class LightColorEventBox extends WrapLightColorEventBox<
   ILightColorBoxContainer,
   ILightColorEventContainer,
   IIndexFilter
> {
   static default: DeepRequiredIgnore<ILightColorBoxContainer, 'customData'> = {
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
         IWrapLightColorEventBoxAttribute<
            ILightColorBoxContainer,
            ILightColorEventContainer,
            IIndexFilter
         >
      >,
   );
   constructor(
      data: Partial<ILightColorEventBox>,
      events?: Partial<ILightColorEvent>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   );
   constructor(
      data:
         & Partial<ILightColorEventBox>
         & DeepPartial<
            IWrapLightColorEventBoxAttribute<
               ILightColorBoxContainer,
               ILightColorEventContainer,
               IIndexFilter
            >
         >,
      events?: Partial<ILightColorEvent>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   );
   constructor(
      data:
         & Partial<ILightColorEventBox>
         & DeepPartial<
            IWrapLightColorEventBoxAttribute<
               ILightColorBoxContainer,
               ILightColorEventContainer,
               IIndexFilter
            >
         > = {},
      events?: Partial<ILightColorEvent>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   ) {
      super();

      this._filter = new IndexFilter(
         filter ??
            (data.filter as IIndexFilter) ??
            LightColorEventBox.default.filterData,
      );
      this._beatDistribution = data.w ?? data.beatDistribution ?? LightColorEventBox.default.data.w;
      this._beatDistributionType = data.d ??
         data.beatDistributionType ??
         LightColorEventBox.default.data.d;
      this._brightnessDistribution = data.s ??
         data.brightnessDistribution ??
         LightColorEventBox.default.data.s;
      this._brightnessDistributionType = data.t ??
         data.brightnessDistributionType ??
         LightColorEventBox.default.data.t;
      this._affectFirst = data.b ?? data.affectFirst ?? LightColorEventBox.default.data.b;
      this._easing = data.e ?? data.easing ?? LightColorEventBox.default.data.e;
      this._events = (
         events! ??
            data.events ??
            LightColorEventBox.default.eventData
      ).map((obj, i) => new LightColorEvent(obj, times?.[i]));
      this._customData = deepCopy(
         data.customData ?? LightColorEventBox.default.data.customData,
      );
   }

   static create(): LightColorEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapLightColorEventBoxAttribute<
            ILightColorBoxContainer,
            ILightColorEventContainer,
            IIndexFilter
         >
      >[]
   ): LightColorEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapLightColorEventBoxAttribute<
            ILightColorBoxContainer,
            ILightColorEventContainer,
            IIndexFilter
         >
      >[]
   ): LightColorEventBox[] {
      const result: LightColorEventBox[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightColorBoxContainer> {
      return {
         data: {
            w: this.beatDistribution,
            d: this.beatDistributionType,
            s: this.brightnessDistribution,
            t: this.brightnessDistributionType,
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

   get events(): LightColorEvent[] {
      return this._events as LightColorEvent[];
   }
   set events(value: LightColorEvent[]) {
      this._events = value;
   }

   get customData(): NonNullable<ILightColorEventBox['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightColorEventBox['customData']>) {
      this._customData = value;
   }

   setEvents(value: LightColorEvent[]): this {
      this.events = value;
      return this;
   }
}
