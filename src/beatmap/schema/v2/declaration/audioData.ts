import { array, integer, minValue, number, object, pipe } from '@valibot/valibot';
import type { IBPMInfo, IBPMInfoRegion } from '../../../../types/beatmap/v2/bpmInfo.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import { VersionSchema } from '../../shared/declaration/mod.ts';

/**
 * Schema declaration for v2 `BPMInfoRegion`.
 */
export const BPMInfoRegionSchema = object<InferObjectEntries<IBPMInfoRegion>>({
   _startSampleIndex: field(pipe(number(), integer(), minValue(0)), {
      version: '2.0.0',
   }),
   _endSampleIndex: field(pipe(number(), integer(), minValue(0)), {
      version: '2.0.0',
   }),
   _startBeat: field(number(), {
      version: '2.0.0',
   }),
   _endBeat: field(number(), {
      version: '2.0.0',
   }),
});

/**
 * Schema declaration for v2 `BPMInfo`.
 */
export const BPMInfoSchema = entity<
   InferObjectEntries<IBPMInfo>
>((x) => x._version, {
   _version: field(mask(VersionSchema), {
      version: '2.0.0',
   }),
   _songSampleCount: field(pipe(number(), integer(), minValue(0)), {
      version: '2.0.0',
   }),
   _songFrequency: field(pipe(number(), integer(), minValue(0)), {
      version: '2.0.0',
   }),
   _regions: field(array(BPMInfoRegionSchema), {
      version: '2.0.0',
   }),
});
