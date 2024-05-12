import type { GenericFilename } from '../types/beatmap/shared/filename.ts';
import logger from '../logger.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import type { IWrapBeatmap } from '../types/beatmap/wrapper/beatmap.ts';
import type { IReadOptions } from '../types/bsmap/reader.ts';
import { handleRead, handleReadSync, tag } from './_main.ts';

/**
 * Asynchronously read beatmap difficulty file.
 * ```ts
 * readDifficultyFile('EasyStandard.dat', 4).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readDifficultyFile(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null,
   options?: IReadOptions<IWrapBeatmap>,
): Promise<IWrapBeatmap>;
export function readDifficultyFile(
   path: LooseAutocomplete<GenericFilename>,
   options?: IReadOptions<IWrapBeatmap>,
): Promise<IWrapBeatmap>;
export function readDifficultyFile(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null | IReadOptions<IWrapBeatmap>,
   options?: IReadOptions<IWrapBeatmap>,
): Promise<IWrapBeatmap> {
   logger.tInfo(tag('readDifficultyFile'), 'Async reading difficulty file');
   return handleRead('difficulty', path, version, options);
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
export function readDifficultyFileSync(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null,
   options?: IReadOptions<IWrapBeatmap>,
): IWrapBeatmap;
export function readDifficultyFileSync(
   path: LooseAutocomplete<GenericFilename>,
   options?: IReadOptions<IWrapBeatmap>,
): IWrapBeatmap;
export function readDifficultyFileSync(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null | IReadOptions<IWrapBeatmap>,
   options?: IReadOptions<IWrapBeatmap>,
): IWrapBeatmap {
   logger.tInfo(tag('readDifficultyFileSync'), 'Sync reading difficulty file');
   return handleReadSync('difficulty', path, version, options);
}
