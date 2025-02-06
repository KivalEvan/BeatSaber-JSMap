import type { NoteColor } from '../shared/constants.ts';
import type { IWrapGridObject } from './gridObject.ts';

/**
 * Wrapper attribute for beatmap base note.
 */
export interface IWrapBaseNote extends IWrapGridObject {
   /**
    * Color of note.
    * ```ts
    * -1 -> None
    * 0 -> Red
    * 1 -> Blue
    * ```
    *
    * **Type:** {@linkcode NoteColor}
    */
   color: NoteColor;
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
   direction: number;
}
