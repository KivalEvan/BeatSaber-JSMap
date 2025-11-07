import * as difficulty from './difficulty.ts';

/** Schema for v3 `Color Note`. */
export const ColorNoteSchema = /* @__PURE__ */ difficulty.ColorNoteSchema();
/** Schema for v3 `Bomb Note`. */
export const BombNoteSchema = /* @__PURE__ */ difficulty.BombNoteSchema();
/** Schema for v3 `Arc`. */
export const ArcSchema = /* @__PURE__ */ difficulty.ArcSchema();
/** Schema for v3 `Chain`. */
export const ChainSchema = /* @__PURE__ */ difficulty.ChainSchema();
/** Schema for v3 `Obstacle`. */
export const ObstacleSchema = /* @__PURE__ */ difficulty.ObstacleSchema();
/** Schema for v3 `Waypoint`. */
export const WaypointSchema = /* @__PURE__ */ difficulty.WaypointSchema();
/** Schema for v3 `Basic Event`. */
export const BasicEventSchema = /* @__PURE__ */ difficulty.BasicEventSchema();
/** Schema for v3 `BPM Change Event`. */
export const BPMChangeEventSchema = /* @__PURE__ */ difficulty.BPMChangeEventSchema();
/** Schema for v3 `Rotation Event`. */
export const RotationEventSchema = /* @__PURE__ */ difficulty.RotationEventSchema();
/** Schema for v3 `Color Boost Event`. */
export const ColorBoostEventSchema = /* @__PURE__ */ difficulty.ColorBoostEventSchema();
/** Schema for v3 `Index Filter`. */
export const IndexFilterSchema = /* @__PURE__ */ difficulty.IndexFilterSchema();
/** Schema for v3 `Light Color Event`. */
export const LightColorBaseSchema = /* @__PURE__ */ difficulty.LightColorBaseSchema();
/** Schema for v3 `Light Color Event Box`. */
export const LightColorEventBoxSchema = /* @__PURE__ */ difficulty.LightColorEventBoxSchema();
/** Schema for v3 `Light Color Event Box Group`. */
export const LightColorEventBoxGroupSchema = /* @__PURE__ */ difficulty
   .LightColorEventBoxGroupSchema();
/** Schema for v3 `Light Rotation Event`. */
export const LightRotationBaseSchema = /* @__PURE__ */ difficulty.LightRotationBaseSchema();
/** Schema for v3 `Light Rotation Event Box`. */
export const LightRotationEventBoxSchema = /* @__PURE__ */ difficulty.LightRotationEventBoxSchema();
/** Schema for v3 `Light Rotation Event Box Group`. */
export const LightRotationEventBoxGroupSchema = /* @__PURE__ */ difficulty
   .LightRotationEventBoxGroupSchema();
/** Schema for v3 `Light Translation Event`. */
export const LightTranslationBaseSchema = /* @__PURE__ */ difficulty.LightTranslationBaseSchema();
/** Schema for v3 `Light Translation Event Box`. */
export const LightTranslationEventBoxSchema = /* @__PURE__ */ difficulty
   .LightTranslationEventBoxSchema();
/** Schema for v3 `Light Translation Event Box Group`. */
export const LightTranslationEventBoxGroupSchema = /* @__PURE__ */ difficulty
   .LightTranslationEventBoxGroupSchema();
/** Schema for v3 `VFX Event Box`. */
export const VfxEventBoxSchema = /* @__PURE__ */ difficulty.VfxEventBoxSchema();
/** Schema for v3 `VFX Event Box Group`. */
export const VfxEventBoxGroupSchema = /* @__PURE__ */ difficulty.VfxEventBoxGroupSchema();
/** Schema for v3 `Basic Event Types with Keywords`. */
export const BasicEventTypesForKeywordsSchema = /* @__PURE__ */ difficulty
   .BasicEventTypesForKeywordsSchema();
/** Schema for v3 `Basic Event Types with Keywords`. */
export const BasicEventTypesWithKeywordsSchema = /* @__PURE__ */ difficulty
   .BasicEventTypesWithKeywordsSchema();
/** Schema for v3 `FX Event Float`. */
export const FxEventFloatSchema = /* @__PURE__ */ difficulty.FxEventFloatSchema();
/** Schema for v3 `FX Event Int`. */
export const FxEventIntSchema = /* @__PURE__ */ difficulty.FxEventIntSchema();
/** Schema for v3 `FX Events Collection`. */
export const FxEventsCollectionSchema = /* @__PURE__ */ difficulty.FxEventsCollectionSchema();
/** Schema for v3 `Difficulty`. */
export const DifficultySchema = /* @__PURE__ */ difficulty.DifficultySchema();

import * as lightshow from './lightshow.ts';

/** Schema for v3 `Lightshow`. */
export const LightshowSchema = /* @__PURE__ */ lightshow.LightshowSchema();

export * from './custom/mod.ts';
