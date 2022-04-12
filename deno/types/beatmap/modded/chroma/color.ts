import { Note } from '../../../../beatmap/v2/note.ts';
import { Obstacle } from '../../../../beatmap/v2/obstacle.ts';
import { Event } from '../../../../beatmap/v2/event.ts';
import { ColorNote } from '../../../../beatmap/v3/colorNote.ts';
import { Obstacle as ObstacleV3 } from '../../../../beatmap/v3/obstacle.ts';
import { BasicEvent } from '../../../../beatmap/v3/basicEvent.ts';
import { Easings } from '../../shared/easings.ts';
import { ColorArray } from '../../shared/colors.ts';
import { SetOptions } from './options.ts';

export type IChromaObject =
    | Note
    | ColorNote
    | Obstacle
    | ObstacleV3
    | Event
    | BasicEvent;

export interface SetColorOptions extends SetOptions {
    color: ColorArray;
    colorType?: 'rgba' | 'hsva';
}

export interface SetColorRangeOptions extends SetOptions {
    color1: ColorArray;
    color2: ColorArray;
    colorType?: 'rgba' | 'hsva';
}

export interface SetColorGradientOptions extends SetOptions {
    startColor: ColorArray;
    endColor: ColorArray;
    colorType?: 'rgba' | 'long hsva' | 'short hsva';
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

export interface ApplyEasingsOptions extends SetOptions {
    easing: Easings;
    type?: Event['type'];
}

export interface pRandomLightIDOptions extends SetOptions {
    startColor: ColorArray;
    endColor: ColorArray;
    colorType?: 'rgba' | 'long hsva' | 'short hsva';
    type: Event['type'];
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

export interface pRandomLightI2DOptions extends SetOptions {
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
    lightID: [Event['type'], number][];
    lightIDMulti?: number;
    offsetEnd?: boolean;
    easingColor?: (x: number) => number;
}
