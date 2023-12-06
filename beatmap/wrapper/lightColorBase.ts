import { IWrapLightColorBase } from '../../types/beatmap/wrapper/lightColorBase.ts';
import { WrapBaseObject } from './baseObject.ts';

/** Light color base beatmap class object. */
export abstract class WrapLightColorBase<T extends { [P in keyof T]: T[P] }>
   extends WrapBaseObject<T>
   implements IWrapLightColorBase<T> {
   protected _transition!: IWrapLightColorBase['transition'];
   protected _color!: IWrapLightColorBase['color'];
   protected _brightness!: IWrapLightColorBase['brightness'];
   protected _frequency!: IWrapLightColorBase['frequency'];
   protected _strobeBrightness!: IWrapLightColorBase['strobeBrightness'];
   protected _strobeFade!: IWrapLightColorBase['strobeFade'];

   get transition(): IWrapLightColorBase['transition'] {
      return this._transition;
   }
   set transition(value: IWrapLightColorBase['transition']) {
      this._transition = value;
   }
   get color(): IWrapLightColorBase['color'] {
      return this._color;
   }
   set color(value: IWrapLightColorBase['color']) {
      this._color = value;
   }
   get brightness(): IWrapLightColorBase['brightness'] {
      return this._brightness;
   }
   set brightness(value: IWrapLightColorBase['brightness']) {
      this._brightness = value;
   }
   get frequency(): IWrapLightColorBase['frequency'] {
      return this._frequency;
   }
   set frequency(value: IWrapLightColorBase['frequency']) {
      this._frequency = value;
   }
   get strobeBrightness(): IWrapLightColorBase['strobeBrightness'] {
      return this._strobeBrightness;
   }
   set strobeBrightness(value: IWrapLightColorBase['strobeBrightness']) {
      this._strobeBrightness = value;
   }
   get strobeFade(): IWrapLightColorBase['strobeFade'] {
      return this._strobeFade;
   }
   set strobeFade(value: IWrapLightColorBase['strobeFade']) {
      this._strobeFade = value;
   }

   setTransition(value: IWrapLightColorBase['transition']): this {
      this.transition = value;
      return this;
   }
   setColor(value: IWrapLightColorBase['color']): this {
      this.color = value;
      return this;
   }
   setBrightness(value: IWrapLightColorBase['brightness']): this {
      this.brightness = value;
      return this;
   }
   setFrequency(value: IWrapLightColorBase['frequency']): this {
      this.frequency = value;
      return this;
   }
   setStrobeBrightness(value: IWrapLightColorBase['strobeBrightness']): this {
      this.strobeBrightness = value;
      return this;
   }
   setStrobeFade(value: IWrapLightColorBase['strobeFade']): this {
      this.strobeFade = value;
      return this;
   }

   isValid(): boolean {
      return (
         this.transition >= 0 &&
         this.transition <= 2 &&
         this.color >= -1 &&
         this.color <= 2 &&
         this.brightness >= 0 &&
         this.frequency >= 0
      );
   }
}
