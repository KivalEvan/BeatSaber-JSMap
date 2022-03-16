import { DifficultyData } from '../../types/beatmap/v2/difficulty.ts';

export const difficulty = (): DifficultyData => {
    return {
        _version: '2.6.0',
        _notes: [],
        _sliders: [],
        _obstacles: [],
        _events: [],
        _waypoints: [],
    };
};
