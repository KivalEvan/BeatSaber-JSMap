import * as v from 'valibot';
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
   ILightTranslationEvent,
   ILightTranslationEventBox,
   ILightTranslationEventBoxGroup,
   IObstacle,
   IRotationEvent,
   IWaypoint,
} from '../types/mod.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
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
} from '../../shared/declaration/common.ts';

/** Schema declaration for v3 `Color Note`. */
export function ColorNoteSchema(): v.ObjectSchema<
   InferObjectEntries<IColorNote>,
   undefined
> {
   return v.object<InferObjectEntries<IColorNote>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      x: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      y: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      a: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      c: field(v.optional(NoteColorSchema()), {
         version: '3.0.0',
      }),
      d: field(v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Bomb Note`. */
export function BombNoteSchema(): v.ObjectSchema<
   InferObjectEntries<IBombNote>,
   undefined
> {
   return v.object<InferObjectEntries<IBombNote>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      x: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      y: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Arc`. */
export function ArcSchema(): v.ObjectSchema<
   InferObjectEntries<IArc>,
   undefined
> {
   return v.object<InferObjectEntries<IArc>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      c: field(v.optional(NoteColorSchema()), {
         version: '3.0.0',
      }),
      x: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      y: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      d: field(v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))), {
         version: '3.0.0',
      }),
      tb: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      tx: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      ty: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      mu: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      tmu: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      tc: field(v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))), {
         version: '3.0.0',
      }),
      m: field(v.optional(SliderMidAnchorModeSchema()), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Chain`. */
export function ChainSchema(): v.ObjectSchema<
   InferObjectEntries<IChain>,
   undefined
> {
   return v.object<InferObjectEntries<IChain>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      c: field(v.optional(NoteColorSchema()), {
         version: '3.0.0',
      }),
      x: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      y: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      d: field(v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))), {
         version: '3.0.0',
      }),
      tb: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      tx: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      ty: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      sc: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      s: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Obstacle`. */
export function ObstacleSchema(): v.ObjectSchema<
   InferObjectEntries<IObstacle>,
   undefined
> {
   return v.object<InferObjectEntries<IObstacle>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      x: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      y: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      d: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      w: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      h: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Waypoint`. */
export function WaypointSchema(): v.ObjectSchema<
   InferObjectEntries<IWaypoint>,
   undefined
> {
   return v.object<InferObjectEntries<IWaypoint>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      x: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      y: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      d: field(v.optional(OffsetDirectionSchema()), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Basic Event`. */
export function BasicEventSchema(): v.ObjectSchema<
   InferObjectEntries<IBasicEvent>,
   undefined
> {
   return v.object<InferObjectEntries<IBasicEvent>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      et: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      i: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      f: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `BPM Change Event`. */
export function BPMChangeEventSchema(): v.ObjectSchema<
   InferObjectEntries<IBPMEvent>,
   undefined
> {
   return v.object<InferObjectEntries<IBPMEvent>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      m: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Rotation Event`. */
export function RotationEventSchema(): v.ObjectSchema<
   InferObjectEntries<IRotationEvent>,
   undefined
> {
   return v.object<InferObjectEntries<IRotationEvent>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      e: field(v.optional(ExecutionTimeSchema()), {
         version: '3.0.0',
      }),
      r: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Color Boost Event`. */
export function ColorBoostEventSchema(): v.ObjectSchema<
   InferObjectEntries<IColorBoostEvent>,
   undefined
> {
   return v.object<InferObjectEntries<IColorBoostEvent>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      o: field(v.optional(v.boolean()), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Index Filter`. */
export function IndexFilterSchema(): v.ObjectSchema<
   InferObjectEntries<IIndexFilter>,
   undefined
> {
   return v.object<InferObjectEntries<IIndexFilter>>({
      f: field(v.optional(IndexFilterTypeSchema()), {
         version: '3.0.0',
      }),
      p: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      t: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      r: field(v.optional(v.picklist([0, 1])), {
         version: '3.0.0',
      }),
      c: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.1.0',
      }),
      n: field(v.optional(RandomTypeSchema()), {
         version: '3.1.0',
      }),
      s: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.1.0',
      }),
      l: field(v.optional(v.number()), {
         version: '3.1.0',
      }),
      d: field(v.optional(LimitAlsoAffectsTypeSchema()), {
         version: '3.1.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Light Color Event`. */
export function LightColorBaseSchema(): v.ObjectSchema<
   InferObjectEntries<ILightColorEvent>,
   undefined
> {
   return v.object<InferObjectEntries<ILightColorEvent>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      i: field(v.optional(TransitionTypeSchema()), {
         version: '3.0.0',
      }),
      c: field(v.optional(EventLightColorSchema()), {
         version: '3.0.0',
      }),
      s: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      f: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      sb: field(v.optional(v.number()), {
         version: '3.3.0',
      }),
      sf: field(v.optional(v.picklist([0, 1])), {
         version: '3.3.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Light Color Event Box`. */
export function LightColorEventBoxSchema(): v.ObjectSchema<
   InferObjectEntries<ILightColorEventBox>,
   undefined
> {
   return v.object<InferObjectEntries<ILightColorEventBox>>({
      f: field(v.optional(IndexFilterSchema()), {
         version: '3.0.0',
      }),
      w: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      d: field(v.optional(DistributionTypeSchema()), {
         version: '3.0.0',
      }),
      r: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      t: field(v.optional(DistributionTypeSchema()), {
         version: '3.0.0',
      }),
      b: field(v.optional(v.picklist([0, 1])), {
         version: '3.0.0',
      }),
      i: field(v.optional(EaseTypeSchema()), {
         version: '3.2.0',
      }),
      e: field(v.optional(v.array(LightColorBaseSchema())), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Light Color Event Box Group`. */
export function LightColorEventBoxGroupSchema(): v.ObjectSchema<
   InferObjectEntries<ILightColorEventBoxGroup>,
   undefined
> {
   return v.object<InferObjectEntries<ILightColorEventBoxGroup>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      g: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      e: field(v.optional(v.array(LightColorEventBoxSchema())), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Light Rotation Event`. */
export function LightRotationBaseSchema(): v.ObjectSchema<
   InferObjectEntries<ILightRotationEvent>,
   undefined
> {
   return v.object<InferObjectEntries<ILightRotationEvent>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      p: field(v.optional(v.picklist([0, 1])), {
         version: '3.0.0',
      }),
      e: field(v.optional(EaseTypeSchema()), {
         version: '3.0.0',
      }),
      l: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      r: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      o: field(v.optional(LightRotationDirectionSchema()), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Light Rotation Event Box`. */
export function LightRotationEventBoxSchema(): v.ObjectSchema<
   InferObjectEntries<ILightRotationEventBox>,
   undefined
> {
   return v.object<InferObjectEntries<ILightRotationEventBox>>({
      f: field(v.optional(IndexFilterSchema()), {
         version: '3.0.0',
      }),
      w: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      d: field(v.optional(DistributionTypeSchema()), {
         version: '3.0.0',
      }),
      s: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      t: field(v.optional(DistributionTypeSchema()), {
         version: '3.0.0',
      }),
      a: field(v.optional(AxisSchema()), {
         version: '3.0.0',
      }),
      r: field(v.optional(v.picklist([0, 1])), {
         version: '3.0.0',
      }),
      b: field(v.optional(v.picklist([0, 1])), {
         version: '3.0.0',
      }),
      i: field(v.optional(EaseTypeSchema()), {
         version: '3.2.0',
      }),
      l: field(v.optional(v.array(LightRotationBaseSchema())), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Light Rotation Event Box Group`. */
export function LightRotationEventBoxGroupSchema(): v.ObjectSchema<
   InferObjectEntries<ILightRotationEventBoxGroup>,
   undefined
> {
   return v.object<InferObjectEntries<ILightRotationEventBoxGroup>>({
      b: field(v.optional(v.number()), {
         version: '3.0.0',
      }),
      g: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.0.0',
      }),
      e: field(v.optional(v.array(LightRotationEventBoxSchema())), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Light Translation Event`. */
export function LightTranslationBaseSchema(): v.ObjectSchema<
   InferObjectEntries<ILightTranslationEvent>,
   undefined
> {
   return v.object<InferObjectEntries<ILightTranslationEvent>>({
      b: field(v.optional(v.number()), {
         version: '3.2.0',
      }),
      p: field(v.optional(v.picklist([0, 1])), {
         version: '3.2.0',
      }),
      t: field(v.optional(v.number()), {
         version: '3.2.0',
      }),
      e: field(v.optional(EaseTypeSchema()), {
         version: '3.2.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Light Translation Event Box`. */
export function LightTranslationEventBoxSchema(): v.ObjectSchema<
   InferObjectEntries<ILightTranslationEventBox>,
   undefined
> {
   return v.object<InferObjectEntries<ILightTranslationEventBox>>({
      f: field(v.optional(IndexFilterSchema()), {
         version: '3.2.0',
      }),
      w: field(v.optional(v.number()), {
         version: '3.2.0',
      }),
      d: field(v.optional(DistributionTypeSchema()), {
         version: '3.2.0',
      }),
      s: field(v.optional(v.number()), {
         version: '3.2.0',
      }),
      t: field(v.optional(DistributionTypeSchema()), {
         version: '3.2.0',
      }),
      a: field(v.optional(AxisSchema()), {
         version: '3.2.0',
      }),
      r: field(v.optional(v.picklist([0, 1])), {
         version: '3.2.0',
      }),
      b: field(v.optional(v.picklist([0, 1])), {
         version: '3.2.0',
      }),
      i: field(v.optional(EaseTypeSchema()), {
         version: '3.2.0',
      }),
      l: field(v.optional(v.array(LightTranslationBaseSchema())), {
         version: '3.2.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Light Translation Event Box Group`. */
export function LightTranslationEventBoxGroupSchema(): v.ObjectSchema<
   InferObjectEntries<ILightTranslationEventBoxGroup>,
   undefined
> {
   return v.object<InferObjectEntries<ILightTranslationEventBoxGroup>>({
      b: field(v.optional(v.number()), {
         version: '3.2.0',
      }),
      g: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.2.0',
      }),
      e: field(v.optional(v.array(LightTranslationEventBoxSchema())), {
         version: '3.2.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `VFX Event Box`. */
export function VfxEventBoxSchema(): v.ObjectSchema<
   InferObjectEntries<IFxEventBox>,
   undefined
> {
   return v.object<InferObjectEntries<IFxEventBox>>({
      f: field(v.optional(IndexFilterSchema()), {
         version: '3.3.0',
      }),
      w: field(v.optional(v.number()), {
         version: '3.3.0',
      }),
      d: field(v.optional(DistributionTypeSchema()), {
         version: '3.3.0',
      }),
      l: field(v.optional(v.array(v.pipe(v.number(), v.integer()))), {
         version: '3.3.0',
      }),
      s: field(v.optional(v.number()), {
         version: '3.3.0',
      }),
      t: field(v.optional(DistributionTypeSchema()), {
         version: '3.3.0',
      }),
      i: field(v.optional(EaseTypeSchema()), {
         version: '3.3.0',
      }),
      b: field(v.optional(v.picklist([0, 1])), {
         version: '3.3.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `VFX Event Box Group`. */
export function VfxEventBoxGroupSchema(): v.ObjectSchema<
   InferObjectEntries<IFxEventBoxGroup>,
   undefined
> {
   return v.object<InferObjectEntries<IFxEventBoxGroup>>({
      b: field(v.optional(v.number()), {
         version: '3.3.0',
      }),
      g: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.3.0',
      }),
      e: field(v.optional(v.array(VfxEventBoxSchema())), {
         version: '3.3.0',
      }),
      t: field(v.optional(FxTypeSchema()), {
         version: '3.3.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `Basic Event Types with Keywords`. */
export function BasicEventTypesForKeywordsSchema(): v.ObjectSchema<
   InferObjectEntries<IBasicEventTypesForKeywords>,
   undefined
> {
   return v.object<InferObjectEntries<IBasicEventTypesForKeywords>>({
      k: field(v.optional(v.string()), {
         version: '3.0.0',
      }),
      e: field(v.optional(v.array(v.pipe(v.number(), v.integer()))), {
         version: '3.0.0',
      }),
   });
}

/** Schema declaration for v3 `Basic Event Types with Keywords`. */
export function BasicEventTypesWithKeywordsSchema(): v.ObjectSchema<
   InferObjectEntries<IBasicEventTypesWithKeywords>,
   undefined
> {
   return v.object<InferObjectEntries<IBasicEventTypesWithKeywords>>({
      d: field(v.optional(v.array(BasicEventTypesForKeywordsSchema())), {
         version: '3.0.0',
      }),
   });
}

/** Schema declaration for v3 `FX Event Float`. */
export function FxEventFloatSchema(): v.ObjectSchema<
   InferObjectEntries<IFxEventFloat>,
   undefined
> {
   return v.object<InferObjectEntries<IFxEventFloat>>({
      b: field(v.optional(v.number()), {
         version: '3.3.0',
      }),
      p: field(v.optional(v.picklist([0, 1])), {
         version: '3.3.0',
      }),
      v: field(v.optional(v.number()), {
         version: '3.3.0',
      }),
      i: field(v.optional(EaseTypeSchema()), {
         version: '3.3.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `FX Event Int`. */
export function FxEventIntSchema(): v.ObjectSchema<
   InferObjectEntries<IFxEventInt>,
   undefined
> {
   return v.object<InferObjectEntries<IFxEventInt>>({
      b: field(v.optional(v.number()), {
         version: '3.3.0',
      }),
      p: field(v.optional(v.picklist([0, 1])), {
         version: '3.3.0',
      }),
      v: field(v.optional(v.pipe(v.number(), v.integer())), {
         version: '3.3.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v3 `FX Events Collection`. */
export function FxEventsCollectionSchema(): v.ObjectSchema<
   InferObjectEntries<IFxEventsCollection>,
   undefined
> {
   return v.object<InferObjectEntries<IFxEventsCollection>>({
      _fl: field(v.optional(v.array(FxEventFloatSchema())), {
         version: '3.3.0',
      }),
      _il: field(v.optional(v.array(FxEventIntSchema())), {
         version: '3.3.0',
      }),
   });
}

/** Schema declaration for v3 `Difficulty`. */
export function DifficultySchema(): v.ObjectSchema<
   InferObjectEntries<IDifficulty>,
   undefined
> {
   return entity<InferObjectEntries<IDifficulty>>((x) => x.version || '3.0.0', {
      version: field(mask<'3.0.0' | '3.1.0' | '3.2.0' | '3.3.0'>(VersionSchema()), {
         version: '3.0.0',
      }),
      bpmEvents: field(v.optional(v.array(BPMChangeEventSchema())), {
         version: '3.0.0',
      }),
      rotationEvents: field(v.optional(v.array(RotationEventSchema())), {
         version: '3.0.0',
      }),
      colorNotes: field(v.optional(v.array(ColorNoteSchema())), {
         version: '3.0.0',
      }),
      bombNotes: field(v.optional(v.array(BombNoteSchema())), {
         version: '3.0.0',
      }),
      obstacles: field(v.optional(v.array(ObstacleSchema())), {
         version: '3.0.0',
      }),
      sliders: field(v.optional(v.array(ArcSchema())), {
         version: '3.0.0',
      }),
      burstSliders: field(v.optional(v.array(ChainSchema())), {
         version: '3.0.0',
      }),
      waypoints: field(v.optional(v.array(WaypointSchema())), {
         version: '3.0.0',
      }),
      basicBeatmapEvents: field(v.optional(v.array(BasicEventSchema())), {
         version: '3.0.0',
      }),
      colorBoostBeatmapEvents: field(v.optional(v.array(ColorBoostEventSchema())), {
         version: '3.0.0',
      }),
      lightColorEventBoxGroups: field(v.optional(v.array(LightColorEventBoxGroupSchema())), {
         version: '3.0.0',
      }),
      lightRotationEventBoxGroups: field(v.optional(v.array(LightRotationEventBoxGroupSchema())), {
         version: '3.0.0',
      }),
      lightTranslationEventBoxGroups: field(
         v.optional(v.array(LightTranslationEventBoxGroupSchema())),
         {
            version: '3.2.0',
         },
      ),
      vfxEventBoxGroups: field(v.optional(v.array(VfxEventBoxGroupSchema())), {
         version: '3.3.0',
      }),
      _fxEventsCollection: field(v.optional(FxEventsCollectionSchema()), {
         version: '3.3.0',
      }),
      basicEventTypesWithKeywords: field(v.optional(BasicEventTypesWithKeywordsSchema()), {
         version: '3.0.0',
      }),
      useNormalEventsAsCompatibleEvents: field(v.optional(v.boolean()), {
         version: '3.0.0',
      }),
      customData: field(v.optional(CustomDataSchema())),
   });
}
