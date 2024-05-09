// deno-lint-ignore-file no-explicit-any
import { BaseObject } from './abstract/baseObject.ts';
import type {
   IWrapColorBoostEvent,
   IWrapColorBoostEventAttribute,
} from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../utils/misc.ts';

export class ColorBoostEvent extends BaseObject implements IWrapColorBoostEvent {
   static schema: Record<number, ISchemaContainer<IWrapColorBoostEventAttribute>> = {};
   static defaultValue: IWrapColorBoostEventAttribute = {
      time: 0,
      toggle: false,
      customData: {},
   };

   static create(...data: Partial<IWrapColorBoostEventAttribute>[]): ColorBoostEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapColorBoostEventAttribute> = {}) {
      super();
      this.time = data.time ?? ColorBoostEvent.defaultValue.time;
      this.toggle = data.toggle ?? ColorBoostEvent.defaultValue.toggle;
      this.customData = deepCopy(
         data.customData ?? ColorBoostEvent.defaultValue.customData,
      );
   }
   static fromJSON(data: { [key: string]: any }, version: number): ColorBoostEvent {
      return new this(ColorBoostEvent.schema[version]?.deserialize(data));
   }
   toSchema<T extends { [key: string]: any }>(version?: number): T {
      return (ColorBoostEvent.schema[version || 0]?.serialize(this) || this.toJSON()) as T;
   }
   toJSON(): IWrapColorBoostEventAttribute {
      return {
         time: this.time,
         toggle: this.toggle,
         customData: deepCopy(this.customData),
      };
   }

   toggle: this['toggle'] = false;

   setToggle(value: this['toggle']): this {
      this.toggle = value;
      return this;
   }

   isValid(): boolean {
      return true;
   }
}
