import * as v from 'valibot';
import type { ICustomDataDifficulty } from '../../types/custom/difficulty.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import { CustomBookmarkSchema } from './bookmark.ts';
import { CustomBPMChangeSchema } from './bpmChange.ts';

/** Schema declaration for v3 `Difficulty` custom data. */
export const CustomDataDifficultySchema: v.LooseObjectSchema<
   InferObjectEntries<ICustomDataDifficulty>,
   undefined
> = v.looseObject<InferObjectEntries<ICustomDataDifficulty>>({
   time: v.optional(v.number()),
   bookmarks: v.optional(v.array(CustomBookmarkSchema)),
   BPMChanges: v.optional(v.array(CustomBPMChangeSchema)),
});
