import { IBasicEventTypesWithKeywords } from '../v3/basicEventTypesWithKeywords.ts';
import { IBasicEvent } from './basicEvent.ts';
import { IColorBoostEvent } from './colorBoostEvent.ts';
import { IEventBoxGroup } from './eventBoxGroup.ts';
import { IFxEventBox } from './fxEventBox.ts';
import { IFxEventFloat } from './fxEventFloat.ts';
import { IIndexFilter } from './indexFilter.ts';
import { IItem } from './item.ts';
import { ILightColorEvent } from './lightColorEvent.ts';
import { ILightColorEventBox } from './lightColorEventBox.ts';
import { ILightRotationEvent } from './lightRotationEvent.ts';
import { ILightRotationEventBox } from './lightRotationEventBox.ts';
import { ILightTranslationEvent } from './lightTranslationEvent.ts';
import { ILightTranslationEventBox } from './lightTranslationEventBox.ts';
import { IObject, IObjectLane } from './object.ts';
import { IWaypoint } from './waypoint.ts';

export interface ILightshow extends IItem {
   version: '4.0.0';
   waypoints: IObjectLane[];
   waypointsData: IWaypoint[];
   basicEvents: IObject[];
   basicEventsData: IBasicEvent[];
   colorBoostEvents: IObject[];
   colorBoostEventsData: IColorBoostEvent[];
   eventBoxGroups: IEventBoxGroup[];
   indexFilters: IIndexFilter[];
   lightColorEventBoxes: ILightColorEventBox[];
   lightColorEvents: ILightColorEvent[];
   lightRotationEventBoxes: ILightRotationEventBox[];
   lightRotationEvents: ILightRotationEvent[];
   lightTranslationEventBoxes: ILightTranslationEventBox[];
   lightTranslationEvents: ILightTranslationEvent[];
   fxEventBoxes: IFxEventBox[];
   floatFxEvents: IFxEventFloat[];
   basicEventTypesWithKeywords: IBasicEventTypesWithKeywords;
   useNormalEventsAsCompatibleEvents: boolean;
}
