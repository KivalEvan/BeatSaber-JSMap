// deno-lint-ignore-file no-explicit-any
import { BaseObject } from './abstract/baseObject.ts';
import type {
   IWrapRotationEvent,
   IWrapRotationEventAttribute,
} from '../../types/beatmap/wrapper/rotationEvent.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../utils/misc.ts';

export class RotationEvent extends BaseObject implements IWrapRotationEvent {
   static schema: Record<
      number,
      ISchemaContainer<IWrapRotationEventAttribute>
   > = {};
   static defaultValue: IWrapRotationEventAttribute = {
      time: 0,
      executionTime: 0,
      rotation: 0,
      customData: {},
   };

   static create(
      ...data: Partial<IWrapRotationEventAttribute>[]
   ): RotationEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapRotationEventAttribute> = {}) {
      super();
      this.time = data.time ?? RotationEvent.defaultValue.time;
      this.executionTime = data.executionTime ?? RotationEvent.defaultValue.executionTime;
      this.rotation = data.rotation ?? RotationEvent.defaultValue.rotation;
      this.customData = deepCopy(
         data.customData ?? RotationEvent.defaultValue.customData,
      );
   }
   static fromJSON(data: Record<string, any>, version: number): RotationEvent {
      return new this(RotationEvent.schema[version]?.deserialize(data));
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (RotationEvent.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapRotationEventAttribute {
      return {
         time: this.time,
         executionTime: this.executionTime,
         rotation: this.rotation,
         customData: deepCopy(this.customData),
      };
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

   isValid(): boolean {
      return this.executionTime === 0 || this.executionTime === 1;
   }
}
