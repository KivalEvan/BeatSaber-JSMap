// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBPMInfo } from '../../../types/beatmap/v2/bpmInfo.ts';
import type { IWrapAudioData } from '../../../types/beatmap/wrapper/audioData.ts';
import { createAudioData } from '../../core/audioData.ts';

type AudioDataDeserializationPolyfills = Pick<
   IWrapAudioData,
   | 'filename'
   | 'audioChecksum'
>;

/**
 * Schema serialization for v2 `Audio Data`.
 */
export const audioData: ISchemaContainer<
   IWrapAudioData,
   IBPMInfo,
   Record<string, any>,
   AudioDataDeserializationPolyfills
> = {
   serialize(data) {
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
   },
   deserialize(data, options) {
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
   },
};
