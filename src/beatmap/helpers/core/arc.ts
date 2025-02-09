import { cycle } from '../../../utils/misc/iterator.ts';
import { SliderMidAnchorMode } from '../../shared/constants.ts';

/** Mirror note color. */
export function mirrorArcMidAnchor(
   midAnchor: SliderMidAnchorMode,
): SliderMidAnchorMode {
   return cycle(
      [SliderMidAnchorMode.CLOCKWISE, SliderMidAnchorMode.COUNTER_CLOCKWISE],
      midAnchor,
   );
}
