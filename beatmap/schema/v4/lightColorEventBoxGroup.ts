import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { lightColorEventBox } from './lightColorEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapLightColorEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import type {
   IEventBoxGroupContainer,
} from '../../../types/beatmap/container/v4.ts';
import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { ILightColorBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { ILightColorEvent } from '../../../types/beatmap/v4/lightColorEvent.ts';

export const lightColorEventBoxGroup: ISchemaContainer<
   IWrapLightColorEventBoxGroupAttribute,
   IEventBoxGroupContainer<ILightColorBoxContainer>
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
      IEventBoxGroupContainer<ILightColorBoxContainer>,
      'customData'
   >,
   serialize(
      data: IWrapLightColorEventBoxGroupAttribute
   ): IEventBoxGroupContainer<ILightColorBoxContainer> {
      return {
         object: {
            t: EventBoxType.COLOR,
            b: data.time,
            g: data.id,
            e: [],
            customData: deepCopy(data.customData),
         },
         boxData: data.boxes.map(lightColorEventBox.serialize),
      };
   },
   deserialize(
      data: DeepPartial<IEventBoxGroupContainer<ILightColorBoxContainer>> = {}
   ): DeepPartial<IWrapLightColorEventBoxGroupAttribute> {
      d._time = data.b ?? this.defaultValue.object.b;
      d._id = data.g ?? this.defaultValue.object.g;
      events ||= [];
      if (data.e) {
         for (const e of data.e) {
            const evts: ILightColorEvent[] = [];
            const times: number[] = [];
            for (const l of e.l || []) {
               times.push(l.b || 0);
               evts.push(events[l.i || 0]);
            }
            d._boxes.push(
               lightColorEventBox.deserialize(
                  boxes?.[e.e || 0] || {},
                  evts,
                  times,
                  filters?.[e.f || 0]
               )
            );
         }
      }
      d._customData = deepCopy(
         data.customData ?? this.defaultValue.object.customData
      );
      return d;
   },
   isValid(data: IWrapLightColorEventBoxGroupAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapLightColorEventBoxGroupAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapLightColorEventBoxGroupAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapLightColorEventBoxGroupAttribute): boolean {
      return false;
   },
};
