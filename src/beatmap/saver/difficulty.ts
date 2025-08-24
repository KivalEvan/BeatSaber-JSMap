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
 * Save beatmap difficulty.
 * ```ts
 * const json = saveDifficulty(data, 4);
 * console.log(json);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function saveDifficulty<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: ISaveOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TSerial;
export function saveDifficulty<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<
      'difficulty',
      TVersion
   >,
>(
   data: TWrapper,
   options?: ISaveOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TSerial;
export function saveDifficulty<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | ISaveOptions<'difficulty', TVersion, TWrapper, TSerial>,
   options?: ISaveOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TSerial {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   logger.tInfo(tag('saveDifficulty'), 'Saving difficulty to JSON');
   return saveBeatmap('difficulty', data, ver, opt);
}
