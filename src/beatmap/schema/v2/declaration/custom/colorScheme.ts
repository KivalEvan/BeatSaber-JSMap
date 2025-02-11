import { number, object, type ObjectSchema as VObjectSchema, optional } from '@valibot/valibot';
import type { IColorScheme } from '../../../../../types/beatmap/v2/custom/colorScheme.ts';
import type { IColor } from '../../../../../types/colors.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v2 custom `Color`. */
export const CustomColorObjectSchema: VObjectSchema<
   InferObjectEntries<IColor>,
   undefined
> = object<InferObjectEntries<IColor>>({
   r: number(),
   g: number(),
   b: number(),
   a: optional(number()),
});

/** Schema declaration for v2 custom `Color Scheme`. */
export const CustomColorSchemeSchema: VObjectSchema<
   InferObjectEntries<IColorScheme>,
   undefined
> = object<InferObjectEntries<IColorScheme>>({
   _colorLeft: optional(CustomColorObjectSchema),
   _colorRight: optional(CustomColorObjectSchema),
   _envColorLeft: optional(CustomColorObjectSchema),
   _envColorRight: optional(CustomColorObjectSchema),
   _envColorWhite: optional(CustomColorObjectSchema),
   _envColorLeftBoost: optional(CustomColorObjectSchema),
   _envColorRightBoost: optional(CustomColorObjectSchema),
   _envColorWhiteBoost: optional(CustomColorObjectSchema),
   _obstacleColor: optional(CustomColorObjectSchema),
});
