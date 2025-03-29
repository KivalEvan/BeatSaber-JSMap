import type { IWrapArc } from '../../../types/beatmap/wrapper/arc.ts';
import { nearEqual } from '../../../utils/math/helpers.ts';
import { shortRotDistance } from '../../../utils/math/trigonometry.ts';
import { cycle } from '../../../utils/misc/iterator.ts';
import { NoteDirection, SliderMidAnchorMode } from '../../shared/constants.ts';
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
         shortRotDistance(
            resolveNoteAngle(arc.direction),
            resolveNoteAngle(arc.tailDirection),
            360,
         ),
         180,
      )
   );
}
