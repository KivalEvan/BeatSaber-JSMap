import { array, looseObject, number, optional } from '@valibot/valibot';
import type { ICustomDataDifficulty } from '../../../../../types/beatmap/v3/custom/difficulty.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import { CustomBookmarkSchema } from './bookmark.ts';
import { CustomBPMChangeSchema } from './bpmChange.ts';

/** Schema declaration for v3 `Difficulty` custom data. */
export const CustomDataDifficultySchema = looseObject<
   InferObjectEntries<ICustomDataDifficulty>
>({
   time: optional(number()),
   bookmarks: optional(array(CustomBookmarkSchema)),
   BPMChanges: optional(array(CustomBPMChangeSchema)),
});
