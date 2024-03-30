import type { BeatPerMinute } from '../../beatmap/shared/bpm.ts';
import type { ColorType } from '../../types/colors.ts';

export const settings: {
   BPM: BeatPerMinute | null;
   colorType: ColorType | null;
} = {
   BPM: null,
   colorType: null,
};
