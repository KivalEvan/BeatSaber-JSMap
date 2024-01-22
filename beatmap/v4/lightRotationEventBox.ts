import {
   ILightRotationBoxContainer,
   ILightRotationEventContainer,
} from '../../types/beatmap/v4/container.ts';
import { IIndexFilter } from '../../types/beatmap/v4/indexFilter.ts';
import { ILightRotationEvent } from '../../types/beatmap/v4/lightRotationEvent.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v4/lightRotationEventBox.ts';
import { IWrapLightRotationEventBoxAttribute } from '../../types/beatmap/wrapper/lightRotationEventBox.ts';
import { DeepPartial, DeepRequiredIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightRotationEventBox } from '../wrapper/lightRotationEventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightRotationEvent } from './lightRotationEvent.ts';

/** Light rotation event box beatmap v4 class object. */
export class LightRotationEventBox extends WrapLightRotationEventBox<
   ILightRotationBoxContainer,
   ILightRotationEventContainer,
   IIndexFilter
> {
   static default: DeepRequiredIgnore<
      ILightRotationBoxContainer,
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
         IWrapLightRotationEventBoxAttribute<
            ILightRotationBoxContainer,
            ILightRotationEventContainer,
            IIndexFilter
         >
      >,
   );
   constructor(
      data: Partial<ILightRotationEventBox>,
      events?: Partial<ILightRotationEvent>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   );
   constructor(
      data:
         & Partial<ILightRotationEventBox>
         & DeepPartial<
            IWrapLightRotationEventBoxAttribute<
               ILightRotationBoxContainer,
               ILightRotationEventContainer,
               IIndexFilter
            >
         >,
      events?: Partial<ILightRotationEvent>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   );
   constructor(
      data:
         & Partial<ILightRotationEventBox>
         & DeepPartial<
            IWrapLightRotationEventBoxAttribute<
               ILightRotationBoxContainer,
               ILightRotationEventContainer,
               IIndexFilter
            >
         > = {},
      events?: Partial<ILightRotationEvent>[],
      times?: number[],
      filter?: Partial<IIndexFilter>,
   ) {
      super();

      this._filter = new IndexFilter(
         filter ??
            (data.filter as IIndexFilter) ??
            LightRotationEventBox.default.filterData,
      );
      this._beatDistribution = data.w ??
         data.beatDistribution ??
         LightRotationEventBox.default.data.w;
      this._beatDistributionType = data.d ??
         data.beatDistributionType ??
         LightRotationEventBox.default.data.d;
      this._rotationDistribution = data.s ??
         data.rotationDistribution ??
         LightRotationEventBox.default.data.s;
      this._rotationDistributionType = data.t ??
         data.rotationDistributionType ??
         LightRotationEventBox.default.data.t;
      this._affectFirst = data.b ?? data.affectFirst ?? LightRotationEventBox.default.data.b;
      this._easing = data.e ?? data.easing ?? LightRotationEventBox.default.data.e;
      this._axis = data.a ?? data.axis ?? LightRotationEventBox.default.data.a;
      this._flip = data.f ?? data.flip ?? LightRotationEventBox.default.data.f;
      this._events = (
         events! ??
            data.events ??
            LightRotationEventBox.default.eventData
      ).map((obj, i) => new LightRotationEvent(obj, times?.[i]));
      this._customData = deepCopy(
         data.customData ?? LightRotationEventBox.default.data.customData,
      );
   }

   static create(): LightRotationEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxAttribute<
            ILightRotationBoxContainer,
            ILightRotationEventContainer,
            IIndexFilter
         >
      >[]
   ): LightRotationEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxAttribute<
            ILightRotationBoxContainer,
            ILightRotationEventContainer,
            IIndexFilter
         >
      >[]
   ): LightRotationEventBox[] {
      const result: LightRotationEventBox[] = data.map(
         (obj) => new this(obj),
      );
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightRotationBoxContainer> {
      return {
         data: {
            w: this.beatDistribution,
            d: this.beatDistributionType,
            s: this.rotationDistribution,
            t: this.rotationDistributionType,
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

   get events(): LightRotationEvent[] {
      return this._events as LightRotationEvent[];
   }
   set events(value: LightRotationEvent[]) {
      this._events = value;
   }

   get customData(): NonNullable<ILightRotationEventBox['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightRotationEventBox['customData']>) {
      this._customData = value;
   }

   setEvents(value: LightRotationEvent[]): this {
      this.events = value;
      return this;
   }
}
