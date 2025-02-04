// deno-lint-ignore-file no-explicit-any
import { logger } from '../logger.ts';
import type { GenericBeatmapFilename } from '../types/beatmap/shared/filename.ts';
import type {
   InferBeatmapAttribute,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../types/beatmap/shared/infer.ts';
import type { IReadOptions } from '../types/bsmap/reader.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import { handleRead, handleReadSync, tag } from './_main.ts';

/**
 * Asynchronously read beatmap difficulty file.
 * ```ts
 * readDifficultyFile('EasyStandard.dat', 4).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readDifficultyFile<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   path: LooseAutocomplete<GenericBeatmapFilename>,
   version?: TVersion | null,
   options?: IReadOptions<'difficulty', TVersion, TWrapper, TSerial>,
): Promise<TWrapper>;
export function readDifficultyFile<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   path: LooseAutocomplete<GenericBeatmapFilename>,
   options?: IReadOptions<'difficulty', TVersion, TWrapper, TSerial>,
): Promise<TWrapper>;
export function readDifficultyFile<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   path: LooseAutocomplete<GenericBeatmapFilename>,
   version?: TVersion | null | IReadOptions<'difficulty', TVersion, TWrapper, TSerial>,
   options?: IReadOptions<'difficulty', TVersion, TWrapper, TSerial>,
): Promise<TWrapper> {
   logger.tInfo(tag('readDifficultyFile'), 'Async reading difficulty file');
   return handleRead<'difficulty', TVersion, TWrapper, TSerial>(
      'difficulty',
      path,
      version,
      options,
   );
}

/**
 * Synchronously read beatmap difficulty file.
 * ```ts
 * const difficulty = readDifficultyFileSync('EasyStandard.dat', 4);
 * console.log(difficulty);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readDifficultyFileSync<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   path: LooseAutocomplete<GenericBeatmapFilename>,
   version?: TVersion | null,
   options?: IReadOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TWrapper;
export function readDifficultyFileSync<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   path: LooseAutocomplete<GenericBeatmapFilename>,
   options?: IReadOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TWrapper;
export function readDifficultyFileSync<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   path: LooseAutocomplete<GenericBeatmapFilename>,
   version?: TVersion | null | IReadOptions<'difficulty', TVersion, TWrapper, TSerial>,
   options?: IReadOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TWrapper {
   logger.tInfo(tag('readDifficultyFileSync'), 'Sync reading difficulty file');
   return handleReadSync<'difficulty', TVersion, TWrapper, TSerial>(
      'difficulty',
      path,
      version,
      options,
   );
}
