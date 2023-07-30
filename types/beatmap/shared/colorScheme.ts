import { IColor } from '../../colors.ts';

/** Color Scheme interface for difficulty info custom data. */
export interface IColorScheme {
   _colorLeft?: IColor;
   _colorRight?: IColor;
   _envColorLeft?: IColor;
   _envColorRight?: IColor;
   _envColorWhite?: IColor;
   _envColorLeftBoost?: IColor;
   _envColorRightBoost?: IColor;
   _envColorWhiteBoost?: IColor;
   _obstacleColor?: IColor;
}

/** List of available color scheme in base game. */
export type ColorSchemeName =
   | 'Default Custom'
   | 'The First'
   | 'Origins'
   | 'KDA'
   | 'Crab Rave'
   | 'Noir'
   | 'Rocket'
   | 'Green Day'
   | 'Timbaland'
   | 'FitBeat'
   | 'Linkin Park'
   | 'BTS'
   | 'Kaleidoscope'
   | 'Interscope'
   | 'Skrillex'
   | 'Billie Eilish'
   | 'Spooky'
   | 'Gaga'
   | 'Weave'
   | 'Pyro'
   | 'EDM'
   | 'The Second'
   | 'Lizzo'
   | 'The Weeknd'
   | 'Glass Desert'
   | 'Rock Mixtape'
   | 'Dragons 2.0'
   | 'Panic 2.0'
   | 'Queen';
