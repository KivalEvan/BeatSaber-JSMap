import type { IArc } from './arc.ts';
import type { IBaseItem } from './baseItem.ts';
import type { IBasicEvent } from './basicEvent.ts';
import type { IBasicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import type { IBombNote } from './bombNote.ts';
import type { IBPMEvent } from './bpmEvent.ts';
import type { IChain } from './chain.ts';
import type { IColorBoostEvent } from './colorBoostEvent.ts';
import type { IColorNote } from './colorNote.ts';
import type { ICustomDataDifficulty } from './custom/difficulty.ts';
import type { IFxEventBoxGroup } from './fxEventBoxGroup.ts';
import type { IFxEventsCollection } from './fxEventsCollection.ts';
import type { ILightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import type { ILightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import type { ILightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import type { IObstacle } from './obstacle.ts';
import type { IRotationEvent } from './rotationEvent.ts';
import type { IWaypoint } from './waypoint.ts';

/**
 * Schema for v3 `Difficulty`.
 */
export interface IDifficulty extends IBaseItem {
   version: `3.${0 | 1 | 2 | 3}.0`;
   bpmEvents?: IBPMEvent[];
   rotationEvents?: IRotationEvent[];
   colorNotes?: IColorNote[];
   bombNotes?: IBombNote[];
   obstacles?: IObstacle[];
   sliders?: IArc[];
   burstSliders?: IChain[];
   waypoints?: IWaypoint[];
   basicBeatmapEvents?: IBasicEvent[];
   colorBoostBeatmapEvents?: IColorBoostEvent[];
   lightColorEventBoxGroups?: ILightColorEventBoxGroup[];
   lightRotationEventBoxGroups?: ILightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups?: ILightTranslationEventBoxGroup[];
   vfxEventBoxGroups?: IFxEventBoxGroup[];
   _fxEventsCollection?: IFxEventsCollection;
   basicEventTypesWithKeywords?: IBasicEventTypesWithKeywords;
   useNormalEventsAsCompatibleEvents?: boolean;
   customData?: ICustomDataDifficulty;
}
