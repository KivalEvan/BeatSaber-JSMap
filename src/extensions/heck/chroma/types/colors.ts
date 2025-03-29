import type { IWrapColorNote } from '../../../../types/beatmap/wrapper/colorNote.ts';
import type { IWrapObstacle } from '../../../../types/beatmap/wrapper/obstacle.ts';
import type { IWrapBasicEvent } from '../../../../types/beatmap/wrapper/basicEvent.ts';
import type { EasingFunction, Easings } from '../../../../types/easings.ts';
import type { ColorArray, ColorInput, ColorType } from '../../../../types/colors.ts';
import type { ISetOptions } from './options.ts';
import type { IWrapChain } from '../../../../types/beatmap/wrapper/chain.ts';
import type { IWrapArc } from '../../../../types/beatmap/wrapper/arc.ts';
import type { IWrapBombNote } from '../../../../types/beatmap/wrapper/bombNote.ts';

export type IChromaObject =
   | IWrapColorNote
   | IWrapBombNote
   | IWrapObstacle
   | IWrapBasicEvent
   | IWrapChain
   | IWrapArc;

export type IChromaNote =
   | IWrapColorNote
   | IWrapBombNote
   | IWrapChain
   | IWrapArc;

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
   type?: IWrapBasicEvent['type'];
}

export interface IPRandomLightIDOptions {
   colorStart: ColorArray;
   colorEnd: ColorArray;
   colorType?: 'rgba' | 'long hsva' | 'short hsva';
   type: IWrapBasicEvent['type'];
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
   lightID: [IWrapBasicEvent['type'], number][];
   lightIDMulti?: number;
   offsetEnd?: boolean;
   easingColor?: EasingFunction;
}
