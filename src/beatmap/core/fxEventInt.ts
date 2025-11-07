import type { IWrapFxEventInt } from '../schema/wrapper/types/fxEventInt.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseObject } from './abstract/baseObject.ts';
import { createFxEventInt } from '../schema/wrapper/fxEventInt.ts';

/**
 * Core beatmap FX event int.
 */
export class FxEventInt extends BaseObject implements IWrapFxEventInt {
   static defaultValue: IWrapFxEventInt = /* @__PURE__ */ createFxEventInt();

   static createOne(data: Partial<IWrapFxEventInt> = {}): FxEventInt {
      return new this(data);
   }
   static create(...data: Partial<IWrapFxEventInt>[]): FxEventInt[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapFxEventInt> = {}) {
      super();
      this.time = data.time ?? FxEventInt.defaultValue.time;
      this.previous = data.previous ?? FxEventInt.defaultValue.previous;
      this.value = data.value ?? FxEventInt.defaultValue.value;
      this.customData = deepCopy(
         data.customData ?? FxEventInt.defaultValue.customData,
      );
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

   override isValid(
      fn?: (object: this) => boolean,
      override?: boolean,
   ): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.previous === 0 || this.previous === 1);
   }
}
