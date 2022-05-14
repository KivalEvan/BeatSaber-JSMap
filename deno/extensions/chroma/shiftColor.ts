import { HSVAtoRGBA, RGBAtoHSVA } from '../../utils/colors.ts';
import { ColorArray } from '../../types/beatmap/shared/colors.ts';
import { clamp } from '../../utils/math.ts';
import { IChromaObject, ShiftColorOptions } from './types/color.ts';

export const shiftColor = (objects: IChromaObject[], options: ShiftColorOptions) => {
    const opt: Omit<Required<ShiftColorOptions>, 'type'> = {
        startTime: options.startTime,
        endTime: options.endTime,
        hue: options.hue ?? 0,
        saturation: options.saturation ?? 100,
        value: options.value ?? 0,
        alpha: options.alpha ?? 0,
        fixedHue: options.fixedHue ?? false,
        fixedSaturation: options.fixedSaturation ?? false,
        fixedValue: options.fixedValue ?? false,
        fixedAlpha: options.fixedAlpha ?? false,
    };
    const hsvaShift: ColorArray = [
        opt.hue >= 0 ? (opt.hue / 360) % 1 : (((opt.hue % 360) + 360) / 360) % 1,
        opt.saturation / 100,
        opt.value,
        opt.alpha,
    ];
    const shift = (
        currentColor: ColorArray,
        shiftHSVA: ColorArray,
        settings: typeof opt
    ) => {
        return HSVAtoRGBA(
            ...(RGBAtoHSVA(...currentColor).map((hsva, i) => {
                if (i === 0 && typeof hsva === 'number') {
                    if (settings.fixedHue) {
                        return shiftHSVA[0];
                    } else {
                        return hsva + shiftHSVA[0];
                    }
                }
                if (i === 1 && typeof hsva === 'number') {
                    if (settings.fixedHue) {
                        return clamp(hsva * shiftHSVA[1], 0, 1);
                    } else {
                        return hsva + shiftHSVA[1];
                    }
                }
                if (i === 2 && typeof hsva === 'number') {
                    if (settings.fixedValue) {
                        return shiftHSVA[2];
                    } else {
                        return hsva + shiftHSVA[2];
                    }
                }
                if (
                    i === 3 &&
                    typeof hsva === 'number' &&
                    typeof shiftHSVA[3] === 'number'
                ) {
                    if (settings.fixedAlpha) {
                        return shiftHSVA[3];
                    } else {
                        return hsva + shiftHSVA[3];
                    }
                }
            }) as ColorArray)
        ) as ColorArray;
    };
    objects.forEach((obj) => {
        if (obj.customData?._color) {
            obj.customData._color = shift(obj.customData._color, hsvaShift, opt);
        }
        if (obj.customData?._lightGradient) {
            obj.customData._lightGradient._startColor = shift(
                obj.customData._lightGradient._startColor,
                hsvaShift,
                opt
            );
            obj.customData._lightGradient._endColor = shift(
                obj.customData._lightGradient._endColor,
                hsvaShift,
                opt
            );
        }
    });
};
