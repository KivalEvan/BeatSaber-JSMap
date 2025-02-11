import { number, object } from '@valibot/valibot';
import type { IBPMChange } from '../../../../../types/beatmap/v3/custom/bpmChange.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v3 custom `BPM Change`. */
export const CustomBPMChangeSchema = object<InferObjectEntries<IBPMChange>>({
   b: number(),
   m: number(),
   p: number(),
   o: number(),
});
