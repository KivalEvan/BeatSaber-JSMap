import { LINE_COUNT } from './types/constants.ts';
import { Waypoint } from './types/waypoint.ts';

export const mirror = (waypoint: Waypoint) => {
    waypoint.x = LINE_COUNT - 1 - waypoint.x;
    switch (waypoint.d) {
        case 2:
            waypoint.d = 3;
            break;
        case 3:
            waypoint.d = 2;
            break;
        case 6:
            waypoint.d = 7;
            break;
        case 7:
            waypoint.d = 6;
            break;
        case 4:
            waypoint.d = 5;
            break;
        case 5:
            waypoint.d = 4;
            break;
    }
};
