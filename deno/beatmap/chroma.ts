import { Note } from './types/note.ts';
import { EventLight } from './types/event.ts';
import { Obstacle } from './types/obstacle.ts';
import { Easings } from './types/easings.ts';
import { ColorArray } from './types/colors.ts';
import { isTransition } from './event.ts';
import { HSVAtoRGBA, interpolateColor } from '../colors.ts';
import { normalize } from '../utils.ts';

type ChromaObject = Note | EventLight | Obstacle;

interface SetOptions {
    startTime: number;
    endTime: number;
    type?: number;
}

interface SetColorOptions extends SetOptions {
    color: ColorArray;
    colorType?: 'rgba' | 'hsva';
}

interface SetGradientColorOptions extends SetOptions {
    startColor: ColorArray;
    endColor: ColorArray;
    colorType?: 'rgba' | 'long hsva' | 'short hsva';
    easingMethod: (x: number) => number;
}

interface ApplyEasingsOptions extends SetOptions {
    easing: Easings;
}

export const setColor = (objects: ChromaObject[], options: SetColorOptions) => {
    objects = objects.filter(
        (obj) => obj._time >= options.startTime && obj._time <= options.endTime
    );
    if (options.type != null) {
        objects = objects.filter((obj) => obj._type === obj._type);
    }
    objects.forEach((obj) => {
        const color =
            options.colorType === 'hsva' ? HSVAtoRGBA(...options.color) : options.color;
        if (!obj._customData) {
            obj._customData = { _color: color };
        } else {
            obj._customData._color = color;
        }
    });
};

export const setGradientColor = (
    objects: ChromaObject[],
    options: SetGradientColorOptions
) => {
    objects = objects.filter(
        (obj) => obj._time >= options.startTime && obj._time <= options.endTime
    );
    if (options.type != null) {
        objects = objects.filter((obj) => obj._type === obj._type);
    }
    let norm = 0;
    objects.forEach((obj) => {
        norm = normalize(obj._time, options.startTime, options.endTime);
        const color = interpolateColor(
            options.startColor,
            options.endColor,
            norm,
            options.colorType,
            options.easingMethod
        );
        if (!obj._customData) {
            obj._customData = { _color: color };
        } else {
            obj._customData._color = color;
        }
    });
};

export const applyEasingsTransition = (
    events: EventLight[],
    options: ApplyEasingsOptions
) => {
    events = events.filter(
        (ev) =>
            ev._time >= options.startTime &&
            ev._time <= options.endTime &&
            isTransition(ev)
    );
    if (options.type != null) {
        events = events.filter((ev) => ev._type === ev._type);
    }
    events.forEach((ev) => {
        if (!ev._customData) {
            ev._customData = { _easing: options.easing };
        } else {
            ev._customData._easing = options.easing;
        }
    });
};
