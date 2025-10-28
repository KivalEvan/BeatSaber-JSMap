import * as v from 'valibot';
import type { IAudio, IAudioBPM, IAudioLUFS } from '../types/audioData.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import { VersionSchema } from '../../shared/declaration/mod.ts';

/**
 * Schema declaration for v4 `Audio Data BPM`.
 */
export const AudioDataBPMSchema: v.ObjectSchema<
   InferObjectEntries<IAudioBPM>,
   undefined
> = v.object<InferObjectEntries<IAudioBPM>>({
   si: field(v.pipe(v.number(), v.integer(), v.minValue(0)), {
      version: '4.0.0',
   }),
   ei: field(v.pipe(v.number(), v.integer(), v.minValue(0)), {
      version: '4.0.0',
   }),
   sb: field(v.number(), {
      version: '4.0.0',
   }),
   eb: field(v.number(), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Audio Data LUFS`.
 */
export const AudioDataLUFSSchema: v.ObjectSchema<
   InferObjectEntries<IAudioLUFS>,
   undefined
> = v.object<InferObjectEntries<IAudioLUFS>>({
   si: field(v.pipe(v.number(), v.integer(), v.minValue(0)), {
      version: '4.0.0',
   }),
   ei: field(v.pipe(v.number(), v.integer(), v.minValue(0)), {
      version: '4.0.0',
   }),
   l: field(v.number(), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Audio`.
 */
export const AudioDataSchema: v.ObjectSchema<
   InferObjectEntries<IAudio>,
   undefined
> = entity<InferObjectEntries<IAudio>>((x) => x.version || '4.0.0', {
   version: field(mask<'4.0.0'>(VersionSchema), {
      version: '4.0.0',
   }),
   songChecksum: field(v.string(), {
      version: '4.0.0',
   }),
   songSampleCount: field(v.pipe(v.number(), v.integer(), v.minValue(0)), {
      version: '4.0.0',
   }),
   songFrequency: field(v.pipe(v.number(), v.integer(), v.minValue(0)), {
      version: '4.0.0',
   }),
   bpmData: field(v.array(AudioDataBPMSchema), {
      version: '4.0.0',
   }),
   lufsData: field(v.array(AudioDataLUFSSchema), {
      version: '4.0.0',
   }),
});
