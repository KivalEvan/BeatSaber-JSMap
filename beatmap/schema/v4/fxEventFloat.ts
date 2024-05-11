import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IFxEventFloatContainer } from '../../../types/beatmap/container/v4.ts';
import type { IWrapFxEventFloatAttribute } from '../../../types/beatmap/wrapper/fxEventFloat.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const fxEventFloat: ISchemaContainer<
   IWrapFxEventFloatAttribute,
   IFxEventFloatContainer
> = {
   defaultValue: {
      data: {
         p: 0,
         e: 0,
         v: 0,
         customData: {},
      },
      time: 0,
   } as DeepRequiredIgnore<IFxEventFloatContainer, 'customData'>,
   serialize(data: IWrapFxEventFloatAttribute): IFxEventFloatContainer {
      return {
         data: {
            p: data.previous,
            e: data.easing,
            v: data.value,
            customData: deepCopy(data.customData),
         },
         time: data.time,
      };
   },
   deserialize(
      data: DeepPartial<IFxEventFloatContainer> = {},
   ): Partial<IWrapFxEventFloatAttribute> {
      return {
         time: data.time ?? this.defaultValue.time,
         previous: data.data?.p ?? this.defaultValue.data.p,
         easing: data.data?.e ?? this.defaultValue.data.e,
         value: data.data?.v ?? this.defaultValue.data.v,
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData,
         ),
      };
   },
   isValid(_: IWrapFxEventFloatAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapFxEventFloatAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapFxEventFloatAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapFxEventFloatAttribute): boolean {
      return false;
   },
};
