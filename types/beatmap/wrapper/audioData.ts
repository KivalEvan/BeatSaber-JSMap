// deno-lint-ignore-file no-explicit-any
import type { IWrapBaseFile, IWrapBaseFileAttribute } from './baseFile.ts';
import type { IWrapBPMEventAttribute } from './bpmEvent.ts';

export interface IWrapAudioAttribute extends IWrapBaseFileAttribute {
   audioChecksum: string;
   sampleCount: number; // int
   frequency: number; // int
   bpmData: IWrapAudioBPM[];
   lufsData: IWrapAudioLUFS[];
}

export interface IWrapAudioBPM {
   startSampleIndex: number; // int
   endSampleIndex: number; // int
   startBeat: number; // float
   endBeat: number; // float
}

export interface IWrapAudioLUFS {
   startSampleIndex: number; // int
   endSampleIndex: number; // int
   lufs: number; // float
}

export interface IWrapAudio<T extends { [key: string]: any } = IWrapAudioAttribute>
   extends IWrapBaseFile<T>, IWrapAudioAttribute {
   setFilename(filename: string): this;
   setSampleCount(value: number): this;
   setFrequency(value: number): this;

   fromBpmEvents(
      data: IWrapBPMEventAttribute[],
      frequency: number,
      sampleCount?: number,
   ): this;
   getBpmEvents(): IWrapBPMEventAttribute[];
}
