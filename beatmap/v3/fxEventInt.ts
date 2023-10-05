import { IFxEventInt } from '../../types/beatmap/v3/fxEventInt.ts';
import { IWrapFxEventIntAttribute } from '../../types/beatmap/wrapper/fxEventInt.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapFxEventInt } from '../wrapper/fxEventInt.ts';

/** FX int base beatmap v3 class object. */
export class FxEventInt extends WrapFxEventInt<IFxEventInt> {
   static default: Required<IFxEventInt> = {
      b: 0,
      p: 0,
      v: 0,
      customData: {},
   };

   constructor();
   constructor(data: Partial<IWrapFxEventIntAttribute<IFxEventInt>>);
   constructor(data: Partial<IFxEventInt>);
   constructor(data: Partial<IFxEventInt> & Partial<IWrapFxEventIntAttribute<IFxEventInt>>);
   constructor(data: Partial<IFxEventInt> & Partial<IWrapFxEventIntAttribute<IFxEventInt>> = {}) {
      super();

      this._time = data.b ?? data.time ?? FxEventInt.default.b;
      this._previous = data.p ?? data.previous ?? FxEventInt.default.p;
      this._value = data.v ?? data.value ?? FxEventInt.default.v;
      this._customData = deepCopy(data.customData ?? FxEventInt.default.customData);
   }

   static create(): FxEventInt[];
   static create(...data: Partial<IWrapFxEventIntAttribute<IFxEventInt>>[]): FxEventInt[];
   static create(...data: Partial<IFxEventInt>[]): FxEventInt[];
   static create(
      ...data: (Partial<IFxEventInt> & Partial<IWrapFxEventIntAttribute<IFxEventInt>>)[]
   ): FxEventInt[];
   static create(
      ...data: (Partial<IFxEventInt> & Partial<IWrapFxEventIntAttribute<IFxEventInt>>)[]
   ): FxEventInt[] {
      const result: FxEventInt[] = [];
      data.forEach((obj) => result.push(new this(obj)));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): IFxEventInt {
      return {
         b: this.time,
         p: this.previous,
         v: this.value,
         customData: deepCopy(this.customData),
      };
   }

   get customData(): NonNullable<IFxEventInt['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IFxEventInt['customData']>) {
      this._customData = value;
   }
}
