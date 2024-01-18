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
      let temp;

      temp = data.basicBeatmapEvents ?? [];
      this.basicEvents = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.basicEvents[i] = new BasicEvent(temp[i]);
      }

      temp = data.colorBoostBeatmapEvents ?? [];
      this.colorBoostEvents = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.colorBoostEvents[i] = new ColorBoostEvent(temp[i]);
      }

      temp = data.lightColorEventBoxGroups ?? [];
      this.lightColorEventBoxGroups = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.lightColorEventBoxGroups[i] = new LightColorEventBoxGroup(
            temp[i],
         );
      }

      temp = data.lightRotationEventBoxGroups ?? [];
      this.lightRotationEventBoxGroups = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.lightRotationEventBoxGroups[i] = new LightRotationEventBoxGroup(
            temp[i],
         );
      }

      temp = data.lightTranslationEventBoxGroups ?? [];
      this.lightTranslationEventBoxGroups = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.lightTranslationEventBoxGroups[i] = new LightTranslationEventBoxGroup(temp[i]);
      }

      temp = data.vfxEventBoxGroups ?? [];
      this.fxEventBoxGroups = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.fxEventBoxGroups[i] = new FxEventBoxGroup(temp[i]);
      }

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
      const json: Required<ILightshow> = {
         basicBeatmapEvents: new Array(this.basicEvents.length),
         colorBoostBeatmapEvents: new Array(this.colorBoostEvents.length),
         lightColorEventBoxGroups: new Array(
            this.lightColorEventBoxGroups.length,
         ),
         lightRotationEventBoxGroups: new Array(
            this.lightRotationEventBoxGroups.length,
         ),
         lightTranslationEventBoxGroups: new Array(
            this.lightTranslationEventBoxGroups.length,
         ),
         vfxEventBoxGroups: new Array(this.fxEventBoxGroups.length),
         _fxEventsCollection: this.fxEventsCollection.toJSON(),
         customData: deepCopy(this.customData),
      };
      for (let i = 0; i < this.basicEvents.length; i++) {
         json.basicBeatmapEvents[i] = this.basicEvents[i].toJSON();
      }
      for (let i = 0; i < this.colorBoostEvents.length; i++) {
         json.colorBoostBeatmapEvents[i] = this.colorBoostEvents[i].toJSON();
      }
      for (let i = 0; i < this.lightColorEventBoxGroups.length; i++) {
         json.lightColorEventBoxGroups[i] = this.lightColorEventBoxGroups[i].toJSON();
      }
      for (let i = 0; i < this.lightRotationEventBoxGroups.length; i++) {
         json.lightRotationEventBoxGroups[i] = this.lightRotationEventBoxGroups[i].toJSON();
      }
      for (let i = 0; i < this.lightTranslationEventBoxGroups.length; i++) {
         json.lightTranslationEventBoxGroups[i] = this.lightTranslationEventBoxGroups[i].toJSON();
      }
      for (let i = 0; i < this.fxEventBoxGroups.length; i++) {
         json.vfxEventBoxGroups[i] = this.fxEventBoxGroups[i].toJSON();
      }

      return json;
   }

   get customData(): NonNullable<ILightshow['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightshow['customData']>) {
      this._customData = value;
   }

   reparse(keepRef?: boolean): this {
      for (let i = 0; i < this.basicEvents.length; i++) {
         this.basicEvents[i] = this.createOrKeep(
            BasicEvent,
            this.basicEvents[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.colorBoostEvents.length; i++) {
         this.colorBoostEvents[i] = this.createOrKeep(
            ColorBoostEvent,
            this.colorBoostEvents[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.lightColorEventBoxGroups.length; i++) {
         this.lightColorEventBoxGroups[i] = this.createOrKeep(
            LightColorEventBoxGroup,
            this.lightColorEventBoxGroups[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.lightRotationEventBoxGroups.length; i++) {
         this.lightRotationEventBoxGroups[i] = this.createOrKeep(
            LightRotationEventBoxGroup,
            this.lightRotationEventBoxGroups[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.lightTranslationEventBoxGroups.length; i++) {
         this.lightTranslationEventBoxGroups[i] = this.createOrKeep(
            LightTranslationEventBoxGroup,
            this.lightTranslationEventBoxGroups[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.fxEventBoxGroups.length; i++) {
         this.fxEventBoxGroups[i] = this.createOrKeep(
            FxEventBoxGroup,
            this.fxEventBoxGroups[i],
            keepRef,
         );
      }
      this.fxEventsCollection = new FxEventsCollection(this.fxEventsCollection);

      return this;
   }

   addBasicEvents(...data: Partial<IWrapEventAttribute<IBasicEvent>>[]): void;
   addBasicEvents(...data: Partial<IBasicEvent>[]): void;
   addBasicEvents(
      ...data: (
         & Partial<IBasicEvent>[]
         & Partial<IWrapEventAttribute<IBasicEvent>>
      )[]
   ): void;
   addBasicEvents(
      ...data: (
         & Partial<IBasicEvent>[]
         & Partial<IWrapEventAttribute<IBasicEvent>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.basicEvents.push(new BasicEvent(data[i]));
      }
   }

   addColorBoostEvents(
      ...data: Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>[]
   ): void;
   addColorBoostEvents(...data: Partial<IColorBoostEvent>[]): void;
   addColorBoostEvents(
      ...data: (
         & Partial<IColorBoostEvent>
         & Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>
      )[]
   ): void;
   addColorBoostEvents(
      ...data: (
         & Partial<IColorBoostEvent>
         & Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.colorBoostEvents.push(new ColorBoostEvent(data[i]));
      }
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
   ): void;
   addLightColorEventBoxGroups(
      ...data: DeepPartial<ILightColorEventBoxGroup>[]
   ): void;
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
   ): void;
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
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.lightColorEventBoxGroups.push(
            new LightColorEventBoxGroup(data[i]),
         );
      }
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
   ): void;
   addLightRotationEventBoxGroups(
      ...data: DeepPartial<ILightRotationEventBoxGroup>[]
   ): void;
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
   ): void;
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
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.lightRotationEventBoxGroups.push(
            new LightRotationEventBoxGroup(data[i]),
         );
      }
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
   ): void;
   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<ILightTranslationEventBoxGroup>[]
   ): void;
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
   ): void;
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
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.lightTranslationEventBoxGroups.push(
            new LightTranslationEventBoxGroup(data[i]),
         );
      }
   }

   addFxEventBoxGroups(
      ...data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<
            IFxEventBoxGroup,
            IFxEventBox,
            IIndexFilter
         >
      >[]
   ): void;
   addFxEventBoxGroups(...data: DeepPartial<IFxEventBoxGroup>[]): void;
   addFxEventBoxGroups(
      ...data: (
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IFxEventBoxGroup,
               IFxEventBox,
               IIndexFilter
            >
         >
      )[]
   ): void;
   addFxEventBoxGroups(
      ...data: (
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IFxEventBoxGroup,
               IFxEventBox,
               IIndexFilter
            >
         >
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.fxEventBoxGroups.push(new FxEventBoxGroup(data[i]));
      }
   }

   isValid(): boolean {
      for (let i = 0; i < this.basicEvents.length; i++) {
         if (!this.checkClass(BasicEvent, this.basicEvents[i])) return false;
      }
      for (let i = 0; i < this.colorBoostEvents.length; i++) {
         if (!this.checkClass(ColorBoostEvent, this.colorBoostEvents[i])) {
            return false;
         }
      }
      for (let i = 0; i < this.lightColorEventBoxGroups.length; i++) {
         if (
            !this.checkClass(
               LightColorEventBoxGroup,
               this.lightColorEventBoxGroups[i],
            )
         ) {
            return false;
         }
      }
      for (let i = 0; i < this.lightRotationEventBoxGroups.length; i++) {
         if (
            !this.checkClass(
               LightRotationEventBoxGroup,
               this.lightRotationEventBoxGroups[i],
            )
         ) {
            return false;
         }
      }
      for (let i = 0; i < this.lightTranslationEventBoxGroups.length; i++) {
         if (
            !this.checkClass(
               LightTranslationEventBoxGroup,
               this.lightTranslationEventBoxGroups[i],
            )
         ) {
            return false;
         }
      }
      for (let i = 0; i < this.fxEventBoxGroups.length; i++) {
         if (!this.checkClass(FxEventBoxGroup, this.fxEventBoxGroups[i])) {
            return false;
         }
      }
      return this.fxEventsCollection instanceof FxEventsCollection;
   }
}
