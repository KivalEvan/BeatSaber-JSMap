import {
   array,
   boolean,
   integer,
   number,
   object,
   type ObjectSchema as VObjectSchema,
   optional,
   pipe,
   string,
} from '@valibot/valibot';
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
export const InfoSongSchema: VObjectSchema<
   InferObjectEntries<IInfoSong>,
   undefined
> = object<InferObjectEntries<IInfoSong>>({
   title: field(string(), {
      version: '4.0.0',
   }),
   subTitle: field(string(), {
      version: '4.0.0',
   }),
   author: field(string(), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Info Audio`.
 */
export const InfoAudioSchema: VObjectSchema<
   InferObjectEntries<IInfoAudio>,
   undefined
> = object<InferObjectEntries<IInfoAudio>>({
   songFilename: field(string(), {
      version: '4.0.0',
   }),
   songDuration: field(number(), {
      version: '4.0.0',
   }),
   audioDataFilename: field(string(), {
      version: '4.0.0',
   }),
   bpm: field(number(), {
      version: '4.0.0',
   }),
   lufs: field(number(), {
      version: '4.0.0',
   }),
   previewStartTime: field(number(), {
      version: '4.0.0',
   }),
   previewDuration: field(number(), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Info Color Scheme`.
 */
export const InfoColorSchemeSchema: VObjectSchema<
   InferObjectEntries<IInfoColorScheme>,
   undefined
> = object<InferObjectEntries<IInfoColorScheme>>({
   colorSchemeName: field(string(), {
      version: '4.0.0',
   }),
   overrideNotes: field(boolean(), {
      version: '4.0.1',
   }),
   saberAColor: field(string(), {
      version: '4.0.0',
   }),
   saberBColor: field(string(), {
      version: '4.0.0',
   }),
   obstaclesColor: field(string(), {
      version: '4.0.0',
   }),
   overrideLights: field(boolean(), {
      version: '4.0.1',
   }),
   environmentColor0: field(string(), {
      version: '4.0.0',
   }),
   environmentColor1: field(string(), {
      version: '4.0.0',
   }),
   environmentColor0Boost: field(string(), {
      version: '4.0.0',
   }),
   environmentColor1Boost: field(string(), {
      version: '4.0.0',
   }),
   environmentColorW: field(string(), {
      version: '4.0.0',
   }),
   environmentColorWBoost: field(string(), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Info Beatmap Authors`.
 */
export const InfoBeatmapAuthorsSchema: VObjectSchema<
   InferObjectEntries<IInfoBeatmapAuthors>,
   undefined
> = object<InferObjectEntries<IInfoBeatmapAuthors>>({
   mappers: field(array(string()), {
      version: '4.0.0',
   }),
   lighters: field(array(string()), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Info Beatmap`.
 */
export const InfoDifficultySchema: VObjectSchema<
   InferObjectEntries<IInfoBeatmap>,
   undefined
> = object<InferObjectEntries<IInfoBeatmap>>({
   characteristic: field(CharacteristicNameSchema, {
      version: '4.0.0',
   }),
   difficulty: field(DifficultyNameSchema, {
      version: '4.0.0',
   }),
   beatmapAuthors: field(InfoBeatmapAuthorsSchema, {
      version: '4.0.0',
   }),
   environmentNameIdx: field(pipe(number(), integer()), {
      version: '4.0.0',
   }),
   beatmapColorSchemeIdx: field(pipe(number(), integer()), {
      version: '4.0.0',
   }),
   noteJumpMovementSpeed: field(number(), {
      version: '4.0.0',
   }),
   noteJumpStartBeatOffset: field(number(), {
      version: '4.0.0',
   }),
   lightshowDataFilename: field(string(), {
      version: '4.0.0',
   }),
   beatmapDataFilename: field(string(), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Info`.
 */
export const InfoSchema: VObjectSchema<
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
   songPreviewFilename: field(string(), {
      version: '4.0.0',
   }),
   coverImageFilename: field(string(), {
      version: '4.0.0',
   }),
   environmentNames: field(array(mask<EnvironmentAllName>(string())), {
      version: '4.0.0',
   }),
   colorSchemes: field(array(InfoColorSchemeSchema), {
      version: '4.0.0',
   }),
   difficultyBeatmaps: field(array(InfoDifficultySchema), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});
