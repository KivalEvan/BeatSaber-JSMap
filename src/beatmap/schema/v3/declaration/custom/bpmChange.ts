import { number, object, type ObjectSchema as VObjectSchema } from '@valibot/valibot';
import type { IBPMChange } from '../../../../../types/beatmap/v3/custom/bpmChange.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v3 custom `BPM Change`. */
export const CustomBPMChangeSchema: VObjectSchema<
   InferObjectEntries<IBPMChange>,
   undefined
> = object<InferObjectEntries<IBPMChange>>({
   b: number(),
   m: number(),
   p: number(),
   o: number(),
});
