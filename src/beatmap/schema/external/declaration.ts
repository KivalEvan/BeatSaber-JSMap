import { array, literal, number, object, string, union } from '@valibot/valibot';
import type { IBookmarkElement } from '../../../types/beatmap/external/bookmarks.ts';
import type { IBookmarks } from '../../../types/beatmap/external/mod.ts';
import { CharacteristicNameSchema, DifficultyNameSchema } from '../common/declaration.ts';
import { entity, field, type InferObjectEntries } from '../helpers.ts';

/** Schema declaration for official editor `BookmarkElement`  */
export const BookmarkElementSchema = object<InferObjectEntries<IBookmarkElement>>({
   beat: field(number(), {
      version: '1.0.0',
   }),
   label: field(string(), {
      version: '1.0.0',
   }),
   text: field(string(), {
      version: '1.0.0',
   }),
});

/** Schema declaration for official editor `BookmarkSet`  */
export const BookmarkSetSchema = entity<InferObjectEntries<IBookmarks>>(() => '1.0.0', {
   name: field(string(), {
      version: '1.0.0',
   }),
   characteristic: field(union([CharacteristicNameSchema, literal('')]), {
      version: '1.0.0',
   }),
   difficulty: field(union([DifficultyNameSchema, literal('')]), {
      version: '1.0.0',
   }),
   color: field(string(), {
      version: '1.0.0',
   }),
   bookmarks: field(array(BookmarkElementSchema), {
      version: '1.0.0',
   }),
});
