import type { IWrapLightshow } from './types/lightshow.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
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
): IWrapLightshow {
   return {
      waypoints: data.waypoints?.map(createWaypoint) ?? [],
      basicEvents: data.basicEvents?.map(createBasicEvent) ?? [],
      colorBoostEvents: data.colorBoostEvents?.map(createColorBoostEvent) ?? [],
      lightColorEventBoxGroups: data.lightColorEventBoxGroups?.map(createLightColorEventBoxGroup) ??
         [],
      lightRotationEventBoxGroups: data.lightRotationEventBoxGroups?.map(
         createLightRotationEventBoxGroup,
      ) ?? [],
      lightTranslationEventBoxGroups: data.lightTranslationEventBoxGroups?.map(
         createLightTranslationEventBoxGroup,
      ) ?? [],
      fxEventBoxGroups: data.fxEventBoxGroups?.map(createFxEventBoxGroup) ?? [],
      basicEventTypesWithKeywords: {
         list: data.basicEventTypesWithKeywords?.list?.map(
            createBasicEventTypesForKeywords,
         ) ?? [],
      },
      useNormalEventsAsCompatibleEvents: !!data.useNormalEventsAsCompatibleEvents,
      customData: deepCopy({ ...data.customData }),
   };
}
