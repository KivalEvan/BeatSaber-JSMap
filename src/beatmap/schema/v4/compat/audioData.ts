import type { ICompatibilityOptions } from '../../../../types/beatmap/options/compatibility.ts';
import type { IWrapAudioData } from '../../../../types/beatmap/wrapper/audioData.ts';

/**
 * Check if beatmap audio data is compatible with v4 `Audio Data` schema.
 */
export function compatAudioData<T extends IWrapAudioData>(
   _data: T,
   _options: ICompatibilityOptions,
) {}
