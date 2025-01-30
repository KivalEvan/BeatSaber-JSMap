import {
   array,
   boolean,
   integer,
   number,
   object,
   optional,
   picklist,
   pipe,
} from '@valibot/valibot';
import type {
   IBasicEvent,
   IColorBoostEvent,
   IEventBox,
   IEventBoxGroup,
   IFxEventBox,
   IFxEventFloat,
   IIndexFilter,
   ILightColorEvent,
   ILightColorEventBox,
   ILightRotationEvent,
   ILightRotationEventBox,
   ILightshow,
   ILightTranslationEvent,
   ILightTranslationEventBox,
   IWaypoint,
} from '../../../../types/beatmap/v4/mod.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import {
   AxisSchema,
   CustomDataSchema,
   DistributionTypeSchema,
   EaseTypeSchema,
   EventBoxTypeSchema,
   EventLightColorSchema,
   IndexFilterTypeSchema,
   LightRotationDirectionSchema,
   LimitAlsoAffectsTypeSchema,
   OffsetDirectionSchema,
   RandomTypeSchema,
   VersionSchema,
} from '../../shared/declaration/mod.ts';
import { BasicEventTypesWithKeywordsSchema } from '../../v3/mod.ts';
import { ObjectLaneSchema, ObjectSchema } from './common.ts';

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
