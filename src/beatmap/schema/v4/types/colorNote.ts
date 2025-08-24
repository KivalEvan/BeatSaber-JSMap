import type { NoteColor } from '../../shared/types/constants.ts';
import type { ICustomDataNote } from '../../v3/types/custom/note.ts';
import type { IGrid } from './grid.ts';

/**
 * Schema for v4 `Color Note`.
 */
export interface IColorNote extends IGrid {
   /**
    * Color type of note.
    * ```ts
    * 0 -> Red
    * 1 -> Blue
    * ```
    *
    * **Type:** {@linkcode NoteColor}
    */
   c?: NoteColor;
   /**
    * Cut direction of note.
    * ```ts
    * 4 | 0 | 5
    * 2 | 8 | 3
    * 6 | 1 | 7
    * ```
    *
    * Grid represents cut direction from center.
    *
    * **WARNING:** Dot-directional is not recommended with arcs, assumes down-directional.
    *
    * **Type:** `i32`
    */
   d?: number;
   /**
    * Angle offset in degree counter-clockwise of note.
    *
    * **Type:** `i32`
    */
   a?: number;
   customData?: ICustomDataNote;
}
