import * as v from 'valibot';
import type { IBPMChange } from '../../types/custom/bpmChange.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v3 custom `BPM Change`. */
export function CustomBPMChangeSchema(): v.ObjectSchema<
   InferObjectEntries<IBPMChange>,
   undefined
> {
   return v.object<InferObjectEntries<IBPMChange>>({
      b: v.number(),
      m: v.number(),
      p: v.number(),
      o: v.number(),
   });
}
