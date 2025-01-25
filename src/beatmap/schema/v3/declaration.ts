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
   IBasicEvent,
   IBasicEventTypesForKeywords,
   IBasicEventTypesWithKeywords,
   IBombNote,
   IBPMEvent,
   IChain,
   IColorBoostEvent,
   IColorNote,
   IDifficulty,
   IFxEventBox,
   IFxEventBoxGroup,
   IFxEventFloat,
   IFxEventInt,
   IFxEventsCollection,
   IIndexFilter,
   ILightColorEvent,
   ILightColorEventBox,
   ILightColorEventBoxGroup,
   ILightRotationEvent,
   ILightRotationEventBox,
   ILightRotationEventBoxGroup,
   ILightshow,
   ILightTranslationEvent,
   ILightTranslationEventBox,
   ILightTranslationEventBoxGroup,
   IObstacle,
   IRotationEvent,
   IWaypoint,
} from '../../../types/beatmap/v3/mod.ts';
import {
   AxisSchema,
   CustomDataSchema,
   DistributionTypeSchema,
   EaseTypeSchema,
   EventLightColorSchema,
   ExecutionTimeSchema,
   FxTypeSchema,
   IndexFilterTypeSchema,
   LightRotationDirectionSchema,
   LimitAlsoAffectsTypeSchema,
   NoteColorSchema,
   OffsetDirectionSchema,
   RandomTypeSchema,
   SliderMidAnchorModeSchema,
   TransitionTypeSchema,
   VersionSchema,
} from '../common/declaration.ts';
import { entity, field, type InferObjectEntries, mask } from '../helpers.ts';

/**
 * Schema declaration for v3 `Color Note`.
 */
