import type { IWrapBPMEvent } from './types/bpmEvent.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseObject } from './abstract/baseObject.ts';

export function createBPMEvent(
   data: DeepPartial<IWrapBPMEvent> = {},
): IWrapBPMEvent {
   return {
      time: data.time ?? 0,
      bpm: data.bpm ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap BPM event.
 */
export class BPMEvent extends BaseObject implements IWrapBPMEvent {
   static defaultValue: IWrapBPMEvent = createBPMEvent();

   static createOne(data: Partial<IWrapBPMEvent> = {}): BPMEvent {
      return new this(data);
   }
   static create(...data: Partial<IWrapBPMEvent>[]): BPMEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapBPMEvent> = {}) {
      super();
      this.time = data.time ?? BPMEvent.defaultValue.time;
      this.bpm = data.bpm ?? BPMEvent.defaultValue.bpm;
      this.customData = deepCopy(data.customData ?? BPMEvent.defaultValue.customData);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) && this.bpm > 0;
   }

   bpm: IWrapBPMEvent['bpm'];

   setBPM(value: this['bpm']): this {
      this.bpm = value;
      return this;
   }
}
