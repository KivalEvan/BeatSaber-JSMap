import { ColorArray } from '../../types/beatmap/shared/colors.ts';

/** Bookmark custom data for difficulty. */
export interface Bookmark {
    b: number;
    n: string;
    c?: ColorArray;
}
