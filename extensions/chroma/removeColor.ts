import { IChromaObject } from './types/color.ts';
import { SetOptions } from './types/options.ts';

export const removeColor = (objects: IChromaObject[], options: SetOptions) => {
    objects = objects.filter((obj) => obj.time >= options.startTime && obj.time <= options.endTime);
    objects.forEach((obj) => {
        if (obj.customData._color) {
            delete obj.customData._color;
        }
        if (obj.customData._lightGradient) {
            delete obj.customData._lightGradient;
        }
    });
};
