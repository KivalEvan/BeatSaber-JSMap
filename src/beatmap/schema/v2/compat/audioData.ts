import { logger } from '../../../../logger.ts';
import type { ICompatibilityOptions } from '../../../mapping/types/compatibility.ts';
import type { IWrapAudioData } from '../../../core/types/audioData.ts';
import { tag } from './_common.ts';

/**
 * Checks if beatmap audio data is compatible with v2 `AudioData` schema.
 */
export function compatAudioData<T extends IWrapAudioData>(
   data: T,
   options: ICompatibilityOptions,
) {
   const hasIncompat = !!data.lufsData.length;

   if (hasIncompat) {
      if (options.throwOn.incompatibleObject) {
         throw new Error('Audio data is not compatible with v2');
      } else {
         logger.tWarn(
            tag('compatAudioData'),
            'Audio data is not compatible with v2, certain data may be lost!',
         );
      }
   }
}
