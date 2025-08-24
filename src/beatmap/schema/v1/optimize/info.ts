import { round } from '../../../../utils/math/helpers.ts';
import type { IOptimizeOptions } from '../../../mapping/types/optimize.ts';
import type { IInfo } from '../types/info.ts';

/**
 * Optimize v1 `Info` schema data.
 */
export function optimizeInfo(data: IInfo, options: IOptimizeOptions) {
   if (options.floatTrim) {
      data.previewDuration = round(data.previewDuration, options.floatTrim);
      data.previewStartTime = round(data.previewStartTime, options.floatTrim);
   }

   if (options.stringTrim) {
      data.authorName = data.authorName.trim();
      data.songName = data.songName.trim();
      data.songSubName = data.songSubName.trim();
   }
}
