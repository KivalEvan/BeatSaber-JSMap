import { IChromaEventLight } from '../../types/beatmap/v3/chroma.ts';
import { IChromaObject } from './types/color.ts';
import { SetOptions } from './types/options.ts';

export function removeColor(objects: IChromaObject[], options: SetOptions) {
    objects = objects.filter((obj) => obj.time >= options.startTime && obj.time <= options.endTime);
    objects.forEach((obj) => {
        const cd = obj.customData as IChromaEventLight;
        if (cd.color) {
            delete cd.color;
        }
        // if (obj.customData.lightGradient) {
        //     delete cd.lightGradient;
        // }
    });
}
