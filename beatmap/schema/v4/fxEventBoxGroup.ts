import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { fxEventBox } from './fxEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IIndexFilter } from '../../../types/beatmap/v4/indexFilter.ts';
import type { IWrapFxEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import type {
   IEventBoxGroupContainer,
   IFxEventFloatContainer,
} from '../../../types/beatmap/container/v4.ts';
import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { IEventBoxGroup } from '../../../types/beatmap/v4/eventBoxGroup.ts';
import type { IFxEventFloatBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { IFxEventBox } from '../../../types/beatmap/v4/fxEventBox.ts';
import type { IFxEventFloat } from '../../../types/beatmap/v4/fxEventFloat.ts';

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
      data: IWrapFxEventBoxGroupAttribute
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
      data: DeepPartial<IEventBoxGroupContainer<IFxEventFloatBoxContainer>> = {}
   ): DeepPartial<IWrapFxEventBoxGroupAttribute> {
      d._time = data.b ?? this.defaultValue.object.b;
      d._id = data.g ?? this.defaultValue.object.g;
      events ||= [];
      if (data.e) {
         for (const e of data.e) {
            const evts: IFxEventFloat[] = [];
            const times: number[] = [];
            for (const l of e.l || []) {
               times.push(l.b || 0);
               evts.push(events[l.i || 0]);
            }
            d._boxes.push(
               fxEventBox.deserialize(
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
