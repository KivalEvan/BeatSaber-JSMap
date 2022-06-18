import { IChromaObject, SetColorRangeOptions } from './types/color.ts';
import { HSVAtoRGBA, interpolateColor } from '../../utils/colors.ts';
import { IChromaEventLight } from '../../types/beatmap/v3/chroma.ts';

export function randomizeColor(objects: IChromaObject[], options: SetColorRangeOptions) {
    objects = objects.filter((obj) => obj.time >= options.startTime && obj.time <= options.endTime);
    objects.forEach((obj) => {
        const random = Math.random();
        const color = interpolateColor(
            options.colorType === 'hsva' ? HSVAtoRGBA(...options.color1) : options.color1,
            options.colorType === 'hsva' ? HSVAtoRGBA(...options.color2) : options.color2,
            random,
        );
        (obj.customData as IChromaEventLight).color = color;
    });
}
