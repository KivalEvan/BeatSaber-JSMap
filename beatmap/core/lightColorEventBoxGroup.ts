// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type { IWrapLightColorEventBox } from '../../types/beatmap/wrapper/lightColorEventBox.ts';
import type {
   IWrapLightColorEventBoxGroup,
   IWrapLightColorEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import { LightColorEventBox } from './lightColorEventBox.ts';

export class LightColorEventBoxGroup extends EventBoxGroup implements IWrapLightColorEventBoxGroup {
   static schema: Record<
      number,
      ISchemaContainer<IWrapLightColorEventBoxGroupAttribute>
   > = {};
   static defaultValue: IWrapLightColorEventBoxGroupAttribute = {
      time: 0,
      id: 0,
      boxes: [],
      customData: {},
      _deprData: {},
   };

   static create(
      ...data: DeepPartial<IWrapLightColorEventBoxGroupAttribute>[]
   ): LightColorEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapLightColorEventBoxGroupAttribute> = {}) {
      super();
      this.time = data.time ?? LightColorEventBoxGroup.defaultValue.time;
      this.id = data.id ?? LightColorEventBoxGroup.defaultValue.id;
      this.boxes = (
         data.boxes ?? LightColorEventBoxGroup.defaultValue.boxes
      ).map((e) => new LightColorEventBox(e));
      this.customData = deepCopy(
         data.customData ?? LightColorEventBoxGroup.defaultValue.customData,
      );
      this._deprData = deepCopy(
         data._deprData ?? LightColorEventBoxGroup.defaultValue._deprData,
      );
   }
   static fromJSON(
      data: Record<string, any>,
      version: number,
   ): LightColorEventBoxGroup {
      return new this(
         LightColorEventBoxGroup.schema[version]?.deserialize(data),
      );
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (LightColorEventBoxGroup.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapLightColorEventBoxGroupAttribute {
      return {
         time: this.time,
         id: this.id,
         boxes: this.boxes.map((e) => e.toJSON()),
         customData: deepCopy(this.customData),
         _deprData: deepCopy(this._deprData),
      };
   }

   boxes!: IWrapLightColorEventBox[];
}
