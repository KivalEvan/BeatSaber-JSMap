import type { ICompatibilityOptions } from '../../../../types/beatmap/options/compatibility.ts';
import type { IWrapBeatmapAttribute } from '../../../../types/beatmap/wrapper/beatmap.ts';

/**
 * Checks if beatmap data is compatible with v4 `Lightshow` schema.
 */
export function compatLightshow<T extends IWrapBeatmapAttribute>(
   _bm: T,
   _options: ICompatibilityOptions,
) {
}
