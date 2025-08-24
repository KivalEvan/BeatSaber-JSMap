import { isLightEventType, isOnEventValue } from '../../../beatmap/helpers/core/basicEvent.ts';
import type { IWrapBasicEvent } from '../../../beatmap/schema/wrapper/types/basicEvent.ts';
import type { IApplyEasingsOptions } from './types/colors.ts';

export function applyEasingsTransition<
   T extends Pick<IWrapBasicEvent, 'type' | 'value' | 'customData'>,
>(events: T[], options: IApplyEasingsOptions): void {
   let filteredEvents = events.filter((ev) =>
      isLightEventType(ev.type) && isOnEventValue(ev.value)
   );
   if (typeof options.type === 'number') {
      filteredEvents = filteredEvents.filter((ev) => ev.type === options.type);
   }
   filteredEvents.forEach((ev) => {
      ev.customData.easing = options.easing;
   });
}
