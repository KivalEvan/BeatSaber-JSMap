import { ColorArray } from '../shared/colors.ts';

/** Bookmark custom data for difficulty. */
export interface Bookmark {
    b: number;
    n: string;
    c?: ColorArray;
}
