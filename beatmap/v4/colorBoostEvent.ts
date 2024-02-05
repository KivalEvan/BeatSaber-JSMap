import { IColorBoostEvent } from '../../types/beatmap/v4/colorBoostEvent.ts';
import { IColorBoostEventContainer } from '../../types/beatmap/container/v4.ts';
import { IObject } from '../../types/beatmap/v4/object.ts';
import { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import { DeepRequiredIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapColorBoostEvent } from '../wrapper/colorBoostEvent.ts';

/** Boost event beatmap v4 class object. */
export class ColorBoostEvent extends WrapColorBoostEvent<IColorBoostEventContainer> {
   static default: DeepRequiredIgnore<IColorBoostEventContainer, 'customData'> = {
      object: {
         b: 0,
         i: 0,
         customData: {},
      },
      data: {
         b: 0,
         customData: {},
      },
   };

   constructor();
   constructor(
      object: Partial<IWrapColorBoostEventAttribute<IColorBoostEventContainer>>,
   );
   constructor(object: Partial<IObject>, data?: Partial<IColorBoostEvent>);
   constructor(
      object:
         & Partial<IObject>
         & Partial<IWrapColorBoostEventAttribute<IColorBoostEventContainer>>,
      data?: Partial<IColorBoostEvent>,
   );
   constructor(
      object:
         & Partial<IObject>
         & Partial<IWrapColorBoostEventAttribute<IColorBoostEventContainer>> = {},
      data: Partial<IColorBoostEvent> = {},
   ) {
      super();

      this._time = object.b ?? object.time ?? ColorBoostEvent.default.object.b;
      this._toggle = !!(
         data.b ??
            object.toggle ??
            ColorBoostEvent.default.data.b
      );
      this._customData = deepCopy(
         data.customData ?? ColorBoostEvent.default.data.customData,
      );
   }

   static create(): ColorBoostEvent[];
   static create(
      ...data: Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>[]
   ): ColorBoostEvent[];
   static create(
      ...data: Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>[]
   ): ColorBoostEvent[] {
      const result: ColorBoostEvent[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IColorBoostEventContainer> {
      return {
         object: {
            b: this.time,
            i: 0,
            customData: {},
         },
         data: {
            b: this.toggle ? 1 : 0,
            customData: deepCopy(this.customData),
         },
      };
   }

   get customData(): NonNullable<IColorBoostEvent['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IColorBoostEvent['customData']>) {
      this._customData = value;
   }

   isValid(): boolean {
      return true;
   }
}
