import type { IBPMInfo } from '../../schema/v2/types/bpmInfo.ts';
import type { IWrapAudioData } from '../wrapper/types/audioData.ts';
import { createAudioData } from '../wrapper/audioData.ts';
import type { DeepPartial } from '../../../types/utils.ts';

type AudioDataDeserializationPolyfills = Pick<
   IWrapAudioData,
   | 'filename'
   | 'audioChecksum'
>;

/** Serialize beatmap v2 `Audio Data` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeAudioData(data: IWrapAudioData): IBPMInfo {
   return {
      _version: '2.0.0',
      _songSampleCount: data.sampleCount,
      _songFrequency: data.frequency,
      _regions: data.bpmData.map((bd) => ({
         _startBeat: bd.startBeat,
         _endBeat: bd.endBeat,
         _startSampleIndex: bd.startSampleIndex,
         _endSampleIndex: bd.endSampleIndex,
      })),
   };
}

/** Deserialize schema object into beatmap v2 `Audio Data` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills.
 * @returns The unwrapped beatmap object.
 */
export function deserializeAudioData(
   data: IBPMInfo,
   options?: DeepPartial<AudioDataDeserializationPolyfills>,
): IWrapAudioData {
   return createAudioData({
      version: 2,
      filename: options?.filename,
      audioChecksum: options?.audioChecksum,
      sampleCount: data._songSampleCount,
      frequency: data._songFrequency,
      bpmData: data._regions?.map((bd) => ({
         startBeat: bd?._startBeat,
         endBeat: bd?._endBeat,
         startSampleIndex: bd?._startSampleIndex,
         endSampleIndex: bd?._endSampleIndex,
      })),
   });
}
