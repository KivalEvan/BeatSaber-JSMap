import { Note } from '../types/note.ts';
import { EventLight } from '../types/event.ts';
import { Obstacle } from '../types/obstacle.ts';
import { Easings } from '../types/easings.ts';
import { ColorArray } from '../types/colors.ts';

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
