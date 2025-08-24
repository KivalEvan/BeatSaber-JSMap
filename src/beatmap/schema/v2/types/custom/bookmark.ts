import type { ColorArray } from '../../../../../types/colors.ts';

/** Bookmark custom data for v2 difficulty custom data. */
export interface IBookmark {
   /**
    * **Type:** `f32`
    */
   _time: number;
   _name: string;
   _color?: ColorArray;
}