export const ColorNoteSchema = object<InferObjectEntries<IColorNote>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   x: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   a: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   c: field(optional(NoteColorSchema), {
      version: '3.0.0',
   }),
   d: field(optional(pipe(number(), integer(), minValue(0))), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Bomb Note`.
 */
export const BombNoteSchema = object<InferObjectEntries<IBombNote>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   x: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Arc`.
 */
export const ArcSchema = object<InferObjectEntries<IArc>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   c: field(optional(NoteColorSchema), {
      version: '3.0.0',
   }),
   x: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   d: field(optional(pipe(number(), integer(), minValue(0))), {
      version: '3.0.0',
   }),
   tb: field(optional(number()), {
      version: '3.0.0',
   }),
   tx: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   ty: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   mu: field(optional(number()), {
      version: '3.0.0',
   }),
   tmu: field(optional(number()), {
      version: '3.0.0',
   }),
   tc: field(optional(pipe(number(), integer(), minValue(0))), {
      version: '3.0.0',
   }),
   m: field(optional(SliderMidAnchorModeSchema), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Chain`.
 */
export const ChainSchema = object<InferObjectEntries<IChain>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   c: field(optional(NoteColorSchema), {
      version: '3.0.0',
   }),
   x: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   d: field(optional(pipe(number(), integer(), minValue(0))), {
      version: '3.0.0',
   }),
   tb: field(optional(number()), {
      version: '3.0.0',
   }),
   tx: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   ty: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   sc: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   s: field(optional(number()), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Obstacle`.
 */
export const ObstacleSchema = object<InferObjectEntries<IObstacle>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   x: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   d: field(optional(number()), {
      version: '3.0.0',
   }),
   w: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   h: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Waypoint`.
 */
export const WaypointSchema = object<InferObjectEntries<IWaypoint>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   x: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   d: field(optional(OffsetDirectionSchema), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Basic Event`.
 */
export const BasicEventSchema = object<InferObjectEntries<IBasicEvent>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   et: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   i: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   f: field(optional(number()), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `BPM Change Event`.
 */
export const BPMChangeEventSchema = object<InferObjectEntries<IBPMEvent>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   m: field(optional(number()), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Rotation Event`.
 */
export const RotationEventSchema = object<InferObjectEntries<IRotationEvent>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   e: field(optional(ExecutionTimeSchema), {
      version: '3.0.0',
   }),
   r: field(optional(number()), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Color Boost Event`.
 */
export const ColorBoostEventSchema = object<InferObjectEntries<IColorBoostEvent>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   o: field(optional(boolean()), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Index Filter`.
 */
export const IndexFilterSchema = object<InferObjectEntries<IIndexFilter>>({
   f: field(optional(IndexFilterTypeSchema), {
      version: '3.0.0',
   }),
   p: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   t: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   r: field(optional(picklist([0, 1])), {
      version: '3.0.0',
   }),
   c: field(optional(pipe(number(), integer())), {
      version: '3.1.0',
   }),
   n: field(optional(RandomTypeSchema), {
      version: '3.1.0',
   }),
   s: field(optional(pipe(number(), integer())), {
      version: '3.1.0',
   }),
   l: field(optional(number()), {
      version: '3.1.0',
   }),
   d: field(optional(LimitAlsoAffectsTypeSchema), {
      version: '3.1.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Light Color Event`.
 */
export const LightColorBaseSchema = object<InferObjectEntries<ILightColorEvent>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   i: field(optional(TransitionTypeSchema), {
      version: '3.0.0',
   }),
   c: field(optional(EventLightColorSchema), {
      version: '3.0.0',
   }),
   s: field(optional(number()), {
      version: '3.0.0',
   }),
   f: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   sb: field(optional(number()), {
      version: '3.3.0',
   }),
   sf: field(optional(picklist([0, 1])), {
      version: '3.3.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Light Color Event Box`.
 */
export const LightColorEventBoxSchema = object<InferObjectEntries<ILightColorEventBox>>({
   f: field(optional(IndexFilterSchema), {
      version: '3.0.0',
   }),
   w: field(optional(number()), {
      version: '3.0.0',
   }),
   d: field(optional(DistributionTypeSchema), {
      version: '3.0.0',
   }),
   r: field(optional(number()), {
      version: '3.0.0',
   }),
   t: field(optional(DistributionTypeSchema), {
      version: '3.0.0',
   }),
   b: field(optional(picklist([0, 1])), {
      version: '3.0.0',
   }),
   i: field(optional(EaseTypeSchema), {
      version: '3.2.0',
   }),
   e: field(optional(array(LightColorBaseSchema)), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Light Color Event Box Group`.
 */
export const LightColorEventBoxGroupSchema = object<InferObjectEntries<ILightColorEventBoxGroup>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   g: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   e: field(optional(array(LightColorEventBoxSchema)), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Light Rotation Event`.
 */
export const LightRotationBaseSchema = object<InferObjectEntries<ILightRotationEvent>>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   p: field(optional(picklist([0, 1])), {
      version: '3.0.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '3.0.0',
   }),
   l: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   r: field(optional(number()), {
      version: '3.0.0',
   }),
   o: field(optional(LightRotationDirectionSchema), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Light Rotation Event Box`.
 */
export const LightRotationEventBoxSchema = object<InferObjectEntries<ILightRotationEventBox>>({
   f: field(optional(IndexFilterSchema), {
      version: '3.0.0',
   }),
   w: field(optional(number()), {
      version: '3.0.0',
   }),
   d: field(optional(DistributionTypeSchema), {
      version: '3.0.0',
   }),
   s: field(optional(number()), {
      version: '3.0.0',
   }),
   t: field(optional(DistributionTypeSchema), {
      version: '3.0.0',
   }),
   a: field(optional(AxisSchema), {
      version: '3.0.0',
   }),
   r: field(optional(picklist([0, 1])), {
      version: '3.0.0',
   }),
   b: field(optional(picklist([0, 1])), {
      version: '3.0.0',
   }),
   i: field(optional(EaseTypeSchema), {
      version: '3.2.0',
   }),
   l: field(optional(array(LightRotationBaseSchema)), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Light Rotation Event Box Group`.
 */
export const LightRotationEventBoxGroupSchema = object<
   InferObjectEntries<ILightRotationEventBoxGroup>
>({
   b: field(optional(number()), {
      version: '3.0.0',
   }),
   g: field(optional(pipe(number(), integer())), {
      version: '3.0.0',
   }),
   e: field(optional(array(LightRotationEventBoxSchema)), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Light Translation Event`.
 */
export const LightTranslationBaseSchema = object<InferObjectEntries<ILightTranslationEvent>>({
   b: field(optional(number()), {
      version: '3.2.0',
   }),
   p: field(optional(picklist([0, 1])), {
      version: '3.2.0',
   }),
   t: field(optional(number()), {
      version: '3.2.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '3.2.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Light Translation Event Box`.
 */
export const LightTranslationEventBoxSchema = object<
   InferObjectEntries<ILightTranslationEventBox>
>({
   f: field(optional(IndexFilterSchema), {
      version: '3.2.0',
   }),
   w: field(optional(number()), {
      version: '3.2.0',
   }),
   d: field(optional(DistributionTypeSchema), {
      version: '3.2.0',
   }),
   s: field(optional(number()), {
      version: '3.2.0',
   }),
   t: field(optional(DistributionTypeSchema), {
      version: '3.2.0',
   }),
   a: field(optional(AxisSchema), {
      version: '3.2.0',
   }),
   r: field(optional(picklist([0, 1])), {
      version: '3.2.0',
   }),
   b: field(optional(picklist([0, 1])), {
      version: '3.2.0',
   }),
   i: field(optional(EaseTypeSchema), {
      version: '3.2.0',
   }),
   l: field(optional(array(LightTranslationBaseSchema)), {
      version: '3.2.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Light Translation Event Box Group`.
 */
export const LightTranslationEventBoxGroupSchema = object<
   InferObjectEntries<ILightTranslationEventBoxGroup>
>({
   b: field(optional(number()), {
      version: '3.2.0',
   }),
   g: field(optional(pipe(number(), integer())), {
      version: '3.2.0',
   }),
   e: field(optional(array(LightTranslationEventBoxSchema)), {
      version: '3.2.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `VFX Event Box`.
 */
export const VfxEventBoxSchema = object<InferObjectEntries<IFxEventBox>>({
   f: field(optional(IndexFilterSchema), {
      version: '3.3.0',
   }),
   w: field(optional(number()), {
      version: '3.3.0',
   }),
   d: field(optional(DistributionTypeSchema), {
      version: '3.3.0',
   }),
   l: field(optional(array(pipe(number(), integer()))), {
      version: '3.3.0',
   }),
   s: field(optional(number()), {
      version: '3.3.0',
   }),
   t: field(optional(DistributionTypeSchema), {
      version: '3.3.0',
   }),
   i: field(optional(EaseTypeSchema), {
      version: '3.3.0',
   }),
   b: field(optional(picklist([0, 1])), {
      version: '3.3.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `VFX Event Box Group`.
 */
export const VfxEventBoxGroupSchema = object<InferObjectEntries<IFxEventBoxGroup>>({
   b: field(optional(number()), {
      version: '3.3.0',
   }),
   g: field(optional(pipe(number(), integer())), {
      version: '3.3.0',
   }),
   e: field(optional(array(VfxEventBoxSchema)), {
      version: '3.3.0',
   }),
   t: field(optional(FxTypeSchema), {
      version: '3.3.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Basic Event Types with Keywords`.
 */
export const BasicEventTypesForKeywordsSchema = object<
   InferObjectEntries<IBasicEventTypesForKeywords>
>({
   k: field(optional(string()), {
      version: '3.0.0',
   }),
   e: field(optional(array(pipe(number(), integer()))), {
      version: '3.0.0',
   }),
});

/**
 * Schema declaration for v3 `Basic Event Types with Keywords`.
 */
export const BasicEventTypesWithKeywordsSchema = object<
   InferObjectEntries<IBasicEventTypesWithKeywords>
>({
   d: field(optional(array(BasicEventTypesForKeywordsSchema)), {
      version: '3.0.0',
   }),
});

/**
 * Schema declaration for v3 `FX Event Float`.
 */
export const FxEventFloatSchema = object<InferObjectEntries<IFxEventFloat>>({
   b: field(optional(number()), {
      version: '3.3.0',
   }),
   p: field(optional(picklist([0, 1])), {
      version: '3.3.0',
   }),
   v: field(optional(number()), {
      version: '3.3.0',
   }),
   i: field(optional(EaseTypeSchema), {
      version: '3.3.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `FX Event Int`.
 */
export const FxEventIntSchema = object<InferObjectEntries<IFxEventInt>>({
   b: field(optional(number()), {
      version: '3.3.0',
   }),
   p: field(optional(picklist([0, 1])), {
      version: '3.3.0',
   }),
   v: field(optional(pipe(number(), integer())), {
      version: '3.3.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `FX Events Collection`.
 */
export const FxEventsCollectionSchema = object<InferObjectEntries<IFxEventsCollection>>({
   _fl: field(optional(array(FxEventFloatSchema)), {
      version: '3.3.0',
   }),
   _il: field(optional(array(FxEventIntSchema)), {
      version: '3.3.0',
   }),
});

/**
 * Schema declaration for v3 `Difficulty`.
 */
export const DifficultySchema = entity<
   InferObjectEntries<IDifficulty>
>((x) => x.version, {
   version: field(mask(VersionSchema), {
      version: '3.0.0',
   }),
   bpmEvents: field(optional(array(BPMChangeEventSchema)), {
      version: '3.0.0',
   }),
   rotationEvents: field(optional(array(RotationEventSchema)), {
      version: '3.0.0',
   }),
   colorNotes: field(optional(array(ColorNoteSchema)), {
      version: '3.0.0',
   }),
   bombNotes: field(optional(array(BombNoteSchema)), {
      version: '3.0.0',
   }),
   obstacles: field(optional(array(ObstacleSchema)), {
      version: '3.0.0',
   }),
   sliders: field(optional(array(ArcSchema)), {
      version: '3.0.0',
   }),
   burstSliders: field(optional(array(ChainSchema)), {
      version: '3.0.0',
   }),
   waypoints: field(optional(array(WaypointSchema)), {
      version: '3.0.0',
   }),
   basicBeatmapEvents: field(optional(array(BasicEventSchema)), {
      version: '3.0.0',
   }),
   colorBoostBeatmapEvents: field(optional(array(ColorBoostEventSchema)), {
      version: '3.0.0',
   }),
   lightColorEventBoxGroups: field(optional(array(LightColorEventBoxGroupSchema)), {
      version: '3.0.0',
   }),
   lightRotationEventBoxGroups: field(optional(array(LightRotationEventBoxGroupSchema)), {
      version: '3.0.0',
   }),
   lightTranslationEventBoxGroups: field(optional(array(LightTranslationEventBoxGroupSchema)), {
      version: '3.2.0',
   }),
   vfxEventBoxGroups: field(optional(array(VfxEventBoxGroupSchema)), {
      version: '3.3.0',
   }),
   _fxEventsCollection: field(optional(FxEventsCollectionSchema), {
      version: '3.3.0',
   }),
   basicEventTypesWithKeywords: field(optional(BasicEventTypesWithKeywordsSchema), {
      version: '3.0.0',
   }),
   useNormalEventsAsCompatibleEvents: field(optional(boolean()), {
      version: '3.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v3 `Lightshow`.
 */
export const LightshowSchema = entity<
   InferObjectEntries<ILightshow>
>(() => '3.0.0', {
   basicBeatmapEvents: field(optional(array(BasicEventSchema)), {
      version: '3.0.0',
   }),
   colorBoostBeatmapEvents: field(optional(array(ColorBoostEventSchema)), {
      version: '3.0.0',
   }),
   lightColorEventBoxGroups: field(optional(array(LightColorEventBoxGroupSchema)), {
      version: '3.0.0',
   }),
   lightRotationEventBoxGroups: field(optional(array(LightRotationEventBoxGroupSchema)), {
      version: '3.0.0',
   }),
   lightTranslationEventBoxGroups: field(optional(array(LightTranslationEventBoxGroupSchema)), {
      version: '3.2.0',
   }),
   vfxEventBoxGroups: field(optional(array(VfxEventBoxGroupSchema)), {
      version: '3.3.0',
   }),
   _fxEventsCollection: field(optional(FxEventsCollectionSchema), {
      version: '3.3.0',
   }),
   customData: field(optional(CustomDataSchema)),
});
