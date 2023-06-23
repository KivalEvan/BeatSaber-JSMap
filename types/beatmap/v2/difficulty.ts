import { INote } from './note.ts';
import { IArc } from './arc.ts';
import { IObstacle } from './obstacle.ts';
import { IEvent } from './event.ts';
import { IWaypoint } from './waypoint.ts';
import { ICustomDataDifficulty } from './custom/difficulty.ts';
import { ISpecialEventsKeywordFilters } from './specialEventsKeywordFilters.ts';

/** Difficulty interface for difficulty file. */
export interface IDifficulty {
   _version: `2.${0 | 2 | 4 | 5 | 6}.0`;
   _notes: INote[];
   _sliders: IArc[];
   _obstacles: IObstacle[];
   _events: IEvent[];
   _waypoints: IWaypoint[];
   _specialEventsKeywordFilters?: ISpecialEventsKeywordFilters;
   _customData?: ICustomDataDifficulty;
}
