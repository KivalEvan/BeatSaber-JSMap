// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type {
   IWrapFxEventInt,
   IWrapFxEventIntAttribute,
} from '../../types/beatmap/wrapper/fxEventInt.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseObject } from './abstract/baseObject.ts';

export class FxEventInt extends BaseObject implements IWrapFxEventInt {
   static schema: Record<number, ISchemaContainer<IWrapFxEventIntAttribute>> = {};
   static defaultValue: IWrapFxEventIntAttribute = {
      time: 0,
      previous: 0,
      value: 0,
      customData: {},
   };

   static create(...data: Partial<IWrapFxEventIntAttribute>[]): FxEventInt[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapFxEventIntAttribute> = {}) {
      super();
      this.time = data.time ?? FxEventInt.defaultValue.time;
      this.previous = data.previous ?? FxEventInt.defaultValue.previous;
      this.value = data.value ?? FxEventInt.defaultValue.value;
      this.customData = deepCopy(
         data.customData ?? FxEventInt.defaultValue.customData,
      );
   }
   static fromJSON(data: Record<string, any>, version: number): FxEventInt {
      return new this(FxEventInt.schema[version]?.deserialize(data));
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (FxEventInt.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapFxEventIntAttribute {
      return {
         time: this.time,
         previous: this.previous,
         value: this.value,
         customData: deepCopy(this.customData),
      };
   }

   previous: IWrapFxEventInt['previous'] = 0;
   value: IWrapFxEventInt['value'] = 0;

   setPrevious(value: this['previous']): this {
      this.previous = value;
      return this;
   }
   setValue(value: this['value']): this {
      this.value = value;
      return this;
   }

   isValid(): boolean {
      return this.previous === 0 || this.previous === 1;
   }
}
