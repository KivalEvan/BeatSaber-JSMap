import type { TimeProcessor } from '../../../beatmap/helpers/timeProcessor.ts';
import type { NoteJumpSpeed } from '../../../beatmap/helpers/njs.ts';

export const settings: {
   timeProc: TimeProcessor | null;
   NJS: NoteJumpSpeed | null;
} = {
   timeProc: null,
   NJS: null,
};
