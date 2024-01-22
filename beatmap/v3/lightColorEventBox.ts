import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightColorEvent } from '../../types/beatmap/v3/lightColorEvent.ts';
import { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import { IWrapLightColorEventBoxAttribute } from '../../types/beatmap/wrapper/lightColorEventBox.ts';
import { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightColorEventBox } from '../wrapper/lightColorEventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightColorBase } from './lightColorBase.ts';

/** Light color event box beatmap v3 class object. */
export class LightColorEventBox extends WrapLightColorEventBox<
   ILightColorEventBox,
   ILightColorEvent,
   IIndexFilter
> {
   static default: Required<ILightColorEventBox> = {
      f: { ...IndexFilter.default },
      w: 0,
      d: 1,
      r: 0,
      t: 1,
      b: 0,
      i: 0,
      e: [],
      customData: {},
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapLightColorEventBoxAttribute<
            ILightColorEventBox,
            ILightColorEvent,
            IIndexFilter
         >
      >,
   );
   constructor(data: DeepPartial<ILightColorEventBox>);
   constructor(
      data:
         & DeepPartial<ILightColorEventBox>
         & DeepPartial<
            IWrapLightColorEventBoxAttribute<
               ILightColorEventBox,
               ILightColorEvent,
               IIndexFilter
            >
         >,
   );
   constructor(
      data:
         & DeepPartial<ILightColorEventBox>
         & DeepPartial<
            IWrapLightColorEventBoxAttribute<
               ILightColorEventBox,
               ILightColorEvent,
               IIndexFilter
            >
         > = {},
   ) {
      super();

      this._filter = new IndexFilter(
         (data as ILightColorEventBox).f ??
            (data.filter as IIndexFilter) ??
            LightColorEventBox.default.f,
      );
      this._beatDistribution = data.w ?? data.beatDistribution ?? LightColorEventBox.default.w;
      this._beatDistributionType = data.d ?? data.beatDistributionType ??
         LightColorEventBox.default.d;
      this._brightnessDistribution = data.r ?? data.brightnessDistribution ??
         LightColorEventBox.default.r;
      this._brightnessDistributionType = data.t ??
         data.brightnessDistributionType ??
         LightColorEventBox.default.t;
      this._affectFirst = data.b ?? data.affectFirst ?? LightColorEventBox.default.b;
      this._easing = data.i ?? data.easing ?? LightColorEventBox.default.i;
      this._events = (
         (data as ILightColorEventBox).e ??
            (data.events as ILightColorEvent[]) ??
            LightColorEventBox.default.e
      ).map((obj) => new LightColorBase(obj));
      this._customData = deepCopy(
         data.customData ?? LightColorEventBox.default.customData,
      );
   }

   static create(): LightColorEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapLightColorEventBoxAttribute<
            ILightColorEventBox,
            ILightColorEvent,
            IIndexFilter
         >
      >[]
   ): LightColorEventBox[];
   static create(
      ...data: DeepPartial<ILightColorEventBox>[]
   ): LightColorEventBox[];
   static create(
      ...data: (
         & DeepPartial<ILightColorEventBox>
         & DeepPartial<
            IWrapLightColorEventBoxAttribute<
               ILightColorEventBox,
               ILightColorEvent,
               IIndexFilter
            >
         >
      )[]
   ): LightColorEventBox[];
   static create(
      ...data: (
         & DeepPartial<ILightColorEventBox>
         & DeepPartial<
            IWrapLightColorEventBoxAttribute<
               ILightColorEventBox,
               ILightColorEvent,
               IIndexFilter
            >
         >
      )[]
   ): LightColorEventBox[] {
      const result: LightColorEventBox[] = data.map((eb) => new this(eb));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightColorEventBox> {
      return {
         f: this.filter.toJSON(),
         w: this.beatDistribution,
         d: this.beatDistributionType,
         r: this.brightnessDistribution,
         t: this.brightnessDistributionType,
         b: this.affectFirst,
         i: this.easing,
         e: this.events.map((e) => e.toJSON()),
         customData: deepCopy(this.customData),
      };
   }

   get filter(): IndexFilter {
      return this._filter as IndexFilter;
   }
   set filter(value: IndexFilter) {
      this._filter = value;
   }

   get events(): LightColorBase[] {
      return this._events as LightColorBase[];
   }
   set events(value: LightColorBase[]) {
      this._events = value;
   }

   get customData(): NonNullable<ILightColorEventBox['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightColorEventBox['customData']>) {
      this._customData = value;
   }

   setEvents(value: LightColorBase[]): this {
      this.events = value;
      return this;
   }
}
