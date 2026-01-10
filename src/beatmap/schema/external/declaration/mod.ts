import * as bookmarks from './bookmarks.ts';

/** Schema for official editor `Bookmark Element`  */
export const BookmarkElementSchema: ReturnType<typeof bookmarks.BookmarkElementSchema> =
   /* @__PURE__ */ bookmarks.BookmarkElementSchema();
/** Schema for official editor `Bookmark Set`  */
export const BookmarkSetSchema: ReturnType<typeof bookmarks.BookmarkSetSchema> =
   /* @__PURE__ */ bookmarks.BookmarkSetSchema();
