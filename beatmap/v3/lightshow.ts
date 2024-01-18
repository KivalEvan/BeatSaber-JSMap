import { ILightshow } from '../../types/beatmap/v3/lightshow.ts';
import { BasicEvent } from './basicEvent.ts';
import { ColorBoostEvent } from './colorBoostEvent.ts';
import { LightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { LightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { LightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { DeepPartial } from '../../types/utils.ts';
import { IBasicEvent } from '../../types/beatmap/v3/basicEvent.ts';
import { IColorBoostEvent } from '../../types/beatmap/v3/colorBoostEvent.ts';
import { ILightRotationEventBoxGroup } from '../../types/beatmap/v3/lightRotationEventBoxGroup.ts';
import { ILightColorEventBoxGroup } from '../../types/beatmap/v3/lightColorEventBoxGroup.ts';
import { ILightTranslationEventBoxGroup } from '../../types/beatmap/v3/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightshow } from '../wrapper/lightshow.ts';
import { IWrapLightTranslationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import { IWrapLightColorEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { IWrapLightRotationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';
import { ILightColorBase } from '../../types/beatmap/v3/lightColorBase.ts';
import { ILightRotationBase } from '../../types/beatmap/v3/lightRotationBase.ts';
import { ILightTranslationBase } from '../../types/beatmap/v3/lightTranslationBase.ts';
import { IWrapFxEventBoxGroupAttribute } from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import { IFxEventBox } from '../../types/beatmap/v3/fxEventBox.ts';
import { IFxEventBoxGroup } from '../../types/beatmap/v3/fxEventBoxGroup.ts';
import { FxEventBoxGroup } from './fxEventBoxGroup.ts';
import { FxEventsCollection } from './fxEventsCollection.ts';

/** Lightshow beatmap v3 class object. */
export class Lightshow extends WrapLightshow<ILightshow> {
   basicEvents: BasicEvent[];
   colorBoostEvents: ColorBoostEvent[];
   lightColorEventBoxGroups: LightColorEventBoxGroup[];
   lightRotationEventBoxGroups: LightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups: LightTranslationEventBoxGroup[];
   fxEventBoxGroups: FxEventBoxGroup[];
   fxEventsCollection: FxEventsCollection;

   constructor(data: Partial<ILightshow> = {}) {
      super();

      this.basicEvents = (data.basicBeatmapEvents ?? []).map((obj) => new BasicEvent(obj));
      this.colorBoostEvents = (data.colorBoostBeatmapEvents ?? []).map(
         (obj) => new ColorBoostEvent(obj),
      );
      this.lightColorEventBoxGroups = (data.lightColorEventBoxGroups ?? []).map(
         (obj) => new LightColorEventBoxGroup(obj),
      );
      this.lightRotationEventBoxGroups = (data.lightRotationEventBoxGroups ?? []).map(
         (obj) => new LightRotationEventBoxGroup(obj),
      );
      this.lightTranslationEventBoxGroups = (data.lightTranslationEventBoxGroups ?? []).map(
         (obj) => new LightTranslationEventBoxGroup(obj),
      );
      this.fxEventBoxGroups = (data.vfxEventBoxGroups ?? []).map((obj) => new FxEventBoxGroup(obj));
      this.fxEventsCollection = new FxEventsCollection(
         data._fxEventsCollection ?? {
            _fl: [],
            _il: [],
         },
      );
      this.customData = deepCopy(data.customData ?? {});
   }

   static create(data: Partial<ILightshow> = {}): Lightshow {
      return new this(data);
   }

   toJSON(): Required<ILightshow> {
      return {
         basicBeatmapEvents: this.basicEvents.map((obj) => obj.toJSON()),
         colorBoostBeatmapEvents: this.colorBoostEvents.map((obj) => obj.toJSON()),
         lightColorEventBoxGroups: this.lightColorEventBoxGroups.map((obj) => obj.toJSON()),
         lightRotationEventBoxGroups: this.lightRotationEventBoxGroups.map((obj) => obj.toJSON()),
         lightTranslationEventBoxGroups: this.lightTranslationEventBoxGroups.map((obj) =>
            obj.toJSON()
         ),
         vfxEventBoxGroups: this.fxEventBoxGroups.map((obj) => obj.toJSON()),
         _fxEventsCollection: this.fxEventsCollection.toJSON(),
         customData: deepCopy(this.customData),
      };
   }

   get customData(): NonNullable<ILightshow['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightshow['customData']>) {
      this._customData = value;
   }

   reparse(keepRef?: boolean): this {
      this.basicEvents = this.basicEvents.map((obj) => this.createOrKeep(BasicEvent, obj, keepRef));
      this.colorBoostEvents = this.colorBoostEvents.map((obj) =>
         this.createOrKeep(ColorBoostEvent, obj, keepRef)
      );
      this.fxEventsCollection = new FxEventsCollection(this.fxEventsCollection);

      return this;
   }

   addBasicEvents(...data: Partial<IWrapEventAttribute<IBasicEvent>>[]): this;
   addBasicEvents(...data: Partial<IBasicEvent>[]): this;
   addBasicEvents(
      ...data: (Partial<IBasicEvent>[] & Partial<IWrapEventAttribute<IBasicEvent>>)[]
   ): this;
   addBasicEvents(
      ...data: (Partial<IBasicEvent>[] & Partial<IWrapEventAttribute<IBasicEvent>>)[]
   ): this {
      for (const obj of data) this.basicEvents.push(new BasicEvent(obj));
      return this;
   }

   addColorBoostEvents(...data: Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>[]): this;
   addColorBoostEvents(...data: Partial<IColorBoostEvent>[]): this;
   addColorBoostEvents(
      ...data: (
         & Partial<IColorBoostEvent>
         & Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>
      )[]
   ): this;
   addColorBoostEvents(
      ...data: (
         & Partial<IColorBoostEvent>
         & Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>
      )[]
   ): this {
      for (const obj of data) this.colorBoostEvents.push(new ColorBoostEvent(obj));
      return this;
   }

   addLightColorEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightColorEventBoxGroupAttribute<
            ILightColorEventBoxGroup,
            ILightColorEventBox,
            ILightColorBase,
            IIndexFilter
         >
      >[]
   ): this;
   addLightColorEventBoxGroups(...data: DeepPartial<ILightColorEventBoxGroup>[]): this;
   addLightColorEventBoxGroups(
      ...data: (
         & DeepPartial<ILightColorEventBoxGroup>
         & DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               ILightColorEventBoxGroup,
               ILightColorEventBox,
               ILightColorBase,
               IIndexFilter
            >
         >
      )[]
   ): this;
   addLightColorEventBoxGroups(
      ...data: (
         & DeepPartial<ILightColorEventBoxGroup>
         & DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               ILightColorEventBoxGroup,
               ILightColorEventBox,
               ILightColorBase,
               IIndexFilter
            >
         >
      )[]
   ): this {
      for (const obj of data) this.lightColorEventBoxGroups.push(new LightColorEventBoxGroup(obj));
      return this;
   }

   addLightRotationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxGroupAttribute<
            ILightRotationEventBoxGroup,
            ILightRotationEventBox,
            ILightRotationBase,
            IIndexFilter
         >
      >[]
   ): this;
   addLightRotationEventBoxGroups(...data: DeepPartial<ILightRotationEventBoxGroup>[]): this;
   addLightRotationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightRotationEventBoxGroup>
         & DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               ILightRotationEventBoxGroup,
               ILightRotationEventBox,
               ILightRotationBase,
               IIndexFilter
            >
         >
      )[]
   ): this;
   addLightRotationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightRotationEventBoxGroup>
         & DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               ILightRotationEventBoxGroup,
               ILightRotationEventBox,
               ILightRotationBase,
               IIndexFilter
            >
         >
      )[]
   ): this {
      for (const obj of data) {
         this.lightRotationEventBoxGroups.push(new LightRotationEventBoxGroup(obj));
      }
      return this;
   }

   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            ILightTranslationEventBoxGroup,
            ILightTranslationEventBox,
            ILightTranslationBase,
            IIndexFilter
         >
      >[]
   ): this;
   addLightTranslationEventBoxGroups(...data: DeepPartial<ILightTranslationEventBoxGroup>[]): this;
   addLightTranslationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightTranslationEventBoxGroup>
         & DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >
      )[]
   ): this;
   addLightTranslationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightTranslationEventBoxGroup>
         & DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >
      )[]
   ): this {
      for (const obj of data) {
         this.lightTranslationEventBoxGroups.push(new LightTranslationEventBoxGroup(obj));
      }
      return this;
   }

   addFxEventBoxGroups(
      ...data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<IFxEventBoxGroup, IFxEventBox, IIndexFilter>
      >[]
   ): this;
   addFxEventBoxGroups(...data: DeepPartial<IFxEventBoxGroup>[]): this;
   addFxEventBoxGroups(
      ...data: (
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<IWrapFxEventBoxGroupAttribute<IFxEventBoxGroup, IFxEventBox, IIndexFilter>>
      )[]
   ): this;
   addFxEventBoxGroups(
      ...data: (
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<IWrapFxEventBoxGroupAttribute<IFxEventBoxGroup, IFxEventBox, IIndexFilter>>
      )[]
   ): this {
      for (const obj of data) {
         this.fxEventBoxGroups.push(new FxEventBoxGroup(obj));
      }
      return this;
   }

   isValid(): boolean {
      return (
         this.basicEvents.every((obj) => this.checkClass(BasicEvent, obj)) ||
         this.colorBoostEvents.every((obj) => this.checkClass(ColorBoostEvent, obj)) ||
         this.lightColorEventBoxGroups.every((obj) =>
            this.checkClass(LightColorEventBoxGroup, obj)
         ) ||
         this.lightRotationEventBoxGroups.every((obj) =>
            this.checkClass(LightRotationEventBoxGroup, obj)
         ) ||
         this.lightTranslationEventBoxGroups.every((obj) =>
            this.checkClass(LightTranslationEventBoxGroup, obj)
         ) ||
         this.fxEventBoxGroups.every((obj) => this.checkClass(FxEventBoxGroup, obj)) ||
         this.fxEventsCollection instanceof FxEventsCollection
      );
   }
}
