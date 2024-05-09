// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type {
   IWrapFxEventFloat,
   IWrapFxEventFloatAttribute,
} from '../../types/beatmap/wrapper/fxEventFloat.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseObject } from './abstract/baseObject.ts';

export class FxEventFloat extends BaseObject implements IWrapFxEventFloat {
   static schema: Record<number, ISchemaContainer<IWrapFxEventFloatAttribute>> = {};
   static defaultValue: IWrapFxEventFloatAttribute = {
      time: 0,
      easing: 0,
      previous: 0,
      value: 0,
      customData: {},
   };

   static create(...data: Partial<IWrapFxEventFloatAttribute>[]): FxEventFloat[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapFxEventFloatAttribute> = {}) {
      super();
      this.time = data.time ?? FxEventFloat.defaultValue.time;
      this.easing = data.easing ?? FxEventFloat.defaultValue.easing;
      this.previous = data.previous ?? FxEventFloat.defaultValue.previous;
      this.value = data.value ?? FxEventFloat.defaultValue.value;
      this.customData = deepCopy(
         data.customData ?? FxEventFloat.defaultValue.customData,
      );
   }
   static fromJSON(data: { [key: string]: any }, version: number): FxEventFloat {
      return new this(FxEventFloat.schema[version]?.deserialize(data));
   }
   toSchema<T extends { [key: string]: any }>(version?: number): T {
      return (FxEventFloat.schema[version || 0]?.serialize(this) || this.toJSON()) as T;
   }
   toJSON(): IWrapFxEventFloatAttribute {
      return {
         time: this.time,
         easing: this.easing,
         previous: this.previous,
         value: this.value,
         customData: deepCopy(this.customData),
      };
   }

   easing: IWrapFxEventFloat['easing'] = 0;
   previous: IWrapFxEventFloat['previous'] = 0;
   value: IWrapFxEventFloat['value'] = 0;

   setEasing(value: this['easing']): this {
      this.easing = value;
      return this;
   }
   setPrevious(value: this['previous']): this {
      this.previous = value;
      return this;
   }
   setValue(value: this['value']): this {
      this.value = value;
      return this;
   }

   isValid(): boolean {
      return (
         (this.previous === 0 || this.previous === 1) &&
         this.easing >= -1 &&
         this.easing <= 103
      );
   }
}
