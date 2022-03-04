import { BombNote } from './types/bombNote.ts';
import { LINE_COUNT } from './types/constants.ts';

/** Mirror bomb.
 * ```ts
 * bomb.mirror(bomb);
 * bomb.mirror(bombAry);
 * ```
 */
export const mirror = (bomb: BombNote | BombNote[]) => {
    if (Array.isArray(bomb)) {
        bomb.forEach((o) => mirror(o));
        return;
    }
    bomb.x = LINE_COUNT - 1 - bomb.x;
};
