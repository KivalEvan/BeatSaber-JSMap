import * as v from 'valibot';
import type { IColorScheme } from '../../types/custom/colorScheme.ts';
import type { IColor } from '../../../../../types/colors.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v2 custom `Color`. */
export function CustomColorObjectSchema(): v.ObjectSchema<
   InferObjectEntries<IColor>,
   undefined
> {
   return v.object<InferObjectEntries<IColor>>({
      r: v.number(),
      g: v.number(),
      b: v.number(),
      a: v.optional(v.number()),
   });
}

/** Schema declaration for v2 custom `Color Scheme`. */
export function CustomColorSchemeSchema(): v.ObjectSchema<
   InferObjectEntries<IColorScheme>,
   undefined
> {
   return v.object<InferObjectEntries<IColorScheme>>({
      _colorLeft: v.optional(CustomColorObjectSchema()),
      _colorRight: v.optional(CustomColorObjectSchema()),
      _envColorLeft: v.optional(CustomColorObjectSchema()),
      _envColorRight: v.optional(CustomColorObjectSchema()),
      _envColorWhite: v.optional(CustomColorObjectSchema()),
      _envColorLeftBoost: v.optional(CustomColorObjectSchema()),
      _envColorRightBoost: v.optional(CustomColorObjectSchema()),
      _envColorWhiteBoost: v.optional(CustomColorObjectSchema()),
      _obstacleColor: v.optional(CustomColorObjectSchema()),
   });
}
