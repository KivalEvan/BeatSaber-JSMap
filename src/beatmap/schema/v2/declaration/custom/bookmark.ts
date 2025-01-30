import { number, object, optional, string, tuple, union } from '@valibot/valibot';
import type { IBookmark } from '../../../../../types/beatmap/v2/custom/bookmark.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v2 custom `Bookmark` */
export const CustomBookmarkSchema = object<InferObjectEntries<IBookmark>>({
   _time: number(),
   _name: string(),
   _color: optional(union([
      tuple([number(), number(), number()]),
      tuple([number(), number(), number(), number()]),
   ])),
});
