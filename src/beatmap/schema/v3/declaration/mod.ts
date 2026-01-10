import * as difficulty from './difficulty.ts';

/** Schema for v3 `Color Note`. */
export const ColorNoteSchema: ReturnType<typeof difficulty.ColorNoteSchema> =
   /* @__PURE__ */ difficulty.ColorNoteSchema();
/** Schema for v3 `Bomb Note`. */
export const BombNoteSchema: ReturnType<typeof difficulty.BombNoteSchema> =
   /* @__PURE__ */ difficulty.BombNoteSchema();
/** Schema for v3 `Arc`. */
export const ArcSchema: ReturnType<typeof difficulty.ArcSchema> = /* @__PURE__ */ difficulty
   .ArcSchema();
/** Schema for v3 `Chain`. */
export const ChainSchema: ReturnType<typeof difficulty.ChainSchema> = /* @__PURE__ */ difficulty
   .ChainSchema();
/** Schema for v3 `Obstacle`. */
export const ObstacleSchema: ReturnType<typeof difficulty.ObstacleSchema> =
   /* @__PURE__ */ difficulty.ObstacleSchema();
/** Schema for v3 `Waypoint`. */
export const WaypointSchema: ReturnType<typeof difficulty.WaypointSchema> =
   /* @__PURE__ */ difficulty.WaypointSchema();
/** Schema for v3 `Basic Event`. */
export const BasicEventSchema: ReturnType<typeof difficulty.BasicEventSchema> =
   /* @__PURE__ */ difficulty.BasicEventSchema();
/** Schema for v3 `BPM Change Event`. */
export const BPMChangeEventSchema: ReturnType<typeof difficulty.BPMChangeEventSchema> =
   /* @__PURE__ */ difficulty.BPMChangeEventSchema();
/** Schema for v3 `Rotation Event`. */
export const RotationEventSchema: ReturnType<typeof difficulty.RotationEventSchema> =
   /* @__PURE__ */ difficulty.RotationEventSchema();
/** Schema for v3 `Color Boost Event`. */
export const ColorBoostEventSchema: ReturnType<typeof difficulty.ColorBoostEventSchema> =
   /* @__PURE__ */ difficulty.ColorBoostEventSchema();
/** Schema for v3 `Index Filter`. */
export const IndexFilterSchema: ReturnType<typeof difficulty.IndexFilterSchema> =
   /* @__PURE__ */ difficulty.IndexFilterSchema();
/** Schema for v3 `Light Color Event`. */
export const LightColorBaseSchema: ReturnType<typeof difficulty.LightColorBaseSchema> =
   /* @__PURE__ */ difficulty.LightColorBaseSchema();
/** Schema for v3 `Light Color Event Box`. */
export const LightColorEventBoxSchema: ReturnType<typeof difficulty.LightColorEventBoxSchema> =
   /* @__PURE__ */ difficulty.LightColorEventBoxSchema();
/** Schema for v3 `Light Color Event Box Group`. */
export const LightColorEventBoxGroupSchema: ReturnType<
   typeof difficulty.LightColorEventBoxGroupSchema
> = /* @__PURE__ */ difficulty.LightColorEventBoxGroupSchema();
/** Schema for v3 `Light Rotation Event`. */
export const LightRotationBaseSchema: ReturnType<typeof difficulty.LightRotationBaseSchema> =
   /* @__PURE__ */ difficulty.LightRotationBaseSchema();
/** Schema for v3 `Light Rotation Event Box`. */
export const LightRotationEventBoxSchema: ReturnType<
   typeof difficulty.LightRotationEventBoxSchema
> = /* @__PURE__ */ difficulty.LightRotationEventBoxSchema();
/** Schema for v3 `Light Rotation Event Box Group`. */
export const LightRotationEventBoxGroupSchema: ReturnType<
   typeof difficulty.LightRotationEventBoxGroupSchema
> = /* @__PURE__ */ difficulty.LightRotationEventBoxGroupSchema();
/** Schema for v3 `Light Translation Event`. */
export const LightTranslationBaseSchema: ReturnType<typeof difficulty.LightTranslationBaseSchema> =
   /* @__PURE__ */ difficulty.LightTranslationBaseSchema();
/** Schema for v3 `Light Translation Event Box`. */
export const LightTranslationEventBoxSchema: ReturnType<
   typeof difficulty.LightTranslationEventBoxSchema
> = /* @__PURE__ */ difficulty.LightTranslationEventBoxSchema();
/** Schema for v3 `Light Translation Event Box Group`. */
export const LightTranslationEventBoxGroupSchema: ReturnType<
   typeof difficulty.LightTranslationEventBoxGroupSchema
> = /* @__PURE__ */ difficulty.LightTranslationEventBoxGroupSchema();
/** Schema for v3 `VFX Event Box`. */
export const VfxEventBoxSchema: ReturnType<typeof difficulty.VfxEventBoxSchema> =
   /* @__PURE__ */ difficulty.VfxEventBoxSchema();
/** Schema for v3 `VFX Event Box Group`. */
export const VfxEventBoxGroupSchema: ReturnType<typeof difficulty.VfxEventBoxGroupSchema> =
   /* @__PURE__ */ difficulty.VfxEventBoxGroupSchema();
/** Schema for v3 `Basic Event Types with Keywords`. */
export const BasicEventTypesForKeywordsSchema: ReturnType<
   typeof difficulty.BasicEventTypesForKeywordsSchema
> = /* @__PURE__ */ difficulty.BasicEventTypesForKeywordsSchema();
/** Schema for v3 `Basic Event Types with Keywords`. */
export const BasicEventTypesWithKeywordsSchema: ReturnType<
   typeof difficulty.BasicEventTypesWithKeywordsSchema
> = /* @__PURE__ */ difficulty.BasicEventTypesWithKeywordsSchema();
/** Schema for v3 `FX Event Float`. */
export const FxEventFloatSchema: ReturnType<typeof difficulty.FxEventFloatSchema> =
   /* @__PURE__ */ difficulty.FxEventFloatSchema();
/** Schema for v3 `FX Event Int`. */
export const FxEventIntSchema: ReturnType<typeof difficulty.FxEventIntSchema> =
   /* @__PURE__ */ difficulty.FxEventIntSchema();
/** Schema for v3 `FX Events Collection`. */
export const FxEventsCollectionSchema: ReturnType<typeof difficulty.FxEventsCollectionSchema> =
   /* @__PURE__ */ difficulty.FxEventsCollectionSchema();
/** Schema for v3 `Difficulty`. */
export const DifficultySchema: ReturnType<typeof difficulty.DifficultySchema> =
   /* @__PURE__ */ difficulty.DifficultySchema();

import * as lightshow from './lightshow.ts';

/** Schema for v3 `Lightshow`. */
export const LightshowSchema: ReturnType<typeof lightshow.LightshowSchema> =
   /* @__PURE__ */ lightshow.LightshowSchema();

export * from './custom/mod.ts';
