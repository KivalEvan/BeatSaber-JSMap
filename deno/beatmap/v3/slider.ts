import { BurstSlider } from './types/burstSlider.ts';
import { LINE_COUNT } from './types/constants.ts';
import { Slider } from './types/slider.ts';

export const mirror = (slider: Slider | BurstSlider, flipColor = true) => {
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
    if (typeof (slider as Slider).tc === 'number') {
        slider = slider as Slider;
        switch (slider.tc) {
            case 2:
                slider.tc = 3;
                break;
            case 3:
                slider.tc = 2;
                break;
            case 6:
                slider.tc = 7;
                break;
            case 7:
                slider.tc = 6;
                break;
            case 4:
                slider.tc = 5;
                break;
            case 5:
                slider.tc = 4;
                break;
        }
    }
};
