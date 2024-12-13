import { BaseObject } from './abstract/baseObject.ts';
import type {
   IWrapNJSEvent,
   IWrapNJSEventAttribute,
} from '../../types/beatmap/wrapper/njsEvent.ts';
import { deepCopy } from '../../utils/misc.ts';

/**
 * Core beatmap NJS event.
 */
export class NJSEvent extends BaseObject implements IWrapNJSEvent {
   static defaultValue: IWrapNJSEventAttribute = {
      time: 0,
      value: 0,
      previous: 0,
      easing: 0,
      customData: {},
   };

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
