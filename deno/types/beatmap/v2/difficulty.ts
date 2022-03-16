import { Note } from './note.ts';
import { Slider } from './slider.ts';
import { Obstacle } from './obstacle.ts';
import { Event } from './event.ts';
import { Waypoint } from './waypoint.ts';
import { CustomDataDifficulty } from './customData.ts';

// yea i dont even know but it exist
export interface SpecialEventsKeywordFilters {
    _keywords: SpecialEventsKeywordFiltersKeywords[];
}

export interface SpecialEventsKeywordFiltersKeywords {
    _keyword: string;
    _specialEvents: number[];
}

/** Difficulty interface for difficulty file.
 * ```ts
 * _version: string,
 * _notes: Note[],
 * _obstacles: Obstacle[],
 * _events: Event[],
 * _waypoints: Waypoint[],
 * _specialEventsKeywordFilters?: SpecialEventsKeywordFilters,
 * _customData?: CustomDataDifficulty
 * ```
 */
export interface DifficultyData {
    _version: `2.${0 | 2 | 4 | 5 | 6}.0`;
    _notes: Note[];
    _sliders: Slider[];
    _obstacles: Obstacle[];
    _events: Event[];
    _waypoints: Waypoint[];
    _specialEventsKeywordFilters?: SpecialEventsKeywordFilters;
    _customData?: CustomDataDifficulty;
}
