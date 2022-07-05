import { ApplyEasingsOptions } from './types/colors.ts';
import { BasicEvent } from '../../beatmap/v3/basicEvent.ts';
import { IChromaEventLight } from '../../types/beatmap/v3/chroma.ts';

export function applyEasingsTransition(events: BasicEvent[], options: ApplyEasingsOptions) {
    let filteredEvents = events.filter((ev) => ev.isLightEvent() && ev.isTransition());
    if (typeof options.type === 'number') {
        filteredEvents = filteredEvents.filter((ev) => ev.type === options.type);
    }
    filteredEvents.forEach((ev) => {
        (ev.customData as IChromaEventLight).easing = options.easing;
    });
}
