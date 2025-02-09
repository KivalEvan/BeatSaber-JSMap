import type { IWrapLightRotationEvent } from '../../types/beatmap/wrapper/lightRotationEvent.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseObject } from './abstract/baseObject.ts';

export function createLightRotationEvent(
   data: DeepPartial<IWrapLightRotationEvent> = {},
): IWrapLightRotationEvent {
   return {
      time: data.time ?? 0,
      easing: data.easing ?? 0,
      loop: data.loop ?? 0,
      direction: data.direction ?? 0,
      previous: data.previous ?? 0,
      rotation: data.rotation ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap light rotation event.
 */
export class LightRotationEvent extends BaseObject implements IWrapLightRotationEvent {
   static defaultValue: IWrapLightRotationEvent = createLightRotationEvent();

   static createOne(data: Partial<IWrapLightRotationEvent> = {}): LightRotationEvent {
      return new this(data);
   }
   static create(...data: Partial<IWrapLightRotationEvent>[]): LightRotationEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapLightRotationEvent> = {}) {
      super();
      this.time = data.time ?? LightRotationEvent.defaultValue.time;
      this.easing = data.easing ?? LightRotationEvent.defaultValue.easing;
      this.loop = data.loop ?? LightRotationEvent.defaultValue.loop;
      this.direction = data.direction ?? LightRotationEvent.defaultValue.direction;
      this.previous = data.previous ?? LightRotationEvent.defaultValue.previous;
      this.rotation = data.rotation ?? LightRotationEvent.defaultValue.rotation;
      this.customData = deepCopy(data.customData ?? LightRotationEvent.defaultValue.customData);
   }

   previous: IWrapLightRotationEvent['previous'] = 0;
   easing: IWrapLightRotationEvent['easing'] = 0;
   loop: IWrapLightRotationEvent['loop'] = 0;
   rotation: IWrapLightRotationEvent['rotation'] = 0;
   direction: IWrapLightRotationEvent['direction'] = 0;

   setPrevious(value: this['previous']): this {
      this.previous = value;
      return this;
   }
   setEasing(value: this['easing']): this {
      this.easing = value;
      return this;
   }
   setLoop(value: this['loop']): this {
      this.loop = value;
      return this;
   }
   setRotation(value: this['rotation']): this {
      this.rotation = value;
      return this;
   }
   setDirection(value: this['direction']): this {
      this.direction = value;
      return this;
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.previous === 0 || this.previous === 1) &&
         this.easing >= -1 &&
         this.easing <= 103 &&
         this.loop >= 0 &&
         this.direction >= 0 &&
         this.direction <= 2;
   }
}
