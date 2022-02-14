import { SetOptions } from './types.ts';
import { Event, EventLight } from '../types/event.ts';
import { Easings } from '../types/easings.ts';
import { isTransition } from '../event.ts';
import { isLightEvent } from '../event.ts';

export * from './setColor.ts';
export * from './shiftColor.ts';
export * from './removeColor.ts';

export interface ApplyEasingsOptions extends SetOptions {
    easing: Easings;
    type?: EventLight['_type'];
}

export const applyEasingsTransition = (
    events: Event[],
    options: ApplyEasingsOptions
) => {
    let filteredEvents = events.filter(
        (ev) =>
            ev._time >= options.startTime &&
            ev._time <= options.endTime &&
            isTransition(ev) &&
            isLightEvent(ev)
    ) as EventLight[];
    if (options.type != null) {
        filteredEvents = filteredEvents.filter((ev) => ev._type === options.type);
    }
    filteredEvents.forEach((ev) => {
        if (!ev._customData) {
            ev._customData = { _easing: options.easing };
        } else {
            ev._customData._easing = options.easing;
        }
    });
};
