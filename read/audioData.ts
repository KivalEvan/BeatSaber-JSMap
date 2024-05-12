import type { GenericFilename } from '../types/beatmap/shared/filename.ts';
import logger from '../logger.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import type { IWrapAudio } from '../types/beatmap/wrapper/audioData.ts';
import type { IReadOptions } from '../types/bsmap/reader.ts';
import { handleRead, handleReadSync, tag } from './_main.ts';

/**
 * Asynchronously read beatmap audio data file.
 * ```ts
 * readAudioDataFile('EasyStandard.dat', 4).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readAudioDataFile(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null,
   options?: IReadOptions<IWrapAudio>,
): Promise<IWrapAudio>;
export function readAudioDataFile(
   path: LooseAutocomplete<GenericFilename>,
   options?: IReadOptions<IWrapAudio>,
): Promise<IWrapAudio>;
export function readAudioDataFile(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null | IReadOptions<IWrapAudio>,
   options?: IReadOptions<IWrapAudio>,
): Promise<IWrapAudio> {
   logger.tInfo(tag('readAudioDataFile'), 'Async reading audioData file');
   return handleRead('audioData', path, version, options);
}

/**
 * Synchronously read beatmap audio data file.
 * ```ts
 * const audioData = readAudioDataFileSync('EasyStandard.dat', 4);
 * console.log(audioData);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function readAudioDataFileSync(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null,
   options?: IReadOptions<IWrapAudio>,
): IWrapAudio;
export function readAudioDataFileSync(
   path: LooseAutocomplete<GenericFilename>,
   options?: IReadOptions<IWrapAudio>,
): IWrapAudio;
export function readAudioDataFileSync(
   path: LooseAutocomplete<GenericFilename>,
   version?: number | null | IReadOptions<IWrapAudio>,
   options?: IReadOptions<IWrapAudio>,
): IWrapAudio {
   logger.tInfo(tag('readAudioDataFileSync'), 'Sync reading audioData file');
   return handleReadSync('audioData', path, version, options);
}
