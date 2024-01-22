import { DeepPartial, DeepRequiredIgnore } from '../../types/utils.ts';
import { LightColorEventBox } from './lightColorEventBox.ts';
import { WrapLightColorEventBoxGroup } from '../wrapper/lightColorEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { IIndexFilter } from '../../types/beatmap/v4/indexFilter.ts';
import { IWrapLightColorEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import {
   IEventBoxGroupContainer,
   ILightColorEventContainer,
} from '../../types/beatmap/v4/container.ts';
import { EventBoxType } from '../shared/constants.ts';
import { IEventBoxGroup } from '../../types/beatmap/v4/eventBoxGroup.ts';
import { ILightColorBoxContainer } from '../../types/beatmap/v4/container.ts';
import { ILightColorEventBox } from '../../types/beatmap/v4/lightColorEventBox.ts';
import { ILightColorEvent } from '../../types/beatmap/v4/lightColorEvent.ts';

/** Light color event box group beatmap v4 class object. */
export class LightColorEventBoxGroup extends WrapLightColorEventBoxGroup<
   IEventBoxGroupContainer<ILightColorBoxContainer>,
   ILightColorBoxContainer,
   ILightColorEventContainer,
   IIndexFilter
> {
   static default: DeepRequiredIgnore<
      IEventBoxGroupContainer<ILightColorBoxContainer>,
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
         IWrapLightColorEventBoxGroupAttribute<
            IEventBoxGroupContainer<ILightColorBoxContainer>,
            ILightColorBoxContainer,
            ILightColorEventContainer,
            IIndexFilter
         >
      >,
   );
   constructor(
      data: Partial<IEventBoxGroup>,
      boxes?: ILightColorEventBox[],
      events?: ILightColorEvent[],
      filters?: IIndexFilter[],
   );
   constructor(
      data:
         & Partial<IEventBoxGroup>
         & DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               IEventBoxGroupContainer<ILightColorBoxContainer>,
               ILightColorBoxContainer,
               ILightColorEventContainer,
               IIndexFilter
            >
         >,
      boxes?: ILightColorEventBox[],
      events?: ILightColorEvent[],
      filters?: IIndexFilter[],
   );
   constructor(
      data:
         & Partial<IEventBoxGroup>
         & DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               IEventBoxGroupContainer<ILightColorBoxContainer>,
               ILightColorBoxContainer,
               ILightColorEventContainer,
               IIndexFilter
            >
         > = {},
      boxes?: ILightColorEventBox[],
      events?: ILightColorEvent[],
      filters?: IIndexFilter[],
   ) {
      super();

      this._time = data.b ?? data.time ?? LightColorEventBoxGroup.default.object.b;
      this._id = data.g ?? data.id ?? LightColorEventBoxGroup.default.object.g;
      this._boxes = [];
      events ||= [];
      if (data.e) {
         for (const e of data.e) {
            const evts: ILightColorEvent[] = [];
            const times: number[] = [];
            for (const l of e.l || []) {
               times.push(l.b || 0);
               evts.push(events[l.i || 0]);
            }
            this._boxes.push(
               new LightColorEventBox(
                  boxes?.[e.i || 0] || {},
                  evts,
                  times,
                  filters?.[e.f || 0],
               ),
            );
         }
      } else if (data.boxes) {
         this._boxes = data.boxes.map(
            (obj) => new LightColorEventBox(obj!),
         );
      }
      this._customData = deepCopy(
         data.customData ??
            LightColorEventBoxGroup.default.object.customData,
      );
   }

   static create(): LightColorEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapLightColorEventBoxGroupAttribute<
            IEventBoxGroupContainer<ILightColorBoxContainer>,
            ILightColorBoxContainer,
            ILightColorEventContainer,
            IIndexFilter
         >
      >[]
   ): LightColorEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapLightColorEventBoxGroupAttribute<
            IEventBoxGroupContainer<ILightColorBoxContainer>,
            ILightColorBoxContainer,
            ILightColorEventContainer,
            IIndexFilter
         >
      >[]
   ): LightColorEventBoxGroup[] {
      const result: LightColorEventBoxGroup[] = data.map(
         (obj) => new this(obj),
      );
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IEventBoxGroupContainer<ILightColorBoxContainer>> {
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

   get boxes(): LightColorEventBox[] {
      return this._boxes as LightColorEventBox[];
   }
   set boxes(value: LightColorEventBox[]) {
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
