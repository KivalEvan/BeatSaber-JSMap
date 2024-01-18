import { IFxEventBoxGroup } from '../../types/beatmap/v3/fxEventBoxGroup.ts';
import { DeepPartial } from '../../types/utils.ts';
import { FxEventBox } from './fxEventBox.ts';
import { WrapFxEventBoxGroup } from '../wrapper/fxEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { IFxEventBox } from '../../types/beatmap/v3/fxEventBox.ts';
import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { IWrapFxEventBoxGroupAttribute } from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';

/** FX event box group beatmap v3 class object. */
export class FxEventBoxGroup extends WrapFxEventBoxGroup<
   IFxEventBoxGroup,
   IFxEventBox,
   IIndexFilter
> {
   static default: Required<IFxEventBoxGroup> = {
      b: 0,
      g: 0,
      e: [],
      t: 0,
      customData: {},
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<
            IFxEventBoxGroup,
            IFxEventBox,
            IIndexFilter
         >
      >,
   );
   constructor(data: DeepPartial<IFxEventBoxGroup>);
   constructor(
      data:
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IFxEventBoxGroup,
               IFxEventBox,
               IIndexFilter
            >
         >,
   );
   constructor(
      data:
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IFxEventBoxGroup,
               IFxEventBox,
               IIndexFilter
            >
         > = {},
   ) {
      super();

      this._time = data.b ?? data.time ?? FxEventBoxGroup.default.b;
      this._id = data.g ?? data.id ?? FxEventBoxGroup.default.g;

      const temp = (data.e as unknown as IFxEventBox[]) ??
         (data.boxes as IFxEventBox[]) ??
         FxEventBoxGroup.default.e;
      this._boxes = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this._boxes[i] = new FxEventBox(temp[i]);
      }

      this._type = data.t ?? data.type ?? FxEventBoxGroup.default.t;
      this._customData = deepCopy(
         data.customData ?? FxEventBoxGroup.default.customData,
      );
   }

   static create(): FxEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<
            IFxEventBoxGroup,
            IFxEventBox,
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
               IIndexFilter
            >
         >
      )[]
   ): FxEventBoxGroup[] {
      const result: FxEventBoxGroup[] = [];
      for (let i = 0; i < data.length; i++) result.push(new this(data[i]));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IFxEventBoxGroup> {
      const json: Required<IFxEventBoxGroup> = {
         b: this.time,
         g: this.id,
         e: new Array(this.boxes.length),
         t: this.type,
         customData: deepCopy(this.customData),
      };
      for (let i = 0; i < this.boxes.length; i++) {
         json.e[i] = this.boxes[i].toJSON();
      }

      return json;
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

   setCustomData(value: NonNullable<IFxEventBoxGroup['customData']>): this {
      this.customData = value;
      return this;
   }
   addCustomData(object: IFxEventBoxGroup['customData']): this {
      this.customData = { ...this.customData, object };
      return this;
   }

   isValid(): boolean {
      return this.id >= 0;
   }
}
