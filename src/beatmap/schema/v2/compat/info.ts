import { getLogger } from '../../../../logger.ts';
import type { ICompatibilityOptions } from '../../../mapping/types/compatibility.ts';
import type { IWrapInfo } from '../../wrapper/types/info.ts';
import { tag } from './_common.ts';

/**
 * Check if beatmap info is compatible with v2 `Info` schema.
 */
export function compatInfo<T extends IWrapInfo>(
   info: T,
   options: ICompatibilityOptions,
) {
   const logger = getLogger();

   const hasIncompat = info.audio.lufs !== 0 ||
      info.songPreviewFilename !== info.audio.filename;

   if (hasIncompat) {
      if (options.throwOn.incompatibleObject) {
         throw new Error('Info is not compatible with v2');
      } else {
         logger?.tWarn(
            tag('compatInfo'),
            'Info is not compatible with v2, certain data may be lost!',
         );
      }
   }
}
