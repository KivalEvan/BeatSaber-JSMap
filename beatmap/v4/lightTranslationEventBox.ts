import {
   ILightTranslationBoxContainer,
   ILightTranslationEventContainer,
} from '../../types/beatmap/v4/container.ts';
import { IIndexFilter } from '../../types/beatmap/v4/indexFilter.ts';
import { ILightTranslationEvent } from '../../types/beatmap/v4/lightTranslationEvent.ts';
import { ILightTranslationEventBox } from '../../types/beatmap/v4/lightTranslationEventBox.ts';
import { IWrapLightTranslationEventBoxAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import { DeepPartial, DeepRequiredIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightTranslationEventBox } from '../wrapper/lightTranslationEventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightTranslationEvent } from './lightTranslationEvent.ts';

/** Light translation event box beatmap v4 class object. */
export class LightTranslationEventBox extends WrapLightTranslationEventBox<
   ILightTranslationBoxContainer,
   ILightTranslationEventContainer,
   IIndexFilter
> {
   static default: DeepRequiredIgnore<
      ILightTranslationBoxContainer,
      'customData'
   > = {
      data: {
         w: 0,
         d: 1,
         s: 0,
         t: 1,
         b: 0,
         e: 0,
         f: 0,
         a: 0,
         customData: {},
      },
      eventData: [],
      filterData: { ...IndexFilter.default },
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapLightTranslationEventBoxAttribute<
            ILightTranslationBoxContainer,
            ILightTranslationEventContainer,
            IIndexFilter
         >
      >,
   );
   constructor(
      data: Partial<ILightTranslationEventBox>,
      events?: Partial<ILightTranslationEvent>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   );
   constructor(
      data:
         & Partial<ILightTranslationEventBox>
         & DeepPartial<
            IWrapLightTranslationEventBoxAttribute<
               ILightTranslationBoxContainer,
               ILightTranslationEventContainer,
               IIndexFilter
            >
         >,
      events?: Partial<ILightTranslationEvent>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   );
   constructor(
      data:
         & Partial<ILightTranslationEventBox>
         & DeepPartial<
            IWrapLightTranslationEventBoxAttribute<
               ILightTranslationBoxContainer,
               ILightTranslationEventContainer,
               IIndexFilter
            >
         > = {},
      events?: Partial<ILightTranslationEvent>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   ) {
      super();

      this._filter = new IndexFilter(
         filter ??
            (data.filter as IIndexFilter) ??
            LightTranslationEventBox.default.filterData,
      );
      this._beatDistribution = data.w ??
         data.beatDistribution ??
         LightTranslationEventBox.default.data.w;
      this._beatDistributionType = data.d ??
         data.beatDistributionType ??
         LightTranslationEventBox.default.data.d;
      this._translationDistribution = data.s ??
         data.gapDistribution ??
         LightTranslationEventBox.default.data.s;
      this._translationDistributionType = data.t ??
         data.gapDistributionType ??
         LightTranslationEventBox.default.data.t;
      this._affectFirst = data.b ?? data.affectFirst ?? LightTranslationEventBox.default.data.b;
      this._easing = data.e ?? data.easing ?? LightTranslationEventBox.default.data.e;
      this._axis = data.a ?? data.axis ?? LightTranslationEventBox.default.data.a;
      this._flip = data.f ?? data.flip ?? LightTranslationEventBox.default.data.f;
      this._events = (
         events! ??
            data.events ??
            LightTranslationEventBox.default.eventData
      ).map((obj, i) => new LightTranslationEvent(obj, times?.[i]));
      this._customData = deepCopy(
         data.customData ?? LightTranslationEventBox.default.data.customData,
      );
   }

   static create(): LightTranslationEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxAttribute<
            ILightTranslationBoxContainer,
            ILightTranslationEventContainer,
            IIndexFilter
         >
      >[]
   ): LightTranslationEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxAttribute<
            ILightTranslationBoxContainer,
            ILightTranslationEventContainer,
            IIndexFilter
         >
      >[]
   ): LightTranslationEventBox[] {
      const result: LightTranslationEventBox[] = data.map(
         (obj) => new this(obj),
      );
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightTranslationBoxContainer> {
      return {
         data: {
            w: this.beatDistribution,
            d: this.beatDistributionType,
            s: this.gapDistribution,
            t: this.gapDistributionType,
            b: this.affectFirst,
            e: this.easing,
            a: this.axis,
            f: this.flip,
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

   get events(): LightTranslationEvent[] {
      return this._events as LightTranslationEvent[];
   }
   set events(value: LightTranslationEvent[]) {
      this._events = value;
   }

   get customData(): NonNullable<ILightTranslationEventBox['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightTranslationEventBox['customData']>) {
      this._customData = value;
   }

   setEvents(value: LightTranslationEvent[]): this {
      this.events = value;
      return this;
   }
}
