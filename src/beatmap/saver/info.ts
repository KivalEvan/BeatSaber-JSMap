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
 * Save beatmap info.
 * ```ts
 * const json = saveInfo(data, 4);
 * console.log(json);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function saveInfo<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: ISaveOptions<'info', TVersion, TWrapper, TSerial>,
): TSerial;
export function saveInfo<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   data: TWrapper,
   options?: ISaveOptions<'info', TVersion, TWrapper, TSerial>,
): TSerial;
export function saveInfo<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | ISaveOptions<'info', TVersion, TWrapper, TSerial>,
   options?: ISaveOptions<'info', TVersion, TWrapper, TSerial>,
): TSerial {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   logger.tInfo(tag('saveInfo'), 'Saving info to JSON');
   return saveBeatmap('info', data, ver, opt);
}
