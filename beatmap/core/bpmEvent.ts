// deno-lint-ignore-file no-explicit-any
import { BaseObject } from './abstract/baseObject.ts';
import type {
   IWrapBPMEvent,
   IWrapBPMEventAttribute,
} from '../../types/beatmap/wrapper/bpmEvent.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../utils/misc.ts';

export class BPMEvent extends BaseObject implements IWrapBPMEvent {
   static schema: Record<number, ISchemaContainer<IWrapBPMEventAttribute>> = {};
   static defaultValue: IWrapBPMEventAttribute = {
      time: 0,
      bpm: 120,
      customData: {},
      _deprData: {},
   };

   static create(...data: Partial<IWrapBPMEventAttribute>[]): BPMEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapBPMEventAttribute> = {}) {
      super();
      this.time = data.time ?? BPMEvent.defaultValue.time;
      this.bpm = data.bpm ?? BPMEvent.defaultValue.bpm;
      this.customData = deepCopy(
         data.customData ?? BPMEvent.defaultValue.customData,
      );
      this._deprData = deepCopy(
         data._deprData ?? BPMEvent.defaultValue._deprData,
      );
   }
   static fromJSON(data: Record<string, any>, version: number): BPMEvent {
      return new this(BPMEvent.schema[version]?.deserialize(data));
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (BPMEvent.schema[version || 0]?.serialize(this) || this.toJSON()) as T;
   }
   toJSON(): IWrapBPMEventAttribute {
      return {
         time: this.time,
         bpm: this.bpm,
         customData: deepCopy(this.customData),
         _deprData: deepCopy(this._deprData),
      };
   }

   bpm: IWrapBPMEvent['bpm'] = 0;

   setBPM(value: this['bpm']): this {
      this.bpm = value;
      return this;
   }

   isValid(): boolean {
      return this.bpm > 0;
   }
}
