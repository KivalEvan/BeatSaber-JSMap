import { ChromaObject, SetOptions } from './types.ts';

interface RemoveColorOptions extends SetOptions {}

export const removeColor = (objects: ChromaObject[], options: RemoveColorOptions) => {
    objects = objects.filter(
        (obj) => obj._time >= options.startTime && obj._time <= options.endTime
    );
    if (options.type != null) {
        objects = objects.filter((obj) => obj._type === options.type);
    }
    objects.forEach((obj) => {
        if (obj._customData?._color) {
            delete obj._customData._color;
        }
        if (obj._customData?._lightGradient) {
            delete obj._customData._lightGradient;
        }
    });
};
