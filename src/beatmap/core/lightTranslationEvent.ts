import type { IWrapLightTranslationEvent } from '../schema/wrapper/types/lightTranslationEvent.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseObject } from './abstract/baseObject.ts';
import { createLightTranslationEvent } from '../schema/wrapper/lightTranslationEvent.ts';

/**
 * Core beatmap light translation event.
 */
export class LightTranslationEvent extends BaseObject implements IWrapLightTranslationEvent {
   static defaultValue: IWrapLightTranslationEvent = /* @__PURE__ */ createLightTranslationEvent();

   static createOne(
      data: Partial<IWrapLightTranslationEvent> = {},
   ): LightTranslationEvent {
      return new this(data);
   }
   static create(...data: Partial<IWrapLightTranslationEvent>[]): LightTranslationEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapLightTranslationEvent> = {}) {
      super();
      this.time = data.time ?? LightTranslationEvent.defaultValue.time;
      this.easing = data.easing ?? LightTranslationEvent.defaultValue.easing;
      this.previous = data.previous ?? LightTranslationEvent.defaultValue.previous;
      this.translation = data.translation ?? LightTranslationEvent.defaultValue.translation;
      this.customData = deepCopy(data.customData ?? LightTranslationEvent.defaultValue.customData);
   }

   previous: IWrapLightTranslationEvent['previous'] = 0;
   easing: IWrapLightTranslationEvent['easing'] = 0;
   translation: IWrapLightTranslationEvent['translation'] = 0;

   setPrevious(value: this['previous']): this {
      this.previous = value;
      return this;
   }
   setEasing(value: this['easing']): this {
      this.easing = value;
      return this;
   }
   setTranslation(value: this['translation']): this {
      this.translation = value;
      return this;
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.previous === 0 || this.previous === 1) &&
         this.easing >= -1 &&
         this.easing <= 103;
   }
}
