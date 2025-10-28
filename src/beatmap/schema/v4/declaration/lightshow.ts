import * as v from 'valibot';
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
} from '../types/mod.ts';
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
export const WaypointSchema: v.ObjectSchema<
   InferObjectEntries<IWaypoint>,
   undefined
> = v.object<InferObjectEntries<IWaypoint>>({
   x: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   y: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   d: field(v.optional(OffsetDirectionSchema), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Basic Event`.
 */
export const BasicEventSchema: v.ObjectSchema<
   InferObjectEntries<IBasicEvent>,
   undefined
> = v.object<InferObjectEntries<IBasicEvent>>({
   t: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   i: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   f: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Color Boost Event`.
 */
export const ColorBoostEventSchema: v.ObjectSchema<
   InferObjectEntries<IColorBoostEvent>,
   undefined
> = v.object<InferObjectEntries<IColorBoostEvent>>({
   b: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Event Box`.
 */
export const EventBoxSchema: v.ObjectSchema<
   InferObjectEntries<IEventBox>,
   undefined
> = v.object<InferObjectEntries<IEventBox>>({
   f: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   e: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   l: field(v.optional(v.array(ObjectSchema)), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Event Box Group`.
 */
export const EventBoxGroupSchema: v.ObjectSchema<
   InferObjectEntries<IEventBoxGroup>,
   undefined
> = v.object<InferObjectEntries<IEventBoxGroup>>({
   t: field(v.optional(EventBoxTypeSchema), {
      version: '4.0.0',
   }),
   g: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   b: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   e: field(v.optional(v.array(EventBoxSchema)), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Index Filter`.
 */
export const IndexFilterSchema: v.ObjectSchema<
   InferObjectEntries<IIndexFilter>,
   undefined
> = v.object<InferObjectEntries<IIndexFilter>>({
   f: field(v.optional(IndexFilterTypeSchema), {
      version: '4.0.0',
   }),
   p: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   t: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   r: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   c: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   n: field(v.optional(RandomTypeSchema), {
      version: '4.0.0',
   }),
   s: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   l: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   d: field(v.optional(LimitAlsoAffectsTypeSchema), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Color Event Box`.
 */
export const LightColorEventBoxSchema: v.ObjectSchema<
   InferObjectEntries<ILightColorEventBox>,
   undefined
> = v.object<InferObjectEntries<ILightColorEventBox>>({
   w: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   d: field(v.optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   s: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   t: field(v.optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   b: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(v.optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Color Event`.
 */
export const LightColorEventSchema: v.ObjectSchema<
   InferObjectEntries<ILightColorEvent>,
   undefined
> = v.object<InferObjectEntries<ILightColorEvent>>({
   p: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(v.optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   c: field(v.optional(EventLightColorSchema), {
      version: '4.0.0',
   }),
   b: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   f: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   sb: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   sf: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Rotation Event Box`.
 */
export const LightRotationEventBoxSchema: v.ObjectSchema<
   InferObjectEntries<ILightRotationEventBox>,
   undefined
> = v.object<InferObjectEntries<ILightRotationEventBox>>({
   w: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   d: field(v.optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   s: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   t: field(v.optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   b: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(v.optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   a: field(v.optional(AxisSchema), {
      version: '4.0.0',
   }),
   f: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Rotation Event`.
 */
export const LightRotationEventSchema: v.ObjectSchema<
   InferObjectEntries<ILightRotationEvent>,
   undefined
> = v.object<InferObjectEntries<ILightRotationEvent>>({
   p: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(v.optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   l: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   r: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   d: field(v.optional(LightRotationDirectionSchema), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Translation Event Box`.
 */
export const LightTranslationEventBoxSchema: v.ObjectSchema<
   InferObjectEntries<ILightTranslationEventBox>,
   undefined
> = v.object<InferObjectEntries<ILightTranslationEventBox>>({
   w: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   d: field(v.optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   s: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   t: field(v.optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   b: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(v.optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   a: field(v.optional(AxisSchema), {
      version: '4.0.0',
   }),
   f: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Light Translation Event`.
 */
export const LightTranslationEventSchema: v.ObjectSchema<
   InferObjectEntries<ILightTranslationEvent>,
   undefined
> = v.object<InferObjectEntries<ILightTranslationEvent>>({
   p: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(v.optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   t: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `FX Event Box`.
 */
export const FXEventBoxSchema: v.ObjectSchema<
   InferObjectEntries<IFxEventBox>,
   undefined
> = v.object<InferObjectEntries<IFxEventBox>>({
   w: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   d: field(v.optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   s: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   t: field(v.optional(DistributionTypeSchema), {
      version: '4.0.0',
   }),
   b: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(v.optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `FX Event Float`.
 */
export const FXEventFloatSchema: v.ObjectSchema<
   InferObjectEntries<IFxEventFloat>,
   undefined
> = v.object<InferObjectEntries<IFxEventFloat>>({
   p: field(v.optional(v.picklist([0, 1])), {
      version: '4.0.0',
   }),
   e: field(v.optional(EaseTypeSchema), {
      version: '4.0.0',
   }),
   v: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Lightshow`.
 */
export const LightshowSchema: v.ObjectSchema<
   InferObjectEntries<ILightshow>,
   undefined
> = entity<InferObjectEntries<ILightshow>>((x) => x.version || '4.0.0', {
   version: field(mask<'4.0.0'>(VersionSchema), {
      version: '4.0.0',
   }),
   waypoints: field(v.optional(v.array(ObjectLaneSchema)), {
      version: '4.0.0',
   }),
   waypointsData: field(v.optional(v.array(WaypointSchema)), {
      version: '4.0.0',
   }),
   basicEvents: field(v.optional(v.array(ObjectSchema)), {
      version: '4.0.0',
   }),
   basicEventsData: field(v.optional(v.array(BasicEventSchema)), {
      version: '4.0.0',
   }),
   colorBoostEvents: field(v.optional(v.array(ObjectSchema)), {
      version: '4.0.0',
   }),
   colorBoostEventsData: field(v.optional(v.array(ColorBoostEventSchema)), {
      version: '4.0.0',
   }),
   eventBoxGroups: field(v.optional(v.array(EventBoxGroupSchema)), {
      version: '4.0.0',
   }),
   indexFilters: field(v.optional(v.array(IndexFilterSchema)), {
      version: '4.0.0',
   }),
   lightColorEventBoxes: field(v.optional(v.array(LightColorEventBoxSchema)), {
      version: '4.0.0',
   }),
   lightColorEvents: field(v.optional(v.array(LightColorEventSchema)), {
      version: '4.0.0',
   }),
   lightRotationEventBoxes: field(
      v.optional(v.array(LightRotationEventBoxSchema)),
      {
         version: '4.0.0',
      },
   ),
   lightRotationEvents: field(v.optional(v.array(LightRotationEventSchema)), {
      version: '4.0.0',
   }),
   lightTranslationEventBoxes: field(
      v.optional(v.array(LightTranslationEventBoxSchema)),
      {
         version: '4.0.0',
      },
   ),
   lightTranslationEvents: field(
      v.optional(v.array(LightTranslationEventSchema)),
      {
         version: '4.0.0',
      },
   ),
   fxEventBoxes: field(v.optional(v.array(FXEventBoxSchema)), {
      version: '4.0.0',
   }),
   floatFxEvents: field(v.optional(v.array(FXEventFloatSchema)), {
      version: '4.0.0',
   }),
   basicEventTypesWithKeywords: field(
      v.optional(BasicEventTypesWithKeywordsSchema),
      {
         version: '4.0.0',
      },
   ),
   useNormalEventsAsCompatibleEvents: field(v.optional(v.boolean()), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});
