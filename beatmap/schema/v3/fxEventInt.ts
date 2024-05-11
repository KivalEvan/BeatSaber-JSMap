import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IFxEventInt } from '../../../types/beatmap/v3/fxEventInt.ts';
import type { IWrapFxEventIntAttribute } from '../../../types/beatmap/wrapper/fxEventInt.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const fxEventInt: ISchemaContainer<
   IWrapFxEventIntAttribute,
   IFxEventInt
> = {
   defaultValue: {
      b: 0,
      p: 0,
      v: 0,
      customData: {},
   } as Required<IFxEventInt>,
   serialize(data: IWrapFxEventIntAttribute): IFxEventInt {
      return {
         b: data.time,
         p: data.previous,
         v: data.value,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: Partial<IFxEventInt> = {},
   ): Partial<IWrapFxEventIntAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         previous: data.p ?? this.defaultValue.p,
         value: data.v ?? this.defaultValue.v,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(_: IWrapFxEventIntAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapFxEventIntAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapFxEventIntAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapFxEventIntAttribute): boolean {
      return false;
   },
};
