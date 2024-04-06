import type { IOptimizeOptionsAudioData } from '../types/bsmap/optimize.ts';
import logger from '../logger.ts';
import { defaultOptions } from './options.ts';
import { tag } from './_common.ts';

export function audioData(
   // deno-lint-ignore no-explicit-any
   _audioData: Record<string, any>,
   _version: number,
   options: IOptimizeOptionsAudioData = {},
) {
   const _opt: Required<IOptimizeOptionsAudioData> = {
      enabled: options.enabled ?? defaultOptions.audioData.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.audioData.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.audioData.stringTrim,
      purgeZeros: options.purgeZeros ?? defaultOptions.audioData.purgeZeros,
      deduplicate: options.deduplicate ?? defaultOptions.audioData.deduplicate,
      throwError: options.throwError ?? defaultOptions.audioData.throwError,
   };

   logger.tInfo(tag('audioData'), `Optimising audio data`);
}
