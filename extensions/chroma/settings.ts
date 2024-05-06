import type { TimeProcessor } from '../../beatmap/shared/timeProcessor.ts';
import type { ColorType } from '../../types/colors.ts';

export const settings: {
   BPM: TimeProcessor | null;
   colorType: ColorType | null;
} = {
   BPM: null,
   colorType: null,
};
