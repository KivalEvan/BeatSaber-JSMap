import { DeepPartial, DeepRequiredIgnore } from '../../types/utils.ts';
import { FxEventBox } from './fxEventBox.ts';
import { WrapFxEventBoxGroup } from '../wrapper/fxEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { IIndexFilter } from '../../types/beatmap/v4/indexFilter.ts';
import { IWrapFxEventBoxGroupAttribute } from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import {
   IEventBoxGroupContainer,
   IFxEventFloatContainer,
} from '../../types/beatmap/v4/container.ts';
import { EventBoxType } from '../shared/constants.ts';
import { IEventBoxGroup } from '../../types/beatmap/v4/eventBoxGroup.ts';
import { IFxEventFloatBoxContainer } from '../../types/beatmap/v4/container.ts';
import { IFxEventBox } from '../../types/beatmap/v4/fxEventBox.ts';
import { IFxEventFloat } from '../../types/beatmap/v4/fxEventFloat.ts';

/** Fx event box group beatmap v4 class object. */
export class FxEventBoxGroup extends WrapFxEventBoxGroup<
   IEventBoxGroupContainer<IFxEventFloatBoxContainer>,
   IFxEventFloatBoxContainer,
   IFxEventFloatContainer,
   IIndexFilter
> {
   static default: DeepRequiredIgnore<
      IEventBoxGroupContainer<IFxEventFloatBoxContainer>,
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
         IWrapFxEventBoxGroupAttribute<
            IEventBoxGroupContainer<IFxEventFloatBoxContainer>,
            IFxEventFloatBoxContainer,
            IFxEventFloatContainer,
            IIndexFilter
         >
      >,
   );
   constructor(
      data: Partial<IEventBoxGroup>,
      boxes?: IFxEventBox[],
      events?: IFxEventFloat[],
      filters?: IIndexFilter[],
   );
   constructor(
      data:
         & Partial<IEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IEventBoxGroupContainer<IFxEventFloatBoxContainer>,
               IFxEventFloatBoxContainer,
               IFxEventFloatContainer,
               IIndexFilter
            >
         >,
      boxes?: IFxEventBox[],
      events?: IFxEventFloat[],
      filters?: IIndexFilter[],
   );
   constructor(
      data:
         & Partial<IEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IEventBoxGroupContainer<IFxEventFloatBoxContainer>,
               IFxEventFloatBoxContainer,
               IFxEventFloatContainer,
               IIndexFilter
            >
         > = {},
      boxes?: IFxEventBox[],
      events?: IFxEventFloat[],
      filters?: IIndexFilter[],
   ) {
      super();

      this._time = data.b ?? data.time ?? FxEventBoxGroup.default.object.b;
      this._id = data.g ?? data.id ?? FxEventBoxGroup.default.object.g;
      this._boxes = [];
      events ||= [];
      if (data.e) {
         for (const e of data.e) {
            const evts: IFxEventFloat[] = [];
            const times: number[] = [];
            for (const l of e.l || []) {
               times.push(l.b || 0);
               evts.push(events[l.i || 0]);
            }
            this._boxes.push(
               new FxEventBox(
                  boxes?.[e.i || 0] || {},
                  evts,
                  times,
                  filters?.[e.f || 0],
               ),
            );
         }
      } else if (data.boxes) {
         this._boxes = data.boxes.map(
            (obj) => new FxEventBox(obj!),
         );
      }
      this._customData = deepCopy(
         data.customData ??
            FxEventBoxGroup.default.object.customData,
      );
   }

   static create(): FxEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<
            IEventBoxGroupContainer<IFxEventFloatBoxContainer>,
            IFxEventFloatBoxContainer,
            IFxEventFloatContainer,
            IIndexFilter
         >
      >[]
   ): FxEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<
            IEventBoxGroupContainer<IFxEventFloatBoxContainer>,
            IFxEventFloatBoxContainer,
            IFxEventFloatContainer,
            IIndexFilter
         >
      >[]
   ): FxEventBoxGroup[] {
      const result: FxEventBoxGroup[] = data.map(
         (obj) => new this(obj),
      );
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IEventBoxGroupContainer<IFxEventFloatBoxContainer>> {
      return {
         object: {
            t: EventBoxType.FX_FLOAT,
            b: this.time,
            g: this.id,
            e: [],
            customData: deepCopy(this.customData),
         },
         boxData: this.boxes.map((e) => e.toJSON()),
      };
   }

   get boxes(): FxEventBox[] {
      return this._boxes as FxEventBox[];
   }
   set boxes(value: FxEventBox[]) {
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
