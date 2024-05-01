import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IFxEventFloat } from '../../../types/beatmap/v3/fxEventFloat.ts';
import type { IWrapFxEventFloatAttribute } from '../../../types/beatmap/wrapper/fxEventFloat.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const fxEventFloat: ISchemaContainer<
   IWrapFxEventFloatAttribute,
   IFxEventFloat
> = {
   defaultValue: {
      b: 0,
      i: 0,
      p: 0,
      v: 0,
      customData: {},
   } as Required<IFxEventFloat>,
   serialize(data: IWrapFxEventFloatAttribute): IFxEventFloat {
      return {
         b: data.time,
         i: data.easing,
         p: data.previous,
         v: data.value,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: Partial<IFxEventFloat> = {},
   ): Partial<IWrapFxEventFloatAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         easing: data.i ?? this.defaultValue.i,
         previous: data.p ?? this.defaultValue.p,
         value: data.v ?? this.defaultValue.v,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapFxEventFloatAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapFxEventFloatAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapFxEventFloatAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapFxEventFloatAttribute): boolean {
      return false;
   },
};
