// deno-lint-ignore-file no-explicit-any
import { getLogger } from '../../logger.ts';
import type { ILoadOptions } from './types.ts';
import type {
   InferBeatmapSerial,
   InferBeatmapVersion,
   InferBeatmapWrapper,
} from '../schema/shared/types/infer.ts';
import { loadBeatmap, tag } from './_main.ts';

/**
 * Load beatmap info.
 * ```ts
 * const data = loadInfo(json, 4);
 * console.log(data);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function loadInfo<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   json: TSerial,
   version?: TVersion | null,
   options?: ILoadOptions<'info', TVersion, TWrapper, TSerial>,
): TWrapper;
export function loadInfo<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   json: TSerial,
   options?: ILoadOptions<'info', TVersion, TWrapper, TSerial>,
): TWrapper;
export function loadInfo<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   json: TSerial,
   version?: TVersion | null | ILoadOptions<'info', TVersion, TWrapper, TSerial>,
   options?: ILoadOptions<'info', TVersion, TWrapper, TSerial>,
): TWrapper {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   const logger = getLogger();
   logger?.tInfo(tag('loadInfo'), 'Loading info from JSON');
   return loadBeatmap('info', json, ver, opt);
}
