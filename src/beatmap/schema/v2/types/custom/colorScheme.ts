import type { IColor } from '../../../../../types/colors.ts';

/** Color Scheme interface for difficulty info custom data. */
export interface IColorScheme {
   _colorLeft?: IColor;
   _colorRight?: IColor;
   _obstacleColor?: IColor;
   _envColorLeft?: IColor;
   _envColorRight?: IColor;
   _envColorWhite?: IColor;
   _envColorLeftBoost?: IColor;
   _envColorRightBoost?: IColor;
   _envColorWhiteBoost?: IColor;
}
