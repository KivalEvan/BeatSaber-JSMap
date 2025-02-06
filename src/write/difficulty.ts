// deno-lint-ignore-file no-explicit-any
import { logger } from '../logger.ts';
import type {
   InferBeatmap,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../types/beatmap/shared/infer.ts';
import type { IWriteOptions } from '../types/mod.ts';
import { handleWrite, handleWriteSync, tag } from './_main.ts';

/**
 * Asynchronously write beatmap difficulty file.
 * ```ts
 * await writeDifficultyFile(beatmap, 4);
 * ```
 */
export function writeDifficultyFile<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: IWriteOptions<'difficulty', TVersion, TWrapper, TSerial>,
): Promise<TSerial>;
export function writeDifficultyFile<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   data: TWrapper,
   options?: IWriteOptions<'difficulty', TVersion, TWrapper, TSerial>,
): Promise<TSerial>;
export function writeDifficultyFile<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | IWriteOptions<'difficulty', TVersion, TWrapper, TSerial>,
   options?: IWriteOptions<'difficulty', TVersion, TWrapper, TSerial>,
): Promise<TSerial> {
   logger.tInfo(tag('writeDifficultyFile'), 'Async writing difficulty file');
   return handleWrite<'difficulty', TVersion, TWrapper, TSerial>(
      'difficulty',
      data,
      version,
      options,
   );
}

/**
 * Synchronously write beatmap difficulty file.
 * ```ts
 * writeDifficultyFileSync(beatmap, 4);
 * ```
 */
export function writeDifficultyFileSync<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: IWriteOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TSerial;
export function writeDifficultyFileSync<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   data: TWrapper,
   options?: IWriteOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TSerial;
export function writeDifficultyFileSync<
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | IWriteOptions<'difficulty', TVersion, TWrapper, TSerial>,
   options?: IWriteOptions<'difficulty', TVersion, TWrapper, TSerial>,
): TSerial {
   logger.tInfo(tag('writeDifficultyFileSync'), 'Sync writing difficulty file');
   return handleWriteSync<'difficulty', TVersion, TWrapper, TSerial>(
      'difficulty',
      data,
      version,
      options,
   );
}
