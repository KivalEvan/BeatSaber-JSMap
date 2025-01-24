import {
   array,
   boolean,
   integer,
   minValue,
   number,
   object,
   optional,
   pipe,
   string,
} from '@valibot/valibot';
import type {
   IArc,
   IBPMInfo,
   IBPMInfoRegion,
   IDifficulty,
   IEvent,
   IInfo,
   IInfoColorScheme,
   IInfoColorSchemeData,
   IInfoDifficulty,
   IInfoSet,
   INote,
   IObstacle,
   ISpecialEventsKeywordFilters,
   ISpecialEventsKeywordFiltersKeywords,
   IWaypoint,
} from '../../../types/beatmap/v2/mod.ts';
import type { IColor } from '../../../types/colors.ts';
import {
   CharacteristicNameSchema,
   CustomDataSchema,
   DifficultyNameSchema,
   DifficultyRankSchema,
   NoteColorSchema,
   NoteTypeSchema,
   ObstacleTypeSchema,
   OffsetDirectionSchema,
   SliderMidAnchorModeSchema,
   VersionSchema,
} from '../common/declaration.ts';
import { entity, field, type InferObjectEntries, mask } from '../helpers.ts';

/**
 * Schema declaration for v2 `Note`.
 */
export const NoteSchema = object<InferObjectEntries<INote>>({
   _time: field(optional(number()), {
      version: '2.0.0',
   }),
   _type: field(optional(NoteTypeSchema), {
      version: '2.0.0',
   }),
   _lineIndex: field(optional(pipe(number(), integer())), {
      version: '2.0.0',
   }),
   _lineLayer: field(optional(pipe(number(), integer())), {
      version: '2.0.0',
   }),
   _cutDirection: field(optional(pipe(number(), integer(), minValue(0))), {
      version: '2.0.0',
   }),
   _customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v2 `Arc`.
 */
export const ArcSchema = object<InferObjectEntries<IArc>>({
   _colorType: field(optional(NoteColorSchema), {
      version: '2.6.0',
   }),
   _headTime: field(optional(number()), {
      version: '2.6.0',
   }),
   _headLineIndex: field(optional(pipe(number(), integer())), {
      version: '2.6.0',
   }),
   _headLineLayer: field(optional(pipe(number(), integer())), {
      version: '2.6.0',
   }),
   _headControlPointLengthMultiplier: field(optional(number()), {
      version: '2.6.0',
   }),
   _headCutDirection: field(optional(pipe(number(), integer(), minValue(0))), {
      version: '2.6.0',
   }),
   _tailTime: field(optional(number()), {
      version: '2.6.0',
   }),
   _tailLineIndex: field(optional(pipe(number(), integer())), {
      version: '2.6.0',
   }),
   _tailLineLayer: field(optional(pipe(number(), integer())), {
      version: '2.6.0',
   }),
   _tailControlPointLengthMultiplier: field(optional(number()), {
      version: '2.6.0',
   }),
   _tailCutDirection: field(optional(pipe(number(), integer(), minValue(0))), {
      version: '2.6.0',
   }),
   _sliderMidAnchorMode: field(optional(SliderMidAnchorModeSchema), {
      version: '2.6.0',
   }),
   _customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v2 `Obstacle`.
 */
export const ObstacleSchema = object<InferObjectEntries<IObstacle>>({
   _time: field(optional(number()), {
      version: '2.0.0',
   }),
   _lineIndex: field(optional(pipe(number(), integer())), {
      version: '2.0.0',
   }),
   _type: field(optional(ObstacleTypeSchema), {
      version: '2.0.0',
   }),
   _duration: field(optional(number()), {
      version: '2.0.0',
   }),
   _width: field(optional(pipe(number(), integer())), {
      version: '2.0.0',
   }),
   _customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v2 `Event`.
 */
export const EventSchema = object<InferObjectEntries<IEvent>>({
   _time: field(optional(number()), {
      version: '2.0.0',
   }),
   _type: field(optional(pipe(number(), integer())), {
      version: '2.0.0',
   }),
   _value: field(optional(pipe(number(), integer())), {
      version: '2.0.0',
   }),
   _floatValue: field(optional(number()), {
      version: '2.5.0',
   }),
   _customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v2 `Waypoint`.
 */
export const WaypointSchema = object<InferObjectEntries<IWaypoint>>({
   _time: field(optional(number()), {
      version: '2.2.0',
   }),
   _lineIndex: field(optional(pipe(number(), integer())), {
      version: '2.2.0',
   }),
   _lineLayer: field(optional(pipe(number(), integer())), {
      version: '2.2.0',
   }),
   _offsetDirection: field(optional(OffsetDirectionSchema), {
      version: '2.2.0',
   }),
   _customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v2 `SpecialEventsKeywordFilters`.
 */
export const SpecialEventsKeywordFiltersKeywordsSchema = object<
   InferObjectEntries<ISpecialEventsKeywordFiltersKeywords>
>({
   _keyword: field(optional(string()), {
      version: '2.4.0',
   }),
   _specialEvents: field(optional(array(pipe(number(), integer()))), {
      version: '2.4.0',
   }),
});

/**
 * Schema declaration for v2 `SpecialEventsKeywordFilters`.
 */
export const SpecialEventsKeywordFiltersSchema = object<
   InferObjectEntries<ISpecialEventsKeywordFilters>
>({
   _keywords: field(optional(array(SpecialEventsKeywordFiltersKeywordsSchema)), {
      version: '2.4.0',
   }),
});

/**
 * Schema declaration for v2 `Difficulty`.
 */
export const DifficultySchema = entity<
   InferObjectEntries<IDifficulty>
>((x) => x._version, {
   _version: field(mask(VersionSchema), {
      version: '2.0.0',
   }),
   _events: field(optional(array(EventSchema)), {
      version: '2.0.0',
   }),
   _notes: field(optional(array(NoteSchema)), {
      version: '2.0.0',
   }),
   _sliders: field(optional(array(ArcSchema)), {
      version: '2.6.0',
   }),
   _waypoints: field(optional(array(WaypointSchema)), {
      version: '2.2.0',
   }),
   _obstacles: field(optional(array(ObstacleSchema)), {
      version: '2.0.0',
   }),
   _specialEventsKeywordFilters: field(optional(SpecialEventsKeywordFiltersSchema), {
      version: '2.4.0',
   }),
   _customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v2 `InfoDifficulty`.
 */
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

/**
 * Schema declaration for v2 `InfoSet`.
 */
export const InfoSetSchema = object<InferObjectEntries<IInfoSet>>({
   _beatmapCharacteristicName: field(CharacteristicNameSchema, {
      version: '2.0.0',
   }),
   _difficultyBeatmaps: field(array(InfoSetDifficultySchema), {
      version: '2.0.0',
   }),
   _customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v2 `Color`.
 */
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

/**
 * Schema declaration for v2 `InfoColorSchemeData`.
 */
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

/**
 * Schema declaration for v2 `InfoColorScheme`.
 */
export const InfoColorSchemeSchema = object<InferObjectEntries<IInfoColorScheme>>({
   useOverride: field(boolean(), {
      version: '2.1.0',
   }),
   colorScheme: field(InfoColorSchemeDataSchema, {
      version: '2.1.0',
   }),
});

/**
 * Schema declaration for v2 `Info`.
 */
export const InfoSchema = entity<
   InferObjectEntries<IInfo>
>((x) => x._version, {
   _version: field(mask(VersionSchema), {
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
   _environmentName: field(mask(string()), {
      version: '2.0.0',
   }),
   _allDirectionsEnvironmentName: field(optional(mask(string())), {
      version: '2.0.0',
   }),
   _environmentNames: field(array(mask(string())), {
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

/**
 * Schema declaration for v2 `BPMInfoRegion`.
 */
export const BPMInfoRegionSchema = object<InferObjectEntries<IBPMInfoRegion>>({
   _startSampleIndex: field(pipe(number(), integer(), minValue(0)), {
      version: '2.0.0',
   }),
   _endSampleIndex: field(pipe(number(), integer(), minValue(0)), {
      version: '2.0.0',
   }),
   _startBeat: field(number(), {
      version: '2.0.0',
   }),
   _endBeat: field(number(), {
      version: '2.0.0',
   }),
});

/**
 * Schema declaration for v2 `BPMInfo`.
 */
export const BPMInfoSchema = entity<
   InferObjectEntries<IBPMInfo>
>((x) => x._version, {
   _version: field(mask(VersionSchema), {
      version: '2.0.0',
   }),
   _songSampleCount: field(pipe(number(), integer(), minValue(0)), {
      version: '2.0.0',
   }),
   _songFrequency: field(pipe(number(), integer(), minValue(0)), {
      version: '2.0.0',
   }),
   _regions: field(array(BPMInfoRegionSchema), {
      version: '2.0.0',
   }),
});
