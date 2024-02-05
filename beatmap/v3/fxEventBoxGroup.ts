import { IFxEventBoxGroup } from '../../types/beatmap/v3/fxEventBoxGroup.ts';
import { DeepPartial } from '../../types/utils.ts';
import { FxEventBox } from './fxEventBox.ts';
import { WrapFxEventBoxGroup } from '../wrapper/fxEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { IFxEventBox } from '../../types/beatmap/v3/fxEventBox.ts';
import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { IWrapFxEventBoxGroupAttribute } from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import {
   IEventBoxGroupContainer,
   IFxEventFloatBoxContainer,
} from '../../types/beatmap/container/v3.ts';
import { DeepRequiredIgnore } from '../../types/utils.ts';
import { FxType } from '../../types/beatmap/shared/constants.ts';
import { IFxEventFloat } from '../../types/beatmap/v4/fxEventFloat.ts';

/** FX event box group beatmap v3 class object. */
export class FxEventBoxGroup extends WrapFxEventBoxGroup<
   IEventBoxGroupContainer<IFxEventBox, IFxEventFloatBoxContainer>,
   IFxEventFloatBoxContainer,
   IFxEventFloat,
   IIndexFilter
> {
   static default: DeepRequiredIgnore<
      IEventBoxGroupContainer<IFxEventBox, IFxEventFloatBoxContainer>,
      'customData'
   > = {
      object: { b: 0, g: 0, e: [], customData: {} },
      boxData: [],
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<
            IFxEventBoxGroup,
            IFxEventBox,
            IFxEventFloat,
            IIndexFilter
         >
      >,
   );
   constructor(data: DeepPartial<IFxEventBoxGroup>, events?: Partial<IFxEventFloat>[]);
   constructor(
      data:
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IFxEventBoxGroup,
               IFxEventBox,
               IFxEventFloat,
               IIndexFilter
            >
         >,
      events?: Partial<IFxEventFloat>[],
   );
   constructor(
      data:
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IFxEventBoxGroup,
               IFxEventBox,
               IFxEventFloat,
               IIndexFilter
            >
         > = {},
      events?: Partial<IFxEventFloat>[],
   ) {
      super();

      this._time = data.b ?? data.time ?? FxEventBoxGroup.default.object.b;
      this._id = data.g ?? data.id ?? FxEventBoxGroup.default.object.g;
      this._boxes = (
         (data.e as unknown as IFxEventBox[]) ??
            (data.boxes as IFxEventBox[]) ??
            FxEventBoxGroup.default.boxData
      ).map((obj) => new FxEventBox(obj, events));
      this._type = data.t ?? data.type ?? FxType.FLOAT;
      this._customData = deepCopy(
         data.customData ?? FxEventBoxGroup.default.object.customData,
      );
   }

   static create(): FxEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<
            IFxEventBoxGroup,
            IFxEventBox,
            IFxEventFloat,
            IIndexFilter
         >
      >[]
   ): FxEventBoxGroup[];
   static create(...data: DeepPartial<IFxEventBoxGroup>[]): FxEventBoxGroup[];
   static create(
      ...data: (
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IFxEventBoxGroup,
               IFxEventBox,
               IFxEventFloat,
               IIndexFilter
            >
         >
      )[]
   ): FxEventBoxGroup[];
   static create(
      ...data: (
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IFxEventBoxGroup,
               IFxEventBox,
               IFxEventFloat,
               IIndexFilter
            >
         >
      )[]
   ): FxEventBoxGroup[] {
      const result: FxEventBoxGroup[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<
      IEventBoxGroupContainer<IFxEventBox, IFxEventFloatBoxContainer>
   > {
      return {
         object: {
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

   get customData(): NonNullable<IFxEventBoxGroup['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IFxEventBoxGroup['customData']>) {
      this._customData = value;
   }

   isValid(): boolean {
      return this.id >= 0;
   }
}
