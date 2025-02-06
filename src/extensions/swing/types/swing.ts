import type { CharacteristicName } from '../../../types/beatmap/shared/characteristic.ts';
import type { DifficultyName } from '../../../types/beatmap/shared/difficulty.ts';
import type { IWrapBaseNoteAttribute } from '../../../types/beatmap/wrapper/baseNote.ts';
import type { IWrapBeatmapAttributeSubset } from '../../../types/beatmap/wrapper/beatmap.ts';

export type ISwingAnalysisBeatmapAttribute =
   & IWrapBeatmapAttributeSubset<
      'colorNotes' | 'bombNotes' | 'chains',
      'time' | 'posX' | 'posY' | 'color' | 'direction' | 'customData'
   >
   & IWrapBeatmapAttributeSubset<
      'obstacles',
      'time' | 'posX' | 'duration' | 'width' | 'customData'
   >;

export type ISwingAnalysisBaseNoteAttribute = Pick<
   IWrapBaseNoteAttribute,
   'time' | 'posX' | 'posY' | 'color' | 'direction'
>;

export interface ISwingContainer<T extends ISwingAnalysisBaseNoteAttribute> {
   readonly time: number;
   readonly duration: number;
   readonly minSpeed: number;
   readonly maxSpeed: number;
   readonly ebpm: number;
   readonly ebpmSwing: number;
   readonly data: T[];
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

export interface ISwingAnalysis<T extends ISwingAnalysisBaseNoteAttribute> {
   readonly characteristic: CharacteristicName;
   readonly difficulty: DifficultyName;
   readonly container: ISwingContainer<T>[];
   readonly red: ISwingPerSecond;
   readonly blue: ISwingPerSecond;
   readonly total: ISwingPerSecond;
}
