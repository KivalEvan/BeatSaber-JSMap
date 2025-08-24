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
 * Load beatmap audio data.
 * ```ts
 * const data = loadAudioData(json, 4);
 * console.log(data);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function loadAudioData<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   json: TSerial,
   version?: TVersion | null,
   options?: ILoadOptions<'audioData', TVersion, TWrapper, TSerial>,
): TWrapper;
export function loadAudioData<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   json: TSerial,
   options?: ILoadOptions<'audioData', TVersion, TWrapper, TSerial>,
): TWrapper;
export function loadAudioData<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   json: TSerial,
   version?: TVersion | null | ILoadOptions<'audioData', TVersion, TWrapper, TSerial>,
   options?: ILoadOptions<'audioData', TVersion, TWrapper, TSerial>,
): TWrapper {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   logger.tInfo(tag('loadAudioData'), 'Loading audio data from JSON');
   return loadBeatmap('audioData', json, ver, opt);
}
