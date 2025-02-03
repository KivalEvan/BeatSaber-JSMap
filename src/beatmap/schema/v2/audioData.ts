import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBPMInfo } from '../../../types/beatmap/v2/bpmInfo.ts';
import type { IWrapAudioDataAttribute } from '../../../types/beatmap/wrapper/audioData.ts';

type AudioDataPolyfills = Pick<IWrapAudioDataAttribute, 'filename' | 'audioChecksum'>;

/**
 * Schema serialization for v2 `Audio Data`.
 */
export const audioData: ISchemaContainer<IWrapAudioDataAttribute, IBPMInfo, AudioDataPolyfills> = {
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
      return {
         version: 2,
         filename: options?.filename ?? 'BPMInfo.dat',
         audioChecksum: options?.audioChecksum ?? '',
         sampleCount: data._songSampleCount ?? 0,
         frequency: data._songFrequency ?? 0,
         bpmData: data._regions?.map((bd) => ({
            startBeat: bd?._startBeat,
            endBeat: bd?._endBeat,
            startSampleIndex: bd?._startSampleIndex,
            endSampleIndex: bd?._endSampleIndex,
         })) ?? [],
         lufsData: [],
         customData: {},
      };
   },
};
