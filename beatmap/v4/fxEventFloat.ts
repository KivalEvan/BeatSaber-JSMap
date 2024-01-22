import { IFxEventFloatContainer } from '../../types/beatmap/v4/container.ts';
import { IFxEventFloat } from '../../types/beatmap/v4/fxEventFloat.ts';
import { IWrapFxEventFloatAttribute } from '../../types/beatmap/wrapper/fxEventFloat.ts';
import { DeepRequiredIgnore } from '../../types/mod.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapFxEventFloat } from '../wrapper/fxEventFloat.ts';

/** FX float event beatmap v4 class object. */
export class FxEventFloat extends WrapFxEventFloat<IFxEventFloatContainer> {
   static default: DeepRequiredIgnore<IFxEventFloatContainer, 'customData'> = {
      data: {
         p: 0,
         e: 0,
         v: 0,
         customData: {},
      },
      time: 0,
   };

   constructor();
   constructor(
      data: Partial<IWrapFxEventFloatAttribute<IFxEventFloatContainer>>,
   );
   constructor(data: Partial<IFxEventFloat>, time?: number);
   constructor(
      data:
         & Partial<IFxEventFloat>
         & Partial<IWrapFxEventFloatAttribute<IFxEventFloatContainer>>,
      time?: number,
   );
   constructor(
      data:
         & Partial<IFxEventFloat>
         & Partial<IWrapFxEventFloatAttribute<IFxEventFloatContainer>> = {},
      time?: number,
   ) {
      super();

      this._time = time ?? data.time ?? FxEventFloat.default.time;
      this._previous = data.p ?? data.previous ?? FxEventFloat.default.data.p;
      this._easing = data.e ?? data.easing ?? FxEventFloat.default.data.e;
      this._value = data.v ?? data.value ?? FxEventFloat.default.data.v;
      this._customData = deepCopy(
         data.customData ?? FxEventFloat.default.data.customData,
      );
   }

   static create(): FxEventFloat[];
   static create(
      ...data: Partial<IWrapFxEventFloatAttribute<IFxEventFloat>>[]
   ): FxEventFloat[];
   static create(
      ...data: Partial<IWrapFxEventFloatAttribute<IFxEventFloat>>[]
   ): FxEventFloat[] {
      const result: FxEventFloat[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IFxEventFloatContainer> {
      return {
         data: {
            p: this.previous,
            e: this.easing,
            v: this.value,
            customData: deepCopy(this.customData),
         },
         time: this.time,
      };
   }

   get customData(): NonNullable<IFxEventFloat['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IFxEventFloat['customData']>) {
      this._customData = value;
   }
}
