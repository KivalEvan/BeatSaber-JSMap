import { DeepPartial, DeepRequiredIgnore } from '../../types/utils.ts';
import { LightTranslationEventBox } from './lightTranslationEventBox.ts';
import { WrapLightTranslationEventBoxGroup } from '../wrapper/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { IIndexFilter } from '../../types/beatmap/v4/indexFilter.ts';
import { IWrapLightTranslationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import {
   IEventBoxGroupContainer,
   ILightTranslationEventContainer,
} from '../../types/beatmap/v4/container.ts';
import { EventBoxType } from '../../types/beatmap/shared/constants.ts';
import { IEventBoxGroup } from '../../types/beatmap/v4/eventBoxGroup.ts';
import { ILightTranslationBoxContainer } from '../../types/beatmap/v4/container.ts';
import { ILightTranslationEventBox } from '../../types/beatmap/v4/lightTranslationEventBox.ts';
import { ILightTranslationEvent } from '../../types/beatmap/v4/lightTranslationEvent.ts';

/** Light translation event box group beatmap v4 class object. */
export class LightTranslationEventBoxGroup extends WrapLightTranslationEventBoxGroup<
   IEventBoxGroupContainer<ILightTranslationBoxContainer>,
   ILightTranslationBoxContainer,
   ILightTranslationEventContainer,
   IIndexFilter
> {
   static default: DeepRequiredIgnore<
      IEventBoxGroupContainer<ILightTranslationBoxContainer>,
      'customData'
   > = {
      object: {
         t: EventBoxType.TRANSLATION,
         b: 0,
         g: 0,
         e: [],
         customData: {},
      },
      boxData: [],
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            IEventBoxGroupContainer<ILightTranslationBoxContainer>,
            ILightTranslationBoxContainer,
            ILightTranslationEventContainer,
            IIndexFilter
         >
      >,
   );
   constructor(
      data: Partial<IEventBoxGroup>,
      boxes?: ILightTranslationEventBox[],
      events?: ILightTranslationEvent[],
      filters?: IIndexFilter[],
   );
   constructor(
      data:
         & Partial<IEventBoxGroup>
         & DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               IEventBoxGroupContainer<ILightTranslationBoxContainer>,
               ILightTranslationBoxContainer,
               ILightTranslationEventContainer,
               IIndexFilter
            >
         >,
      boxes?: ILightTranslationEventBox[],
      events?: ILightTranslationEvent[],
      filters?: IIndexFilter[],
   );
   constructor(
      data:
         & Partial<IEventBoxGroup>
         & DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               IEventBoxGroupContainer<ILightTranslationBoxContainer>,
               ILightTranslationBoxContainer,
               ILightTranslationEventContainer,
               IIndexFilter
            >
         > = {},
      boxes?: ILightTranslationEventBox[],
      events?: ILightTranslationEvent[],
      filters?: IIndexFilter[],
   ) {
      super();

      this._time = data.b ?? data.time ?? LightTranslationEventBoxGroup.default.object.b;
      this._id = data.g ?? data.id ?? LightTranslationEventBoxGroup.default.object.g;
      this._boxes = [];
      events ||= [];
      if (data.e) {
         for (const e of data.e) {
            const evts: ILightTranslationEvent[] = [];
            const times: number[] = [];
            for (const l of e.l || []) {
               times.push(l.b || 0);
               evts.push(events[l.i || 0]);
            }
            this._boxes.push(
               new LightTranslationEventBox(
                  boxes?.[e.e || 0] || {},
                  evts,
                  times,
                  filters?.[e.f || 0],
               ),
            );
         }
      } else if (data.boxes) {
         this._boxes = data.boxes.map(
            (obj) => new LightTranslationEventBox(obj!),
         );
      }
      this._customData = deepCopy(
         data.customData ??
            LightTranslationEventBoxGroup.default.object.customData,
      );
   }

   static create(): LightTranslationEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            IEventBoxGroupContainer<ILightTranslationBoxContainer>,
            ILightTranslationBoxContainer,
            ILightTranslationEventContainer,
            IIndexFilter
         >
      >[]
   ): LightTranslationEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            IEventBoxGroupContainer<ILightTranslationBoxContainer>,
            ILightTranslationBoxContainer,
            ILightTranslationEventContainer,
            IIndexFilter
         >
      >[]
   ): LightTranslationEventBoxGroup[] {
      const result: LightTranslationEventBoxGroup[] = data.map(
         (obj) => new this(obj),
      );
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IEventBoxGroupContainer<ILightTranslationBoxContainer>> {
      return {
         object: {
            t: EventBoxType.TRANSLATION,
            b: this.time,
            g: this.id,
            e: [],
            customData: deepCopy(this.customData),
         },
         boxData: this.boxes.map((e) => e.toJSON()),
      };
   }

   get boxes(): LightTranslationEventBox[] {
      return this._boxes as LightTranslationEventBox[];
   }
   set boxes(value: LightTranslationEventBox[]) {
      this._boxes = value;
   }

   get customData(): NonNullable<IEventBoxGroup['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IEventBoxGroup['customData']>) {
      this._customData = value;
   }

   isValid(): boolean {
      return this.id >= 0;
   }
}
