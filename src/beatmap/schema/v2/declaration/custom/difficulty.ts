import { array, looseObject, number, optional } from '@valibot/valibot';
import type { ICustomDataDifficulty } from '../../../../../types/beatmap/v2/custom/difficulty.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import { CustomBookmarkSchema } from './bookmark.ts';
import { CustomBPMChangeOldSchema, CustomBPMChangeSchema } from './bpmChange.ts';

/** Schema declaration for v2 `Difficulty` custom data. */
export const CustomDataDifficultySchema = looseObject<
   InferObjectEntries<ICustomDataDifficulty>
>({
   _time: optional(number()),
   _bookmarks: optional(array(CustomBookmarkSchema)),
   _bpmChanges: optional(array(CustomBPMChangeOldSchema)),
   _BPMChanges: optional(array(CustomBPMChangeSchema)),
});
