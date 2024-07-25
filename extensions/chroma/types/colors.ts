import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';
import type { IWrapObstacleAttribute } from '../../../types/beatmap/wrapper/obstacle.ts';
import type { IWrapBasicEventAttribute } from '../../../types/beatmap/wrapper/basicEvent.ts';
import type { EasingFunction, Easings } from '../../../types/easings.ts';
import type { ColorArray, ColorInput, ColorType } from '../../../types/colors.ts';
import type { ISetOptions } from './options.ts';
import type { IWrapChainAttribute } from '../../../types/beatmap/wrapper/chain.ts';
import type { IWrapArcAttribute } from '../../../types/beatmap/wrapper/arc.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';

export type IChromaObject =
   | IWrapColorNoteAttribute
   | IWrapBombNoteAttribute
   | IWrapObstacleAttribute
   | IWrapBasicEventAttribute
   | IWrapChainAttribute
   | IWrapArcAttribute;

export type IChromaNote =
   | IWrapColorNoteAttribute
   | IWrapBombNoteAttribute
   | IWrapChainAttribute
   | IWrapArcAttribute;

export interface ISetColorOptions {
   color: ColorInput;
   colorType?: ColorType;
}

export interface ISetColorRangeOptions extends ISetOptions {
   color1: ColorInput;
   color2: ColorInput;
   colorType?: ColorType;
}

export interface ISetColorGradientOptions extends ISetOptions {
   colorStart: ColorInput;
   colorEnd: ColorInput;
   colorType?: ColorType;
   easingColor?: EasingFunction;
}

export interface IShiftColorBaseOptions extends ISetOptions {
   hue?: number;
   saturation?: number;
   value?: number;
   alpha?: number;
}

export interface IShiftColorOptions extends IShiftColorBaseOptions {
   fixedHue?: boolean;
   fixedSaturation?: boolean;
   fixedValue?: boolean;
   fixedAlpha?: boolean;
}

export interface IShiftColorGradientOptions extends IShiftColorBaseOptions {
   reverse?: boolean;
   easing?: EasingFunction;
}

export interface IApplyEasingsOptions {
   easing: Easings;
   type?: IWrapBasicEventAttribute['type'];
}

export interface IPRandomLightIDOptions {
   colorStart: ColorArray;
   colorEnd: ColorArray;
   colorType?: 'rgba' | 'long hsva' | 'short hsva';
   type: IWrapBasicEventAttribute['type'];
   duration: number;
   length: number;
   precision: number;
   step: number;
   lightOff: boolean;
   offStrobe: boolean;
   lightID: number[];
   lightIDMulti?: number;
   offsetEnd?: boolean;
   easingColor?: EasingFunction;
}

export interface IPRandomLightI2DOptions {
   startColor: ColorArray;
   endColor: ColorArray;
   colorType?: 'rgba' | 'long hsva' | 'short hsva';
   type: never;
   duration: number;
   length: number;
   precision: number;
   step: number;
   lightOff: boolean;
   offStrobe: boolean;
   lightID: [IWrapBasicEventAttribute['type'], number][];
   lightIDMulti?: number;
   offsetEnd?: boolean;
   easingColor?: EasingFunction;
}
