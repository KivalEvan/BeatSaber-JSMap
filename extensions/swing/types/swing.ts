import { CharacteristicName, DifficultyName } from '../../../types/beatmap/mod.ts';
import { NoteContainer } from '../../../types/beatmap/v3/container.ts';

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
    count: number;
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
