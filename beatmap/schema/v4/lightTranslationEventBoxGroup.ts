import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { lightTranslationEventBox } from './lightTranslationEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IIndexFilter } from '../../../types/beatmap/v4/indexFilter.ts';
import type { IWrapLightTranslationEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import type {
   IEventBoxGroupContainer,
   ILightTranslationEventContainer,
} from '../../../types/beatmap/container/v4.ts';
import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { IEventBoxGroup } from '../../../types/beatmap/v4/eventBoxGroup.ts';
import type { ILightTranslationBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { ILightTranslationEventBox } from '../../../types/beatmap/v4/lightTranslationEventBox.ts';
import type { ILightTranslationEvent } from '../../../types/beatmap/v4/lightTranslationEvent.ts';

export const lightTranslationEventBoxGroup: ISchemaContainer<
   IWrapLightTranslationEventBoxGroupAttribute,
   IEventBoxGroupContainer<ILightTranslationBoxContainer>
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
      IEventBoxGroupContainer<ILightTranslationBoxContainer>,
      'customData'
   >,
   serialize(
      data: IWrapLightTranslationEventBoxGroupAttribute
   ): IEventBoxGroupContainer<ILightTranslationBoxContainer> {
      return {
         object: {
            t: EventBoxType.TRANSLATION,
            b: data.time,
            g: data.id,
            e: [],
            customData: deepCopy(data.customData),
         },
         boxData: data.boxes.map(lightTranslationEventBox.serialize),
      };
   },
   deserialize(
      data: DeepPartial<
         IEventBoxGroupContainer<ILightTranslationBoxContainer>
      > = {}
   ): DeepPartial<IWrapLightTranslationEventBoxGroupAttribute> {
      d._time = data.b ?? this.defaultValue.object.b;
      d._id = data.g ?? this.defaultValue.object.g;
      events ||= [];
      if (data.e) {
         for (const e of data.e) {
            const evts: ILightTranslationEvent[] = [];
            const times: number[] = [];
            for (const l of e.l || []) {
               times.push(l.b || 0);
               evts.push(events[l.i || 0]);
            }
            d._boxes.push(
               lightTranslationEventBox.deserialize(
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
   isValid(data: IWrapLightTranslationEventBoxGroupAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapLightTranslationEventBoxGroupAttribute): boolean {
      return false;
   },
   isNoodleExtensions(
      data: IWrapLightTranslationEventBoxGroupAttribute
   ): boolean {
      return false;
   },
   isMappingExtensions(
      data: IWrapLightTranslationEventBoxGroupAttribute
   ): boolean {
      return false;
   },
};
