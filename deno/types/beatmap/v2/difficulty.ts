import { INote } from './note.ts';
import { ISlider } from './slider.ts';
import { IObstacle } from './obstacle.ts';
import { IEvent } from './event.ts';
import { IWaypoint } from './waypoint.ts';
import { ICustomDataDifficulty } from './customData.ts';
import { ISpecialEventsKeywordFilters } from './specialEventsKeywordFilters.ts';

/** Difficulty interface for difficulty file. */
export interface IDifficultyData {
    _version: `2.${0 | 2 | 4 | 5 | 6}.0`;
    _notes: INote[];
    _sliders: ISlider[];
    _obstacles: IObstacle[];
    _events: IEvent[];
    _waypoints: IWaypoint[];
    _specialEventsKeywordFilters?: ISpecialEventsKeywordFilters;
    _customData?: ICustomDataDifficulty;
}
