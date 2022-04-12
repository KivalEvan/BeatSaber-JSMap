import { ApplyEasingsOptions } from '../../../types/beatmap/modded/chroma/color.ts';
import { Event } from '../../v2/event.ts';
import { BasicEvent } from '../../v3/basicEvent.ts';

export const applyEasingsTransition = (
    events: (Event | BasicEvent)[],
    options: ApplyEasingsOptions
) => {
    let filteredEvents = events.filter(
        (ev) =>
            ev.time >= options.startTime &&
            ev.time <= options.endTime &&
            ev.isTransition() &&
            ev.isLightEvent()
    );
    if (options.type != null) {
        filteredEvents = filteredEvents.filter((ev) => ev.type === options.type);
    }
    filteredEvents.forEach((ev) => {
        if (!ev.customData) {
            ev.customData = { _easing: options.easing };
        } else {
            ev.customData._easing = options.easing;
        }
    });
};
