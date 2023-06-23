import { BeatPerMinute } from '../../beatmap/shared/bpm.ts';
import { NoteJumpSpeed } from '../../beatmap/shared/njs.ts';

export const settings: {
   BPM: BeatPerMinute | null;
   NJS: NoteJumpSpeed | null;
} = {
   BPM: null,
   NJS: null,
};
