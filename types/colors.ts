import type { Vector3, Vector4 } from './vector.ts';

/** Standard color object. */
export interface IColor {
   /**
    * **Type:** `f32`
    */
   r: number;
   /**
    * **Type:** `f32`
    */
   g: number;
   /**
    * **Type:** `f32`
    */
   b: number;
   /**
    * **Type:** `f32?`
    */
   a?: number;
}

/**
 * Standard color array.
 * ```ts
 * const color = [red, green, blue] || [red, green, blue, alpha];
 * ```
 */
export type ColorArray = Vector3 | Vector4;

/**
 *  Supported color type.
 */
export type ColorType = 'rgba' | 'rgba255' | 'hsva';

interface IColorBase {
   type: ColorType;
   value: ColorArray;
}

interface IColorRGBA extends IColorBase {
   type: 'rgba';
   value: ColorArray;
}

interface IColorRGBA255 extends IColorBase {
   type: 'rgba255';
   value: ColorArray;
}

interface IColorHSVA extends IColorBase {
   type: 'hsva';
   value: ColorArray;
}

/**
 * Color representation object.
 */
export type ColorObject = IColorRGBA | IColorRGBA255 | IColorHSVA;

/**
 * Color input type.
 */
export type ColorInput = ColorArray | ColorObject | string;
