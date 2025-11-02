import * as audioData from './audioData.ts';

/** Schema for v2 `BPMInfo Region`. */
export const BPMInfoRegionSchema = /* @__PURE__ */ audioData.BPMInfoRegionSchema();
/** Schema for v2 `BPMInfo`. */
export const BPMInfoSchema = /* @__PURE__ */ audioData.BPMInfoSchema();

import * as difficulty from './difficulty.ts';

/** Schema for v2 `Note`. */
export const NoteSchema = /* @__PURE__ */ difficulty.NoteSchema();
/** Schema for v2 `Arc`. */
export const ArcSchema = /* @__PURE__ */ difficulty.ArcSchema();
/** Schema for v2 `Obstacle`. */
export const ObstacleSchema = /* @__PURE__ */ difficulty.ObstacleSchema();
/** Schema for v2 `Event`. */
export const EventSchema = /* @__PURE__ */ difficulty.EventSchema();
/** Schema for v2 `Waypoint`. */
export const WaypointSchema = /* @__PURE__ */ difficulty.WaypointSchema();
/** Schema for v2 `Special Events Keyword Filters Keywords`. */
export const SpecialEventsKeywordFiltersKeywordsSchema = /* @__PURE__ */ difficulty
   .SpecialEventsKeywordFiltersKeywordsSchema();
/** Schema for v2 `Special Events Keyword Filters`. */
export const SpecialEventsKeywordFiltersSchema = /* @__PURE__ */ difficulty
   .SpecialEventsKeywordFiltersSchema();
/** Schema for v2 `Difficulty`. */
export const DifficultySchema = /* @__PURE__ */ difficulty.DifficultySchema();

import * as info from './info.ts';

/** Schema for v2 `InfoSetDifficulty`. */
export const InfoSetDifficultySchema = /* @__PURE__ */ info.InfoSetDifficultySchema();
/** Schema for v2 `InfoSet`. */
export const InfoSetSchema = /* @__PURE__ */ info.InfoSetSchema();
/** Schema for v2 `Color`. */
export const ColorObjectSchema = /* @__PURE__ */ info.ColorObjectSchema();
/** Schema for v2 `InfoColorSchemeData`. */
export const InfoColorSchemeDataSchema = /* @__PURE__ */ info.InfoColorSchemeDataSchema();
/** Schema for v2 `InfoColorScheme`. */
export const InfoColorSchemeSchema = /* @__PURE__ */ info.InfoColorSchemeSchema();
/** Schema for v2 `Info`. */
export const InfoSchema = /* @__PURE__ */ info.InfoSchema();

export * from './custom/mod.ts';
