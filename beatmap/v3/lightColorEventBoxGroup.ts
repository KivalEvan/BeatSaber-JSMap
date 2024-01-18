import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightColorBase } from '../../types/beatmap/v3/lightColorBase.ts';
import { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import { ILightColorEventBoxGroup } from '../../types/beatmap/v3/lightColorEventBoxGroup.ts';
import { IWrapLightColorEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightColorEventBoxGroup } from '../wrapper/lightColorEventBoxGroup.ts';
import { LightColorEventBox } from './lightColorEventBox.ts';

/** Light color event box group beatmap v3 class object. */
export class LightColorEventBoxGroup extends WrapLightColorEventBoxGroup<
   ILightColorEventBoxGroup,
   ILightColorEventBox,
   ILightColorBase,
   IIndexFilter
> {
   static default: Required<ILightColorEventBoxGroup> = {
      b: 0,
      g: 0,
      e: [],
      customData: {},
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapLightColorEventBoxGroupAttribute<
            ILightColorEventBoxGroup,
            ILightColorEventBox,
            ILightColorBase,
            IIndexFilter
         >
      >,
   );
   constructor(data: DeepPartial<ILightColorEventBoxGroup>);
   constructor(
      data:
         & DeepPartial<ILightColorEventBoxGroup>
         & DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               ILightColorEventBoxGroup,
               ILightColorEventBox,
               ILightColorBase,
               IIndexFilter
            >
         >,
   );
   constructor(
      data:
         & DeepPartial<ILightColorEventBoxGroup>
         & DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               ILightColorEventBoxGroup,
               ILightColorEventBox,
               ILightColorBase,
               IIndexFilter
            >
         > = {},
   ) {
      super();

      this._time = data.b ?? data.time ?? LightColorEventBoxGroup.default.b;
      this._id = data.g ?? data.id ?? LightColorEventBoxGroup.default.g;

      const temp = (data.e as unknown as ILightColorEventBox[]) ??
         (data.boxes as ILightColorEventBox[]) ??
         LightColorEventBoxGroup.default.e;
      this._boxes = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this._boxes[i] = new LightColorEventBox(temp[i]);
      }

      this._customData = deepCopy(
         data.customData ?? LightColorEventBoxGroup.default.customData,
      );
   }

   static create(): LightColorEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapLightColorEventBoxGroupAttribute<
            ILightColorEventBoxGroup,
            ILightColorEventBox,
            ILightColorBase,
            IIndexFilter
         >
      >[]
   ): LightColorEventBoxGroup[];
   static create(
      ...data: DeepPartial<ILightColorEventBoxGroup>[]
   ): LightColorEventBoxGroup[];
   static create(
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
   ): LightColorEventBoxGroup[];
   static create(
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
   ): LightColorEventBoxGroup[] {
      const result: LightColorEventBoxGroup[] = [];
      for (let i = 0; i < data.length; i++) result.push(new this(data[i]));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightColorEventBoxGroup> {
      const json: Required<ILightColorEventBoxGroup> = {
         b: this.time,
         g: this.id,
         e: new Array(this.boxes.length),
         customData: deepCopy(this.customData),
      };
      for (let i = 0; i < this.boxes.length; i++) {
         json.e[i] = this.boxes[i].toJSON();
      }

      return json;
   }

   get boxes(): LightColorEventBox[] {
      return this._boxes as LightColorEventBox[];
   }
   set boxes(value: LightColorEventBox[]) {
      this._boxes = value;
   }

   get customData(): NonNullable<ILightColorEventBoxGroup['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightColorEventBoxGroup['customData']>) {
      this._customData = value;
   }

   isValid(): boolean {
      return this.id >= 0;
   }
}
