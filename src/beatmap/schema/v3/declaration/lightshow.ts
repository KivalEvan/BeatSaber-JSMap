import { array, optional } from '@valibot/valibot';
import type { ILightshow } from '../../../../types/beatmap/v3/lightshow.ts';
import { entity, field, type InferObjectEntries } from '../../helpers.ts';
import { CustomDataSchema } from '../../shared/declaration/mod.ts';
import {
   BasicEventSchema,
   ColorBoostEventSchema,
   FxEventsCollectionSchema,
   LightColorEventBoxGroupSchema,
   LightRotationEventBoxGroupSchema,
   LightTranslationEventBoxGroupSchema,
   VfxEventBoxGroupSchema,
} from './difficulty.ts';

/**
 * Schema declaration for v3 `Lightshow`.
 */
export const LightshowSchema = entity<
   InferObjectEntries<ILightshow>
>(() => '3.0.0', {
   basicBeatmapEvents: field(optional(array(BasicEventSchema)), {
      version: '3.0.0',
   }),
   colorBoostBeatmapEvents: field(optional(array(ColorBoostEventSchema)), {
      version: '3.0.0',
   }),
   lightColorEventBoxGroups: field(optional(array(LightColorEventBoxGroupSchema)), {
      version: '3.0.0',
   }),
   lightRotationEventBoxGroups: field(optional(array(LightRotationEventBoxGroupSchema)), {
      version: '3.0.0',
   }),
   lightTranslationEventBoxGroups: field(optional(array(LightTranslationEventBoxGroupSchema)), {
      version: '3.2.0',
   }),
   vfxEventBoxGroups: field(optional(array(VfxEventBoxGroupSchema)), {
      version: '3.3.0',
   }),
   _fxEventsCollection: field(optional(FxEventsCollectionSchema), {
      version: '3.3.0',
   }),
   customData: field(optional(CustomDataSchema)),
});
