import { v } from '../../../../../deps.ts';
import type { IColorScheme } from '../../../../../types/beatmap/v2/custom/colorScheme.ts';
import type { IColor } from '../../../../../types/colors.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v2 custom `Color`. */
export const CustomColorObjectSchema: v.ObjectSchema<
   InferObjectEntries<IColor>,
   undefined
> = v.object<InferObjectEntries<IColor>>({
   r: v.number(),
   g: v.number(),
   b: v.number(),
   a: v.optional(v.number()),
});

/** Schema declaration for v2 custom `Color Scheme`. */
export const CustomColorSchemeSchema: v.ObjectSchema<
   InferObjectEntries<IColorScheme>,
   undefined
> = v.object<InferObjectEntries<IColorScheme>>({
   _colorLeft: v.optional(CustomColorObjectSchema),
   _colorRight: v.optional(CustomColorObjectSchema),
   _envColorLeft: v.optional(CustomColorObjectSchema),
   _envColorRight: v.optional(CustomColorObjectSchema),
   _envColorWhite: v.optional(CustomColorObjectSchema),
   _envColorLeftBoost: v.optional(CustomColorObjectSchema),
   _envColorRightBoost: v.optional(CustomColorObjectSchema),
   _envColorWhiteBoost: v.optional(CustomColorObjectSchema),
   _obstacleColor: v.optional(CustomColorObjectSchema),
});
