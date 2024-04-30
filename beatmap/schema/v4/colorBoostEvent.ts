import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IColorBoostEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { IWrapColorBoostEventAttribute } from '../../../types/beatmap/wrapper/colorBoostEvent.ts';
import type { DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const colorBoostEvent: ISchemaContainer<
   IWrapColorBoostEventAttribute,
   IColorBoostEventContainer
> = {
   defaultValue: {
      object: {
         b: 0,
         i: 0,
         customData: {},
      },
      data: {
         b: 0,
         customData: {},
      },
   } as DeepRequiredIgnore<IColorBoostEventContainer, 'customData'>,
   serialize(
      data: IWrapColorBoostEventAttribute
   ): Required<IColorBoostEventContainer> {
      return {
         object: {
            b: data.time,
            i: 0,
            customData: {},
         },
         data: {
            b: data.toggle ? 1 : 0,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(
      data: Partial<IColorBoostEventContainer> = {}
   ): Partial<IWrapColorBoostEventAttribute> {
      return {
         time: data.object?.b ?? this.defaultValue.object.b,
         toggle: !!(data.data?.b ?? this.defaultValue.data.b),
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData
         ),
      };
   },
   isValid(): boolean {
      return true;
   },
   isChroma(data: IWrapColorBoostEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapColorBoostEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapColorBoostEventAttribute): boolean {
      return false;
   },
};
