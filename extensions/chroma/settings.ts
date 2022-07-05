import { BeatPerMinute } from '../../beatmap/shared/bpm.ts';
import { ColorType } from '../../types/colors.ts';

export const settings: {
    BPM: BeatPerMinute | null;
    colorType: ColorType | null;
} = {
    BPM: null,
    colorType: null,
};
