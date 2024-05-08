// deno-lint-ignore-file no-explicit-any
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import type {
   IWrapLightTranslationEventBoxGroup,
   IWrapLightTranslationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import type {
   IWrapLightTranslationEventBox,
} from '../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { LightTranslationEventBox } from './lightTranslationEventBox.ts';
import { deepCopy } from '../../utils/misc.ts';

export class LightTranslationEventBoxGroup extends EventBoxGroup
   implements IWrapLightTranslationEventBoxGroup {
   static schema: Record<
      number,
      ISchemaContainer<IWrapLightTranslationEventBoxGroupAttribute>
   > = {};
   static defaultValue: IWrapLightTranslationEventBoxGroupAttribute = {
      time: 0,
      id: 0,
      boxes: [],
      customData: {},
   };

   static create(
      ...data: DeepPartial<IWrapLightTranslationEventBoxGroupAttribute>[]
   ): LightTranslationEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(
      data: DeepPartial<IWrapLightTranslationEventBoxGroupAttribute> = {},
   ) {
      super();
      this.time = data.time ?? LightTranslationEventBoxGroup.defaultValue.time;
      this.id = data.id ?? LightTranslationEventBoxGroup.defaultValue.id;
      this.boxes = (
         data.boxes ?? LightTranslationEventBoxGroup.defaultValue.boxes
      ).map((e) => new LightTranslationEventBox(e));
      this.customData = deepCopy(
         data.customData ?? LightTranslationEventBoxGroup.defaultValue.customData,
      );
   }
   static fromJSON(
      data: Record<string, any>,
      version: number,
   ): LightTranslationEventBoxGroup {
      return new this(
         LightTranslationEventBoxGroup.schema[version]?.deserialize(data),
      );
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (LightTranslationEventBoxGroup.schema[version || 0]?.serialize(
         this,
      ) || this.toJSON()) as T;
   }
   toJSON(): IWrapLightTranslationEventBoxGroupAttribute {
      return {
         time: this.time,
         id: this.id,
         boxes: this.boxes.map((e) => e.toJSON()),
         customData: deepCopy(this.customData),
      };
   }

   boxes!: IWrapLightTranslationEventBox[];
}
