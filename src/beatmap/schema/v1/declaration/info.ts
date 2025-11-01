import * as v from 'valibot';
import type { EnvironmentName, EnvironmentV3Name } from '../../shared/types/environment.ts';
import type { IInfo, IInfoDifficulty } from '../types/info.ts';
import type { IColor } from '../../../../types/colors.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import {
   CharacteristicNameSchema,
   CustomContributorSchema,
   DifficultyNameSchema,
} from '../../shared/declaration/mod.ts';

/**
 * Schema declaration for v1 `Color`.
 */
export const CustomColorObjectSchema: v.ObjectSchema<
   InferObjectEntries<Omit<IColor, 'a'>>,
   undefined
> = v.object<InferObjectEntries<Omit<IColor, 'a'>>>({
   r: v.number(),
   g: v.number(),
   b: v.number(),
});

/**
 * Schema declaration for v1 `Info Difficulty`.
 */
export const InfoDifficultySchema: v.ObjectSchema<
   InferObjectEntries<IInfoDifficulty>,
   undefined
> = v.object<InferObjectEntries<IInfoDifficulty>>({
   difficulty: field(DifficultyNameSchema, {
      version: '1.0.0',
   }),
   difficultyRank: field(v.picklist([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), {
      version: '1.0.0',
   }),
   audioPath: field(v.string(), {
      version: '1.0.0',
   }),
   jsonPath: field(v.string(), {
      version: '1.0.0',
   }),
   characteristic: field(CharacteristicNameSchema, {
      version: '1.0.0',
   }),
   offset: field(v.optional(v.number())),
   oldOffset: field(v.optional(v.number())),
   chromaToggle: field(v.optional(v.string())),
   customColors: field(v.optional(v.boolean())),
   difficultyLabel: field(v.optional(v.string())),
   colorLeft: field(v.optional(CustomColorObjectSchema)),
   colorRight: field(v.optional(CustomColorObjectSchema)),
   envColorLeft: field(v.optional(CustomColorObjectSchema)),
   envColorRight: field(v.optional(CustomColorObjectSchema)),
   obstacleColor: field(v.optional(CustomColorObjectSchema)),
});

/**
 * Schema declaration for v1 `Info`.
 */
export const InfoSchema: v.ObjectSchema<
   InferObjectEntries<IInfo>,
   undefined
> = entity<InferObjectEntries<IInfo>>(() => '1.0.0', {
   songName: field(v.string(), {
      version: '1.0.0',
   }),
   songSubName: field(v.string(), {
      version: '1.0.0',
   }),
   authorName: field(v.string(), {
      version: '1.0.0',
   }),
   beatsPerMinute: field(v.number(), {
      version: '1.0.0',
   }),
   previewStartTime: field(v.number(), {
      version: '1.0.0',
   }),
   previewDuration: field(v.number(), {
      version: '1.0.0',
   }),
   coverImagePath: field(v.string(), {
      version: '1.0.0',
   }),
   environmentName: field(
      mask<EnvironmentName | EnvironmentV3Name>(v.string()),
      {
         version: '1.0.0',
      },
   ),
   difficultyLevels: field(v.array(InfoDifficultySchema), {
      version: '1.0.0',
   }),
   oneSaber: field(v.boolean(), {
      version: '1.0.0',
   }),
   contributors: field(v.optional(v.array(CustomContributorSchema)), {
      version: '1.0.0',
   }),
   customEnvironment: field(v.optional(v.string()), {
      version: '1.0.0',
   }),
   customEnvironmentHash: field(v.optional(v.string()), {
      version: '1.0.0',
   }),
});
