// deno-lint-ignore-file no-explicit-any
import logger from '../logger.ts';
import type { IWrapBeatmap } from '../types/beatmap/wrapper/beatmap.ts';
import type { IWriteOptions } from '../types/mod.ts';
import { handleWrite, handleWriteSync, tag } from './_main.ts';

/**
 * Asynchronously write beatmap difficulty file.
 * ```ts
 * await writeDifficultyFile(beatmap, 4);
 * ```
 */
export function writeDifficultyFile(
   data: IWrapBeatmap,
   version?: number | null,
   options?: IWriteOptions<IWrapBeatmap>,
): Promise<Record<string, any>>;
export function writeDifficultyFile(
   data: IWrapBeatmap,
   options?: IWriteOptions<IWrapBeatmap>,
): Promise<Record<string, any>>;
export function writeDifficultyFile(
   data: IWrapBeatmap,
   version?: number | null | IWriteOptions<IWrapBeatmap>,
   options?: IWriteOptions<IWrapBeatmap>,
): Promise<Record<string, any>> {
   logger.tInfo(tag('writeDifficultyFile'), 'Async writing difficulty file');
   return handleWrite('difficulty', data, version, options);
}

/**
 * Synchronously write beatmap difficulty file.
 * ```ts
 * writeDifficultyFileSync(beatmap, 4);
 * ```
 */
export function writeDifficultyFileSync(
   data: IWrapBeatmap,
   version?: number | null,
   options?: IWriteOptions<IWrapBeatmap>,
): Record<string, any>;
export function writeDifficultyFileSync(
   data: IWrapBeatmap,
   options?: IWriteOptions<IWrapBeatmap>,
): Record<string, any>;
export function writeDifficultyFileSync(
   data: IWrapBeatmap,
   version?: number | null | IWriteOptions<IWrapBeatmap>,
   options?: IWriteOptions<IWrapBeatmap>,
): Record<string, any> {
   logger.tInfo(tag('writeDifficultyFileSync'), 'Sync writing difficulty file');
   return handleWriteSync('difficulty', data, version, options);
}
