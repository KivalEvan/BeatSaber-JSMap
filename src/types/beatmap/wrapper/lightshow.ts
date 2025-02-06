import type { IWrapWaypoint } from './waypoint.ts';
import type { IWrapBasicEvent } from './basicEvent.ts';
import type { IWrapColorBoostEvent } from './colorBoostEvent.ts';
import type { IWrapLightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import type { IWrapLightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import type { IWrapLightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import type { IWrapBasicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import type { IWrapFxEventBoxGroup } from './fxEventBoxGroup.ts';
import type { ICustomDataDifficulty } from './custom/difficulty.ts';
import type { IWrapBaseItem } from './baseItem.ts';

/**
 * Wrapper attribute for beatmap lightshow.
 */
export interface IWrapLightshow extends IWrapBaseItem {
   waypoints: IWrapWaypoint[];
   basicEvents: IWrapBasicEvent[];
   colorBoostEvents: IWrapColorBoostEvent[];
   lightColorEventBoxGroups: IWrapLightColorEventBoxGroup[];
   lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroup[];
   fxEventBoxGroups: IWrapFxEventBoxGroup[];
   basicEventTypesWithKeywords: IWrapBasicEventTypesWithKeywords;
   useNormalEventsAsCompatibleEvents: boolean;
   customData: ICustomDataDifficulty;
}
