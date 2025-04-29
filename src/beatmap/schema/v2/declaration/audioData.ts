import { v } from '../../../../deps.ts';
import type { IBPMInfo, IBPMInfoRegion } from '../../../../types/beatmap/v2/bpmInfo.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import { VersionSchema } from '../../shared/declaration/mod.ts';

/**
 * Schema declaration for v2 `BPMInfo Region`.
 */
export const BPMInfoRegionSchema: v.ObjectSchema<
   InferObjectEntries<IBPMInfoRegion>,
   undefined
> = v.object<InferObjectEntries<IBPMInfoRegion>>({
   _startSampleIndex: field(v.pipe(v.number(), v.integer(), v.minValue(0)), {
      version: '2.0.0',
   }),
   _endSampleIndex: field(v.pipe(v.number(), v.integer(), v.minValue(0)), {
      version: '2.0.0',
   }),
   _startBeat: field(v.number(), {
      version: '2.0.0',
   }),
   _endBeat: field(v.number(), {
      version: '2.0.0',
   }),
});

/**
 * Schema declaration for v2 `BPMInfo`.
 */
export const BPMInfoSchema: v.ObjectSchema<
   InferObjectEntries<IBPMInfo>,
   undefined
> = entity<InferObjectEntries<IBPMInfo>>((x) => x._version || '2.0.0', {
   _version: field(mask<'2.0.0'>(VersionSchema), {
      version: '2.0.0',
   }),
   _songSampleCount: field(v.pipe(v.number(), v.integer(), v.minValue(0)), {
      version: '2.0.0',
   }),
   _songFrequency: field(v.pipe(v.number(), v.integer(), v.minValue(0)), {
      version: '2.0.0',
   }),
   _regions: field(v.array(BPMInfoRegionSchema), {
      version: '2.0.0',
   }),
});
