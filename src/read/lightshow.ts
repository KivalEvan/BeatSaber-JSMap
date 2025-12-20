// deno-lint-ignore-file no-explicit-any
import { getLogger } from '../logger.ts';
import type { GenericLightshowFilename } from '../beatmap/schema/shared/types/filename.ts';
import type {
   InferBeatmapSerial,
   InferBeatmapVersion,
   InferBeatmapWrapper,
} from '../beatmap/schema/shared/types/infer.ts';
import type { IReadOptions } from './types.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import { handleRead, handleReadSync, tag } from './_main.ts';

/**
 * Asynchronously read beatmap lightshow file.
 * ```ts
 * readLightshowFile('Lightshow.dat', 4).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readLightshowFile<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   path: LooseAutocomplete<GenericLightshowFilename>,
   version?: TVersion | null,
   options?: IReadOptions<'lightshow', TVersion, TWrapper, TSerial>,
): Promise<TWrapper>;
export function readLightshowFile<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   path: LooseAutocomplete<GenericLightshowFilename>,
   options?: IReadOptions<'lightshow', TVersion, TWrapper, TSerial>,
): Promise<TWrapper>;
export function readLightshowFile<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   path: LooseAutocomplete<GenericLightshowFilename>,
   version?: TVersion | null | IReadOptions<'lightshow', TVersion, TWrapper, TSerial>,
   options?: IReadOptions<'lightshow', TVersion, TWrapper, TSerial>,
): Promise<TWrapper> {
   const logger = getLogger();
   logger?.tInfo(tag('readLightshowFile'), 'Async reading lightshow file');
   return handleRead<'lightshow', TVersion, TWrapper, TSerial>('lightshow', path, version, options);
}

/**
 * Synchronously read beatmap lightshow file.
 * ```ts
 * const lightshow = readLightshowFileSync('Lightshow.dat', 4);
 * console.log(lightshow);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readLightshowFileSync<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   path: LooseAutocomplete<GenericLightshowFilename>,
   version?: TVersion | null,
   options?: IReadOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TWrapper;
export function readLightshowFileSync<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   path: LooseAutocomplete<GenericLightshowFilename>,
   options?: IReadOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TWrapper;
export function readLightshowFileSync<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   path: LooseAutocomplete<GenericLightshowFilename>,
   version?: TVersion | null | IReadOptions<'lightshow', TVersion, TWrapper, TSerial>,
   options?: IReadOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TWrapper {
   const logger = getLogger();
   logger?.tInfo(tag('readLightshowFileSync'), 'Sync reading lightshow file');
   return handleReadSync<'lightshow', TVersion, TWrapper, TSerial>(
      'lightshow',
      path,
      version,
      options,
   );
}
