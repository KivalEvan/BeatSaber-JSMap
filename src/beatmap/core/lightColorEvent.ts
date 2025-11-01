import type { IWrapLightColorEvent } from '../schema/wrapper/types/lightColorEvent.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseObject } from './abstract/baseObject.ts';
import { createLightColorEvent } from '../schema/wrapper/lightColorEvent.ts';

/**
 * Core beatmap light color event.
 */
export class LightColorEvent extends BaseObject implements IWrapLightColorEvent {
   static defaultValue: IWrapLightColorEvent = /* @__PURE__ */ createLightColorEvent();

   static createOne(
      data: Partial<IWrapLightColorEvent> = {},
   ): LightColorEvent {
      return new this(data);
   }
   static create(
      ...data: Partial<IWrapLightColorEvent>[]
   ): LightColorEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapLightColorEvent> = {}) {
      super();
      this.time = data.time ?? LightColorEvent.defaultValue.time;
      this.previous = data.previous ?? LightColorEvent.defaultValue.previous;
      this.color = data.color ?? LightColorEvent.defaultValue.color;
      this.frequency = data.frequency ?? LightColorEvent.defaultValue.frequency;
      this.brightness = data.brightness ?? LightColorEvent.defaultValue.brightness;
      this.strobeBrightness = data.strobeBrightness ??
         LightColorEvent.defaultValue.strobeBrightness;
      this.strobeFade = data.strobeFade ?? LightColorEvent.defaultValue.strobeFade;
      this.easing = data.easing ?? LightColorEvent.defaultValue.easing;
      this.customData = deepCopy(
         data.customData ?? LightColorEvent.defaultValue.customData,
      );
   }

   previous: IWrapLightColorEvent['previous'];
   color: IWrapLightColorEvent['color'];
   brightness: IWrapLightColorEvent['brightness'];
   frequency: IWrapLightColorEvent['frequency'];
   strobeBrightness: IWrapLightColorEvent['strobeBrightness'];
   strobeFade: IWrapLightColorEvent['strobeFade'];
   easing: IWrapLightColorEvent['easing'];

   setPrevious(value: this['previous']): this {
      this.previous = value;
      return this;
   }
   setColor(value: this['color']): this {
      this.color = value;
      return this;
   }
   setBrightness(value: this['brightness']): this {
      this.brightness = value;
      return this;
   }
   setFrequency(value: this['frequency']): this {
      this.frequency = value;
      return this;
   }
   setStrobeBrightness(value: this['strobeBrightness']): this {
      this.strobeBrightness = value;
      return this;
   }
   setStrobeFade(value: this['strobeFade']): this {
      this.strobeFade = value;
      return this;
   }
   setEasing(value: this['easing']): this {
      this.easing = value;
      return this;
   }

   override isValid(
      fn?: (object: this) => boolean,
      override?: boolean,
   ): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.previous === 0 || this.previous === 1) &&
         this.easing >= -1 &&
         this.easing <= 103 &&
         this.color >= -1 &&
         this.color <= 2 &&
         this.brightness >= 0 &&
         this.frequency >= 0;
   }
}
