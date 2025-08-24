import type { IWrapColorBoostEvent } from '../schema/wrapper/types/colorBoostEvent.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseObject } from './abstract/baseObject.ts';
import { createColorBoostEvent } from '../schema/wrapper/colorBoostEvent.ts';

/**
 * Core beatmap color boost event.
 */
export class ColorBoostEvent extends BaseObject implements IWrapColorBoostEvent {
   static defaultValue: IWrapColorBoostEvent = createColorBoostEvent();

   static createOne(data: Partial<IWrapColorBoostEvent> = {}): ColorBoostEvent {
      return new this(data);
   }
   static create(...data: Partial<IWrapColorBoostEvent>[]): ColorBoostEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapColorBoostEvent> = {}) {
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
