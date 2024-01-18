import { ILightRotationEventBoxGroup } from '../../types/beatmap/v3/lightRotationEventBoxGroup.ts';
import { DeepPartial } from '../../types/utils.ts';
import { LightRotationEventBox } from './lightRotationEventBox.ts';
import { WrapLightRotationEventBoxGroup } from '../wrapper/lightRotationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightRotationBase } from '../../types/beatmap/v3/lightRotationBase.ts';
import { IWrapLightRotationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';

/** Light Rotation event box group beatmap v3 class object. */
export class LightRotationEventBoxGroup extends WrapLightRotationEventBoxGroup<
   ILightRotationEventBoxGroup,
   ILightRotationEventBox,
   ILightRotationBase,
   IIndexFilter
> {
   static default: Required<ILightRotationEventBoxGroup> = {
      b: 0,
      g: 0,
      e: [],
      customData: {},
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapLightRotationEventBoxGroupAttribute<
            ILightRotationEventBoxGroup,
            ILightRotationEventBox,
            ILightRotationBase,
            IIndexFilter
         >
      >,
   );
   constructor(data: DeepPartial<ILightRotationEventBoxGroup>);
   constructor(
      data:
         & DeepPartial<ILightRotationEventBoxGroup>
         & DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               ILightRotationEventBoxGroup,
               ILightRotationEventBox,
               ILightRotationBase,
               IIndexFilter
            >
         >,
   );
   constructor(
      data:
         & DeepPartial<ILightRotationEventBoxGroup>
         & DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               ILightRotationEventBoxGroup,
               ILightRotationEventBox,
               ILightRotationBase,
               IIndexFilter
            >
         > = {},
   ) {
      super();

      this._time = data.b ?? data.time ?? LightRotationEventBoxGroup.default.b;
      this._id = data.g ?? data.id ?? LightRotationEventBoxGroup.default.g;

      const temp = (data.e as unknown as ILightRotationEventBox[]) ??
         (data.boxes as ILightRotationEventBox[]) ??
         LightRotationEventBoxGroup.default.e;
      this._boxes = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this._boxes[i] = new LightRotationEventBox(temp[i]);
      }

      this._customData = deepCopy(
         data.customData ?? LightRotationEventBoxGroup.default.customData,
      );
   }

   static create(): LightRotationEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxGroupAttribute<
            ILightRotationEventBoxGroup,
            ILightRotationEventBox,
            ILightRotationBase,
            IIndexFilter
         >
      >[]
   ): LightRotationEventBoxGroup[];
   static create(
      ...data: DeepPartial<ILightRotationEventBoxGroup>[]
   ): LightRotationEventBoxGroup[];
   static create(
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
   ): LightRotationEventBoxGroup[];
   static create(
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
   ): LightRotationEventBoxGroup[] {
      const result: LightRotationEventBoxGroup[] = [];
      for (let i = 0; i < data.length; i++) result.push(new this(data[i]));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightRotationEventBoxGroup> {
      const json: Required<ILightRotationEventBoxGroup> = {
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

   get boxes(): LightRotationEventBox[] {
      return this._boxes as LightRotationEventBox[];
   }
   set boxes(value: LightRotationEventBox[]) {
      this._boxes = value;
   }

   get customData(): NonNullable<ILightRotationEventBoxGroup['customData']> {
      return this._customData;
   }
   set customData(
      value: NonNullable<ILightRotationEventBoxGroup['customData']>,
   ) {
      this._customData = value;
   }

   isValid(): boolean {
      return this.id >= 0;
   }
}
