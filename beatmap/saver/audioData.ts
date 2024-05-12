// deno-lint-ignore-file no-explicit-any
import logger from '../../logger.ts';
import type { IWrapAudio } from '../../types/beatmap/wrapper/audioData.ts';
import type { ISaveOptions } from '../../types/beatmap/options/saver.ts';
import { saveBeatmap, tag } from './_main.ts';

/**
 * Save beatmap audio data.
 * ```ts
 * const json = saveAudioData(data, 4);
 * console.log(json);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function saveAudioData<T extends Record<string, any>>(
   data: IWrapAudio,
   version: number,
   options?: ISaveOptions<IWrapAudio>,
): T {
   logger.tInfo(tag('saveAudioData'), 'Saving audio data to JSON');
   return saveBeatmap<T>('audioData', data, version, options);
}
