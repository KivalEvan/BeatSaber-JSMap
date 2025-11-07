import * as v from 'valibot';
import type {
   IArc,
   IDifficulty,
   IEvent,
   INote,
   IObstacle,
   ISpecialEventsKeywordFilters,
   ISpecialEventsKeywordFiltersKeywords,
   IWaypoint,
} from '../../../schema/v2/types/mod.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import {
   CustomDataSchema,
   NoteColorSchema,
   NoteTypeSchema,
   OffsetDirectionSchema,
   SliderMidAnchorModeSchema,
   VersionSchema,
} from '../../shared/declaration/common.ts';

/** Schema declaration for v2 `Note`. */
export function NoteSchema(): v.ObjectSchema<
   InferObjectEntries<INote>,
   undefined
> {
   return v.object<InferObjectEntries<INote>>({
      _time: field(v.optional(v.number()), {
         version: '2.0.0',
      }),
      _type: field(v.optional(NoteTypeSchema()), {
         version: '2.0.0',
      }),
      _lineIndex: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.0.0',
      }),
      _lineLayer: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.0.0',
      }),
      _cutDirection: field(
         v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
         { version: '2.0.0' },
      ),
      _customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v2 `Arc`. */
export function ArcSchema(): v.ObjectSchema<
   InferObjectEntries<IArc>,
   undefined
> {
   return v.object<InferObjectEntries<IArc>>({
      _colorType: field(v.optional(NoteColorSchema()), {
         version: '2.6.0',
      }),
      _headTime: field(v.optional(v.number()), {
         version: '2.6.0',
      }),
      _headLineIndex: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.6.0',
      }),
      _headLineLayer: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.6.0',
      }),
      _headControlPointLengthMultiplier: field(v.optional(v.number()), {
         version: '2.6.0',
      }),
      _headCutDirection: field(
         v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
         { version: '2.6.0' },
      ),
      _tailTime: field(v.optional(v.number()), {
         version: '2.6.0',
      }),
      _tailLineIndex: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.6.0',
      }),
      _tailLineLayer: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.6.0',
      }),
      _tailControlPointLengthMultiplier: field(v.optional(v.number()), {
         version: '2.6.0',
      }),
      _tailCutDirection: field(
         v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
         {
            version: '2.6.0',
         },
      ),
      _sliderMidAnchorMode: field(v.optional(SliderMidAnchorModeSchema()), {
         version: '2.6.0',
      }),
      _customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v2 `Obstacle`. */
export function ObstacleSchema(): v.ObjectSchema<
   InferObjectEntries<IObstacle>,
   undefined
> {
   return v.object<InferObjectEntries<IObstacle>>({
      _time: field(v.optional(v.number()), {
         version: '2.0.0',
      }),
      _lineIndex: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.0.0',
      }),
      _type: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.0.0',
      }),
      _duration: field(v.optional(v.number()), {
         version: '2.0.0',
      }),
      _width: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.0.0',
      }),
      _customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v2 `Event`. */
export function EventSchema(): v.ObjectSchema<
   InferObjectEntries<IEvent>,
   undefined
> {
   return v.object<InferObjectEntries<IEvent>>({
      _time: field(v.optional(v.number()), {
         version: '2.0.0',
      }),
      _type: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.0.0',
      }),
      _value: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.0.0',
      }),
      _floatValue: field(v.optional(v.number()), {
         version: '2.5.0',
      }),
      _customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v2 `Waypoint`. */
export function WaypointSchema(): v.ObjectSchema<
   InferObjectEntries<IWaypoint>,
   undefined
> {
   return v.object<InferObjectEntries<IWaypoint>>({
      _time: field(v.optional(v.number()), {
         version: '2.2.0',
      }),
      _lineIndex: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.2.0',
      }),
      _lineLayer: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '2.2.0',
      }),
      _offsetDirection: field(v.optional(OffsetDirectionSchema()), {
         version: '2.2.0',
      }),
      _customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v2 `Special Events Keyword Filters Keywords`. */
export function SpecialEventsKeywordFiltersKeywordsSchema(): v.ObjectSchema<
   InferObjectEntries<ISpecialEventsKeywordFiltersKeywords>,
   undefined
> {
   return v.object<InferObjectEntries<ISpecialEventsKeywordFiltersKeywords>>({
      _keyword: field(v.optional(v.string()), {
         version: '2.4.0',
      }),
      _specialEvents: field(v.optional(v.array(v.pipe(v.number(), v.integer()))), {
         version: '2.4.0',
      }),
   });
}

/** Schema declaration for v2 `Special Events Keyword Filters`. */
export function SpecialEventsKeywordFiltersSchema(): v.ObjectSchema<
   InferObjectEntries<ISpecialEventsKeywordFilters>,
   undefined
> {
   return v.object<InferObjectEntries<ISpecialEventsKeywordFilters>>({
      _keywords: field(
         v.optional(v.array(SpecialEventsKeywordFiltersKeywordsSchema())),
         { version: '2.4.0' },
      ),
   });
}

/** Schema declaration for v2 `Difficulty`. */
export function DifficultySchema(): v.ObjectSchema<
   InferObjectEntries<IDifficulty>,
   undefined
> {
   return entity<InferObjectEntries<IDifficulty>>((x) => x._version || '2.0.0', {
      _version: field(
         v.optional(mask<'2.0.0' | '2.2.0' | '2.4.0' | '2.5.0' | '2.6.0'>(VersionSchema())),
         { version: '2.0.0' },
      ),
      _events: field(v.optional(v.array(EventSchema())), {
         version: '2.0.0',
      }),
      _notes: field(v.optional(v.array(NoteSchema())), {
         version: '2.0.0',
      }),
      _sliders: field(v.optional(v.array(ArcSchema())), {
         version: '2.6.0',
      }),
      _waypoints: field(v.optional(v.array(WaypointSchema())), {
         version: '2.2.0',
      }),
      _obstacles: field(v.optional(v.array(ObstacleSchema())), {
         version: '2.0.0',
      }),
      _specialEventsKeywordFilters: field(
         v.optional(SpecialEventsKeywordFiltersSchema()),
         { version: '2.4.0' },
      ),
      _customData: field(v.optional(CustomDataSchema())),
   });
}
