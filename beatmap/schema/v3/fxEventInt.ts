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
      data: Partial<IFxEventInt> = {}
   ): Partial<IWrapFxEventIntAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         previous: data.p ?? this.defaultValue.p,
         value: data.v ?? this.defaultValue.v,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapFxEventIntAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapFxEventIntAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapFxEventIntAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapFxEventIntAttribute): boolean {
      return false;
   },
};
