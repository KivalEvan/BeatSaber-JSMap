import { v } from '../../../../../deps.ts';
import type { IBPMChange } from '../../../../../types/beatmap/v3/custom/bpmChange.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v3 custom `BPM Change`. */
export const CustomBPMChangeSchema: v.ObjectSchema<
   InferObjectEntries<IBPMChange>,
   undefined
> = v.object<InferObjectEntries<IBPMChange>>({
   b: v.number(),
   m: v.number(),
   p: v.number(),
   o: v.number(),
});
