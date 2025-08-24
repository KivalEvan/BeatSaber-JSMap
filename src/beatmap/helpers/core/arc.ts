import type { IWrapArc } from '../../core/types/arc.ts';
import { lowestDifferenceMod, nearEqual } from '../../../utils/math/helpers.ts';
import { cycle } from '../../../utils/misc/iterator.ts';
import { NoteDirection, SliderMidAnchorMode } from '../../schema/shared/types/constants.ts';
import { resolveNoteAngle } from './baseNote.ts';

/** Mirror note color. */
export function mirrorArcMidAnchor(
   midAnchor: SliderMidAnchorMode,
): SliderMidAnchorMode {
   return cycle(
      [SliderMidAnchorMode.CLOCKWISE, SliderMidAnchorMode.COUNTER_CLOCKWISE],
      midAnchor,
   );
}

export function midAnchorCondition(
   arc: Pick<IWrapArc, 'midAnchor' | 'posX' | 'direction' | 'tailDirection'>,
): boolean {
   return (
      arc.midAnchor !== SliderMidAnchorMode.STRAIGHT &&
      arc.direction !== NoteDirection.ANY &&
      arc.posX === arc.posX &&
      nearEqual(
         lowestDifferenceMod(
            resolveNoteAngle(arc.direction),
            resolveNoteAngle(arc.tailDirection),
            360,
         ),
         180,
      )
   );
}
