import type { ColorArray } from '../../../../../types/colors.ts';

/** Bookmark custom data for difficulty. */
export interface IBookmark {
   /**
    * **Type:** `f32`
    */
   b: number;
   n: string;
   c?: ColorArray;
}
