import { ILightColorEventContainer } from '../../types/beatmap/container/v4.ts';
import { ILightColorEvent } from '../../types/beatmap/v4/lightColorEvent.ts';
import {
   IWrapLightColorEvent,
   IWrapLightColorEventAttribute,
} from '../../types/beatmap/wrapper/lightColorEvent.ts';
import { DeepRequiredIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightColorEvent } from '../wrapper/lightColorEvent.ts';

/** Light color event beatmap v4 class object. */
export class LightColorEvent extends WrapLightColorEvent<ILightColorEventContainer> {
   static default: DeepRequiredIgnore<ILightColorEventContainer, 'customData'> = {
      data: {
         p: 0,
         c: 0,
         e: 0,
         b: 0,
         f: 0,
         sb: 0,
         sf: 0,
         customData: {},
      },
      time: 0,
   };

   constructor();
   constructor(
      data: Partial<IWrapLightColorEventAttribute<ILightColorEventContainer>>,
   );
   constructor(data: Partial<ILightColorEvent>, time?: number);
   constructor(
      data:
         & Partial<ILightColorEvent>
         & Partial<IWrapLightColorEventAttribute<ILightColorEventContainer>>,
      time?: number,
   );
   constructor(
      data:
         & Partial<ILightColorEvent>
         & Partial<IWrapLightColorEventAttribute<ILightColorEventContainer>> = {},
      time?: number,
   ) {
      super();

      this._time = time ?? data.time ?? LightColorEvent.default.time;
      this._previous = data.p ?? data.previous ?? LightColorEvent.default.data.p;
      this._color = data.c ?? data.color ?? LightColorEvent.default.data.c;
      this._frequency = data.f ?? data.frequency ?? LightColorEvent.default.data.f;
      this._transition = 0;
      this._easing = data.e ?? data.easing ?? LightColorEvent.default.data.e;
      this._brightness = data.b ?? data.brightness ?? LightColorEvent.default.data.b;
      this._strobeBrightness = data.sb ?? data.strobeBrightness ?? LightColorEvent.default.data.sb;
      this._strobeFade = data.sf ?? data.strobeFade ?? LightColorEvent.default.data.sf;
      this._customData = deepCopy(
         data.customData ?? LightColorEvent.default.data.customData,
      );
   }

   static create(): LightColorEvent[];
   static create(
      ...data: Partial<
         IWrapLightColorEventAttribute<ILightColorEventContainer>
      >[]
   ): LightColorEvent[];
   static create(
      ...data: Partial<IWrapLightColorEventAttribute<ILightColorEvent>>[]
   ): LightColorEvent[] {
      const result: LightColorEvent[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightColorEventContainer> {
      return {
         data: {
            p: this.previous,
            c: this.color,
            e: this.easing,
            b: this.brightness,
            f: this.frequency,
            sb: this.strobeBrightness,
            sf: this.strobeFade,
            customData: deepCopy(this.customData),
         },
         time: this.time,
      };
   }

   get transition(): IWrapLightColorEvent['transition'] {
      return this.previous ? 2 : this.easing === -1 ? 1 : 0;
   }
   set transition(value: IWrapLightColorEvent['transition']) {
      if (value === 0) this.easing = -1;
      if (value === 1) this.easing = 0;
      if (value === 2) this.previous = 1;
   }

   get customData(): NonNullable<ILightColorEvent['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightColorEvent['customData']>) {
      this._customData = value;
   }
}
