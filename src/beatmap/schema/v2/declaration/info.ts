import { array, boolean, integer, number, object, optional, pipe, string } from '@valibot/valibot';
import type {
   Environment360Name,
   EnvironmentAllName,
   EnvironmentName,
   EnvironmentV3Name,
} from '../../../../types/beatmap/shared/mod.ts';
import type {
   IInfo,
   IInfoColorScheme,
   IInfoColorSchemeData,
   IInfoDifficulty,
   IInfoSet,
} from '../../../../types/beatmap/v2/info.ts';
import type { IColor } from '../../../../types/colors.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import {
   CharacteristicNameSchema,
   CustomDataSchema,
   DifficultyNameSchema,
   DifficultyRankSchema,
   VersionSchema,
} from '../../shared/declaration/mod.ts';

/** Schema declaration for v2 `InfoSetDifficulty`. */
export const InfoSetDifficultySchema = object<InferObjectEntries<IInfoDifficulty>>({
   _difficulty: field(DifficultyNameSchema, {
      version: '2.0.0',
   }),
   _difficultyRank: field(DifficultyRankSchema, {
      version: '2.0.0',
   }),
   _beatmapFilename: field(string(), {
      version: '2.0.0',
   }),
   _noteJumpMovementSpeed: field(number(), {
      version: '2.0.0',
   }),
   _noteJumpStartBeatOffset: field(number(), {
      version: '2.0.0',
   }),
   _beatmapColorSchemeIdx: field(pipe(number(), integer()), {
      version: '2.1.0',
   }),
   _environmentNameIdx: field(pipe(number(), integer()), {
      version: '2.1.0',
   }),
   _customData: field(optional(CustomDataSchema)),
});

/** Schema declaration for v2 `InfoSet`. */
export const InfoSetSchema = object<InferObjectEntries<IInfoSet>>({
   _beatmapCharacteristicName: field(CharacteristicNameSchema, {
      version: '2.0.0',
   }),
   _difficultyBeatmaps: field(array(InfoSetDifficultySchema), {
      version: '2.0.0',
   }),
   _customData: field(optional(CustomDataSchema)),
});

/** Schema declaration for v2 `Color`. */
export const ColorObjectSchema = object<InferObjectEntries<Required<IColor>>>({
   r: field(number(), {
      version: '2.1.0',
   }),
   g: field(number(), {
      version: '2.1.0',
   }),
   b: field(number(), {
      version: '2.1.0',
   }),
   a: field(number(), {
      version: '2.1.0',
   }),
});

/** Schema declaration for v2 `InfoColorSchemeData`. */
export const InfoColorSchemeDataSchema = object<InferObjectEntries<IInfoColorSchemeData>>({
   colorSchemeId: field(string(), {
      version: '2.1.0',
   }),
   saberAColor: field(ColorObjectSchema, {
      version: '2.1.0',
   }),
   saberBColor: field(ColorObjectSchema, {
      version: '2.1.0',
   }),
   environmentColor0: field(ColorObjectSchema, {
      version: '2.1.0',
   }),
   environmentColor1: field(ColorObjectSchema, {
      version: '2.1.0',
   }),
   obstaclesColor: field(ColorObjectSchema, {
      version: '2.1.0',
   }),
   environmentColor0Boost: field(ColorObjectSchema, {
      version: '2.1.0',
   }),
   environmentColor1Boost: field(ColorObjectSchema, {
      version: '2.1.0',
   }),
   environmentColorW: field(optional(ColorObjectSchema), {
      version: '2.1.0',
   }),
   environmentColorWBoost: field(optional(ColorObjectSchema), {
      version: '2.1.0',
   }),
});

/** Schema declaration for v2 `InfoColorScheme`. */
export const InfoColorSchemeSchema = object<InferObjectEntries<IInfoColorScheme>>({
   useOverride: field(boolean(), {
      version: '2.1.0',
   }),
   colorScheme: field(InfoColorSchemeDataSchema, {
      version: '2.1.0',
   }),
});

/** Schema declaration for v2 `Info`. */
export const InfoSchema = entity<
   InferObjectEntries<IInfo>
>((x) => x._version, {
   _version: field(mask<'2.0.0' | '2.1.0'>(VersionSchema), {
      version: '2.0.0',
   }),
   _songName: field(string(), {
      version: '2.0.0',
   }),
   _songSubName: field(string(), {
      version: '2.0.0',
   }),
   _songAuthorName: field(string(), {
      version: '2.0.0',
   }),
   _levelAuthorName: field(string(), {
      version: '2.0.0',
   }),
   _beatsPerMinute: field(number(), {
      version: '2.0.0',
   }),
   _songTimeOffset: field(number(), {
      version: '2.0.0',
   }),
   _shuffle: field(number(), {
      version: '2.0.0',
   }),
   _shufflePeriod: field(number(), {
      version: '2.0.0',
   }),
   _previewStartTime: field(number(), {
      version: '2.0.0',
   }),
   _previewDuration: field(number(), {
      version: '2.0.0',
   }),
   _songFilename: field(string(), {
      version: '2.0.0',
   }),
   _coverImageFilename: field(string(), {
      version: '2.0.0',
   }),
   _environmentName: field(mask<EnvironmentName | EnvironmentV3Name>(string()), {
      version: '2.0.0',
   }),
   _allDirectionsEnvironmentName: field(optional(mask<Environment360Name>(string())), {
      version: '2.0.0',
   }),
   _environmentNames: field(array(mask<EnvironmentAllName>(string())), {
      version: '2.1.0',
   }),
   _colorSchemes: field(array(InfoColorSchemeSchema), {
      version: '2.1.0',
   }),
   _difficultyBeatmapSets: field(array(InfoSetSchema), {
      version: '2.0.0',
   }),
   _customData: field(optional(CustomDataSchema)),
});
