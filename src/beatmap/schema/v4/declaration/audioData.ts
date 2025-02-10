import { array, integer, minValue, number, object, pipe, string } from '@valibot/valibot';
import type { IAudio, IAudioBPM, IAudioLUFS } from '../../../../types/beatmap/v4/audioData.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import { VersionSchema } from '../../shared/declaration/mod.ts';

/**
 * Schema declaration for v4 `Audio Data BPM`.
 */
export const AudioDataBPMSchema = object<InferObjectEntries<IAudioBPM>>({
   si: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   ei: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   sb: field(number(), {
      version: '4.0.0',
   }),
   eb: field(number(), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Audio Data LUFS`.
 */
export const AudioDataLUFSSchema = object<InferObjectEntries<IAudioLUFS>>({
   si: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   ei: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   l: field(number(), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Audio`.
 */
export const AudioDataSchema = entity<
   InferObjectEntries<IAudio>
>((x) => x.version, {
   version: field(mask<'4.0.0'>(VersionSchema), {
      version: '4.0.0',
   }),
   songChecksum: field(string(), {
      version: '4.0.0',
   }),
   songSampleCount: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   songFrequency: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   bpmData: field(array(AudioDataBPMSchema), {
      version: '4.0.0',
   }),
   lufsData: field(array(AudioDataLUFSSchema), {
      version: '4.0.0',
   }),
});
