import { Bookmark } from './bookmark.ts';

export interface CustomData {
    // deno-lint-ignore no-explicit-any
    [key: string]: any;
}

/** Currently unused and not certain. */
export interface CustomDataDifficulty {
    /** Time spent in editor. */
    t?: number;
    /** Bookmark. */
    bm?: Bookmark[];
}
