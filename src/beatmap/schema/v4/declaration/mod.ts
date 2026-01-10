import * as audioData from './audioData.ts';

/** Schema for v4 `Audio Data BPM`. */
export const AudioDataBPMSchema: ReturnType<typeof audioData.AudioDataBPMSchema> =
   /* @__PURE__ */ audioData.AudioDataBPMSchema();
/** Schema for v4 `Audio Data LUFS`. */
export const AudioDataLUFSSchema: ReturnType<typeof audioData.AudioDataLUFSSchema> =
   /* @__PURE__ */ audioData.AudioDataLUFSSchema();
/** Schema for v4 `Audio`. */
export const AudioDataSchema: ReturnType<typeof audioData.AudioDataSchema> =
   /* @__PURE__ */ audioData.AudioDataSchema();

import * as common from './common.ts';

/** Schema for v4 `Object`. */
export const ObjectSchema: ReturnType<typeof common.ObjectSchema> = /* @__PURE__ */ common
   .ObjectSchema();
/** Schema for v4 `Object Lane`. */
export const ObjectLaneSchema: ReturnType<typeof common.ObjectLaneSchema> = /* @__PURE__ */ common
   .ObjectLaneSchema();
/** Schema for v4 `Object Chain`. */
export const ObjectChainSchema: ReturnType<typeof common.ObjectChainSchema> = /* @__PURE__ */ common
   .ObjectChainSchema();
/** Schema for v4 `Object Arc`. */
export const ObjectArcSchema: ReturnType<typeof common.ObjectArcSchema> = /* @__PURE__ */ common
   .ObjectArcSchema();

import * as difficulty from './difficulty.ts';

/** Schema for v4 `Color Note`. */
export const ColorNoteSchema: ReturnType<typeof difficulty.ColorNoteSchema> =
   /* @__PURE__ */ difficulty.ColorNoteSchema();
/** Schema for v4 `Bomb Note`. */
export const BombNoteSchema: ReturnType<typeof difficulty.BombNoteSchema> =
   /* @__PURE__ */ difficulty.BombNoteSchema();
/** Schema for v4 `Obstacle`. */
export const ObstacleSchema: ReturnType<typeof difficulty.ObstacleSchema> =
   /* @__PURE__ */ difficulty.ObstacleSchema();
/** Schema for v4 `Chain`. */
export const ChainSchema: ReturnType<typeof difficulty.ChainSchema> = /* @__PURE__ */ difficulty
   .ChainSchema();
/** Schema for v4 `Arc`. */
export const ArcSchema: ReturnType<typeof difficulty.ArcSchema> = /* @__PURE__ */ difficulty
   .ArcSchema();
/** Schema for v4 `Spawn Rotation`. */
export const SpawnRotationSchema: ReturnType<typeof difficulty.SpawnRotationSchema> =
   /* @__PURE__ */ difficulty.SpawnRotationSchema();
/** Schema for v4 `NJS Event`. */
export const NJSEventSchema: ReturnType<typeof difficulty.NJSEventSchema> =
   /* @__PURE__ */ difficulty.NJSEventSchema();
/** Schema for v4 `Difficulty`. */
export const DifficultySchema: ReturnType<typeof difficulty.DifficultySchema> =
   /* @__PURE__ */ difficulty.DifficultySchema();

import * as info from './info.ts';

/** Schema for v4 `Info Song`. */
export const InfoSongSchema: ReturnType<typeof info.InfoSongSchema> = /* @__PURE__ */ info
   .InfoSongSchema();
/** Schema for v4 `Info Audio`. */
export const InfoAudioSchema: ReturnType<typeof info.InfoAudioSchema> = /* @__PURE__ */ info
   .InfoAudioSchema();
/** Schema for v4 `Info Color Scheme`. */
export const InfoColorSchemeSchema: ReturnType<typeof info.InfoColorSchemeSchema> =
   /* @__PURE__ */ info.InfoColorSchemeSchema();
