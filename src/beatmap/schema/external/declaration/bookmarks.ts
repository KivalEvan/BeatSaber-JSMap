import * as v from 'valibot';
import type { IBookmarkElement, IBookmarkSet } from '../types/bookmarks.ts';
import { entity, field, type InferObjectEntries } from '../../helpers.ts';
import { CharacteristicNameSchema, DifficultyNameSchema } from '../../shared/declaration/common.ts';

/** Schema declaration for official editor `Bookmark Element`  */
export function BookmarkElementSchema(): v.ObjectSchema<
   InferObjectEntries<IBookmarkElement>,
   undefined
> {
   return v.object<InferObjectEntries<IBookmarkElement>>({
      beat: field(v.number(), {
         version: '1.0.0',
      }),
      label: field(v.string(), {
         version: '1.0.0',
      }),
      text: field(v.string(), {
         version: '1.0.0',
      }),
   });
}

/** Schema declaration for official editor `Bookmark Set`  */
export function BookmarkSetSchema(): v.ObjectSchema<
   InferObjectEntries<IBookmarkSet>,
   undefined
> {
   return entity<InferObjectEntries<IBookmarkSet>>(() => '1.0.0', {
      name: field(v.string(), {
         version: '1.0.0',
      }),
      characteristic: field(v.union([CharacteristicNameSchema(), v.literal('')]), {
         version: '1.0.0',
      }),
      difficulty: field(v.union([DifficultyNameSchema(), v.literal('')]), {
         version: '1.0.0',
      }),
      color: field(v.string(), {
         version: '1.0.0',
      }),
      bookmarks: field(v.array(BookmarkElementSchema()), {
         version: '1.0.0',
      }),
   });
}
