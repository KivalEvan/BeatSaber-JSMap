// deno-lint-ignore-file no-unused-vars
import { IBasicEvent } from '../../types/beatmap/v4/basicEvent.ts';
import {
   IChromaEventLaser,
   IChromaEventLight,
   IChromaEventRing,
} from '../../types/beatmap/v3/custom/chroma.ts';
import { deepCopy } from '../../utils/misc.ts';
import { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';
import { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import { WrapEvent } from '../wrapper/event.ts';
import { IBasicEventContainer } from '../../types/beatmap/v4/container.ts';
import { DeepRequiredIgnore } from '../../types/utils.ts';
import { IObject } from '../../types/beatmap/v4/object.ts';

/** Basic event beatmap v4 class object. */
export class BasicEvent extends WrapEvent<IBasicEventContainer> {
   static default: DeepRequiredIgnore<IBasicEventContainer, 'customData'> = {
      object: {
         b: 0,
         i: 0,
         customData: {},
      },
      data: {
         t: 0,
         i: 0,
         f: 0,
         customData: {},
      },
   };

   constructor();
   constructor(object: Partial<IWrapEventAttribute<IBasicEvent>>);
   constructor(object: Partial<IObject>, data?: Partial<IBasicEvent>);
   constructor(
      object: Partial<IObject> & Partial<IWrapEventAttribute<IBasicEvent>>,
      data?: Partial<IBasicEvent>,
   );
   constructor(
      object: Partial<IObject> & Partial<IWrapEventAttribute<IBasicEvent>> = {},
      data: Partial<IBasicEvent> = {},
   ) {
      super();

      this._time = object.b ?? object.time ?? BasicEvent.default.object.b;
      this._type = data.t ?? object.type ?? BasicEvent.default.data.t;
      this._value = data.i ?? object.value ?? BasicEvent.default.data.i;
      this._floatValue = data.f ?? object.floatValue ?? BasicEvent.default.data.f;
      this._customData = deepCopy(
         object.customData ?? BasicEvent.default.data.customData,
      );
   }

   static create(): BasicEvent[];
   static create(
      ...data: Partial<IWrapEventAttribute<IBasicEventContainer>>[]
   ): BasicEvent[];
   static create(
      ...data: Partial<IWrapEventAttribute<IBasicEventContainer>>[]
   ): BasicEvent[] {
      const result: BasicEvent[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IBasicEventContainer> {
      return {
         object: {
            b: this.time,
            i: 0,
            customData: {},
         },
         data: {
            t: this.type,
            i: this.value,
            f: this.floatValue,
            customData: deepCopy(this.customData),
         },
      };
   }

   get customData(): NonNullable<IBasicEvent['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IBasicEvent['customData']>) {
      this._customData = value;
   }

   isLightEvent(environment?: EnvironmentAllName): this is BasicEventLight {
      return super.isLightEvent(environment);
   }

   isRingEvent(environment?: EnvironmentAllName): this is BasicEventRing {
      return super.isRingEvent(environment);
   }

   isLaserRotationEvent(
      environment?: EnvironmentAllName,
   ): this is BasicEventLaser {
      return super.isLaserRotationEvent(environment);
   }

   isLaneRotationEvent(
      environment?: EnvironmentAllName,
   ): this is BasicEventLaneRotation {
      return super.isLaneRotationEvent(environment);
   }

   isChroma(): boolean {
      const ev = this as BasicEvent;
      if (ev.isLightEvent()) {
         return (
            Array.isArray(this.customData.color) ||
            typeof this.customData.lightID === 'number' ||
            Array.isArray(this.customData.lightID) ||
            typeof this.customData.easing === 'string' ||
            typeof this.customData.lerpType === 'string'
         );
      }
      if (ev.isRingEvent()) {
         return (
            typeof this.customData.nameFilter === 'string' ||
            typeof this.customData.rotation === 'number' ||
            typeof this.customData.step === 'number' ||
            typeof this.customData.prop === 'number' ||
            typeof this.customData.speed === 'number' ||
            typeof this.customData.direction === 'number'
         );
      }
      if (ev.isLaserRotationEvent()) {
         return (
            typeof this.customData.lockRotation === 'boolean' ||
            typeof this.customData.speed === 'number' ||
            typeof this.customData.direction === 'number'
         );
      }
      return false;
   }
}

abstract class BasicEventLight extends BasicEvent {
   get customData(): IChromaEventLight {
      return this.customData as IChromaEventLight;
   }
}

abstract class BasicEventRing extends BasicEvent {
   get customData(): IChromaEventRing {
      return this.customData as IChromaEventRing;
   }
}

abstract class BasicEventLaser extends BasicEvent {
   get customData(): IChromaEventLaser {
      return this.customData as IChromaEventLaser;
   }
}

abstract class BasicEventLaneRotation extends BasicEvent {}
