// deno-lint-ignore-file no-explicit-any
import { logger } from '../../logger.ts';
import type { ISaveOptions } from './types.ts';
import type {
   InferBeatmap,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../schema/shared/types/infer.ts';
import { saveBeatmap, tag } from './_main.ts';

/**
 * Save beatmap lightshow.
 * ```ts
 * const json = saveLightshow(data, 4);
 * console.log(json);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function saveLightshow<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: ISaveOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TSerial;
export function saveLightshow<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   data: TWrapper,
   options?: ISaveOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TSerial;
export function saveLightshow<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | ISaveOptions<'lightshow', TVersion, TWrapper, TSerial>,
   options?: ISaveOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TSerial {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   logger.tInfo(tag('saveLightshow'), 'Saving lightshow to JSON');
   return saveBeatmap('lightshow', data, ver, opt);
}
