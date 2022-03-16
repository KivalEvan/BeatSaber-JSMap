import { ChromaObject, SetOptions } from './types.ts';
import { ColorArray } from '../../../types/beatmap/shared/colors.ts';
import { HSVAtoRGBA, interpolateColor } from '../../../utils/colors.ts';

interface SetColorOptions extends SetOptions {
    color1: ColorArray;
    color2: ColorArray;
    colorType?: 'rgba' | 'hsva';
}

export const randomizeColor = (objects: ChromaObject[], options: SetColorOptions) => {
    objects = objects.filter(
        (obj) => obj._time >= options.startTime && obj._time <= options.endTime
    );
    if (options.type != null) {
        objects = objects.filter((obj) => obj._type === options.type);
    }
    objects.forEach((obj) => {
        const random = Math.random();
        const color = interpolateColor(
            options.colorType === 'hsva'
                ? HSVAtoRGBA(...options.color1)
                : options.color1,
            options.colorType === 'hsva'
                ? HSVAtoRGBA(...options.color2)
                : options.color2,
            random
        );
        if (obj._customData) {
            obj._customData._color = color;
        } else {
            obj._customData = { _color: color };
        }
    });
};
