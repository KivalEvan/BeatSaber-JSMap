import type { ICompatibilityOptions } from '../../../mapping/types/compatibility.ts';
import type { IWrapAudioData } from '../../wrapper/types/audioData.ts';

/**
 * Check if beatmap audio data is compatible with v4 `Audio Data` schema.
 */
export function compatAudioData<T extends IWrapAudioData>(
   _data: T,
   _options: ICompatibilityOptions,
) {}
