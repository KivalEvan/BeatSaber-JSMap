import { DifficultyData } from './types/difficulty.ts';

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
