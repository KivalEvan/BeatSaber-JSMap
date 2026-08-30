import type { IWrapLightshow } from './types/lightshow.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';
import { createBasicEvent } from './basicEvent.ts';
import { createBasicEventTypesForKeywords } from './basicEventTypesForKeywords.ts';
import { createColorBoostEvent } from './colorBoostEvent.ts';
import { createFxEventBoxGroup } from './fxEventBoxGroup.ts';
import { createLightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { createLightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { createLightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { createWaypoint } from './waypoint.ts';

export function createLightshow(
   data: DeepPartial<IWrapLightshow> = {},
   options?: DeserializationOptions,
): IWrapLightshow {
   return {
      waypoints: data.waypoints?.map((item) => createWaypoint(item, options)) ?? [],
      basicEvents: data.basicEvents?.map((item) => createBasicEvent(item, options)) ?? [],
      colorBoostEvents:
         data.colorBoostEvents?.map((item) => createColorBoostEvent(item, options)) ??
            [],
      lightColorEventBoxGroups:
         data.lightColorEventBoxGroups?.map((item) =>
            createLightColorEventBoxGroup(item, options)
         ) ?? [],
      lightRotationEventBoxGroups:
         data.lightRotationEventBoxGroups?.map((item) =>
            createLightRotationEventBoxGroup(item, options)
         ) ?? [],
      lightTranslationEventBoxGroups:
         data.lightTranslationEventBoxGroups?.map((item) =>
            createLightTranslationEventBoxGroup(item, options)
         ) ?? [],
      fxEventBoxGroups:
         data.fxEventBoxGroups?.map((item) => createFxEventBoxGroup(item, options)) ??
            [],
      basicEventTypesWithKeywords: {
         list: data.basicEventTypesWithKeywords?.list?.map(
            (item) => createBasicEventTypesForKeywords(item, options),
         ) ?? [],
      },
      useNormalEventsAsCompatibleEvents: !!data.useNormalEventsAsCompatibleEvents,
      customData: copyCustomData(data.customData, options),
   };
}
