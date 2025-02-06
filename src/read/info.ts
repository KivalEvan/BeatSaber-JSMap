// deno-lint-ignore-file no-explicit-any
import { logger } from '../logger.ts';
import type {
   InferBeatmap,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../types/beatmap/shared/infer.ts';
import type { IReadOptions } from '../types/bsmap/reader.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import { handleRead, handleReadSync, tag } from './_main.ts';

/**
 * Asynchronously read beatmap info file.
 *
 * @example
 * ```ts
 * readInfoFile('Info.dat', 4).then((data) => console.log(data));
 * ```
 *
 * Default to `Info.dat` if path not provided.
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readInfoFile<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   path?: LooseAutocomplete<'Info.dat' | 'info.dat'>,
   version?: TVersion | null,
   options?: IReadOptions<'info', TVersion, TWrapper, TSerial>,
): Promise<TWrapper>;
export function readInfoFile<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   path?: LooseAutocomplete<'Info.dat' | 'info.dat'>,
   options?: IReadOptions<'info', TVersion, TWrapper, TSerial>,
): Promise<TWrapper>;
export function readInfoFile<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   path: LooseAutocomplete<'Info.dat' | 'info.dat'> = 'Info.dat',
   version?: TVersion | null | IReadOptions<'info', TVersion, TWrapper, TSerial>,
   options?: IReadOptions<'info', TVersion, TWrapper, TSerial>,
): Promise<TWrapper> {
   logger.tInfo(tag('readInfoFile'), 'Async reading info file');
   return handleRead<'info', TVersion, TWrapper, TSerial>('info', path, version, options);
}

/**
 * Synchronously read beatmap info file.
 *
 * @example
 * ```ts
 * const info = readInfoFileSync('Info.dat', 4);
 * console.log(info);
 * ```
 *
 * Default to `Info.dat` if path not provided.
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readInfoFileSync<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   path?: LooseAutocomplete<'Info.dat' | 'info.dat'>,
   version?: TVersion | null,
   options?: IReadOptions<'info', TVersion, TWrapper, TSerial>,
): TWrapper;
export function readInfoFileSync<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   path?: LooseAutocomplete<'Info.dat' | 'info.dat'>,
   options?: IReadOptions<'info', TVersion, TWrapper, TSerial>,
): TWrapper;
export function readInfoFileSync<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   path: LooseAutocomplete<'Info.dat' | 'info.dat'> = 'Info.dat',
   version?: TVersion | null | IReadOptions<'info', TVersion, TWrapper, TSerial>,
   options?: IReadOptions<'info', TVersion, TWrapper, TSerial>,
): TWrapper {
   logger.tInfo(tag('readInfoFileSync'), 'Sync reading info file');
   return handleReadSync<'info', TVersion, TWrapper, TSerial>('info', path, version, options);
}
