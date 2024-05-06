import type { TimeProcessor } from '../../beatmap/shared/timeProcessor.ts';
import type { NoteJumpSpeed } from '../../beatmap/shared/njs.ts';

export const settings: {
   BPM: TimeProcessor | null;
   NJS: NoteJumpSpeed | null;
} = {
   BPM: null,
   NJS: null,
};
