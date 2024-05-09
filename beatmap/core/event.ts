// deno-lint-ignore-file no-unused-vars no-explicit-any
import { BaseObject } from './abstract/baseObject.ts';
import type { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';
import type { IWrapEvent, IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import { EventType } from '../shared/constants.ts';
import { EventLightValue } from '../shared/constants.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { basicEvent as v1BasicEvent } from '../schema/v1/basicEvent.ts';
import { basicEvent as v2BasicEvent } from '../schema/v2/basicEvent.ts';
import { deepCopy } from '../../utils/misc.ts';
// import { basicEvent as v3BasicEvent } from '../schema/v3/basicEvent.ts';
// import { basicEvent as v4BasicEvent } from '../schema/v4/basicEvent.ts';

export class BasicEvent extends BaseObject implements IWrapEvent {
   static schema: Record<number, ISchemaContainer<IWrapEvent>> = {
      1: v1BasicEvent,
      2: v2BasicEvent,
      // 3: v3BasicEvent,
      // 4: v4BasicEvent,
   };
   static defaultValue: Required<IWrapEventAttribute> = {
      time: 0,
      type: 0,
      value: 0,
      floatValue: 0,
      customData: {},
   };
   static create(...data: Partial<IWrapEventAttribute>[]): BasicEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapEventAttribute> = {}) {
      super();
      this.time = data.time ?? BasicEvent.defaultValue.time;
      this.type = data.type ?? BasicEvent.defaultValue.type;
      this.value = data.value ?? BasicEvent.defaultValue.value;
      this.floatValue = data.floatValue ?? BasicEvent.defaultValue.floatValue;
      this.customData = deepCopy(
         data.customData ?? BasicEvent.defaultValue.customData,
      );
   }
   static fromJSON(data: { [key: string]: any }, version: number): BasicEvent {
      return new this(BasicEvent.schema[version]?.deserialize(data));
   }
   toSchema<T extends { [key: string]: any }>(version?: number): T {
      return (BasicEvent.schema[version || 0]?.serialize(this) || this.toJSON()) as T;
   }
   toJSON(): IWrapEventAttribute {
      return {
         time: this.time,
         type: this.type,
         value: this.value,
         floatValue: this.floatValue,
         customData: deepCopy(this.customData),
      };
   }

   type: IWrapEvent['type'] = 0;
   value: IWrapEvent['value'] = 0;
   floatValue: IWrapEvent['floatValue'] = 0;

   setType(value: this['type']): this {
      this.type = value;
      return this;
   }
   setValue(value: this['value']): this {
      this.value = value;
      return this;
   }
   setFloatValue(value: this['floatValue']): this {
      this.floatValue = value;
      return this;
   }

   isOff(): boolean {
      return this.value === EventLightValue.OFF;
   }
   isOn(): boolean {
      return (
         this.value === EventLightValue.BLUE_ON ||
         this.value === EventLightValue.RED_ON ||
         this.value === EventLightValue.WHITE_ON
      );
   }
   isFlash(): boolean {
      return (
         this.value === EventLightValue.BLUE_FLASH ||
         this.value === EventLightValue.RED_FLASH ||
         this.value === EventLightValue.WHITE_FLASH
      );
   }
   isFade(): boolean {
      return (
         this.value === EventLightValue.BLUE_FADE ||
         this.value === EventLightValue.RED_FADE ||
         this.value === EventLightValue.WHITE_FADE
      );
   }
   isTransition(): boolean {
      return (
         this.value === EventLightValue.BLUE_TRANSITION ||
         this.value === EventLightValue.RED_TRANSITION ||
         this.value === EventLightValue.WHITE_TRANSITION
      );
   }
   isBlue(): boolean {
      return (
         this.value === EventLightValue.BLUE_ON ||
         this.value === EventLightValue.BLUE_FLASH ||
         this.value === EventLightValue.BLUE_FADE ||
         this.value === EventLightValue.BLUE_TRANSITION
      );
   }
   isRed(): boolean {
      return (
         this.value === EventLightValue.RED_ON ||
         this.value === EventLightValue.RED_FLASH ||
         this.value === EventLightValue.RED_FADE ||
         this.value === EventLightValue.RED_TRANSITION
      );
   }
   isWhite(): boolean {
      return (
         this.value === EventLightValue.WHITE_ON ||
         this.value === EventLightValue.WHITE_FLASH ||
         this.value === EventLightValue.WHITE_FADE ||
         this.value === EventLightValue.WHITE_TRANSITION
      );
   }

   isLightEvent(environment?: EnvironmentAllName): boolean {
      switch (environment) {
         case 'LizzoEnvironment':
            return (
               this.type === 0 ||
               this.type === 1 ||
               this.type === 2 ||
               this.type === 3 ||
               this.type === 4 ||
               this.type === 6 ||
               this.type === 7 ||
               this.type === 8 ||
               this.type === 9 ||
               this.type === 10 ||
               this.type === 11 ||
               this.type === 12
            );
         default:
            return (
               this.type === 0 ||
               this.type === 1 ||
               this.type === 2 ||
               this.type === 3 ||
               this.type === 4 ||
               this.type === 6 ||
               this.type === 7 ||
               this.type === 10 ||
               this.type === 11
            );
      }
   }
   isColorBoost(): boolean {
      return this.type === EventType.COLOR_BOOST;
   }
   isRingEvent(environment?: EnvironmentAllName): boolean {
      switch (environment) {
         case 'LizzoEnvironment':
            return false;
         default:
            return (
               this.type === EventType.RING_ROTATION ||
               this.type === EventType.RING_ZOOM
            );
      }
   }
   isLaserRotationEvent(environment?: EnvironmentAllName): boolean {
      switch (environment) {
         case 'LizzoEnvironment':
            return false;
         default:
            return (
               this.type === EventType.LEFT_LASER_ROTATION ||
               this.type === EventType.RIGHT_LASER_ROTATION
            );
      }
   }
   isLaneRotationEvent(): boolean {
      return (
         this.type === EventType.EARLY_LANE_ROTATION ||
         this.type === EventType.LATE_LANE_ROTATION
      );
   }
   isExtraEvent(environment?: EnvironmentAllName): boolean {
      return (
         this.type === EventType.UTILITY_EVENT_0 ||
         this.type === EventType.UTILITY_EVENT_1 ||
         this.type === EventType.UTILITY_EVENT_2 ||
         this.type === EventType.UTILITY_EVENT_3
      );
   }
   isSpecialEvent(environment?: EnvironmentAllName): boolean {
      return (
         this.type === EventType.SPECIAL_EVENT_0 ||
         this.type === EventType.SPECIAL_EVENT_1 ||
         this.type === EventType.SPECIAL_EVENT_2 ||
         this.type === EventType.SPECIAL_EVENT_3
      );
   }
   isBpmEvent(): boolean {
      return this.type === EventType.BPM_CHANGE;
   }

   isLightingEvent(environment?: EnvironmentAllName): boolean {
      return (
         this.isLightEvent(environment) ||
         this.isRingEvent(environment) ||
         this.isLaserRotationEvent(environment) ||
         this.isExtraEvent(environment)
      );
   }
   isOldChroma(): boolean {
      return this.value >= 2000000000;
   }

   isValidType(): boolean {
      return (
         (this.type >= 0 && this.type <= 19) ||
         (this.type >= 40 && this.type <= 43) ||
         this.type === 100
      );
   }
   isValid(): boolean {
      return (
         this.isValidType() &&
         this.value >= 0 &&
         !(
            !this.isLaserRotationEvent() &&
            this.value > 12 &&
            !this.isOldChroma()
         )
      );
   }
}
