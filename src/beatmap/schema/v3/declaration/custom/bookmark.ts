import { number, object, optional, string, union } from '@valibot/valibot';
import type { IBookmark } from '../../../../../types/beatmap/v3/custom/bookmark.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import { Vector3ColorSchema, Vector4ColorSchema } from '../../../shared/declaration/vector.ts';

/** Schema declaration for v3 custom `Bookmark`. */
export const CustomBookmarkSchema = object<InferObjectEntries<IBookmark>>({
   b: number(),
   n: string(),
   c: optional(union([Vector3ColorSchema, Vector4ColorSchema])),
});
