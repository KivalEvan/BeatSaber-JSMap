import { v } from '../../../../../deps.ts';
import type { IBPMChange, IBPMChangeOld } from '../../types/custom/bpmChange.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v2 custom `BPM Change (Old)`. */
export const CustomBPMChangeOldSchema: v.ObjectSchema<
   InferObjectEntries<IBPMChangeOld>,
   undefined
> = v.object<InferObjectEntries<IBPMChangeOld>>({
   _time: v.number(),
   _bpm: v.number(),
   _BPM: v.never(),
   _beatsPerBar: v.number(),
   _metronomeOffset: v.number(),
});

/** Schema declaration for v2 custom `BPM Change`. */
export const CustomBPMChangeSchema: v.ObjectSchema<
   InferObjectEntries<IBPMChange>,
   undefined
> = v.object<InferObjectEntries<IBPMChange>>({
   _time: v.number(),
   _bpm: v.never(),
   _BPM: v.number(),
   _beatsPerBar: v.number(),
   _metronomeOffset: v.number(),
});
