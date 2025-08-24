import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IAudio } from './types/audioData.ts';
import type { IWrapAudioData } from '../wrapper/types/audioData.ts';
import { createAudioData } from '../wrapper/audioData.ts';

type AudioDataPolyfills = Pick<IWrapAudioData, 'filename'>;

/**
 * Schema serialization for v4 `Audio Data`.
 */
export const audioData: ISchemaContainer<IWrapAudioData, IAudio, AudioDataPolyfills> = {
   serialize(data) {
      return {
         version: '4.0.0',
         songChecksum: data.audioChecksum,
         songSampleCount: data.sampleCount,
         songFrequency: data.frequency,
         bpmData: data.bpmData.map((bd) => ({
            sb: bd.startBeat,
            eb: bd.endBeat,
            si: bd.startSampleIndex,
            ei: bd.endSampleIndex,
         })),
         lufsData: data.lufsData.map((l) => ({
            l: l.lufs,
            si: l.startSampleIndex,
            ei: l.endSampleIndex,
         })),
      };
   },
   deserialize(data, options) {
      return createAudioData({
         version: 4,
         filename: options?.filename,
         audioChecksum: data.songChecksum,
         sampleCount: data.songSampleCount,
         frequency: data.songFrequency,
         bpmData: data.bpmData?.map((bd) => ({
            startBeat: bd?.sb,
            endBeat: bd?.eb,
            startSampleIndex: bd?.si,
            endSampleIndex: bd?.ei,
         })),
         lufsData: data.lufsData?.map((l) => ({
            lufs: l?.l,
            startSampleIndex: l?.si,
            endSampleIndex: l?.ei,
         })),
      });
   },
};
