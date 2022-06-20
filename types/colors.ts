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

export type ColorType = 'rgba' | 'hsva' | 'hex';

interface IColorBase {
    type: ColorType;
    value: string | ColorArray;
}

interface IColorRGBA extends IColorBase {
    type: 'rgba';
    value: ColorArray;
}

interface IColorHSVA extends IColorBase {
    type: 'hsva';
    value: ColorArray;
}

interface IColorHex extends IColorBase {
    type: 'hex';
    value: string;
}

export type ColorObject = IColorRGBA | IColorHSVA | IColorHex;
