// deno-lint-ignore-file no-explicit-any
import logger from '../logger.ts';
import type { IWrapInfo } from '../types/beatmap/wrapper/info.ts';
import type { IWriteOptions } from '../types/mod.ts';
import { handleWrite, handleWriteSync, tag } from './_main.ts';

/**
 * Asynchronously write beatmap info file.
 * ```ts
 * await writeInfoFile(beatmap, 4);
 * ```
 */
export function writeInfoFile(
   data: IWrapInfo,
   version: number,
   options?: IWriteOptions<IWrapInfo>,
): Promise<Record<string, any>> {
   logger.tInfo(tag('writeInfoFile'), 'Async writing info file');
   return handleWrite('info', data, version, options);
}

/**
 * Synchronously write beatmap info file.
 * ```ts
 * writeInfoFileSync(beatmap, 4);
 * ```
 */
export function writeInfoFileSync(
   data: IWrapInfo,
   version: number,
   options?: IWriteOptions<IWrapInfo>,
): Record<string, any> {
   logger.tInfo(tag('writeInfoFileSync'), 'Sync writing info file');
   return handleWriteSync('info', data, version, options);
}
