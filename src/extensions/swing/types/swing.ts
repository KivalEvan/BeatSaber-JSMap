import type { CharacteristicName } from '../../../types/beatmap/shared/characteristic.ts';
import type { DifficultyName } from '../../../types/beatmap/shared/difficulty.ts';
import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';

export interface ISwingContainer {
   readonly time: number;
   readonly duration: number;
   readonly minSpeed: number;
   readonly maxSpeed: number;
   readonly ebpm: number;
   readonly ebpmSwing: number;
   readonly data: IWrapColorNoteAttribute[];
}

export interface ISwingCount {
   readonly left: number[];
   readonly right: number[];
}

export interface ISwingPerSecond {
   readonly perSecond: number;
   readonly total: number;
   readonly peak: number;
   readonly median: number;
}

export interface ISwingAnalysis {
   readonly characteristic: CharacteristicName;
   readonly difficulty: DifficultyName;
   readonly container: ISwingContainer[];
   readonly red: ISwingPerSecond;
   readonly blue: ISwingPerSecond;
   readonly total: ISwingPerSecond;
}
