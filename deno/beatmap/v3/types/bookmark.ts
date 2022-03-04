import { ColorArray } from '../../shared/types/colors.ts';

/** Bookmark custom data for difficulty. */
export interface Bookmark {
    b: number;
    n: string;
    c?: ColorArray;
}
