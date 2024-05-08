// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type {
   IWrapLightColorEvent,
   IWrapLightColorEventAttribute,
} from '../../types/beatmap/wrapper/lightColorEvent.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseObject } from './abstract/baseObject.ts';

export class LightColorEvent extends BaseObject implements IWrapLightColorEvent {
   static schema: Record<number, ISchemaContainer<IWrapLightColorEventAttribute>> = {};
   static defaultValue: IWrapLightColorEventAttribute = {
      time: 0,
      previous: 0,
      color: 0,
      frequency: 0,
      brightness: 0,
      strobeBrightness: 0,
      strobeFade: 0,
      easing: 0,
      customData: {},
   };

   static create(...data: Partial<IWrapLightColorEventAttribute>[]): LightColorEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapLightColorEventAttribute> = {}) {
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
   static fromJSON(data: Record<string, any>, version: number): LightColorEvent {
      return new this(LightColorEvent.schema[version]?.deserialize(data));
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (LightColorEvent.schema[version || 0]?.serialize(this) || this.toJSON()) as T;
   }
   toJSON(): IWrapLightColorEventAttribute {
      return {
         time: this.time,
         previous: this.previous,
         color: this.color,
         frequency: this.frequency,
         brightness: this.brightness,
         strobeBrightness: this.strobeBrightness,
         strobeFade: this.strobeFade,
         easing: this.easing,
         customData: deepCopy(this.customData),
      };
   }

   previous: IWrapLightColorEvent['previous'] = 0;
   color: IWrapLightColorEvent['color'] = 0;
   brightness: IWrapLightColorEvent['brightness'] = 0;
   frequency: IWrapLightColorEvent['frequency'] = 0;
   strobeBrightness: IWrapLightColorEvent['strobeBrightness'] = 0;
   strobeFade: IWrapLightColorEvent['strobeFade'] = 0;
   easing: IWrapLightColorEvent['easing'] = 0;

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

   isValid(): boolean {
      return (
         (this.previous === 0 || this.previous === 1) &&
         this.easing >= -1 &&
         this.easing <= 103 &&
         this.color >= -1 &&
         this.color <= 2 &&
         this.brightness >= 0 &&
         this.frequency >= 0
      );
   }
}
