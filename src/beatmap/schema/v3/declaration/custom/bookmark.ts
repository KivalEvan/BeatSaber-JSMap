import * as v from 'valibot';
import type { IBookmark } from '../../types/custom/bookmark.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import { Vector3ColorSchema, Vector4ColorSchema } from '../../../shared/declaration/vector.ts';

/** Schema declaration for v3 custom `Bookmark`. */
export function CustomBookmarkSchema(): v.ObjectSchema<
   InferObjectEntries<IBookmark>,
   undefined
> {
   return v.object<InferObjectEntries<IBookmark>>({
      b: v.number(),
      n: v.string(),
      c: v.optional(v.union([Vector3ColorSchema(), Vector4ColorSchema()])),
   });
}
