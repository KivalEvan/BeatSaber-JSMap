import { CharacteristicName } from '../../../types/beatmap/shared/characteristic.ts';
import { DifficultyName } from '../../../types/beatmap/shared/difficulty.ts';
import { NoteContainer } from '../../../types/beatmap/wrapper/container.ts';

export interface ISwingContainer {
    time: number;
    duration: number;
    minSpeed: number;
    maxSpeed: number;
    ebpm: number;
    ebpmSwing: number;
    data: NoteContainer[];
}

export interface ISwingCount {
    left: number[];
    right: number[];
}

export interface ISwingPerSecond {
    average: number;
    total: number;
    peak: number;
    median: number;
}

export interface ISwingAnalysis {
    characteristic: CharacteristicName;
    difficulty: DifficultyName;
    container: ISwingContainer[];
    red: ISwingPerSecond;
    blue: ISwingPerSecond;
    total: ISwingPerSecond;
}
