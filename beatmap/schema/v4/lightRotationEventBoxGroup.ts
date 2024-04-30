import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { lightRotationEventBox } from './lightRotationEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapLightRotationEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import type {
   IEventBoxGroupContainer,
} from '../../../types/beatmap/container/v4.ts';
import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { ILightRotationBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { ILightRotationEvent } from '../../../types/beatmap/v4/lightRotationEvent.ts';

export const lightRotationEventBoxGroup: ISchemaContainer<
   IWrapLightRotationEventBoxGroupAttribute,
   IEventBoxGroupContainer<ILightRotationBoxContainer>
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
      IEventBoxGroupContainer<ILightRotationBoxContainer>,
      'customData'
   >,
   serialize(
      data: IWrapLightRotationEventBoxGroupAttribute
   ): IEventBoxGroupContainer<ILightRotationBoxContainer> {
      return {
         object: {
            t: EventBoxType.ROTATION,
            b: data.time,
            g: data.id,
            e: [],
            customData: deepCopy(data.customData),
         },
         boxData: data.boxes.map(lightRotationEventBox.serialize),
      };
   },
   deserialize(
      data: DeepPartial<
         IEventBoxGroupContainer<ILightRotationBoxContainer>
      > = {}
   ): DeepPartial<IWrapLightRotationEventBoxGroupAttribute> {
      d._time = data.b ?? this.defaultValue.object.b;
      d._id = data.g ?? this.defaultValue.object.g;
      events ||= [];
      if (data.e) {
         for (const e of data.e) {
            const evts: ILightRotationEvent[] = [];
            const times: number[] = [];
            for (const l of e.l || []) {
               times.push(l.b || 0);
               evts.push(events[l.i || 0]);
            }
            d._boxes.push(
               lightRotationEventBox.deserialize(
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
   isValid(data: IWrapLightRotationEventBoxGroupAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapLightRotationEventBoxGroupAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapLightRotationEventBoxGroupAttribute): boolean {
      return false;
   },
   isMappingExtensions(
      data: IWrapLightRotationEventBoxGroupAttribute
   ): boolean {
      return false;
   },
};
