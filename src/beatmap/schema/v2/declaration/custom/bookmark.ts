import * as v from 'valibot';
import type { IBookmark } from '../../types/custom/bookmark.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import { Vector3ColorSchema, Vector4ColorSchema } from '../../../shared/declaration/vector.ts';

/** Schema declaration for v2 custom `Bookmark`. */
export function CustomBookmarkSchema(): v.ObjectSchema<
   InferObjectEntries<IBookmark>,
   undefined
> {
   return v.object<InferObjectEntries<IBookmark>>({
      _time: v.number(),
      _name: v.string(),
      _color: v.optional(v.union([Vector3ColorSchema(), Vector4ColorSchema()])),
   });
}
