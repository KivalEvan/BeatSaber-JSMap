import { IChromaObject, SetColorGradientOptions, SetColorOptions } from './types/color.ts';
import { HSVAtoRGBA, interpolateColor } from '../../utils/colors.ts';
import { normalize } from '../../utils/math.ts';

export const setColor = (objects: IChromaObject[], options: SetColorOptions) => {
    objects = objects.filter(
        (obj) => obj.time >= options.startTime && obj.time <= options.endTime,
    );
    objects.forEach((obj) => {
        const color = options.colorType === 'hsva' ? HSVAtoRGBA(...options.color) : options.color;
        if (obj.customData) {
            obj.customData._color = color;
        } else {
            obj.customData = { _color: color };
        }
    });
};

export const setColorGradient = (
    objects: IChromaObject[],
    options: SetColorGradientOptions,
) => {
    objects = objects.filter(
        (obj) => obj.time >= options.startTime && obj.time <= options.endTime,
    );
    let norm = 0;
    objects.forEach((obj) => {
        norm = normalize(obj.time, options.startTime, options.endTime);
        const color = interpolateColor(
            options.startColor,
            options.endColor,
            norm,
            options.colorType,
            options.easingColor,
        );
        if (obj.customData) {
            obj.customData._color = color;
        } else {
            obj.customData = { _color: color };
        }
    });
};
