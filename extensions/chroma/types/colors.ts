import { ColorNote } from '../../../beatmap/v3/colorNote.ts';
import { Obstacle } from '../../../beatmap/v3/obstacle.ts';
import { BasicEvent } from '../../../beatmap/v3/basicEvent.ts';
import { Easings } from '../../../types/easings.ts';
import { ColorArray, ColorInput, ColorType } from '../../../types/colors.ts';
import { SetOptions } from './options.ts';

export type IChromaObject = ColorNote | Obstacle | BasicEvent;

export interface SetColorOptions {
    color: ColorInput;
    colorType?: ColorType;
}

export interface SetColorRangeOptions extends SetOptions {
    color1: ColorInput;
    color2: ColorInput;
    colorType?: ColorType;
}

export interface SetColorGradientOptions extends SetOptions {
    colorStart: ColorInput;
    colorEnd: ColorInput;
    colorType?: ColorType;
    easingColor?: (x: number) => number;
}

export interface ShiftColorBaseOptions extends SetOptions {
    hue?: number;
    saturation?: number;
    value?: number;
    alpha?: number;
}

export interface ShiftColorOptions extends ShiftColorBaseOptions {
    fixedHue?: boolean;
    fixedSaturation?: boolean;
    fixedValue?: boolean;
    fixedAlpha?: boolean;
}

export interface ShiftColorGradientOptions extends ShiftColorBaseOptions {
    reverse?: boolean;
    easing?: (x: number) => number;
}

export interface ApplyEasingsOptions {
    easing: Easings;
    type?: BasicEvent['type'];
}

export interface pRandomLightIDOptions {
    colorStart: ColorArray;
    colorEnd: ColorArray;
    colorType?: 'rgba' | 'long hsva' | 'short hsva';
    type: BasicEvent['type'];
    duration: number;
    length: number;
    precision: number;
    step: number;
    lightOff: boolean;
    offStrobe: boolean;
    lightID: number[];
    lightIDMulti?: number;
    offsetEnd?: boolean;
    easingColor?: (x: number) => number;
}

export interface pRandomLightI2DOptions {
    startColor: ColorArray;
    endColor: ColorArray;
    colorType?: 'rgba' | 'long hsva' | 'short hsva';
    type: never;
    duration: number;
    length: number;
    precision: number;
    step: number;
    lightOff: boolean;
    offStrobe: boolean;
    lightID: [BasicEvent['type'], number][];
    lightIDMulti?: number;
    offsetEnd?: boolean;
    easingColor?: (x: number) => number;
}
