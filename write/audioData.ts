// deno-lint-ignore-file no-explicit-any
import logger from '../logger.ts';
import type { IWrapAudio } from '../types/beatmap/wrapper/audioData.ts';
import type { IWriteOptions } from '../types/bsmap/writer.ts';
import { handleWrite, handleWriteSync, tag } from './_main.ts';

/**
 * Asynchronously write beatmap audio data file.
 * ```ts
 * await writeAudioDataFile(audio, 4);
 * ```
 */
export function writeAudioDataFile(
   data: IWrapAudio,
   version: number,
   options?: IWriteOptions<IWrapAudio>,
): Promise<Record<string, any>> {
   logger.tInfo(tag('writeAudioDataFile'), 'Async writing audio data file');
   return handleWrite('audioData', data, version, options);
}

/**
 * Synchronously write beatmap audio data file.
 * ```ts
 * writeAudioDataFileSync(audio, 4);
 * ```
 */
export function writeAudioDataFileSync(
   data: IWrapAudio,
   version: number,
   options?: IWriteOptions<IWrapAudio>,
): Record<string, any> {
   logger.tInfo(tag('writeAudioDataFileSync'), 'Sync writing audio data file');
   return handleWriteSync('audioData', data, version, options);
}
