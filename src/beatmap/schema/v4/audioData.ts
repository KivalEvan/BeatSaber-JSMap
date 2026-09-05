import type { IAudio } from './types/audioData.ts';
import type { IWrapAudioData } from '../wrapper/types/audioData.ts';
import { createAudioData } from '../wrapper/audioData.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import type { InferBeatmapDeserializationOptions } from '../shared/types/infer.ts';

/** Serialize beatmap v4 `Audio Data` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeAudioData(data: IWrapAudioData): IAudio {
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
}

/** Deserialize schema object into beatmap v4 `Audio Data` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills and custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeAudioData(
   data: IAudio,
   options?: InferBeatmapDeserializationOptions<'audioData', 4>,
): IWrapAudioData {
   const deserializationOptions: DeserializationOptions = {
      customDataOwnership: options?.customDataOwnership ?? 'copy',
   };
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
   }, deserializationOptions);
}
