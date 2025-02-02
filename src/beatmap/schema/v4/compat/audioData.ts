import type { ICompatibilityOptions } from '../../../../types/beatmap/options/compatibility.ts';
import type { IWrapAudioDataAttribute } from '../../../../types/beatmap/wrapper/audioData.ts';

/**
 * Check if beatmap audio data is compatible with v4 `Audio Data` schema.
 */
export function compatAudioData<T extends IWrapAudioDataAttribute>(
   _data: T,
   _options: ICompatibilityOptions,
) {}
