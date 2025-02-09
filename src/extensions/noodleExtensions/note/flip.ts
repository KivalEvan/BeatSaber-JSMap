import type { Vector2 } from '../../../types/vector.ts';
import { random } from '../../../utils/math/random.ts';
import type { INENote } from '../types/object.ts';

/**
 * Apply random flip to notes.
 * ```ts
 * ne.randomFlip(notes, [[-4, 4], [0, 2]]);
 * ```
 */
export function randomFlip<
   T extends Pick<INENote, 'customData'>,
>(notes: T[], range: [Vector2, Vector2]): void {
   const [xVec, yVec] = range.map((r) => r.sort((a, b) => a - b));
   notes.forEach((n) => {
      n.customData.flip = [random(xVec[0], xVec[1]), random(yVec[0], yVec[1])];
   });
}
