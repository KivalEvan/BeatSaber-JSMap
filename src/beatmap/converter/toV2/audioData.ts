import { logger } from '../../../logger.ts';
import type { IWrapAudioData } from '../../schema/wrapper/types/audioData.ts';

function tag(name: string): string[] {
   return ['convert', 'toV2Audio', name];
}

/**
 * Convert to beatmap v2.
 * ```ts
 * const converted = toV2AudioData(data);
 * ```
 *
 * **WARNING:** Chain and other new stuff will be gone!
 */
export function toV2AudioData<T extends IWrapAudioData>(
   data: T,
   fromVersion = data.version,
): T {
   logger.tWarn(tag('main'), 'Converting to beatmap v2 may lose certain data!');

   switch (fromVersion) {
      case 1:
      case 2:
      case 3:
      case 4:
         data.version = 2;
         break;
      default:
         logger.tWarn(
            tag('main'),
            'Unknown version: version not supported; misinput? Returning original data.',
         );
   }

   return data;
}
