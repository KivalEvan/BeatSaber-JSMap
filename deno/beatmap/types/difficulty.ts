import { Note } from './note.ts';
import { Obstacle } from './obstacle.ts';
import { Event } from './event.ts';
import { Waypoint } from './waypoint.ts';
import { CustomDataDifficulty } from './customData.ts';

export type DifficultyName = 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';

/** Difficulty rename to human readable. */
export enum DifficultyRename {
    'Easy' = 'Easy',
    'Normal' = 'Normal',
    'Hard' = 'Hard',
    'Expert' = 'Expert',
    'ExpertPlus' = 'Expert+',
}

/** Difficulty ordering enum. */
export enum DifficultyRank {
    'Easy' = 1,
    'Normal' = 3,
    'Hard' = 5,
    'Expert' = 7,
    'ExpertPlus' = 9,
}

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
    _version: `2.${0 | 2 | 5}.0`;
    _notes: Note[];
    _obstacles: Obstacle[];
    _events: Event[];
    _waypoints: Waypoint[];
    _specialEventsKeywordFilters?: SpecialEventsKeywordFilters;
    _customData?: CustomDataDifficulty;
}
