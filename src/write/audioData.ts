// deno-lint-ignore-file no-explicit-any
import { logger } from '../logger.ts';
import type {
   InferBeatmapAttribute,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../types/beatmap/shared/infer.ts';
import type { IWriteOptions } from '../types/bsmap/writer.ts';
import { handleWrite, handleWriteSync, tag } from './_main.ts';

/**
 * Asynchronously write beatmap audio data file.
 * ```ts
 * await writeAudioDataFile(audio, 4);
 * ```
 */
export function writeAudioDataFile<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: IWriteOptions<'audioData', TVersion, TWrapper, TSerial>,
): Promise<TSerial>;
export function writeAudioDataFile<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   data: TWrapper,
   options?: IWriteOptions<'audioData', TVersion, TWrapper, TSerial>,
): Promise<TSerial>;
export function writeAudioDataFile<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | IWriteOptions<'audioData', TVersion, TWrapper, TSerial>,
   options?: IWriteOptions<'audioData', TVersion, TWrapper, TSerial>,
): Promise<TSerial> {
   logger.tInfo(tag('writeAudioDataFile'), 'Async writing audio data file');
   return handleWrite<'audioData', TVersion, TWrapper, TSerial>(
      'audioData',
      data,
      version,
      options,
   );
}

/**
 * Synchronously write beatmap audio data file.
 * ```ts
 * writeAudioDataFileSync(audio, 4);
 * ```
 */
export function writeAudioDataFileSync<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null,
   options?: IWriteOptions<'audioData', TVersion, TWrapper, TSerial>,
): TSerial;
export function writeAudioDataFileSync<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   data: TWrapper,
   options?: IWriteOptions<'audioData', TVersion, TWrapper, TSerial>,
): TSerial;
export function writeAudioDataFileSync<
   TVersion extends InferBeatmapVersion<'audioData'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'audioData'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'audioData', TVersion>,
>(
   data: TWrapper,
   version?: TVersion | null | IWriteOptions<'audioData', TVersion, TWrapper, TSerial>,
   options?: IWriteOptions<'audioData', TVersion, TWrapper, TSerial>,
): TSerial {
   logger.tInfo(tag('writeAudioDataFileSync'), 'Sync writing audio data file');
   return handleWriteSync<'audioData', TVersion, TWrapper, TSerial>(
      'audioData',
      data,
      version,
      options,
   );
}
