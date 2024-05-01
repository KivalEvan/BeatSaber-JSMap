import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { fxEventBox } from './fxEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapFxEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import type { IEventBoxGroupContainer } from '../../../types/beatmap/container/v4.ts';
import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { IFxEventFloatBoxContainer } from '../../../types/beatmap/container/v4.ts';

export const fxEventBoxGroup: ISchemaContainer<
   IWrapFxEventBoxGroupAttribute,
   IEventBoxGroupContainer<IFxEventFloatBoxContainer>
> = {
   defaultValue: {
      object: {
         t: EventBoxType.TRANSLATION,
         b: 0,
         g: 0,
         e: [],
         customData: {},
      },
      boxData: [],
   } as DeepRequiredIgnore<
      IEventBoxGroupContainer<IFxEventFloatBoxContainer>,
      'customData'
   >,
   serialize(
      data: IWrapFxEventBoxGroupAttribute,
   ): IEventBoxGroupContainer<IFxEventFloatBoxContainer> {
      return {
         object: {
            t: EventBoxType.FX_FLOAT,
            b: data.time,
            g: data.id,
            e: [],
            customData: deepCopy(data.customData),
         },
         boxData: data.boxes.map(fxEventBox.serialize),
      };
   },
   deserialize(
      data: DeepPartial<IEventBoxGroupContainer<IFxEventFloatBoxContainer>> = {},
   ): DeepPartial<IWrapFxEventBoxGroupAttribute> {
      return {
         time: data.object?.b ?? this.defaultValue.object.b,
         id: data.object?.g ?? this.defaultValue.object.g,
         boxes: (data.boxData ?? this.defaultValue.boxData).map(
            fxEventBox.deserialize,
         ),
         customData: deepCopy(
            data.object?.customData ?? this.defaultValue.object.customData,
         ),
      };
   },
   isValid(data: IWrapFxEventBoxGroupAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapFxEventBoxGroupAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapFxEventBoxGroupAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapFxEventBoxGroupAttribute): boolean {
      return false;
   },
};
