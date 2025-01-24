import {
   array,
   boolean,
   integer,
   minValue,
   number,
   object,
   optional,
   picklist,
   pipe,
   string,
} from '@valibot/valibot';
import type {
   IArc,
   IAudio,
   IAudioBPM,
   IAudioLUFS,
   IBasicEvent,
   IBombNote,
   IChain,
   IColorBoostEvent,
   IColorNote,
   IDifficulty,
   IEventBox,
   IEventBoxGroup,
   IFxEventBox,
   IFxEventFloat,
   IIndexFilter,
   IInfo,
   IInfoAudio,
   IInfoBeatmap,
   IInfoBeatmapAuthors,
   IInfoColorScheme,
   IInfoSong,
   ILightColorEvent,
   ILightColorEventBox,
   ILightRotationEvent,
   ILightRotationEventBox,
   ILightshow,
   ILightTranslationEvent,
   ILightTranslationEventBox,
   INJSEvent,
   IObject,
   IObjectArc,
   IObjectChain,
   IObjectLane,
   IObstacle,
   ISpawnRotation,
   IWaypoint,
} from '../../../types/beatmap/v4/mod.ts';
import {
   AxisSchema,
   CharacteristicNameSchema,
   CustomDataSchema,
   DifficultyNameSchema,
   DistributionTypeSchema,
   EaseTypeSchema,
   EventBoxTypeSchema,
   EventLightColorSchema,
   ExecutionTimeSchema,
   IndexFilterTypeSchema,
   LightRotationDirectionSchema,
   LimitAlsoAffectsTypeSchema,
   NoteColorSchema,
   OffsetDirectionSchema,
   RandomTypeSchema,
   SliderMidAnchorModeSchema,
   VersionSchema,
} from '../common/declaration.ts';
import { entity, field, type InferObjectEntries, mask } from '../helpers.ts';
import { BasicEventTypesWithKeywordsSchema } from '../v3/mod.ts';

/**
 * Schema declaration for v4 `Object`.
 */
