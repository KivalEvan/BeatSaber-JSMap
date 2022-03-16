import { ColorArray } from '../shared/colors.ts';

/** Bookmark custom data for difficulty. */
export interface IBookmark {
    b: number;
    n: string;
    c?: ColorArray;
}
