import { v } from '../../../../../deps.ts';
import type { IBookmark } from '../../../../../types/beatmap/v3/custom/bookmark.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import { Vector3ColorSchema, Vector4ColorSchema } from '../../../shared/declaration/vector.ts';

/** Schema declaration for v3 custom `Bookmark`. */
export const CustomBookmarkSchema: v.ObjectSchema<
   InferObjectEntries<IBookmark>,
   undefined
> = v.object<InferObjectEntries<IBookmark>>({
   b: v.number(),
   n: v.string(),
   c: v.optional(v.union([Vector3ColorSchema, Vector4ColorSchema])),
});