export const ObjectSchema = object<InferObjectEntries<IObject>>({
   b: field(optional(number()), {
      version: '4.0.0',
   }),
   i: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Object Lane`.
 */
export const ObjectLaneSchema = object<InferObjectEntries<IObjectLane>>({
   b: field(optional(number()), {
      version: '4.0.0',
   }),
   i: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   r: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Object Chain`.
 */
export const ObjectChainSchema = object<InferObjectEntries<IObjectChain>>({
   hb: field(optional(number()), {
      version: '4.0.0',
   }),
   hr: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   tb: field(optional(number()), {
      version: '4.0.0',
   }),
   tr: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   i: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   ci: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Object Arc`.
 */
export const ObjectArcSchema = object<InferObjectEntries<IObjectArc>>({
   hb: field(optional(number()), {
      version: '4.0.0',
   }),
   hi: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   hr: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   tb: field(optional(number()), {
      version: '4.0.0',
   }),
   ti: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   tr: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   ai: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Color Note`.
 */
export const ColorNoteSchema = object<InferObjectEntries<IColorNote>>({
   x: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   a: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   c: field(optional(NoteColorSchema), {
      version: '4.0.0',
   }),
   d: field(optional(pipe(number(), integer(), minValue(0))), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Bomb Note`.
 */
export const BombNoteSchema = object<InferObjectEntries<IBombNote>>({
   x: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Obstacle`.
 */
export const ObstacleSchema = object<InferObjectEntries<IObstacle>>({
   x: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   d: field(optional(number()), {
      version: '4.0.0',
   }),
   w: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   h: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Chain`.
 */
export const ChainSchema = object<InferObjectEntries<IChain>>({
   tx: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   ty: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   c: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   s: field(optional(pipe(number())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Arc`.
 */
export const ArcSchema = object<InferObjectEntries<IArc>>({
   m: field(optional(number()), {
      version: '4.0.0',
   }),
   tm: field(optional(number()), {
      version: '4.0.0',
   }),
   a: field(optional(SliderMidAnchorModeSchema), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Spawn Rotation`.
 *
 * @deprecated removed as of 1.39, convert to `r` in object lane
 */
export const SpawnRotationSchema = object<InferObjectEntries<ISpawnRotation>>({
   e: field(optional(ExecutionTimeSchema), {
      version: '4.0.0',
   }),
   r: field(optional(number()), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `NJS Event`.
 */
export const NJSEventSchema = object<InferObjectEntries<INJSEvent>>({
   d: field(optional(number()), {
      version: '4.1.0',
   }),
   p: field(optional(picklist([0, 1])), {
      version: '4.1.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '4.1.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Difficulty`.
 */
export const DifficultySchema = entity<
   InferObjectEntries<IDifficulty>
>((x) => x.version, {
   version: field(mask(VersionSchema), {
      version: '4.0.0',
   }),
   colorNotes: field(optional(array(ObjectLaneSchema)), {
      version: '4.0.0',
   }),
   colorNotesData: field(optional(array(ColorNoteSchema)), {
      version: '4.0.0',
   }),
   bombNotes: field(optional(array(ObjectLaneSchema)), {
      version: '4.0.0',
   }),
   bombNotesData: field(optional(array(BombNoteSchema)), {
      version: '4.0.0',
   }),
   obstacles: field(optional(array(ObjectLaneSchema)), {
      version: '4.0.0',
   }),
   obstaclesData: field(optional(array(ObstacleSchema)), {
      version: '4.0.0',
   }),
   chains: field(optional(array(ObjectChainSchema)), {
      version: '4.0.0',
   }),
   chainsData: field(optional(array(ChainSchema)), {
      version: '4.0.0',
   }),
   arcs: field(optional(array(ObjectArcSchema)), {
      version: '4.0.0',
   }),
   arcsData: field(optional(array(ArcSchema)), {
      version: '4.0.0',
   }),
   spawnRotations: field(optional(array(ObjectSchema)), {
      version: '4.0.0',
   }),
   spawnRotationsData: field(optional(array(SpawnRotationSchema)), {
      version: '4.0.0',
   }),
   njsEvents: field(optional(array(ObjectSchema)), {
      version: '4.1.0',
   }),
   njsEventData: field(optional(array(NJSEventSchema)), {
      version: '4.1.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Waypoint`.
 */
export const WaypointSchema = object<InferObjectEntries<IWaypoint>>({
   x: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   o: field(optional(OffsetDirectionSchema), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Basic Event`.
 */
export const BasicEventSchema = object<InferObjectEntries<IBasicEvent>>({
   t: field(optional(number()), {
      version: '4.0.0',
   }),
   i: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   f: field(optional(number()), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Color Boost Event`.
 */
export const ColorBoostEventSchema = object<InferObjectEntries<IColorBoostEvent>>({
   b: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Event Box`.
 */
export const EventBoxSchema = object<InferObjectEntries<IEventBox>>({
   f: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   e: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   l: field(optional(array(ObjectSchema)), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Event Box Group`.
 */
export const EventBoxGroupSchema = object<InferObjectEntries<IEventBoxGroup>>({
   t: field(optional(EventBoxTypeSchema), {
      version: '4.0.0',
   }),
   g: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   b: field(optional(number()), {
      version: '4.0.0',
   }),
   e: field(optional(array(EventBoxSchema)), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Index Filter`.
 */
export const IndexFilterSchema = object<InferObjectEntries<IIndexFilter>>({
   f: field(optional(IndexFilterTypeSchema), {
      version: '4.0.0',
   }),
   p: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   t: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   r: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   c: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   n: field(optional(RandomTypeSchema), {
      version: '4.0.0',
   }),
   s: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   l: field(optional(number()), {
      version: '4.0.0',
   }),
   d: field(optional(LimitAlsoAffectsTypeSchema), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Color Event Box`.
 */
export const LightColorEventBoxSchema = object<InferObjectEntries<ILightColorEventBox>>({
   w: field(optional(number()), {
      version: '4.0.0',
   }),
   d: field(optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   s: field(optional(number()), {
      version: '4.0.0',
   }),
   t: field(optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   b: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Color Event`.
 */
export const LightColorEventSchema = object<InferObjectEntries<ILightColorEvent>>({
   p: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   c: field(optional(EventLightColorSchema), {
      version: '4.0.0',
   }),
   b: field(optional(number()), {
      version: '4.0.0',
   }),
   f: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   sb: field(optional(number()), {
      version: '4.0.0',
   }),
   sf: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Rotation Event Box`.
 */
export const LightRotationEventBoxSchema = object<InferObjectEntries<ILightRotationEventBox>>({
   w: field(optional(number()), {
      version: '4.0.0',
   }),
   d: field(optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   s: field(optional(number()), {
      version: '4.0.0',
   }),
   t: field(optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   b: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   a: field(optional(AxisSchema), {
      version: '4.0.0',
   }),
   f: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Rotation Event`.
 */
export const LightRotationEventSchema = object<InferObjectEntries<ILightRotationEvent>>({
   p: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   l: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   r: field(optional(number()), {
      version: '4.0.0',
   }),
   d: field(optional(LightRotationDirectionSchema), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Translation Event Box`.
 */
export const LightTranslationEventBoxSchema = object<
   InferObjectEntries<ILightTranslationEventBox>
>({
   w: field(optional(number()), {
      version: '4.0.0',
   }),
   d: field(optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   s: field(optional(number()), {
      version: '4.0.0',
   }),
   t: field(optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   b: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   a: field(optional(AxisSchema), {
      version: '4.0.0',
   }),
   f: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Translation Event`.
 */
export const LightTranslationEventSchema = object<InferObjectEntries<ILightTranslationEvent>>({
   p: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   t: field(optional(number()), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `FX Event Box`.
 */
export const FXEventBoxSchema = object<InferObjectEntries<IFxEventBox>>({
   w: field(optional(number()), {
      version: '4.0.0',
   }),
   d: field(optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   s: field(optional(number()), {
      version: '4.0.0',
   }),
   t: field(optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   b: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `FX Event Float`.
 */
export const FXEventFloatSchema = object<InferObjectEntries<IFxEventFloat>>({
   p: field(optional(picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   v: field(optional(number()), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Lightshow`.
 */
export const LightshowSchema = entity<
   InferObjectEntries<ILightshow>
>((x) => x.version, {
   version: field(mask(VersionSchema), {
      version: '4.0.0',
   }),
   waypoints: field(optional(array(ObjectLaneSchema)), {
      version: '4.0.0',
   }),
   waypointsData: field(optional(array(WaypointSchema)), {
      version: '4.0.0',
   }),
   basicEvents: field(optional(array(ObjectSchema)), {
      version: '4.0.0',
   }),
   basicEventsData: field(optional(array(BasicEventSchema)), {
      version: '4.0.0',
   }),
   colorBoostEvents: field(optional(array(ObjectSchema)), {
      version: '4.0.0',
   }),
   colorBoostEventsData: field(optional(array(ColorBoostEventSchema)), {
      version: '4.0.0',
   }),
   eventBoxGroups: field(optional(array(EventBoxGroupSchema)), {
      version: '4.0.0',
   }),
   indexFilters: field(optional(array(IndexFilterSchema)), {
      version: '4.0.0',
   }),
   lightColorEventBoxes: field(optional(array(LightColorEventBoxSchema)), {
      version: '4.0.0',
   }),
   lightColorEvents: field(optional(array(LightColorEventSchema)), {
      version: '4.0.0',
   }),
   lightRotationEventBoxes: field(optional(array(LightRotationEventBoxSchema)), {
      version: '4.0.0',
   }),
   lightRotationEvents: field(optional(array(LightRotationEventSchema)), {
      version: '4.0.0',
   }),
   lightTranslationEventBoxes: field(optional(array(LightTranslationEventBoxSchema)), {
      version: '4.0.0',
   }),
   lightTranslationEvents: field(optional(array(LightTranslationEventSchema)), {
      version: '4.0.0',
   }),
   fxEventBoxes: field(optional(array(FXEventBoxSchema)), {
      version: '4.0.0',
   }),
   floatFxEvents: field(optional(array(FXEventFloatSchema)), {
      version: '4.0.0',
   }),
   basicEventTypesWithKeywords: field(optional(BasicEventTypesWithKeywordsSchema), {
      version: '4.0.0',
   }),
   useNormalEventsAsCompatibleEvents: field(optional(boolean()), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Info Song`.
 */
export const InfoSongSchema = object<InferObjectEntries<IInfoSong>>({
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
export const InfoAudioSchema = object<InferObjectEntries<IInfoAudio>>({
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
export const InfoColorSchemeSchema = object<InferObjectEntries<IInfoColorScheme>>({
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
export const InfoBeatmapAuthorsSchema = object<InferObjectEntries<IInfoBeatmapAuthors>>({
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
export const InfoDifficultySchema = object<InferObjectEntries<IInfoBeatmap>>({
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
export const InfoSchema = entity<
   InferObjectEntries<IInfo>
>((x) => x.version, {
   version: field(mask(VersionSchema), {
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
   environmentNames: field(array(mask(string())), {
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

/**
 * Schema declaration for v4 `Audio Data BPM`.
 */
export const AudioDataBPMSchema = object<InferObjectEntries<IAudioBPM>>({
   si: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   ei: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   sb: field(number(), {
      version: '4.0.0',
   }),
   eb: field(number(), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Audio Data LUFS`.
 */
export const AudioDataLUFSSchema = object<InferObjectEntries<IAudioLUFS>>({
   si: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   ei: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   l: field(number(), {
      version: '4.0.0',
   }),
});

/**
 * Schema declaration for v4 `Audio`.
 */
export const AudioDataSchema = entity<
   InferObjectEntries<IAudio>
>((x) => x.version, {
   version: field(mask(VersionSchema), {
      version: '4.0.0',
   }),
   songChecksum: field(string(), {
      version: '4.0.0',
   }),
   songSampleCount: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   songFrequency: field(pipe(number(), integer(), minValue(0)), {
      version: '4.0.0',
   }),
   bpmData: field(array(AudioDataBPMSchema), {
      version: '4.0.0',
   }),
   lufsData: field(array(AudioDataLUFSSchema), {
      version: '4.0.0',
   }),
});
