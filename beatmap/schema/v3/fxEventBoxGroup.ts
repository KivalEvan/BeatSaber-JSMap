import type { IFxEventBoxGroup } from '../../../types/beatmap/v3/fxEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { fxEventBox } from './fxEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IFxEventBox } from '../../../types/beatmap/v3/fxEventBox.ts';
import type { IIndexFilter } from '../../../types/beatmap/v3/indexFilter.ts';
import type { IWrapFxEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import type {
   IEventBoxGroupContainer,
   IFxEventFloatBoxContainer,
} from '../../../types/beatmap/container/v3.ts';
import type { DeepRequiredIgnore } from '../../../types/utils.ts';
import type { IFxEventFloat } from '../../../types/beatmap/v3/fxEventFloat.ts';
import { FxType } from '../../../types/beatmap/shared/constants.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';

export const fxEventBoxGroup: ISchemaContainer<
   IWrapFxEventBoxGroupAttribute,
   IEventBoxGroupContainer<IFxEventBox, IFxEventFloatBoxContainer>
> = {
   defaultValue: {
      object: { t: FxType.FLOAT, b: 0, g: 0, e: [], customData: {} },
      boxData: [],
   } as DeepRequiredIgnore<
      IEventBoxGroupContainer<IFxEventBox, IFxEventFloatBoxContainer>,
      'customData'
   >,
   serialize(
      data: IWrapFxEventBoxGroupAttribute
   ): IEventBoxGroupContainer<IFxEventBox, IFxEventFloatBoxContainer> {
      return {
         object: {
            t: FxType.FLOAT,
            b: data.time,
            g: data.id,
            e: [],
            customData: deepCopy(data.customData),
         },
         boxData: this.boxes.map((e) => e.serialize()),
      };
   },
   deserialize(
      data: DeepPartial<
         IEventBoxGroupContainer<IFxEventBox, IFxEventFloatBoxContainer>
      > = {}
   ): DeepPartial<IWrapFxEventBoxGroupAttribute> {
      const d: DeepPartial<IWrapFxEventBoxGroupAttribute> = {};
      d._time = data.b ?? this.defaultValue.object.b;
      d._id = data.g ?? this.defaultValue.object.g;
      if (data.e) {
         d._boxes = data.e.map((obj) => FxEventBox.deserialize(obj, events));
      } else {
         d._boxes = this.defaultValue.boxData.map((obj) =>
            FxEventBox.deserialize(obj.data, events ?? obj.eventData)
         );
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
