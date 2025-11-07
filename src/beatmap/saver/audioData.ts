// deno-lint-ignore-file no-explicit-any
import { getLogger } from '../../logger.ts';
import type { ISaveOptions } from './types.ts';
import type {
   InferBeatmap,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../schema/shared/types/infer.ts';
import { saveBeatmap, tag } from './_main.ts';

/**
 * Save beatmap audio data.
 * ```ts
 * const json = saveAudioData(data, 4);
 * console.log(json);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function saveAudioData<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: ISaveOptions<'audioData', TVersion, TWrapper, TSerial>,
): TSerial;
export function saveAudioData<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   data: TWrapper,
   options?: ISaveOptions<'audioData', TVersion, TWrapper, TSerial>,
): TSerial;
export function saveAudioData<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | ISaveOptions<'audioData', TVersion, TWrapper, TSerial>,
   options?: ISaveOptions<'audioData', TVersion, TWrapper, TSerial>,
): TSerial {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   const logger = getLogger();
   logger?.tInfo(tag('saveAudioData'), 'Saving audio data to JSON');
   return saveBeatmap('audioData', data, ver, opt);
}
