import { isLightEventType, isOnEventValue } from '../../beatmap/helpers/core/basicEvent.ts';
import type { IWrapBasicEventAttribute } from '../../types/beatmap/wrapper/basicEvent.ts';
import type { IApplyEasingsOptions } from './types/colors.ts';

export function applyEasingsTransition<
   T extends Pick<IWrapBasicEventAttribute, 'type' | 'value' | 'customData'>,
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
