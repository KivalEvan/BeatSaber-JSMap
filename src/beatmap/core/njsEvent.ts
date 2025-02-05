import type {
   IWrapNJSEvent,
   IWrapNJSEventAttribute,
} from '../../types/beatmap/wrapper/njsEvent.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseObject } from './abstract/baseObject.ts';

export function createNJSEvent(
   data: DeepPartial<IWrapNJSEventAttribute> = {},
): IWrapNJSEventAttribute {
   return {
      time: data.time ?? 0,
      value: data.value ?? 0,
      previous: data.previous ?? 0,
      easing: data.easing ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap NJS event.
 */
export class NJSEvent extends BaseObject implements IWrapNJSEvent {
   static defaultValue: IWrapNJSEventAttribute = createNJSEvent();

   static createOne(data: Partial<IWrapNJSEventAttribute> = {}): NJSEvent {
      return new this(data);
   }
   static create(...data: Partial<IWrapNJSEventAttribute>[]): NJSEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapNJSEventAttribute> = {}) {
      super();
      this.time = data.time ?? NJSEvent.defaultValue.time;
      this.value = data.value ?? NJSEvent.defaultValue.value;
      this.previous = data.previous ?? NJSEvent.defaultValue.previous;
      this.easing = data.easing ?? NJSEvent.defaultValue.easing;
      this.customData = deepCopy(
         data.customData ?? NJSEvent.defaultValue.customData,
      );
   }

   value: IWrapNJSEvent['value'];
   previous: IWrapNJSEvent['previous'];
   easing: IWrapNJSEvent['easing'];

   setValue(value: this['value']): this {
      this.value = value;
      return this;
   }
   setPrevious(value: this['previous']): this {
      this.previous = value;
      return this;
   }
   setEasing(value: this['easing']): this {
      this.easing = value;
      return this;
   }
}
