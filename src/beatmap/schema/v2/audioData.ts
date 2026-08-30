import type { IBPMInfo } from '../../schema/v2/types/bpmInfo.ts';
import type { IWrapAudioData } from '../wrapper/types/audioData.ts';
import { createAudioData } from '../wrapper/audioData.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';

type AudioDataDeserializationPolyfills =
   & Pick<
      IWrapAudioData,
      | 'filename'
      | 'audioChecksum'
   >
   & {
      customDataOwnership?: DeserializationOptions['customDataOwnership'];
   };

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
 * @param options Deserialization polyfills and custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeAudioData(
   data: IBPMInfo,
   options?: DeepPartial<AudioDataDeserializationPolyfills>,
): IWrapAudioData {
   const deserializationOptions: DeserializationOptions = {
      customDataOwnership: options?.customDataOwnership ?? 'copy',
   };
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
   }, deserializationOptions);
}
