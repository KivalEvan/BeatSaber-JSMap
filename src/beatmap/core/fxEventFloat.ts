import type { IWrapFxEventFloat } from '../../types/beatmap/wrapper/fxEventFloat.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseObject } from './abstract/baseObject.ts';

export function createFxEventFloat(
   data: DeepPartial<IWrapFxEventFloat> = {},
): IWrapFxEventFloat {
   return {
      time: data.time ?? 0,
      easing: data.easing ?? 0,
      previous: data.previous ?? 0,
      value: data.value ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap FX event float.
 */
export class FxEventFloat extends BaseObject implements IWrapFxEventFloat {
   static defaultValue: IWrapFxEventFloat = createFxEventFloat();

   static createOne(data: Partial<IWrapFxEventFloat> = {}): FxEventFloat {
      return new this(data);
   }
   static create(...data: Partial<IWrapFxEventFloat>[]): FxEventFloat[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapFxEventFloat> = {}) {
      super();
      this.time = data.time ?? FxEventFloat.defaultValue.time;
      this.easing = data.easing ?? FxEventFloat.defaultValue.easing;
      this.previous = data.previous ?? FxEventFloat.defaultValue.previous;
      this.value = data.value ?? FxEventFloat.defaultValue.value;
      this.customData = deepCopy(data.customData ?? FxEventFloat.defaultValue.customData);
   }

   easing: IWrapFxEventFloat['easing'];
   previous: IWrapFxEventFloat['previous'];
   value: IWrapFxEventFloat['value'];

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

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.previous === 0 || this.previous === 1) &&
         this.easing >= -1 &&
         this.easing <= 103;
   }
}
