import { number, object, optional, string, tuple, union } from '@valibot/valibot';
import type { IBookmark, IBPMChange } from '../../../types/beatmap/v3/mod.ts';
import type { InferObjectEntries } from '../helpers.ts';

/** Schema declaration for v3 custom `Bookmark` */
export const BookmarkSchema = object<InferObjectEntries<IBookmark>>({
   b: number(),
   n: string(),
   c: optional(union([
      tuple([number(), number(), number()]),
      tuple([number(), number(), number(), number()]),
   ])),
});

/** Schema declaration for v3 custom `BPMChange` */
export const BpmChangeSchema = object<InferObjectEntries<IBPMChange>>({
   b: number(),
   m: number(),
   p: number(),
   o: number(),
});
