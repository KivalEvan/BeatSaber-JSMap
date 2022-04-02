import { IBookmark } from './bookmark.ts';

export interface CustomDataBase {
    // deno-lint-ignore no-explicit-any
    [key: string]: any;
}

/** Currently unused and not certain. */
export interface CustomDataDifficulty extends CustomDataBase {
    /** Time spent in editor. */
    time?: number;
    /** Bookmark. */
    bookmarks?: IBookmark[];
}
