import type { IWrapAudioData } from './types/audioData.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

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
