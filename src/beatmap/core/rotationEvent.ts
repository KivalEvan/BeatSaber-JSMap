import type { IWrapRotationEvent } from '../schema/wrapper/types/rotationEvent.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseObject } from './abstract/baseObject.ts';
import { createRotationEvent } from '../schema/wrapper/rotationEvent.ts';

/**
 * Core beatmap rotation event.
 */
export class RotationEvent extends BaseObject implements IWrapRotationEvent {
   static defaultValue: IWrapRotationEvent = /* @__PURE__ */ createRotationEvent();

   static createOne(data: Partial<IWrapRotationEvent> = {}): RotationEvent {
      return new this(data);
   }
   static create(...data: Partial<IWrapRotationEvent>[]): RotationEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapRotationEvent> = {}) {
      super();
      this.time = data.time ?? RotationEvent.defaultValue.time;
      this.executionTime = data.executionTime ?? RotationEvent.defaultValue.executionTime;
      this.rotation = data.rotation ?? RotationEvent.defaultValue.rotation;
      this.customData = deepCopy(data.customData ?? RotationEvent.defaultValue.customData);
   }

   executionTime: IWrapRotationEvent['executionTime'] = 0;
   rotation: IWrapRotationEvent['rotation'] = 0;

   setExecutionTime(value: this['executionTime']): this {
      this.executionTime = value;
      return this;
   }
   setRotation(value: this['rotation']): this {
      this.rotation = value;
      return this;
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override
         ? super.isValid(fn, override)
         : super.isValid(fn, override) && (this.executionTime === 0 || this.executionTime === 1);
   }
}
