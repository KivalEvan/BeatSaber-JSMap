import { ILightColorEvent } from '../../types/beatmap/v3/lightColorEvent.ts';
import { IWrapLightColorEventAttribute } from '../../types/beatmap/wrapper/lightColorEvent.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightColorEvent } from '../wrapper/lightColorEvent.ts';

/** Light color base beatmap v3 class object. */
export class LightColorBase extends WrapLightColorEvent<ILightColorEvent> {
   static default: Required<ILightColorEvent> = {
      b: 0,
      i: 0,
      c: 0,
      s: 0,
      f: 0,
      sb: 0,
      sf: 0,
      customData: {},
   };

   constructor();
   constructor(data: Partial<IWrapLightColorEventAttribute<ILightColorEvent>>);
   constructor(data: Partial<ILightColorEvent>);
   constructor(
      data:
         & Partial<ILightColorEvent>
         & Partial<IWrapLightColorEventAttribute<ILightColorEvent>>,
   );
   constructor(
      data:
         & Partial<ILightColorEvent>
         & Partial<IWrapLightColorEventAttribute<ILightColorEvent>> = {},
   ) {
      super();

      this._time = data.b ?? data.time ?? LightColorBase.default.b;
      this._color = data.c ?? data.color ?? LightColorBase.default.c;
      this._frequency = data.f ?? data.frequency ?? LightColorBase.default.f;
      this._transition = data.i ?? data.transition ?? LightColorBase.default.i;
      this._brightness = data.s ?? data.brightness ?? LightColorBase.default.s;
      this._strobeBrightness = data.sb ?? data.strobeBrightness ?? LightColorBase.default.sb;
      this._strobeFade = data.sf ?? data.strobeFade ?? LightColorBase.default.sf;
      this._customData = deepCopy(
         data.customData ?? LightColorBase.default.customData,
      );
   }

   static create(): LightColorBase[];
   static create(
      ...data: Partial<IWrapLightColorEventAttribute<ILightColorEvent>>[]
   ): LightColorBase[];
   static create(...data: Partial<ILightColorEvent>[]): LightColorBase[];
   static create(
      ...data: (
         & Partial<ILightColorEvent>
         & Partial<IWrapLightColorEventAttribute<ILightColorEvent>>
      )[]
   ): LightColorBase[];
   static create(
      ...data: (
         & Partial<ILightColorEvent>
         & Partial<IWrapLightColorEventAttribute<ILightColorEvent>>
      )[]
   ): LightColorBase[] {
      const result: LightColorBase[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightColorEvent> {
      return {
         b: this.time,
         c: this.color,
         f: this.frequency,
         i: this.transition,
         s: this.brightness,
         sb: this.strobeBrightness,
         sf: this.strobeFade,
         customData: deepCopy(this.customData),
      };
   }

   get previous(): 0 | 1 {
      return this.transition === 2 ? 1 : 0;
   }
   set previous(value: 0 | 1) {
      this.transition = value ? 2 : this.transition;
   }

   get customData(): NonNullable<ILightColorEvent['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightColorEvent['customData']>) {
      this._customData = value;
   }
}
