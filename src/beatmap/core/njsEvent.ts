import type { IWrapNJSEvent } from '../schema/wrapper/types/njsEvent.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseObject } from './abstract/baseObject.ts';
import { createNJSEvent } from '../schema/wrapper/njsEvent.ts';

/**
 * Core beatmap NJS event.
 */
export class NJSEvent extends BaseObject implements IWrapNJSEvent {
   static defaultValue: IWrapNJSEvent = createNJSEvent();

   static createOne(data: Partial<IWrapNJSEvent> = {}): NJSEvent {
      return new this(data);
   }
   static create(...data: Partial<IWrapNJSEvent>[]): NJSEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapNJSEvent> = {}) {
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
