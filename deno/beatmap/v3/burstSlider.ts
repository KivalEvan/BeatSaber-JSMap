import { BurstSlider } from './types/burstSlider.ts';
import { LINE_COUNT } from './types/constants.ts';

/** Mirror burst slider.
 * ```ts
 * burstSlider.mirror(burstSlider);
 * burstSlider.mirror(burstSliderAry);
 * ```
 */
export const mirror = (slider: BurstSlider | BurstSlider[], flipColor = true) => {
    if (Array.isArray(slider)) {
        slider.forEach((s) => mirror(s));
        return;
    }
    slider.x = LINE_COUNT - 1 - slider.x;
    slider.tx = LINE_COUNT - 1 - slider.tx;
    if (flipColor) {
        slider.c = ((1 + slider.c) % 2) as typeof slider.c;
    }
    switch (slider.d) {
        case 2:
            slider.d = 3;
            break;
        case 3:
            slider.d = 2;
            break;
        case 6:
            slider.d = 7;
            break;
        case 7:
            slider.d = 6;
            break;
        case 4:
            slider.d = 5;
            break;
        case 5:
            slider.d = 4;
            break;
    }
};

export const isInverse = (slider: BurstSlider) => {
    return slider.b < slider.tb;
};
