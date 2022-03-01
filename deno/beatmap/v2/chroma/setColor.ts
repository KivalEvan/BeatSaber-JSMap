import { ChromaObject, SetOptions } from './types.ts';
import { ColorArray } from '../../shared/types/colors.ts';
import { HSVAtoRGBA, interpolateColor } from '../../../colors.ts';
import { normalize } from '../../../utils.ts';

interface SetColorOptions extends SetOptions {
    color: ColorArray;
    colorType?: 'rgba' | 'hsva';
}

interface SetColorGradientOptions extends SetOptions {
    startColor: ColorArray;
    endColor: ColorArray;
    colorType?: 'rgba' | 'long hsva' | 'short hsva';
    easingColor?: (x: number) => number;
}

export const setColor = (objects: ChromaObject[], options: SetColorOptions) => {
    objects = objects.filter(
        (obj) => obj._time >= options.startTime && obj._time <= options.endTime
    );
    if (options.type != null) {
        objects = objects.filter((obj) => obj._type === options.type);
    }
    objects.forEach((obj) => {
        const color =
            options.colorType === 'hsva' ? HSVAtoRGBA(...options.color) : options.color;
        if (obj._customData) {
            obj._customData._color = color;
        } else {
            obj._customData = { _color: color };
        }
    });
};

export const setColorGradient = (
    objects: ChromaObject[],
    options: SetColorGradientOptions
) => {
    objects = objects.filter(
        (obj) => obj._time >= options.startTime && obj._time <= options.endTime
    );
    if (options.type != null) {
        objects = objects.filter((obj) => obj._type === options.type);
    }
    let norm = 0;
    objects.forEach((obj) => {
        norm = normalize(obj._time, options.startTime, options.endTime);
        const color = interpolateColor(
            options.startColor,
            options.endColor,
            norm,
            options.colorType,
            options.easingColor
        );
        if (obj._customData) {
            obj._customData._color = color;
        } else {
            obj._customData = { _color: color };
        }
    });
};
