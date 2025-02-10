import { array, boolean, number, object, optional, picklist, string } from '@valibot/valibot';
import type { EnvironmentName, EnvironmentV3Name } from '../../../../types/beatmap/shared/mod.ts';
import type { IInfo, IInfoDifficulty } from '../../../../types/beatmap/v1/info.ts';
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
export const CustomColorObjectSchema = object<InferObjectEntries<Omit<IColor, 'a'>>>({
   r: number(),
   g: number(),
   b: number(),
});

/**
 * Schema declaration for v1 `Info Difficulty`.
 */
export const InfoDifficultySchema = object<InferObjectEntries<IInfoDifficulty>>({
   difficulty: field(DifficultyNameSchema, {
      version: '1.0.0',
   }),
   difficultyRank: field(picklist([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), {
      version: '1.0.0',
   }),
   audioPath: field(string(), {
      version: '1.0.0',
   }),
   jsonPath: field(string(), {
      version: '1.0.0',
   }),
   characteristic: field(CharacteristicNameSchema, {
      version: '1.0.0',
   }),
   offset: field(optional(number())),
   oldOffset: field(optional(number())),
   chromaToggle: field(optional(string())),
   customColors: field(optional(boolean())),
   difficultyLabel: field(optional(string())),
   colorLeft: field(optional(CustomColorObjectSchema)),
   colorRight: field(optional(CustomColorObjectSchema)),
   envColorLeft: field(optional(CustomColorObjectSchema)),
   envColorRight: field(optional(CustomColorObjectSchema)),
   obstacleColor: field(optional(CustomColorObjectSchema)),
});

/**
 * Schema declaration for v1 `Info`.
 */
export const InfoSchema = entity<
   InferObjectEntries<IInfo>
>(() => '1.0.0', {
   songName: field(string(), {
      version: '1.0.0',
   }),
   songSubName: field(string(), {
      version: '1.0.0',
   }),
   authorName: field(string(), {
      version: '1.0.0',
   }),
   beatsPerMinute: field(number(), {
      version: '1.0.0',
   }),
   previewStartTime: field(number(), {
      version: '1.0.0',
   }),
   previewDuration: field(number(), {
      version: '1.0.0',
   }),
   coverImagePath: field(string(), {
      version: '1.0.0',
   }),
   environmentName: field(mask<EnvironmentName | EnvironmentV3Name>(string()), {
      version: '1.0.0',
   }),
   difficultyLevels: field(array(InfoDifficultySchema), {
      version: '1.0.0',
   }),
   oneSaber: field(boolean(), {
      version: '1.0.0',
   }),
   contributors: field(optional(array(CustomContributorSchema)), {
      version: '1.0.0',
   }),
   customEnvironment: field(optional(string()), {
      version: '1.0.0',
   }),
   customEnvironmentHash: field(optional(string()), {
      version: '1.0.0',
   }),
});
