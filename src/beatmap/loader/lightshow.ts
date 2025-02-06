// deno-lint-ignore-file no-explicit-any
import { logger } from '../../logger.ts';
import type { ILoadOptions } from '../../types/beatmap/options/loader.ts';
import type {
   InferBeatmap,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../../types/beatmap/shared/infer.ts';
import { loadBeatmap, tag } from './_main.ts';

/**
 * Load beatmap lightshow.
 * ```ts
 * const data = loadLightshow(json, 4);
 * console.log(data);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function loadLightshow<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   json: TSerial,
   version?: TVersion | null,
   options?: ILoadOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TWrapper;
export function loadLightshow<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   json: TSerial,
   options?: ILoadOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TWrapper;
export function loadLightshow<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   json: TSerial,
   version?: TVersion | null | ILoadOptions<'lightshow', TVersion, TWrapper, TSerial>,
   options?: ILoadOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TWrapper {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   logger.tInfo(tag('loadLightshow'), 'Loading lightshow from JSON');
   return loadBeatmap('lightshow', json, ver, opt);
}
