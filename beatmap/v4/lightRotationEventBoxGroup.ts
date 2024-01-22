import { DeepPartial, DeepRequiredIgnore } from '../../types/utils.ts';
import { LightRotationEventBox } from './lightRotationEventBox.ts';
import { WrapLightRotationEventBoxGroup } from '../wrapper/lightRotationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { IIndexFilter } from '../../types/beatmap/v4/indexFilter.ts';
import { IWrapLightRotationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import {
   IEventBoxGroupContainer,
   ILightRotationEventContainer,
} from '../../types/beatmap/v4/container.ts';
import { EventBoxType } from '../shared/constants.ts';
import { IEventBoxGroup } from '../../types/beatmap/v4/eventBoxGroup.ts';
import { ILightRotationBoxContainer } from '../../types/beatmap/v4/container.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v4/lightRotationEventBox.ts';
import { ILightRotationEvent } from '../../types/beatmap/v4/lightRotationEvent.ts';

/** Light rotation event box group beatmap v4 class object. */
export class LightRotationEventBoxGroup extends WrapLightRotationEventBoxGroup<
   IEventBoxGroupContainer<ILightRotationBoxContainer>,
   ILightRotationBoxContainer,
   ILightRotationEventContainer,
   IIndexFilter
> {
   static default: DeepRequiredIgnore<
      IEventBoxGroupContainer<ILightRotationBoxContainer>,
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
         IWrapLightRotationEventBoxGroupAttribute<
            IEventBoxGroupContainer<ILightRotationBoxContainer>,
            ILightRotationBoxContainer,
            ILightRotationEventContainer,
            IIndexFilter
         >
      >,
   );
   constructor(
      data: Partial<IEventBoxGroup>,
      boxes?: ILightRotationEventBox[],
      events?: ILightRotationEvent[],
      filters?: IIndexFilter[],
   );
   constructor(
      data:
         & Partial<IEventBoxGroup>
         & DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               IEventBoxGroupContainer<ILightRotationBoxContainer>,
               ILightRotationBoxContainer,
               ILightRotationEventContainer,
               IIndexFilter
            >
         >,
      boxes?: ILightRotationEventBox[],
      events?: ILightRotationEvent[],
      filters?: IIndexFilter[],
   );
   constructor(
      data:
         & Partial<IEventBoxGroup>
         & DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               IEventBoxGroupContainer<ILightRotationBoxContainer>,
               ILightRotationBoxContainer,
               ILightRotationEventContainer,
               IIndexFilter
            >
         > = {},
      boxes?: ILightRotationEventBox[],
      events?: ILightRotationEvent[],
      filters?: IIndexFilter[],
   ) {
      super();

      this._time = data.b ?? data.time ?? LightRotationEventBoxGroup.default.object.b;
      this._id = data.g ?? data.id ?? LightRotationEventBoxGroup.default.object.g;
      this._boxes = [];
      events ||= [];
      if (data.e) {
         for (const e of data.e) {
            const evts: ILightRotationEvent[] = [];
            const times: number[] = [];
            for (const l of e.l || []) {
               times.push(l.b || 0);
               evts.push(events[l.i || 0]);
            }
            this._boxes.push(
               new LightRotationEventBox(
                  boxes?.[e.i || 0] || {},
                  evts,
                  times,
                  filters?.[e.f || 0],
               ),
            );
         }
      } else if (data.boxes) {
         this._boxes = data.boxes.map(
            (obj) => new LightRotationEventBox(obj!),
         );
      }
      this._customData = deepCopy(
         data.customData ??
            LightRotationEventBoxGroup.default.object.customData,
      );
   }

   static create(): LightRotationEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxGroupAttribute<
            IEventBoxGroupContainer<ILightRotationBoxContainer>,
            ILightRotationBoxContainer,
            ILightRotationEventContainer,
            IIndexFilter
         >
      >[]
   ): LightRotationEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxGroupAttribute<
            IEventBoxGroupContainer<ILightRotationBoxContainer>,
            ILightRotationBoxContainer,
            ILightRotationEventContainer,
            IIndexFilter
         >
      >[]
   ): LightRotationEventBoxGroup[] {
      const result: LightRotationEventBoxGroup[] = data.map(
         (obj) => new this(obj),
      );
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IEventBoxGroupContainer<ILightRotationBoxContainer>> {
      return {
         object: {
            t: EventBoxType.ROTATION,
            b: this.time,
            g: this.id,
            e: [],
            customData: deepCopy(this.customData),
         },
         boxData: this.boxes.map((e) => e.toJSON()),
      };
   }

   get boxes(): LightRotationEventBox[] {
      return this._boxes as LightRotationEventBox[];
   }
   set boxes(value: LightRotationEventBox[]) {
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
