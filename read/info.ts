import type { GenericFilename } from '../types/beatmap/shared/filename.ts';
import logger from '../logger.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import type { IWrapInfo } from '../types/beatmap/wrapper/info.ts';
import type { IReadOptions } from '../types/bsmap/reader.ts';
import { handleRead, handleReadSync, tag } from './_main.ts';

/**
 * Asynchronously read beatmap info file.
 * ```ts
 * readInfoFile('Info.dat', 4).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readInfoFile(
   path?: LooseAutocomplete<GenericFilename>,
   version?: number | null,
   options?: IReadOptions<IWrapInfo>,
): Promise<IWrapInfo>;
export function readInfoFile(
   path?: LooseAutocomplete<GenericFilename>,
   options?: IReadOptions<IWrapInfo>,
): Promise<IWrapInfo>;
export function readInfoFile(
   path: LooseAutocomplete<GenericFilename> = 'Info.dat',
   version?: number | null | IReadOptions<IWrapInfo>,
   options?: IReadOptions<IWrapInfo>,
): Promise<IWrapInfo> {
   logger.tInfo(tag('readInfoFile'), 'Async reading info file');
   return handleRead('info', path, version, options);
}

/**
 * Synchronously read beatmap info file.
 * ```ts
 * const info = readInfoFileSync('Info.dat', 4);
 * console.log(info);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readInfoFileSync(
   path?: LooseAutocomplete<GenericFilename>,
   version?: number | null,
   options?: IReadOptions<IWrapInfo>,
): IWrapInfo;
export function readInfoFileSync(
   path?: LooseAutocomplete<GenericFilename>,
   options?: IReadOptions<IWrapInfo>,
): IWrapInfo;
export function readInfoFileSync(
   path: LooseAutocomplete<GenericFilename> = 'Info.dat',
   version?: number | null | IReadOptions<IWrapInfo>,
   options?: IReadOptions<IWrapInfo>,
): IWrapInfo {
   logger.tInfo(tag('readInfoFileSync'), 'Sync reading info file');
   return handleReadSync('info', path, version, options);
}
