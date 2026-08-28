import { isOnEventValue } from '../../../beatmap/helpers/core/basicEvent.ts';
import type { IWrapBasicEvent } from '../../../beatmap/schema/wrapper/types/basicEvent.ts';
import type { IApplyEasingsOptions } from './types/colors.ts';

export function applyEasingsTransition<
   T extends Pick<IWrapBasicEvent, 'type' | 'value' | 'customData'>,
>(events: T[], options: IApplyEasingsOptions): void {
   const length = events.length;
   const hasTypeFilter = typeof options.type === 'number';
   for (let i = 0; i < length; i++) {
      if (!(i in events)) continue;
      const event = events[i];
      if (!isOnEventValue(event.value)) continue;
      if (hasTypeFilter && event.type !== options.type) continue;
      event.customData.easing = options.easing;
   }
}
