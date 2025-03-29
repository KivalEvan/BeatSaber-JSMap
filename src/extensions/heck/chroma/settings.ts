import type { TimeProcessor } from '../../../beatmap/helpers/timeProcessor.ts';
import type { ColorType } from '../../../types/colors.ts';

export const settings: {
   timeProc: TimeProcessor | null;
   colorType: ColorType | null;
} = {
   timeProc: null,
   colorType: null,
};
