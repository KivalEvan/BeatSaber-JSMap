import { getLogger } from '../../../../logger.ts';
import type { ICompatibilityOptions } from '../../../mapping/types/compatibility.ts';
import type { IWrapInfo } from '../../wrapper/types/info.ts';
import { tag } from './_common.ts';

/**
 * Check if beatmap info is compatible with v1 `Info` schema.
 */
export function compatInfo<T extends IWrapInfo>(info: T, options: ICompatibilityOptions) {
   const logger = getLogger();

   const hasIncompat = info.audio.lufs !== 0 ||
      info.audio.shufflePeriod !== 0.5 ||
      info.audio.shuffle !== 0 ||
      info.audio.audioOffset !== 0 ||
      info.songPreviewFilename !== info.audio.filename ||
      !!info.environmentNames.length ||
      !!info.colorSchemes.length ||
      info.difficulties.some((x) => !!x.authors.mappers.length || !!x.authors.lighters.length);

   if (hasIncompat) {
      if (options.throwOn.incompatibleObject) {
         throw new Error('Info is not compatible with v1');
      } else {
         logger?.tWarn(
            tag('compatInfo'),
            'Info is not compatible with v1, certain data may be lost!',
         );
      }
   }
}
