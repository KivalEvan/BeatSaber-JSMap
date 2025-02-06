import type { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';
import type {
   IWrapBasicEvent,
   IWrapBasicEventAttribute,
} from '../../types/beatmap/wrapper/basicEvent.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import {
   isBlueEventValue,
   isBpmChangeEventType,
   isColorBoostEventType,
   isExtraEventType,
   isFadeEventValue,
   isFlashEventValue,
   isLaneRotationEventType,
   isLaserRotationEventType,
   isLightEventType,
   isLightingEventType,
   isNjsChangeEventType,
   isOffEventValue,
   isOldChromaEventValue,
   isOnEventValue,
   isRedEventValue,
   isRingEventType,
   isSpecialEventType,
   isTransitionEventValue,
   isValidEventType,
   isWhiteEventValue,
} from '../helpers/core/basicEvent.ts';
import { BaseObject } from './abstract/baseObject.ts';

export function createBasicEvent(
   data: DeepPartial<IWrapBasicEventAttribute> = {},
): IWrapBasicEventAttribute {
   return {
      time: data.time ?? 0,
      type: data.type ?? 0,
      value: data.value ?? 0,
      floatValue: data.floatValue ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap basic event.
 */
export class BasicEvent extends BaseObject implements IWrapBasicEvent {
   static defaultValue = createBasicEvent();

   static createOne(data: Partial<IWrapBasicEventAttribute> = {}): BasicEvent {
      return new this(data);
   }
   static create(...data: Partial<IWrapBasicEventAttribute>[]): BasicEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapBasicEventAttribute> = {}) {
      super();
      this.time = data.time ?? BasicEvent.defaultValue.time;
      this.type = data.type ?? BasicEvent.defaultValue.type;
      this.value = data.value ?? BasicEvent.defaultValue.value;
      this.floatValue = data.floatValue ?? BasicEvent.defaultValue.floatValue;
      this.customData = deepCopy(data.customData ?? BasicEvent.defaultValue.customData);
   }

   isValidType(): boolean {
      return isValidEventType(this.type);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         this.isValidType() &&
         this.value >= 0 &&
         !(!this.isLaserRotationEvent() && this.value > 12 && !this.isOldChroma());
   }

   type: IWrapBasicEvent['type'];
   value: IWrapBasicEvent['value'];
   floatValue: IWrapBasicEvent['floatValue'];

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
      return isOffEventValue(this.value);
   }
   isOn(): boolean {
      return isOnEventValue(this.value);
   }
   isFlash(): boolean {
      return isFlashEventValue(this.value);
   }
   isFade(): boolean {
      return isFadeEventValue(this.value);
   }
   isTransition(): boolean {
      return isTransitionEventValue(this.value);
   }
   isBlue(): boolean {
      return isBlueEventValue(this.value);
   }
   isRed(): boolean {
      return isRedEventValue(this.value);
   }
   isWhite(): boolean {
      return isWhiteEventValue(this.value);
   }

   isLightEvent(environment?: EnvironmentAllName): boolean {
      return isLightEventType(this.type, environment);
   }
   isColorBoost(): boolean {
      return isColorBoostEventType(this.type);
   }
   isRingEvent(environment?: EnvironmentAllName): boolean {
      return isRingEventType(this.type, environment);
   }
   isLaserRotationEvent(environment?: EnvironmentAllName): boolean {
      return isLaserRotationEventType(this.type, environment);
   }
   isLaneRotationEvent(): boolean {
      return isLaneRotationEventType(this.type);
   }
   isExtraEvent(environment?: EnvironmentAllName): boolean {
      return isExtraEventType(this.type, environment);
   }
   isSpecialEvent(environment?: EnvironmentAllName): boolean {
      return isSpecialEventType(this.type, environment);
   }
   isBpmEvent(): boolean {
      return isBpmChangeEventType(this.type);
   }
   isNjsEvent(): boolean {
      return isNjsChangeEventType(this.type);
   }
   isLightingEvent(): boolean {
      return isLightingEventType(this.type);
   }
   isOldChroma(): boolean {
      return isOldChromaEventValue(this.value);
   }
}
