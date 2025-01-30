import { never, number, object } from '@valibot/valibot';
import type {
   IBPMChange,
   IBPMChangeOld,
} from '../../../../../types/beatmap/v2/custom/bpmChange.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v2 custom `BPMChangeOld` */
export const CustomBpmChangeOldSchema = object<InferObjectEntries<IBPMChangeOld>>({
   _time: number(),
   _bpm: number(),
   _BPM: never(),
   _beatsPerBar: number(),
   _metronomeOffset: number(),
});

/** Schema declaration for v2 custom `BPMChange` */
export const CustomBpmChangeSchema = object<InferObjectEntries<IBPMChange>>({
   _time: number(),
   _bpm: never(),
   _BPM: number(),
   _beatsPerBar: number(),
   _metronomeOffset: number(),
});
