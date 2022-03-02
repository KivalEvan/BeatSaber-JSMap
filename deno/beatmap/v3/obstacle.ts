import { LINE_COUNT } from './types/constants.ts';
import { Obstacle } from './types/obstacle.ts';

export const mirror = (obstacle: Obstacle) => {
    obstacle.x = LINE_COUNT - 1 - obstacle.x;
};
