import { never, number, object, type ObjectSchema as VObjectSchema } from '@valibot/valibot';
import type {
   IBPMChange,
   IBPMChangeOld,
} from '../../../../../types/beatmap/v2/custom/bpmChange.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v2 custom `BPM Change (Old)`. */
export const CustomBPMChangeOldSchema: VObjectSchema<
   InferObjectEntries<IBPMChangeOld>,
   undefined
> = object<InferObjectEntries<IBPMChangeOld>>({
   _time: number(),
   _bpm: number(),
   _BPM: never(),
   _beatsPerBar: number(),
   _metronomeOffset: number(),
});

/** Schema declaration for v2 custom `BPM Change`. */
export const CustomBPMChangeSchema: VObjectSchema<
   InferObjectEntries<IBPMChange>,
   undefined
> = object<InferObjectEntries<IBPMChange>>({
   _time: number(),
   _bpm: never(),
   _BPM: number(),
   _beatsPerBar: number(),
   _metronomeOffset: number(),
});
