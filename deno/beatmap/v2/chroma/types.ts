import { Note } from '../../../types/beatmap/v2/note.ts';
import { EventLight } from '../../../types/beatmap/v2//event.ts';
import { Obstacle } from '../../../types/beatmap/v2/obstacle.ts';
import { Easings } from '../../../types/beatmap/shared/easings.ts';
import { ColorArray } from '../../../types/beatmap/shared/colors.ts';

export type ChromaObject = Note | EventLight | Obstacle;

export interface SetOptions {
    startTime: number;
    endTime: number;
    type?: number;
}

export interface ApplyEasingsOptions extends SetOptions {
    easing: Easings;
    type?: EventLight['_type'];
}

export interface pRandomLightIDOptions extends SetOptions {
    startColor: ColorArray;
    endColor: ColorArray;
    colorType?: 'rgba' | 'long hsva' | 'short hsva';
    type: EventLight['_type'];
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
    lightID: [EventLight['_type'], number][];
    lightIDMulti?: number;
    offsetEnd?: boolean;
    easingColor?: (x: number) => number;
}
