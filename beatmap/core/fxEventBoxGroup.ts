// deno-lint-ignore-file no-explicit-any
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import type {
   IWrapFxEventBoxGroup,
   IWrapFxEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import type { IWrapFxEventBox } from '../../types/beatmap/wrapper/fxEventBox.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type { DeepPartialIgnore } from '../../types/utils.ts';
import { FxEventBox } from './fxEventBox.ts';
import { deepCopy } from '../../utils/misc.ts';

export class FxEventBoxGroup extends EventBoxGroup implements IWrapFxEventBoxGroup {
   static schema: Record<
      number,
      ISchemaContainer<IWrapFxEventBoxGroupAttribute>
   > = {};
   static defaultValue: IWrapFxEventBoxGroupAttribute = {
      time: 0,
      id: 0,
      boxes: [],
      customData: {},
   };

   static create(
      ...data: DeepPartialIgnore<IWrapFxEventBoxGroupAttribute, 'customData'>[]
   ): FxEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapFxEventBoxGroupAttribute, 'customData'> = {}) {
      super();
      this.time = data.time ?? FxEventBoxGroup.defaultValue.time;
      this.id = data.id ?? FxEventBoxGroup.defaultValue.id;
      this.boxes = (data.boxes ?? FxEventBoxGroup.defaultValue.boxes).map(
         (e) => new FxEventBox(e),
      );
      this.customData = deepCopy(
         data.customData ?? FxEventBoxGroup.defaultValue.customData,
      );
   }
   static fromJSON(
      data: { [key: string]: any },
      version: number,
   ): FxEventBoxGroup {
      return new this(FxEventBoxGroup.schema[version]?.deserialize(data));
   }
   toSchema<T extends { [key: string]: any }>(version?: number): T {
      return (FxEventBoxGroup.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapFxEventBoxGroupAttribute {
      return {
         time: this.time,
         id: this.id,
         boxes: this.boxes.map((e) => e.toJSON()),
         customData: deepCopy(this.customData),
      };
   }

   boxes!: IWrapFxEventBox[];
}
