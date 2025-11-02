import * as audioData from './audioData.ts';

/** Schema for v4 `Audio Data BPM`. */
export const AudioDataBPMSchema = /* @__PURE__ */ audioData.AudioDataBPMSchema();
/** Schema for v4 `Audio Data LUFS`. */
export const AudioDataLUFSSchema = /* @__PURE__ */ audioData.AudioDataLUFSSchema();
/** Schema for v4 `Audio`. */
export const AudioDataSchema = /* @__PURE__ */ audioData.AudioDataSchema();

import * as common from './common.ts';

/** Schema for v4 `Object`. */
export const ObjectSchema = /* @__PURE__ */ common.ObjectSchema();
/** Schema for v4 `Object Lane`. */
export const ObjectLaneSchema = /* @__PURE__ */ common.ObjectLaneSchema();
/** Schema for v4 `Object Chain`. */
export const ObjectChainSchema = /* @__PURE__ */ common.ObjectChainSchema();
/** Schema for v4 `Object Arc`. */
export const ObjectArcSchema = /* @__PURE__ */ common.ObjectArcSchema();

import * as difficulty from './difficulty.ts';

/** Schema for v4 `Color Note`. */
export const ColorNoteSchema = /* @__PURE__ */ difficulty.ColorNoteSchema();
/** Schema for v4 `Bomb Note`. */
export const BombNoteSchema = /* @__PURE__ */ difficulty.BombNoteSchema();
/** Schema for v4 `Obstacle`. */
export const ObstacleSchema = /* @__PURE__ */ difficulty.ObstacleSchema();
/** Schema for v4 `Chain`. */
export const ChainSchema = /* @__PURE__ */ difficulty.ChainSchema();
/** Schema for v4 `Arc`. */
export const ArcSchema = /* @__PURE__ */ difficulty.ArcSchema();
/** Schema for v4 `Spawn Rotation`. */
export const SpawnRotationSchema = /* @__PURE__ */ difficulty.SpawnRotationSchema();
/** Schema for v4 `NJS Event`. */
export const NJSEventSchema = /* @__PURE__ */ difficulty.NJSEventSchema();
/** Schema for v4 `Difficulty`. */
export const DifficultySchema = /* @__PURE__ */ difficulty.DifficultySchema();

import * as info from './info.ts';

/** Schema for v4 `Info Song`. */
export const InfoSongSchema = /* @__PURE__ */ info.InfoSongSchema();
/** Schema for v4 `Info Audio`. */
export const InfoAudioSchema = /* @__PURE__ */ info.InfoAudioSchema();
/** Schema for v4 `Info Color Scheme`. */
export const InfoColorSchemeSchema = /* @__PURE__ */ info.InfoColorSchemeSchema();
/** Schema for v4 `Info Beatmap Authors`. */
export const InfoBeatmapAuthorsSchema = /* @__PURE__ */ info.InfoBeatmapAuthorsSchema();
/** Schema for v4 `Info Beatmap`. */
export const InfoDifficultySchema = /* @__PURE__ */ info.InfoDifficultySchema();
/** Schema for v4 `Info`. */
export const InfoSchema = /* @__PURE__ */ info.InfoSchema();

import * as lightshow from './lightshow.ts';

/** Schema for v4 `Waypoint`. */
export const WaypointSchema = /* @__PURE__ */ lightshow.WaypointSchema();
/** Schema for v4 `Basic Event`. */
export const BasicEventSchema = /* @__PURE__ */ lightshow.BasicEventSchema();
/** Schema for v4 `Color Boost Event`. */
export const ColorBoostEventSchema = /* @__PURE__ */ lightshow.ColorBoostEventSchema();
/** Schema for v4 `Event Box`. */
export const EventBoxSchema = /* @__PURE__ */ lightshow.EventBoxSchema();
/** Schema for v4 `Event Box Group`. */
export const EventBoxGroupSchema = /* @__PURE__ */ lightshow.EventBoxGroupSchema();
/** Schema for v4 `Index Filter`. */
export const IndexFilterSchema = /* @__PURE__ */ lightshow.IndexFilterSchema();
/** Schema for v4 `Light Color Event Box`. */
export const LightColorEventBoxSchema = /* @__PURE__ */ lightshow.LightColorEventBoxSchema();
/** Schema for v4 `Light Color Event`. */
export const LightColorEventSchema = /* @__PURE__ */ lightshow.LightColorEventSchema();
/** Schema for v4 `Light Rotation Event Box`. */
export const LightRotationEventBoxSchema = /* @__PURE__ */ lightshow.LightRotationEventBoxSchema();
/** Schema for v4 `Light Rotation Event`. */
export const LightRotationEventSchema = /* @__PURE__ */ lightshow.LightRotationEventSchema();
/** Schema for v4 `Light Translation Event Box`. */
export const LightTranslationEventBoxSchema = /* @__PURE__ */ lightshow
   .LightTranslationEventBoxSchema();
/** Schema for v4 `Light Translation Event`. */
export const LightTranslationEventSchema = /* @__PURE__ */ lightshow.LightTranslationEventSchema();
/** Schema for v4 `FX Event Box`. */
export const FXEventBoxSchema = /* @__PURE__ */ lightshow.FXEventBoxSchema();
/** Schema for v4 `FX Event Float`. */
export const FXEventFloatSchema = /* @__PURE__ */ lightshow.FXEventFloatSchema();
/** Schema for v4 `Lightshow`. */
export const LightshowSchema = /* @__PURE__ */ lightshow.LightshowSchema();

export * from './custom/mod.ts';
