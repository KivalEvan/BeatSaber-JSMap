import * as v from 'valibot';
import type { ILightshow } from '../types/lightshow.ts';
import { entity, field, type InferObjectEntries } from '../../helpers.ts';
import { CustomDataSchema } from '../../shared/declaration/common.ts';
import {
   BasicEventSchema,
   ColorBoostEventSchema,
   FxEventsCollectionSchema,
   LightColorEventBoxGroupSchema,
   LightRotationEventBoxGroupSchema,
   LightTranslationEventBoxGroupSchema,
   VfxEventBoxGroupSchema,
} from './difficulty.ts';

/** Schema declaration for v3 `Lightshow`. */
export function LightshowSchema(): v.ObjectSchema<
   InferObjectEntries<ILightshow>,
   undefined
> {
   return entity<
      InferObjectEntries<ILightshow>
   >(() => '3.0.0', {
      basicBeatmapEvents: field(v.optional(v.array(BasicEventSchema())), {
         version: '3.0.0',
      }),
      colorBoostBeatmapEvents: field(v.optional(v.array(ColorBoostEventSchema())), {
         version: '3.0.0',
      }),
      lightColorEventBoxGroups: field(v.optional(v.array(LightColorEventBoxGroupSchema())), {
         version: '3.0.0',
      }),
      lightRotationEventBoxGroups: field(v.optional(v.array(LightRotationEventBoxGroupSchema())), {
         version: '3.0.0',
      }),
      lightTranslationEventBoxGroups: field(
         v.optional(v.array(LightTranslationEventBoxGroupSchema())),
         {
            version: '3.2.0',
         },
      ),
      vfxEventBoxGroups: field(v.optional(v.array(VfxEventBoxGroupSchema())), {
         version: '3.3.0',
      }),
      _fxEventsCollection: field(v.optional(FxEventsCollectionSchema()), {
         version: '3.3.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}