/** Schema for v4 `Info Beatmap Authors`. */
export const InfoBeatmapAuthorsSchema: ReturnType<typeof info.InfoBeatmapAuthorsSchema> =
   /* @__PURE__ */ info.InfoBeatmapAuthorsSchema();
/** Schema for v4 `Info Beatmap`. */
export const InfoDifficultySchema: ReturnType<typeof info.InfoDifficultySchema> =
   /* @__PURE__ */ info.InfoDifficultySchema();
/** Schema for v4 `Info`. */
export const InfoSchema: ReturnType<typeof info.InfoSchema> = /* @__PURE__ */ info.InfoSchema();

import * as lightshow from './lightshow.ts';

/** Schema for v4 `Waypoint`. */
export const WaypointSchema: ReturnType<typeof lightshow.WaypointSchema> = /* @__PURE__ */ lightshow
   .WaypointSchema();
/** Schema for v4 `Basic Event`. */
export const BasicEventSchema: ReturnType<typeof lightshow.BasicEventSchema> =
   /* @__PURE__ */ lightshow.BasicEventSchema();
/** Schema for v4 `Color Boost Event`. */
export const ColorBoostEventSchema: ReturnType<typeof lightshow.ColorBoostEventSchema> =
   /* @__PURE__ */ lightshow.ColorBoostEventSchema();
/** Schema for v4 `Event Box`. */
export const EventBoxSchema: ReturnType<typeof lightshow.EventBoxSchema> = /* @__PURE__ */ lightshow
   .EventBoxSchema();
/** Schema for v4 `Event Box Group`. */
export const EventBoxGroupSchema: ReturnType<typeof lightshow.EventBoxGroupSchema> =
   /* @__PURE__ */ lightshow.EventBoxGroupSchema();
/** Schema for v4 `Index Filter`. */
export const IndexFilterSchema: ReturnType<typeof lightshow.IndexFilterSchema> =
   /* @__PURE__ */ lightshow.IndexFilterSchema();
/** Schema for v4 `Light Color Event Box`. */
export const LightColorEventBoxSchema: ReturnType<typeof lightshow.LightColorEventBoxSchema> =
   /* @__PURE__ */ lightshow.LightColorEventBoxSchema();
/** Schema for v4 `Light Color Event`. */
export const LightColorEventSchema: ReturnType<typeof lightshow.LightColorEventSchema> =
   /* @__PURE__ */ lightshow.LightColorEventSchema();
/** Schema for v4 `Light Rotation Event Box`. */
export const LightRotationEventBoxSchema: ReturnType<typeof lightshow.LightRotationEventBoxSchema> =
   /* @__PURE__ */ lightshow.LightRotationEventBoxSchema();
/** Schema for v4 `Light Rotation Event`. */
export const LightRotationEventSchema: ReturnType<typeof lightshow.LightRotationEventSchema> =
   /* @__PURE__ */ lightshow.LightRotationEventSchema();
/** Schema for v4 `Light Translation Event Box`. */
export const LightTranslationEventBoxSchema: ReturnType<
   typeof lightshow.LightTranslationEventBoxSchema
> = /* @__PURE__ */ lightshow.LightTranslationEventBoxSchema();
/** Schema for v4 `Light Translation Event`. */
export const LightTranslationEventSchema: ReturnType<typeof lightshow.LightTranslationEventSchema> =
   /* @__PURE__ */ lightshow.LightTranslationEventSchema();
/** Schema for v4 `FX Event Box`. */
export const FXEventBoxSchema: ReturnType<typeof lightshow.FXEventBoxSchema> =
   /* @__PURE__ */ lightshow.FXEventBoxSchema();
/** Schema for v4 `FX Event Float`. */
export const FXEventFloatSchema: ReturnType<typeof lightshow.FXEventFloatSchema> =
   /* @__PURE__ */ lightshow.FXEventFloatSchema();
/** Schema for v4 `Lightshow`. */
export const LightshowSchema: ReturnType<typeof lightshow.LightshowSchema> =
   /* @__PURE__ */ lightshow.LightshowSchema();

export * from './custom/mod.ts';
