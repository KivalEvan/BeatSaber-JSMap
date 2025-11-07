import * as v from 'valibot';
import type { IBPMChange, IBPMChangeOld } from '../../types/custom/bpmChange.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v2 custom `BPM Change (Old)`. */
export function CustomBPMChangeOldSchema(): v.ObjectSchema<
   InferObjectEntries<IBPMChangeOld>,
   undefined
> {
   return v.object<InferObjectEntries<IBPMChangeOld>>({
      _time: v.number(),
      _bpm: v.number(),
      _BPM: v.never(),
      _beatsPerBar: v.number(),
      _metronomeOffset: v.number(),
   });
}

/** Schema declaration for v2 custom `BPM Change`. */
export function CustomBPMChangeSchema(): v.ObjectSchema<
   InferObjectEntries<IBPMChange>,
   undefined
> {
   return v.object<InferObjectEntries<IBPMChange>>({
      _time: v.number(),
      _bpm: v.never(),
      _BPM: v.number(),
      _beatsPerBar: v.number(),
      _metronomeOffset: v.number(),
   });
}
