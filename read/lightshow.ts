import type { GenericFilename } from '../types/beatmap/shared/filename.ts';
import logger from '../logger.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import type { IWrapBeatmap } from '../types/beatmap/wrapper/beatmap.ts';
import type { IReadOptions } from '../types/bsmap/reader.ts';
import { handleRead, handleReadSync, tag } from './_main.ts';

/**
 * Asynchronously read beatmap lightshow file.
 * ```ts
 * readLightshowFile('Lightshow.dat', 4).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readLightshowFile(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null,
   options?: IReadOptions<IWrapBeatmap>,
): Promise<IWrapBeatmap>;
export function readLightshowFile(
   path: LooseAutocomplete<GenericFilename>,
   options?: IReadOptions<IWrapBeatmap>,
): Promise<IWrapBeatmap>;
export function readLightshowFile(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null | IReadOptions<IWrapBeatmap>,
   options?: IReadOptions<IWrapBeatmap>,
): Promise<IWrapBeatmap> {
   logger.tInfo(tag('readLightshowFile'), 'Async reading lightshow file');
   return handleRead('lightshow', path, version, options);
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
export function readLightshowFileSync(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null,
   options?: IReadOptions<IWrapBeatmap>,
): IWrapBeatmap;
export function readLightshowFileSync(
   path: LooseAutocomplete<GenericFilename>,
   options?: IReadOptions<IWrapBeatmap>,
): IWrapBeatmap;
export function readLightshowFileSync(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null | IReadOptions<IWrapBeatmap>,
   options?: IReadOptions<IWrapBeatmap>,
): IWrapBeatmap {
   logger.tInfo(tag('readLightshowFileSync'), 'Sync reading lightshow file');
   return handleReadSync('lightshow', path, version, options);
}
