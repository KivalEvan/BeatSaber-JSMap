// deno-lint-ignore-file no-explicit-any
import { logger } from '../../logger.ts';
import type { ILoadOptions } from './types.ts';
import type {
   InferBeatmap,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../schema/shared/types/infer.ts';
import { loadBeatmap, tag } from './_main.ts';

/**
 * Load beatmap difficulty.
 * ```ts
 * const data = loadDifficulty(json, 4);
 * console.log(data);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function loadDifficulty<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   json: TSerial,
   version?: TVersion | null,
   options?: ILoadOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TWrapper;
export function loadDifficulty<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   json: TSerial,
   options?: ILoadOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TWrapper;
export function loadDifficulty<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   json: TSerial,
   version?: TVersion | null | ILoadOptions<'difficulty', TVersion, TWrapper, TSerial>,
   options?: ILoadOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TWrapper {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   logger.tInfo(tag('loadDifficulty'), 'Loading difficulty from JSON');
   return loadBeatmap('difficulty', json, ver, opt);
}
