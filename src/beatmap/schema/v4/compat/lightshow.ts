import type { ICompatibilityOptions } from '../../../mapping/types/compatibility.ts';
import type { IWrapBeatmap } from '../../wrapper/types/beatmap.ts';

/**
 * Checks if beatmap data is compatible with v4 `Lightshow` schema.
 */
export function compatLightshow<T extends IWrapBeatmap>(
   _bm: T,
   _options: ICompatibilityOptions,
) {
}
