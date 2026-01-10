import * as audioData from './audioData.ts';

/** Schema for v2 `BPMInfo Region`. */
export const BPMInfoRegionSchema: ReturnType<typeof audioData.BPMInfoRegionSchema> =
   /* @__PURE__ */ audioData.BPMInfoRegionSchema();
/** Schema for v2 `BPMInfo`. */
export const BPMInfoSchema: ReturnType<typeof audioData.BPMInfoSchema> = /* @__PURE__ */ audioData
   .BPMInfoSchema();

import * as difficulty from './difficulty.ts';

/** Schema for v2 `Note`. */
export const NoteSchema: ReturnType<typeof difficulty.NoteSchema> = /* @__PURE__ */ difficulty
   .NoteSchema();
/** Schema for v2 `Arc`. */
export const ArcSchema: ReturnType<typeof difficulty.ArcSchema> = /* @__PURE__ */ difficulty
   .ArcSchema();
/** Schema for v2 `Obstacle`. */
export const ObstacleSchema: ReturnType<typeof difficulty.ObstacleSchema> =
   /* @__PURE__ */ difficulty.ObstacleSchema();
/** Schema for v2 `Event`. */
export const EventSchema: ReturnType<typeof difficulty.EventSchema> = /* @__PURE__ */ difficulty
   .EventSchema();
/** Schema for v2 `Waypoint`. */
export const WaypointSchema: ReturnType<typeof difficulty.WaypointSchema> =
   /* @__PURE__ */ difficulty.WaypointSchema();
/** Schema for v2 `Special Events Keyword Filters Keywords`. */
export const SpecialEventsKeywordFiltersKeywordsSchema: ReturnType<
   typeof difficulty.SpecialEventsKeywordFiltersKeywordsSchema
> = /* @__PURE__ */ difficulty.SpecialEventsKeywordFiltersKeywordsSchema();
/** Schema for v2 `Special Events Keyword Filters`. */
export const SpecialEventsKeywordFiltersSchema: ReturnType<
   typeof difficulty.SpecialEventsKeywordFiltersSchema
> = /* @__PURE__ */ difficulty.SpecialEventsKeywordFiltersSchema();
/** Schema for v2 `Difficulty`. */
export const DifficultySchema: ReturnType<typeof difficulty.DifficultySchema> =
   /* @__PURE__ */ difficulty.DifficultySchema();

import * as info from './info.ts';

/** Schema for v2 `InfoSetDifficulty`. */
export const InfoSetDifficultySchema: ReturnType<typeof info.InfoSetDifficultySchema> =
   /* @__PURE__ */ info.InfoSetDifficultySchema();
/** Schema for v2 `InfoSet`. */
export const InfoSetSchema: ReturnType<typeof info.InfoSetSchema> = /* @__PURE__ */ info
   .InfoSetSchema();
/** Schema for v2 `Color`. */
export const ColorObjectSchema: ReturnType<typeof info.ColorObjectSchema> = /* @__PURE__ */ info
   .ColorObjectSchema();
/** Schema for v2 `InfoColorSchemeData`. */
export const InfoColorSchemeDataSchema: ReturnType<typeof info.InfoColorSchemeDataSchema> =
   /* @__PURE__ */ info.InfoColorSchemeDataSchema();
/** Schema for v2 `InfoColorScheme`. */
export const InfoColorSchemeSchema: ReturnType<typeof info.InfoColorSchemeSchema> =
   /* @__PURE__ */ info.InfoColorSchemeSchema();
/** Schema for v2 `Info`. */
export const InfoSchema: ReturnType<typeof info.InfoSchema> = /* @__PURE__ */ info.InfoSchema();

export * from './custom/mod.ts';
