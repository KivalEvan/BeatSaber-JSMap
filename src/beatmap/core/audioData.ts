import type { GenericAudioDataFilename } from '../schema/shared/types/filename.ts';
import type { IWrapAudioData, IWrapAudioDataBPM, IWrapAudioDataLUFS } from './types/audioData.ts';
import type { IWrapBPMEvent } from './types/bpmEvent.ts';
import type { DeepPartial, LooseAutocomplete } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseItem } from './abstract/baseItem.ts';

export function createAudioData(
   data: DeepPartial<IWrapAudioData> = {},
): IWrapAudioData {
   return {
      version: data.version ?? -1,
      filename: data.filename ?? 'AudioData.dat',
      audioChecksum: data.audioChecksum ?? '',
      sampleCount: data.sampleCount ?? 44100,
      frequency: data.frequency ?? 0,
      bpmData: data.bpmData?.map((e) => ({
         startSampleIndex: e.startSampleIndex ?? 0,
         endSampleIndex: e.endSampleIndex ?? 0,
         startBeat: e.startBeat ?? 0,
         endBeat: e.endBeat ?? 0,
      })) ?? [],
      lufsData: data.lufsData?.map((e) => ({
         startSampleIndex: e.startSampleIndex ?? 0,
         endSampleIndex: e.endSampleIndex ?? 0,
         lufs: e.lufs ?? 0,
      })) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap audio data.
 *
 * This object is writable into file.
 */
export class AudioData extends BaseItem implements IWrapAudioData {
   static defaultValue: IWrapAudioData = createAudioData();

   static createOne(data: DeepPartial<IWrapAudioData> = {}): AudioData {
      return new this(data);
   }
   static create(...data: DeepPartial<IWrapAudioData>[]): AudioData[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapAudioData> = {}) {
      super();
      this.version = data.version ?? AudioData.defaultValue.version;
      this.filename = data.filename ?? AudioData.defaultValue.filename;
      this.audioChecksum = data.audioChecksum ?? AudioData.defaultValue.audioChecksum;
      this.sampleCount = data.sampleCount ?? AudioData.defaultValue.sampleCount;
      this.frequency = data.frequency ?? AudioData.defaultValue.frequency;
      this.bpmData = (data.bpmData ?? AudioData.defaultValue.bpmData).map((e) => ({
         startBeat: e?.startBeat || 0,
         startSampleIndex: e?.startSampleIndex || 0,
         endBeat: e?.endBeat || 0,
         endSampleIndex: e?.endSampleIndex || 0,
      }));
      this.lufsData = (data.lufsData ?? AudioData.defaultValue.lufsData).map((e) => ({
         startSampleIndex: e?.startSampleIndex || 0,
         endSampleIndex: e?.endSampleIndex || 0,
         lufs: e?.lufs || 0,
      }));
      this.customData = deepCopy(data.customData ?? AudioData.defaultValue.customData);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         this.frequency >= 0 &&
         this.sampleCount >= 0 &&
         this.bpmData.every(
            (bpm) => bpm.endBeat > bpm.startBeat && bpm.endSampleIndex > bpm.startSampleIndex,
         );
   }

   version: number;
   filename: string;

   audioChecksum: string;
   sampleCount: number;
   frequency: number;
   bpmData: IWrapAudioDataBPM[];
   lufsData: IWrapAudioDataLUFS[];

   setFilename(filename: LooseAutocomplete<GenericAudioDataFilename>): this {
      this.filename = filename;
      return this;
   }
   setVersion(version: number): this {
      this.version = version;
      return this;
   }
   setSampleCount(value: number): this {
      this.sampleCount = value;
      return this;
   }
   setFrequency(value: number): this {
      this.frequency = value;
      return this;
   }

   fromBpmEvents(data: IWrapBPMEvent[], frequency = 44100, sampleCount?: number): this {
      if (!data.length) return this;
      this.frequency = frequency;
      if (sampleCount) this.sampleCount = sampleCount;
      this.bpmData = [];

      for (let i = 0; i < data.length - 1; i++) {
         const currentBpmEvent = data[i];
         const nextBpmEvent = data[i + 1];

         this.bpmData.push({
            startSampleIndex: Math.floor(currentBpmEvent.time * this.frequency),
            endSampleIndex: Math.floor(nextBpmEvent.time * this.frequency),
            startBeat: currentBpmEvent.time,
            endBeat: nextBpmEvent.time,
         });
      }

      const lastBpmEvent = data[data.length - 1];
      const lastStartSampleIndex = Math.floor(lastBpmEvent.time * this.frequency);
      const secondsDiff = (this.sampleCount - lastStartSampleIndex) / this.frequency;
      const jsonBeatsDiff = secondsDiff * (lastBpmEvent.bpm / 60);

      this.bpmData.push({
         startSampleIndex: lastStartSampleIndex,
         endSampleIndex: this.sampleCount,
         startBeat: lastBpmEvent.time,
         endBeat: lastBpmEvent.time + jsonBeatsDiff,
      });
      return this;
   }

   getBpmEvents(): IWrapBPMEvent[] {
      return this.bpmData.map((bd) => {
         const sample = bd.endSampleIndex - bd.startSampleIndex;
         const bpm = ((bd.endBeat - bd.startBeat) / (sample / this.frequency)) * 60;
         return {
            time: bd.startBeat,
            bpm,
            customData: {},
         };
      });
   }

   override sort(): this {
      this.bpmData.sort((a, b) => a.startBeat - b.startBeat);
      return this;
   }
}
