import type { EnvironmentAllName } from '../schema/shared/types/environment.ts';
import type { IWrapBasicEvent } from '../schema/wrapper/types/basicEvent.ts';
import { deepCopy } from '../../utils/misc/json.ts';
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
import { createBasicEvent } from '../schema/wrapper/basicEvent.ts';

/**
 * Core beatmap basic event.
 */
export class BasicEvent extends BaseObject implements IWrapBasicEvent {
   static defaultValue: IWrapBasicEvent = /* @__PURE__ */ createBasicEvent();

   static createOne(data: Partial<IWrapBasicEvent> = {}): BasicEvent {
      return new this(data);
   }
   static create(...data: Partial<IWrapBasicEvent>[]): BasicEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapBasicEvent> = {}) {
      super();
      this.time = data.time ?? BasicEvent.defaultValue.time;
      this.type = data.type ?? BasicEvent.defaultValue.type;
      this.value = data.value ?? BasicEvent.defaultValue.value;
      this.floatValue = data.floatValue ?? BasicEvent.defaultValue.floatValue;
      this.customData = deepCopy(data.customData ?? BasicEvent.defaultValue.customData);
   }

   /**
    * Check if event is a valid type.
    * ```ts
    * if (event.isValidType()) {}
    * ```
    */
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

   /**
    * Check if light event is an off event.
    * ```ts
    * if (event.isOff()) {}
    * ```
    *
    * This may check non-light event too.
    */
   isOff(): boolean {
      return isOffEventValue(this.value);
   }

   /**
    * Check if light event is an on event.
    * ```ts
    * if (event.isOn()) {}
    * ```
    *
    * This may check non-light event too.
    */
   isOn(): boolean {
      return isOnEventValue(this.value);
   }

   /**
    * Check if light event is a flash event.
    * ```ts
    * if (event.isFlash()) {}
    * ```
    *
    * This may check non-light event too.
    */
   isFlash(): boolean {
      return isFlashEventValue(this.value);
   }

   /**
    * Check if light event is a fade event.
    * ```ts
    * if (event.isFade()) {}
    * ```
    *
    * This may check non-light event too.
    */
   isFade(): boolean {
      return isFadeEventValue(this.value);
   }

   /**
    * Check if light event is a transition event.
    * ```ts
    * if (event.isTransition()) {}
    * ```
    *
    * This may check non-light event too.
    */
   isTransition(): boolean {
      return isTransitionEventValue(this.value);
   }

   /**
    * Check if light event is a blue light.
    * ```ts
    * if (event.isBlue()) {}
    * ```
    *
    * This may check non-light event too.
    */
   isBlue(): boolean {
      return isBlueEventValue(this.value);
   }

   /**
    * Check if light event is a red light.
    * ```ts
    * if (event.isRed()) {}
    * ```
    *
    * This may check non-light event too.
    */
   isRed(): boolean {
      return isRedEventValue(this.value);
   }

   /**
    * Check if light event is a white light.
    * ```ts
    * if (event.isWhite()) {}
    * ```
    *
    * This may check non-light event too.
    */
   isWhite(): boolean {
      return isWhiteEventValue(this.value);
   }

   /**
    * Check if event is a light event.
    * ```ts
    * if (event.isLightEvent()) {}
    * ```
    */
   isLightEvent(environment?: EnvironmentAllName): boolean {
      return isLightEventType(this.type, environment);
   }

   /**
    * Check if event is a boost event.
    * ```ts
    * if (event.isColorBoost()) {}
    * ```
    */
   isColorBoost(): boolean {
      return isColorBoostEventType(this.type);
   }

   /**
    * Check if event is a ring event.
    * ```ts
    * if (event.isRingEvent()) {}
    * ```
    *
    * This does not check for ring zoom.
    */
   isRingEvent(environment?: EnvironmentAllName): boolean {
      return isRingEventType(this.type, environment);
   }

   /**
    * Check if event is a laser rotation event.
    * ```ts
    * if (event.isLaserRotationEvent()) {}
    * ```
    */
   isLaserRotationEvent(environment?: EnvironmentAllName): boolean {
      return isLaserRotationEventType(this.type, environment);
   }

   /**
    * Check if event is a lane rotation event.
    * ```ts
    * if (event.isLaneRotationEvent()) {}
    * ```
    */
   isLaneRotationEvent(): boolean {
      return isLaneRotationEventType(this.type);
   }

   /**
    * Check if event is a extra event.
    * ```ts
    * if (event.isExtraEvent()) {}
    * ```
    */
   isExtraEvent(environment?: EnvironmentAllName): boolean {
      return isExtraEventType(this.type, environment);
   }

   /**
    * Check if event is a special event.
    * ```ts
    * if (event.isSpecialEvent()) {}
    * ```
    */
   isSpecialEvent(environment?: EnvironmentAllName): boolean {
      return isSpecialEventType(this.type, environment);
   }

   /**
    * Check if event is a BPM change event.
    * ```ts
    * if (event.isBpmEvent()) {}
    * ```
    */
   isBpmEvent(): boolean {
      return isBpmChangeEventType(this.type);
   }
   isNjsEvent(): boolean {
      return isNjsChangeEventType(this.type);
   }

   /**
    * Not to be confused with `isLightEvent`, this checks for event that affects the environment/lighting.
    * ```ts
    * if (event.isLightingEvent()) {}
    * ```
    */
   isLightingEvent(): boolean {
      return isLightingEventType(this.type);
   }

   /**
    * Check if event has old Chroma properties.
    * ```ts
    * if (event.isOldChroma()) {}
    * ```
    */
   isOldChroma(): boolean {
      return isOldChromaEventValue(this.value);
   }
}
