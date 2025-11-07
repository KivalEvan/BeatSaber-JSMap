import * as difficulty from './difficulty.ts';

/** Schema for v1 `Note`. */
export const NoteSchema = /* @__PURE__ */ difficulty.NoteSchema();
/** Schema for v1 `Obstacle`. */
export const ObstacleSchema = /* @__PURE__ */ difficulty.ObstacleSchema();
/** Schema for v1 `Event`. */
export const EventSchema = /* @__PURE__ */ difficulty.EventSchema();
/** Schema for v1 `BPM Change`. */
export const CustomBPMChangeOldSchema = /* @__PURE__ */ difficulty.CustomBPMChangeOldSchema();
/** Schema for v1 `Bookmark`. */
export const CustomBookmarkSchema = /* @__PURE__ */ difficulty.CustomBookmarkSchema();
/** Schema for v1 `Difficulty`. */
export const DifficultySchema = /* @__PURE__ */ difficulty.DifficultySchema();

import * as info from './info.ts';

/** Schema for v1 `Color`. */
export const CustomColorObjectSchema = /* @__PURE__ */ info.CustomColorObjectSchema();
/** Schema for v1 `Info Difficulty`. */
export const InfoDifficultySchema = /* @__PURE__ */ info.InfoDifficultySchema();
/** Schema for v1 `Info`. */
export const InfoSchema = /* @__PURE__ */ info.InfoSchema();
