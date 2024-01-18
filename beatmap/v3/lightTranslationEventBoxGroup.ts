import { ILightTranslationEventBoxGroup } from '../../types/beatmap/v3/lightTranslationEventBoxGroup.ts';
import { DeepPartial } from '../../types/utils.ts';
import { LightTranslationEventBox } from './lightTranslationEventBox.ts';
import { WrapLightTranslationEventBoxGroup } from '../wrapper/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';
import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightTranslationBase } from '../../types/beatmap/v3/lightTranslationBase.ts';
import { IWrapLightTranslationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';

/** Light translation event box group beatmap v3 class object. */
export class LightTranslationEventBoxGroup extends WrapLightTranslationEventBoxGroup<
   ILightTranslationEventBoxGroup,
   ILightTranslationEventBox,
   ILightTranslationBase,
   IIndexFilter
> {
   static default: Required<ILightTranslationEventBoxGroup> = {
      b: 0,
      g: 0,
      e: [],
      customData: {},
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            ILightTranslationEventBoxGroup,
            ILightTranslationEventBox,
            ILightTranslationBase,
            IIndexFilter
         >
      >,
   );
   constructor(data: DeepPartial<ILightTranslationEventBoxGroup>);
   constructor(
      data:
         & DeepPartial<ILightTranslationEventBoxGroup>
         & DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >,
   );
   constructor(
      data:
         & DeepPartial<ILightTranslationEventBoxGroup>
         & DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         > = {},
   ) {
      super();

      this._time = data.b ?? data.time ?? LightTranslationEventBoxGroup.default.b;
      this._id = data.g ?? data.id ?? LightTranslationEventBoxGroup.default.g;

      const temp = (data.e as unknown as ILightTranslationEventBox[]) ??
         (data.boxes as ILightTranslationEventBox[]) ??
         LightTranslationEventBoxGroup.default.e;
      this._boxes = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this._boxes[i] = new LightTranslationEventBox(temp[i]);
      }

      this._customData = deepCopy(
         data.customData ?? LightTranslationEventBoxGroup.default.customData,
      );
   }

   static create(): LightTranslationEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            ILightTranslationEventBoxGroup,
            ILightTranslationEventBox,
            ILightTranslationBase,
            IIndexFilter
         >
      >[]
   ): LightTranslationEventBoxGroup[];
   static create(
      ...data: DeepPartial<ILightTranslationEventBoxGroup>[]
   ): LightTranslationEventBoxGroup[];
   static create(
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
   ): LightTranslationEventBoxGroup[];
   static create(
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
   ): LightTranslationEventBoxGroup[] {
      const result: LightTranslationEventBoxGroup[] = [];
      for (let i = 0; i < data.length; i++) result.push(new this(data[i]));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightTranslationEventBoxGroup> {
      const json: Required<ILightTranslationEventBoxGroup> = {
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

   get boxes(): LightTranslationEventBox[] {
      return this._boxes as LightTranslationEventBox[];
   }
   set boxes(value: LightTranslationEventBox[]) {
      this._boxes = value;
   }

   get customData(): NonNullable<ILightTranslationEventBoxGroup['customData']> {
      return this._customData;
   }
   set customData(
      value: NonNullable<ILightTranslationEventBoxGroup['customData']>,
   ) {
      this._customData = value;
   }

   setCustomData(
      value: NonNullable<ILightTranslationEventBoxGroup['customData']>,
   ): this {
      this.customData = value;
      return this;
   }
   addCustomData(object: ILightTranslationEventBoxGroup['customData']): this {
      this.customData = { ...this.customData, object };
      return this;
   }

   isValid(): boolean {
      return this.id >= 0;
   }
}
