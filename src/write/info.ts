// deno-lint-ignore-file no-explicit-any
import { getLogger } from '../logger.ts';
import type {
   InferBeatmap,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../beatmap/schema/shared/types/infer.ts';
import type { IWriteOptions } from './types.ts';
import { handleWrite, handleWriteSync, tag } from './_main.ts';

/**
 * Asynchronously write beatmap info file.
 * ```ts
 * await writeInfoFile(info, 4);
 * ```
 */
export function writeInfoFile<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: IWriteOptions<'info', TVersion, TWrapper, TSerial>,
): Promise<TSerial>;
export function writeInfoFile<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   data: TWrapper,
   options?: IWriteOptions<'info', TVersion, TWrapper, TSerial>,
): Promise<TSerial>;
export function writeInfoFile<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | IWriteOptions<'info', TVersion, TWrapper, TSerial>,
   options?: IWriteOptions<'info', TVersion, TWrapper, TSerial>,
): Promise<TSerial> {
   const logger = getLogger();
   logger?.tInfo(tag('writeInfoFile'), 'Async writing info file');
   return handleWrite<'info', TVersion, TWrapper, TSerial>('info', data, version, options);
}

/**
 * Synchronously write beatmap info file.
 * ```ts
 * writeInfoFileSync(info, 4);
 * ```
 */
export function writeInfoFileSync<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: IWriteOptions<'info', TVersion, TWrapper, TSerial>,
): TSerial;
export function writeInfoFileSync<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   data: TWrapper,
   options?: IWriteOptions<'info', TVersion, TWrapper, TSerial>,
): TSerial;
export function writeInfoFileSync<
   TVersion extends InferBeatmapVersion<'info'>,
   TWrapper extends Record<string, any> = InferBeatmap<'info'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'info', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | IWriteOptions<'info', TVersion, TWrapper, TSerial>,
   options?: IWriteOptions<'info', TVersion, TWrapper, TSerial>,
): TSerial {
   const logger = getLogger();
   logger?.tInfo(tag('writeInfoFileSync'), 'Sync writing info file');
   return handleWriteSync<'info', TVersion, TWrapper, TSerial>('info', data, version, options);
}
