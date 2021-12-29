import { CustomDataDifficulty } from './customData.ts';
import { Note } from './note.ts';
import { Obstacle, isInteractive } from './obstacle.ts';
import { Event } from './event.ts';
import { Waypoint } from './waypoint.ts';

export type DifficultyName = 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';

/**
 * Difficulty rename to human readable.
 */
export enum DifficultyRename {
    'Easy' = 'Easy',
    'Normal' = 'Normal',
    'Hard' = 'Hard',
    'Expert' = 'Expert',
    'ExpertPlus' = 'Expert+',
}

/**
 * Difficulty ordering enum.
 */
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

/**
 * Difficulty interface for difficulty file.
 *
 *     _version: string,
 *     _notes: Note[],
 *     _obstacles: Obstacle[],
 *     _events: Event[],
 *     _waypoints: Waypoint[],
 *     _specialEventsKeywordFilters?: SpecialEventsKeywordFilters,
 *     _customData?: CustomDataDifficulty
 */
export interface DifficultyData {
    _version: string;
    _notes: Note[];
    _obstacles: Obstacle[];
    _events: Event[];
    _waypoints: Waypoint[];
    _specialEventsKeywordFilters?: SpecialEventsKeywordFilters;
    _customData?: CustomDataDifficulty;
}

export const getFirstInteractiveTime = (mapData: DifficultyData): number => {
    const { _notes: notes, _obstacles: obstacles } = mapData;
    let firstNoteTime = Number.MAX_VALUE;
    if (notes.length > 0) {
        firstNoteTime = notes[0]._time;
    }
    const firstInteractiveObstacleTime = findFirstInteractiveObstacleTime(obstacles);
    return Math.min(firstNoteTime, firstInteractiveObstacleTime);
};

export const getLastInteractiveTime = (mapData: DifficultyData): number => {
    const { _notes: notes, _obstacles: obstacles } = mapData;
    let lastNoteTime = 0;
    if (notes.length > 0) {
        lastNoteTime = notes[notes.length - 1]._time;
    }
    const lastInteractiveObstacleTime = findLastInteractiveObstacleTime(obstacles);
    return Math.max(lastNoteTime, lastInteractiveObstacleTime);
};

export const findFirstInteractiveObstacleTime = (obstacles: Obstacle[]): number => {
    for (let i = 0, len = obstacles.length; i < len; i++) {
        if (isInteractive(obstacles[i])) {
            return obstacles[i]._time;
        }
    }
    return Number.MAX_VALUE;
};

export const findLastInteractiveObstacleTime = (obstacles: Obstacle[]): number => {
    let obstacleEnd = 0;
    for (let i = obstacles.length - 1; i >= 0; i--) {
        if (isInteractive(obstacles[i])) {
            obstacleEnd = Math.max(
                obstacleEnd,
                obstacles[i]._time + obstacles[i]._duration
            );
        }
    }
    return obstacleEnd;
};
