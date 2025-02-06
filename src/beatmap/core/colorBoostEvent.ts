import type {
   IWrapColorBoostEvent,
   IWrapColorBoostEventAttribute,
} from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseObject } from './abstract/baseObject.ts';

export function createColorBoostEvent(
   data: DeepPartial<IWrapColorBoostEventAttribute> = {},
): IWrapColorBoostEventAttribute {
   return {
      time: data.time ?? 0,
      toggle: data.toggle ?? false,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap color boost event.
 */
export class ColorBoostEvent extends BaseObject implements IWrapColorBoostEvent {
   static defaultValue: IWrapColorBoostEventAttribute = createColorBoostEvent();

   static createOne(data: Partial<IWrapColorBoostEventAttribute> = {}): ColorBoostEvent {
      return new this(data);
   }
   static create(...data: Partial<IWrapColorBoostEventAttribute>[]): ColorBoostEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapColorBoostEventAttribute> = {}) {
      super();
      this.time = data.time ?? ColorBoostEvent.defaultValue.time;
      this.toggle = data.toggle ?? ColorBoostEvent.defaultValue.toggle;
      this.customData = deepCopy(data.customData ?? ColorBoostEvent.defaultValue.customData);
   }

   toggle: IWrapColorBoostEvent['toggle'];

   setToggle(value: this['toggle']): this {
      this.toggle = value;
      return this;
   }
}
