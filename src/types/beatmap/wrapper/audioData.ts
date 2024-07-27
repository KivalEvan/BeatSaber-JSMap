import type { IWrapBaseFileAttribute, IWrapBeatmapFile } from './baseFile.ts';
import type { IWrapBaseItemAttribute } from './baseItem.ts';
import type { IWrapBPMEventAttribute } from './bpmEvent.ts';

/**
 * Wrapper attribute for beatmap audio data.
 */
export interface IWrapAudioDataAttribute extends IWrapBaseItemAttribute, IWrapBaseFileAttribute {
   /**
    * Audio checksum for audio file.
    */
   audioChecksum: string;
   /**
    * Sample count in audio file.
    *
    * **Type:** `i32`
    */
   sampleCount: number;
   /**
    * Sample frequency in audio file.
    *
    * **Type:** `i32`
    */
   frequency: number;
   bpmData: IWrapAudioDataBPM[];
   lufsData: IWrapAudioDataLUFS[];
}

/**
 * Wrapper interface for beatmap audio data BPM data.
 */
export interface IWrapAudioDataBPM {
   /**
    * Start sample index of audio.
    *
    * **Type:** `i32`
    */
   startSampleIndex: number;
   /**
    * End sample index of audio.
    *
    * **Type:** `i32`
    */
   endSampleIndex: number;
   /**
    * Start beat time.
    *
    * **Type:** `f32`
    */
   startBeat: number;
   /**
    * End beat time.
    *
    * **Type:** `f32`
    */
   endBeat: number;
}

/**
 * Wrapper interface for beatmap audio data LUFS data.
 */
export interface IWrapAudioDataLUFS {
   /**
    * Start sample index of audio.
    *
    * **Type:** `i32`
    */
   startSampleIndex: number;
   /**
    * End sample index of audio.
    *
    * **Type:** `i32`
    */
   endSampleIndex: number;
   /**
    * LUFS value.
    *
    * **Type:** `f32`
    */
   lufs: number;
}

/**
 * Wrapper for beatmap audio data.
 */
export interface IWrapAudioData extends IWrapBeatmapFile, IWrapAudioDataAttribute {
   setFilename(filename: string): this;
   setSampleCount(value: number): this;
   setFrequency(value: number): this;

   fromBpmEvents(data: IWrapBPMEventAttribute[], frequency: number, sampleCount?: number): this;
   getBpmEvents(): IWrapBPMEventAttribute[];
}
