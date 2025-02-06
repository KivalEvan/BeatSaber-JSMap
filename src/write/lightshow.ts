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
 * Asynchronously write beatmap lightshow file.
 * ```ts
 * await writeLightshowFile(beatmap, 4);
 * ```
 */
export function writeLightshowFile<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: IWriteOptions<'lightshow', TVersion, TWrapper, TSerial>,
): Promise<TSerial>;
export function writeLightshowFile<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   data: TWrapper,
   options?: IWriteOptions<'lightshow', TVersion, TWrapper, TSerial>,
): Promise<TSerial>;
export function writeLightshowFile<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | IWriteOptions<'lightshow', TVersion, TWrapper, TSerial>,
   options?: IWriteOptions<'lightshow', TVersion, TWrapper, TSerial>,
): Promise<TSerial> {
   logger.tInfo(tag('writeLightshowFile'), 'Async writing lightshow file');
   return handleWrite<'lightshow', TVersion, TWrapper, TSerial>(
      'lightshow',
      data,
      version,
      options,
   );
}

/**
 * Synchronously write beatmap lightshow file.
 * ```ts
 * writeLightshowFileSync(beatmap, 4);
 * ```
 */
export function writeLightshowFileSync<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: IWriteOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TSerial;
export function writeLightshowFileSync<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   data: TWrapper,
   options?: IWriteOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TSerial;
export function writeLightshowFileSync<
   TVersion extends InferBeatmapVersion<'lightshow'>,
   TWrapper extends Record<string, any> = InferBeatmap<'lightshow'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'lightshow', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | IWriteOptions<'lightshow', TVersion, TWrapper, TSerial>,
   options?: IWriteOptions<'lightshow', TVersion, TWrapper, TSerial>,
): TSerial {
   logger.tInfo(tag('writeLightshowFileSync'), 'Sync writing lightshow file');
   return handleWriteSync<'lightshow', TVersion, TWrapper, TSerial>(
      'lightshow',
      data,
      version,
      options,
   );
}
