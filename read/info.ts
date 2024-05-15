import logger from '../logger.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import type { IWrapInfo } from '../types/beatmap/wrapper/info.ts';
import type { IReadOptions } from '../types/bsmap/reader.ts';
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
export function readInfoFile(
   path?: LooseAutocomplete<'Info.dat' | 'info.dat'>,
   version?: number | null,
   options?: IReadOptions<IWrapInfo>,
): Promise<IWrapInfo>;
export function readInfoFile(
   path?: LooseAutocomplete<'Info.dat' | 'info.dat'>,
   options?: IReadOptions<IWrapInfo>,
): Promise<IWrapInfo>;
export function readInfoFile(
   path: LooseAutocomplete<'Info.dat' | 'info.dat'> = 'Info.dat',
   version?: number | null | IReadOptions<IWrapInfo>,
   options?: IReadOptions<IWrapInfo>,
): Promise<IWrapInfo> {
   logger.tInfo(tag('readInfoFile'), 'Async reading info file');
   return handleRead('info', path, version, options);
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
export function readInfoFileSync(
   path?: LooseAutocomplete<'Info.dat' | 'info.dat'>,
   version?: number | null,
   options?: IReadOptions<IWrapInfo>,
): IWrapInfo;
export function readInfoFileSync(
   path?: LooseAutocomplete<'Info.dat' | 'info.dat'>,
   options?: IReadOptions<IWrapInfo>,
): IWrapInfo;
export function readInfoFileSync(
   path: LooseAutocomplete<'Info.dat' | 'info.dat'> = 'Info.dat',
   version?: number | null | IReadOptions<IWrapInfo>,
   options?: IReadOptions<IWrapInfo>,
): IWrapInfo {
   logger.tInfo(tag('readInfoFileSync'), 'Sync reading info file');
   return handleReadSync('info', path, version, options);
}
