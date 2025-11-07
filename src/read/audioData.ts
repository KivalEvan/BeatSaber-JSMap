// deno-lint-ignore-file no-explicit-any
import { getLogger } from '../logger.ts';
import type { GenericAudioDataFilename } from '../beatmap/schema/shared/types/filename.ts';
import type {
   InferBeatmap,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../beatmap/schema/shared/types/infer.ts';
import type { IReadOptions } from './types.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import { handleRead, handleReadSync, tag } from './_main.ts';

/**
 * Asynchronously read beatmap audio data file.
 * ```ts
 * readAudioDataFile('AudioData.dat', 4).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readAudioDataFile<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   path: LooseAutocomplete<GenericAudioDataFilename>,
   version?: TVersion | null,
   options?: IReadOptions<'audioData', TVersion, TWrapper, TSerial>,
): Promise<TWrapper>;
export function readAudioDataFile<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   path: LooseAutocomplete<GenericAudioDataFilename>,
   options?: IReadOptions<'audioData', TVersion, TWrapper, TSerial>,
): Promise<TWrapper>;
export function readAudioDataFile<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   path: LooseAutocomplete<GenericAudioDataFilename>,
   version?: TVersion | null | IReadOptions<'audioData', TVersion, TWrapper, TSerial>,
   options?: IReadOptions<'audioData', TVersion, TWrapper, TSerial>,
): Promise<TWrapper> {
   const logger = getLogger();
   logger?.tInfo(tag('readAudioDataFile'), 'Async reading audio data file');
   return handleRead<'audioData', TVersion, TWrapper, TSerial>('audioData', path, version, options);
}

/**
 * Synchronously read beatmap audio data file.
 * ```ts
 * const audioData = readAudioDataFileSync('AudioData.dat', 4);
 * console.log(audioData);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readAudioDataFileSync<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   path: LooseAutocomplete<GenericAudioDataFilename>,
   version?: TVersion | null,
   options?: IReadOptions<'audioData', TVersion, TWrapper, TSerial>,
): TWrapper;
export function readAudioDataFileSync<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   path: LooseAutocomplete<GenericAudioDataFilename>,
   options?: IReadOptions<'audioData', TVersion, TWrapper, TSerial>,
): TWrapper;
export function readAudioDataFileSync<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmap<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   path: LooseAutocomplete<GenericAudioDataFilename>,
   version?: TVersion | null | IReadOptions<'audioData', TVersion, TWrapper, TSerial>,
   options?: IReadOptions<'audioData', TVersion, TWrapper, TSerial>,
): TWrapper {
   const logger = getLogger();
   logger?.tInfo(tag('readAudioDataFileSync'), 'Sync reading audio data file');
   return handleReadSync<'audioData', TVersion, TWrapper, TSerial>(
      'audioData',
      path,
      version,
      options,
   );
}
