import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IAudio } from '../../../types/beatmap/v4/audioData.ts';
import type { IWrapAudioDataAttribute } from '../../../types/beatmap/wrapper/audioData.ts';

type AudioDataPolyfills = Pick<IWrapAudioDataAttribute, 'filename'>;

/**
 * Schema serialization for v4 `Audio Data`.
 */
export const audioData: ISchemaContainer<IWrapAudioDataAttribute, IAudio, AudioDataPolyfills> = {
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
      return {
         version: 4,
         filename: options?.filename ?? 'AudioData.dat',
         audioChecksum: data.songChecksum ?? '',
         sampleCount: data.songSampleCount ?? 0,
         frequency: data.songFrequency ?? 0,
         bpmData: data.bpmData?.map((bd) => ({
            startBeat: bd?.sb,
            endBeat: bd?.eb,
            startSampleIndex: bd?.si,
            endSampleIndex: bd?.ei,
         })) ?? [],
         lufsData: data.lufsData?.map((l) => ({
            lufs: l?.l,
            startSampleIndex: l?.si,
            endSampleIndex: l?.ei,
         })) ?? [],
         customData: {},
      };
   },
};
