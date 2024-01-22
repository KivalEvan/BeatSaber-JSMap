import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightRotationEvent } from '../../types/beatmap/v3/lightRotationEvent.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import { IWrapLightRotationEventBoxAttribute } from '../../types/beatmap/wrapper/lightRotationEventBox.ts';
import { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightRotationEventBox } from '../wrapper/lightRotationEventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightRotationBase } from './lightRotationBase.ts';

/** Light rotation event box beatmap v3 class object. */
export class LightRotationEventBox extends WrapLightRotationEventBox<
   ILightRotationEventBox,
   ILightRotationEvent,
   IIndexFilter
> {
   static default: Required<ILightRotationEventBox> = {
      f: { ...IndexFilter.default },
      w: 0,
      d: 1,
      s: 0,
      t: 1,
      a: 0,
      r: 0,
      b: 0,
      i: 0,
      l: [],
      customData: {},
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapLightRotationEventBoxAttribute<
            ILightRotationEventBox,
            ILightRotationEvent,
            IIndexFilter
         >
      >,
   );
   constructor(data: DeepPartial<ILightRotationEventBox>);
   constructor(
      data:
         & DeepPartial<ILightRotationEventBox>
         & DeepPartial<
            IWrapLightRotationEventBoxAttribute<
               ILightRotationEventBox,
               ILightRotationEvent,
               IIndexFilter
            >
         >,
   );
   constructor(
      data:
         & DeepPartial<ILightRotationEventBox>
         & DeepPartial<
            IWrapLightRotationEventBoxAttribute<
               ILightRotationEventBox,
               ILightRotationEvent,
               IIndexFilter
            >
         > = {},
   ) {
      super();

      this._filter = new IndexFilter(
         (data as ILightRotationEventBox).f ??
            (data.filter as IIndexFilter) ??
            LightRotationEventBox.default.f,
      );
      this._beatDistribution = data.w ?? data.beatDistribution ?? LightRotationEventBox.default.w;
      this._beatDistributionType = data.d ?? data.beatDistributionType ??
         LightRotationEventBox.default.d;
      this._rotationDistribution = data.s ?? data.rotationDistribution ??
         LightRotationEventBox.default.s;
      this._rotationDistributionType = data.t ?? data.rotationDistributionType ??
         LightRotationEventBox.default.t;
      this._axis = data.a ?? data.axis ?? LightRotationEventBox.default.a;
      this._flip = data.r ?? data.flip ?? LightRotationEventBox.default.r;
      this._affectFirst = data.b ?? data.affectFirst ?? LightRotationEventBox.default.b;
      this._easing = data.i ?? data.easing ?? LightRotationEventBox.default.i;
      this._events = (
         (data as ILightRotationEventBox).l ??
            (data.events as ILightRotationEvent[]) ??
            LightRotationEventBox.default.l
      ).map((obj) => new LightRotationBase(obj));
      this._customData = deepCopy(data.customData ?? LightRotationEventBox.default.customData);
   }

   static create(): LightRotationEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxAttribute<
            ILightRotationEventBox,
            ILightRotationEvent,
            IIndexFilter
         >
      >[]
   ): LightRotationEventBox[];
   static create(...data: DeepPartial<ILightRotationEventBox>[]): LightRotationEventBox[];
   static create(
      ...data: (
         & DeepPartial<ILightRotationEventBox>
         & DeepPartial<
            IWrapLightRotationEventBoxAttribute<
               ILightRotationEventBox,
               ILightRotationEvent,
               IIndexFilter
            >
         >
      )[]
   ): LightRotationEventBox[];
   static create(
      ...data: (
         & DeepPartial<ILightRotationEventBox>
         & DeepPartial<
            IWrapLightRotationEventBoxAttribute<
               ILightRotationEventBox,
               ILightRotationEvent,
               IIndexFilter
            >
         >
      )[]
   ): LightRotationEventBox[] {
      const result: LightRotationEventBox[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightRotationEventBox> {
      return {
         f: this.filter.toJSON(),
         w: this.beatDistribution,
         d: this.beatDistributionType,
         s: this.rotationDistribution,
         t: this.rotationDistributionType,
         a: this.axis,
         r: this.flip,
         b: this.affectFirst,
         i: this.easing,
         l: this.events.map((l) => l.toJSON()),
         customData: deepCopy(this.customData),
      };
   }

   get filter(): IndexFilter {
      return this._filter as IndexFilter;
   }
   set filter(value: IndexFilter) {
      this._filter = value;
   }

   get events(): LightRotationBase[] {
      return this._events as LightRotationBase[];
   }
   set events(value: LightRotationBase[]) {
      this._events = value;
   }

   get customData(): NonNullable<ILightRotationEventBox['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightRotationEventBox['customData']>) {
      this._customData = value;
   }

   setEvents(value: LightRotationBase[]): this {
      this.events = value;
      return this;
   }
}
