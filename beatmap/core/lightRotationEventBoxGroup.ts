// deno-lint-ignore-file no-explicit-any
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import type {
   IWrapLightRotationEventBoxGroup,
   IWrapLightRotationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import type {
   IWrapLightRotationEventBox,
} from '../../types/beatmap/wrapper/lightRotationEventBox.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { LightRotationEventBox } from './lightRotationEventBox.ts';
import { deepCopy } from '../../utils/misc.ts';

export class LightRotationEventBoxGroup extends EventBoxGroup
   implements IWrapLightRotationEventBoxGroup {
   static schema: Record<
      number,
      ISchemaContainer<IWrapLightRotationEventBoxGroupAttribute>
   > = {};
   static defaultValue: IWrapLightRotationEventBoxGroupAttribute = {
      time: 0,
      id: 0,
      boxes: [],
      customData: {},
   };

   static create(
      ...data: DeepPartial<IWrapLightRotationEventBoxGroupAttribute>[]
   ): LightRotationEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(
      data: DeepPartial<IWrapLightRotationEventBoxGroupAttribute> = {},
   ) {
      super();
      this.time = data.time ?? LightRotationEventBoxGroup.defaultValue.time;
      this.id = data.id ?? LightRotationEventBoxGroup.defaultValue.id;
      this.boxes = (
         data.boxes ?? LightRotationEventBoxGroup.defaultValue.boxes
      ).map((e) => new LightRotationEventBox(e));
      this.customData = deepCopy(
         data.customData ?? LightRotationEventBoxGroup.defaultValue.customData,
      );
   }
   static fromJSON(
      data: { [key: string]: any },
      version: number,
   ): LightRotationEventBoxGroup {
      return new this(
         LightRotationEventBoxGroup.schema[version]?.deserialize(data),
      );
   }
   toSchema<T extends { [key: string]: any }>(version?: number): T {
      return (LightRotationEventBoxGroup.schema[version || 0]?.serialize(
         this,
      ) || this.toJSON()) as T;
   }
   toJSON(): IWrapLightRotationEventBoxGroupAttribute {
      return {
         time: this.time,
         id: this.id,
         boxes: this.boxes.map((e) => e.toJSON()),
         customData: deepCopy(this.customData),
      };
   }

   boxes!: IWrapLightRotationEventBox[];
}
