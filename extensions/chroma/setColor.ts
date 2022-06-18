import { IChromaObject, SetColorGradientOptions, SetColorOptions } from './types/color.ts';
import { HSVAtoRGBA, interpolateColor } from '../../utils/colors.ts';
import { normalize } from '../../utils/math.ts';
import { IChromaEventLight } from '../../types/beatmap/v3/chroma.ts';

export function setColor(objects: IChromaObject[], options: SetColorOptions) {
    objects = objects.filter((obj) => obj.time >= options.startTime && obj.time <= options.endTime);
    objects.forEach((obj) => {
        const color = options.colorType === 'hsva' ? HSVAtoRGBA(...options.color) : options.color;
        (obj.customData as IChromaEventLight).color = color;
    });
}

export function setColorGradient(objects: IChromaObject[], options: SetColorGradientOptions) {
    objects = objects.filter((obj) => obj.time >= options.startTime && obj.time <= options.endTime);
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
        (obj.customData as IChromaEventLight).color = color;
    });
}
