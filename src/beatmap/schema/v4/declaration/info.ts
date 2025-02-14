import { v } from '../../../../deps.ts';
import type { EnvironmentAllName } from '../../../../types/beatmap/shared/mod.ts';
import type {
   IInfo,
   IInfoAudio,
   IInfoBeatmap,
   IInfoBeatmapAuthors,
   IInfoColorScheme,
   IInfoSong,
} from '../../../../types/beatmap/v4/info.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import {
   CharacteristicNameSchema,
   CustomDataSchema,
   DifficultyNameSchema,
   VersionSchema,
} from '../../shared/declaration/mod.ts';

/**
 * Schema declaration for v4 `Info Song`.
 */
export const InfoSongSchema: v.ObjectSchema<
   InferObjectEntries<IInfoSong>,
   undefined
> = v.object<InferObjectEntries<IInfoSong>>({
   title: field(v.string(), {
      version: '4.0.0',
   }),
   subTitle: field(v.string(), {
      version: '4.0.0',
   }),
   author: field(v.string(), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Info Audio`.
 */
export const InfoAudioSchema: v.ObjectSchema<
   InferObjectEntries<IInfoAudio>,
   undefined
> = v.object<InferObjectEntries<IInfoAudio>>({
   songFilename: field(v.string(), {
      version: '4.0.0',
   }),
   songDuration: field(v.number(), {
      version: '4.0.0',
   }),
   audioDataFilename: field(v.string(), {
      version: '4.0.0',
   }),
   bpm: field(v.number(), {
      version: '4.0.0',
   }),
   lufs: field(v.number(), {
      version: '4.0.0',
   }),
   previewStartTime: field(v.number(), {
      version: '4.0.0',
   }),
   previewDuration: field(v.number(), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Info Color Scheme`.
 */
export const InfoColorSchemeSchema: v.ObjectSchema<
   InferObjectEntries<IInfoColorScheme>,
   undefined
> = v.object<InferObjectEntries<IInfoColorScheme>>({
   colorSchemeName: field(v.string(), {
      version: '4.0.0',
   }),
   overrideNotes: field(v.boolean(), {
      version: '4.0.1',
   }),
   saberAColor: field(v.string(), {
      version: '4.0.0',
   }),
   saberBColor: field(v.string(), {
      version: '4.0.0',
   }),
   obstaclesColor: field(v.string(), {
      version: '4.0.0',
   }),
   overrideLights: field(v.boolean(), {
      version: '4.0.1',
   }),
   environmentColor0: field(v.string(), {
      version: '4.0.0',
   }),
   environmentColor1: field(v.string(), {
      version: '4.0.0',
   }),
   environmentColor0Boost: field(v.string(), {
      version: '4.0.0',
   }),
   environmentColor1Boost: field(v.string(), {
      version: '4.0.0',
   }),
   environmentColorW: field(v.optional(v.string()), {
      version: '4.0.0',
   }),
   environmentColorWBoost: field(v.optional(v.string()), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Info Beatmap Authors`.
 */
export const InfoBeatmapAuthorsSchema: v.ObjectSchema<
   InferObjectEntries<IInfoBeatmapAuthors>,
   undefined
> = v.object<InferObjectEntries<IInfoBeatmapAuthors>>({
   mappers: field(v.array(v.string()), {
      version: '4.0.0',
   }),
   lighters: field(v.array(v.string()), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Info Beatmap`.
 */
export const InfoDifficultySchema: v.ObjectSchema<
   InferObjectEntries<IInfoBeatmap>,
   undefined
> = v.object<InferObjectEntries<IInfoBeatmap>>({
   characteristic: field(CharacteristicNameSchema, {
      version: '4.0.0',
   }),
   difficulty: field(DifficultyNameSchema, {
      version: '4.0.0',
   }),
   beatmapAuthors: field(InfoBeatmapAuthorsSchema, {
      version: '4.0.0',
   }),
   environmentNameIdx: field(v.pipe(v.number(), v.integer()), {
      version: '4.0.0',
   }),
   beatmapColorSchemeIdx: field(v.pipe(v.number(), v.integer()), {
      version: '4.0.0',
   }),
   noteJumpMovementSpeed: field(v.number(), {
      version: '4.0.0',
   }),
   noteJumpStartBeatOffset: field(v.number(), {
      version: '4.0.0',
   }),
   lightshowDataFilename: field(v.string(), {
      version: '4.0.0',
   }),
   beatmapDataFilename: field(v.string(), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Info`.
 */
export const InfoSchema: v.ObjectSchema<
   InferObjectEntries<IInfo>,
   undefined
> = entity<InferObjectEntries<IInfo>>((x) => x.version, {
   version: field(mask<'4.0.0' | '4.0.1'>(VersionSchema), {
      version: '4.0.0',
   }),
   song: field(InfoSongSchema, {
      version: '4.0.0',
   }),
   audio: field(InfoAudioSchema, {
      version: '4.0.0',
   }),
   songPreviewFilename: field(v.string(), {
      version: '4.0.0',
   }),
   coverImageFilename: field(v.string(), {
      version: '4.0.0',
   }),
   environmentNames: field(v.array(mask<EnvironmentAllName>(v.string())), {
      version: '4.0.0',
   }),
   colorSchemes: field(v.array(InfoColorSchemeSchema), {
      version: '4.0.0',
   }),
   difficultyBeatmaps: field(v.array(InfoDifficultySchema), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});
