import type { ICompatibilityOptions } from '../../../../types/beatmap/options/compatibility.ts';
import type { IWrapBeatmap } from '../../../../types/beatmap/wrapper/beatmap.ts';

/**
 * Checks if beatmap data is compatible with v4 `Lightshow` schema.
 */
export function compatLightshow<T extends IWrapBeatmap>(
   _bm: T,
   _options: ICompatibilityOptions,
) {
}
