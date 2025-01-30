import { array, integer, minValue, number, object, optional, pipe, string } from '@valibot/valibot';
import type {
   IArc,
   IDifficulty,
   IEvent,
   INote,
   IObstacle,
   ISpecialEventsKeywordFilters,
   ISpecialEventsKeywordFiltersKeywords,
   IWaypoint,
} from '../../../../types/beatmap/v2/mod.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import {
   CustomDataSchema,
   NoteColorSchema,
   NoteTypeSchema,
   ObstacleTypeSchema,
   OffsetDirectionSchema,
   SliderMidAnchorModeSchema,
   VersionSchema,
} from '../../shared/declaration/mod.ts';

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
