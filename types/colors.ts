/** Standard color object. */
export interface IColor {
    r: number;
    g: number;
    b: number;
    a?: number;
}

/** Standard color array.
 * ```ts
 * const color = [red, green, blue] || [red, green, blue, alpha];
 * ```
 */
export type ColorArray = [number, number, number, number?];

export type ColorType = 'rgba' | 'hsva';

interface IColorBase {
    type: ColorType;
    value: ColorArray | string;
}

interface IColorRGBA extends IColorBase {
    type: 'rgba';
    value: ColorArray | string;
}

interface IColorHSVA extends IColorBase {
    type: 'hsva';
    value: ColorArray | string;
}

export type ColorObject = IColorRGBA | IColorHSVA;

export type ColorInput = ColorArray | ColorObject | string;
