import type { CharacteristicName } from '../../../beatmap/schema/shared/types/characteristic.ts';
import type { DifficultyName } from '../../../beatmap/schema/shared/types/difficulty.ts';
import type { IWrapBaseNote } from '../../../beatmap/core/types/baseNote.ts';
import type { IWrapBeatmapSubset } from '../../../beatmap/core/types/beatmap.ts';

export type ISwingAnalysisBeatmap =
   & IWrapBeatmapSubset<
      'colorNotes' | 'bombNotes' | 'chains',
      'time' | 'posX' | 'posY' | 'color' | 'direction' | 'customData'
   >
   & IWrapBeatmapSubset<
      'obstacles',
      'time' | 'posX' | 'duration' | 'width' | 'customData'
   >;

export type ISwingAnalysisBaseNote = Pick<
   IWrapBaseNote,
   'time' | 'posX' | 'posY' | 'color' | 'direction' | 'customData'
>;

export interface ISwingContainer<T extends ISwingAnalysisBaseNote> {
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

export interface ISwingAnalysis<T extends ISwingAnalysisBaseNote = ISwingAnalysisBaseNote> {
   readonly characteristic: CharacteristicName;
   readonly difficulty: DifficultyName;
   readonly container: ISwingContainer<T>[];
   readonly red: ISwingPerSecond;
   readonly blue: ISwingPerSecond;
   readonly total: ISwingPerSecond;
}
