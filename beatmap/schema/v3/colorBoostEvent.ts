import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IColorBoostEvent } from '../../../types/beatmap/v3/colorBoostEvent.ts';
import type { IWrapColorBoostEventAttribute } from '../../../types/beatmap/wrapper/colorBoostEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const colorBoostEvent: ISchemaContainer<
   IWrapColorBoostEventAttribute,
   IColorBoostEvent
> = {
   defaultValue: {
      b: 0,
      o: false,
      customData: {},
   } as Required<IColorBoostEvent>,
   serialize(data: IWrapColorBoostEventAttribute): IColorBoostEvent {
      return {
         b: data.time,
         o: data.toggle,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: Partial<IColorBoostEvent> = {},
   ): Partial<IWrapColorBoostEventAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         toggle: data.o ?? this.defaultValue.o,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(_: IWrapColorBoostEventAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapColorBoostEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapColorBoostEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapColorBoostEventAttribute): boolean {
      return false;
   },
};
