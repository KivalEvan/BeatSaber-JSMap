import { v } from '../../../../../deps.ts';
import type { ICustomDataDifficulty } from '../../types/custom/difficulty.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import { CustomBookmarkSchema } from './bookmark.ts';
import { CustomBPMChangeOldSchema, CustomBPMChangeSchema } from './bpmChange.ts';

/** Schema declaration for v2 `Difficulty` custom data. */
export const CustomDataDifficultySchema: v.LooseObjectSchema<
   InferObjectEntries<ICustomDataDifficulty>,
   undefined
> = v.looseObject<InferObjectEntries<ICustomDataDifficulty>>({
   _time: v.optional(v.number()),
   _bookmarks: v.optional(v.array(CustomBookmarkSchema)),
   _bpmChanges: v.optional(v.array(CustomBPMChangeOldSchema)),
   _BPMChanges: v.optional(v.array(CustomBPMChangeSchema)),
});
