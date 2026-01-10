import * as common from './common.ts';

/** Schema for semantic version. */
export const VersionSchema: ReturnType<typeof common.VersionSchema> = /* @__PURE__ */ common
   .VersionSchema();
/** Schema for custom data. */
export const CustomDataSchema: ReturnType<typeof common.CustomDataSchema> = /* @__PURE__ */ common
   .CustomDataSchema();
/** Schema for {@linkcode CharacteristicName} */
export const CharacteristicNameSchema: ReturnType<typeof common.CharacteristicNameSchema> =
   /* @__PURE__ */ common.CharacteristicNameSchema();
/** Schema for {@linkcode DifficultyName} */
export const DifficultyNameSchema: ReturnType<typeof common.DifficultyNameSchema> =
   /* @__PURE__ */ common.DifficultyNameSchema();
/** Schema for {@linkcode DifficultyRank} */
export const DifficultyRankSchema: ReturnType<typeof common.DifficultyRankSchema> =
   /* @__PURE__ */ common.DifficultyRankSchema();
/** Schema for {@linkcode EnvironmentName} */
export const EnvironmentNameSchema: ReturnType<typeof common.EnvironmentNameSchema> =
   /* @__PURE__ */ common.EnvironmentNameSchema();
/** Schema for {@linkcode EnvironmentV2Name} */
export const EnvironmentV2NameSchema: ReturnType<typeof common.EnvironmentV2NameSchema> =
   /* @__PURE__ */ common.EnvironmentV2NameSchema();
/** Schema for {@linkcode EnvironmentV3Name} */
export const EnvironmentV3NameSchema: ReturnType<typeof common.EnvironmentV3NameSchema> =
   /* @__PURE__ */ common.EnvironmentV3NameSchema();
/** Schema for {@linkcode Environment360Name} */
export const Environment360NameSchema: ReturnType<typeof common.Environment360NameSchema> =
   /* @__PURE__ */ common.Environment360NameSchema();
/** Schema for {@linkcode PosX} */
export const PosXSchema: ReturnType<typeof common.PosXSchema> = /* @__PURE__ */ common.PosXSchema();
/** Schema for {@linkcode PosY} */
export const PosYSchema: ReturnType<typeof common.PosYSchema> = /* @__PURE__ */ common.PosYSchema();
/** Schema for {@linkcode NoteColor} */
export const NoteColorSchema: ReturnType<typeof common.NoteColorSchema> = /* @__PURE__ */ common
   .NoteColorSchema();
/** Schema for {@linkcode NoteDirection} */
export const NoteDirectionSchema: ReturnType<typeof common.NoteDirectionSchema> =
   /* @__PURE__ */ common.NoteDirectionSchema();
/** Schema for {@linkcode OffsetDirection} */
export const OffsetDirectionSchema: ReturnType<typeof common.OffsetDirectionSchema> =
   /* @__PURE__ */ common.OffsetDirectionSchema();
/** Schema for {@linkcode OffsetDirection} */
export const SliderMidAnchorModeSchema: ReturnType<typeof common.SliderMidAnchorModeSchema> =
   /* @__PURE__ */ common.SliderMidAnchorModeSchema();
/** Schema for {@linkcode EventLightValue} */
export const EventLightValueSchema: ReturnType<typeof common.EventLightValueSchema> =
   /* @__PURE__ */ common.EventLightValueSchema();
/** Schema for {@linkcode EventType} */
export const EventTypeSchema: ReturnType<typeof common.EventTypeSchema> = /* @__PURE__ */ common
   .EventTypeSchema();
/** Schema for {@linkcode ExecutionTime} */
export const ExecutionTimeSchema: ReturnType<typeof common.ExecutionTimeSchema> =
   /* @__PURE__ */ common.ExecutionTimeSchema();
/** Schema for {@linkcode IndexFilterType} */
export const IndexFilterTypeSchema: ReturnType<typeof common.IndexFilterTypeSchema> =
   /* @__PURE__ */ common.IndexFilterTypeSchema();
/** Schema for {@linkcode LimitAlsoAffectsType} */
export const LimitAlsoAffectsTypeSchema: ReturnType<typeof common.LimitAlsoAffectsTypeSchema> =
   /* @__PURE__ */ common.LimitAlsoAffectsTypeSchema();
/** Schema for {@linkcode RandomType} */
export const RandomTypeSchema: ReturnType<typeof common.RandomTypeSchema> = /* @__PURE__ */ common
   .RandomTypeSchema();
/** Schema for {@linkcode DistributionType} */
export const DistributionTypeSchema: ReturnType<typeof common.DistributionTypeSchema> =
   /* @__PURE__ */ common.DistributionTypeSchema();
/** Schema for {@linkcode EaseType} */
export const EaseTypeSchema: ReturnType<typeof common.EaseTypeSchema> = /* @__PURE__ */ common
   .EaseTypeSchema();
/** Schema for {@linkcode EventLightColor} */
export const EventLightColorSchema: ReturnType<typeof common.EventLightColorSchema> =
   /* @__PURE__ */ common.EventLightColorSchema();
/** Schema for {@linkcode Axis} */
export const AxisSchema: ReturnType<typeof common.AxisSchema> = /* @__PURE__ */ common.AxisSchema();
/** Schema for {@linkcode LightRotationDirection} */
export const LightRotationDirectionSchema: ReturnType<typeof common.LightRotationDirectionSchema> =
   /* @__PURE__ */ common.LightRotationDirectionSchema();
/** Schema for {@linkcode NoteType} */
export const NoteTypeSchema: ReturnType<typeof common.NoteTypeSchema> = /* @__PURE__ */ common
   .NoteTypeSchema();
/** Schema for {@linkcode ObstacleType} */
export const ObstacleTypeSchema: ReturnType<typeof common.ObstacleTypeSchema> =
   /* @__PURE__ */ common.ObstacleTypeSchema();
/** Schema for {@linkcode TransitionType} */
export const TransitionTypeSchema: ReturnType<typeof common.TransitionTypeSchema> =
   /* @__PURE__ */ common.TransitionTypeSchema();
/** Schema for {@linkcode FxType} */
export const FxTypeSchema: ReturnType<typeof common.FxTypeSchema> = /* @__PURE__ */ common
   .FxTypeSchema();
/** Schema for {@linkcode EventBoxType} */
export const EventBoxTypeSchema: ReturnType<typeof common.EventBoxTypeSchema> =
   /* @__PURE__ */ common.EventBoxTypeSchema();

import * as vector from './vector.ts';

/** Schema for one-dimensional vector tuple. */
export const Vector1Schema: ReturnType<typeof vector.Vector1Schema> = /* @__PURE__ */ vector
   .Vector1Schema();
/** Schema for two-dimensional vector tuple. */
export const Vector2Schema: ReturnType<typeof vector.Vector2Schema> = /* @__PURE__ */ vector
   .Vector2Schema();
/** Schema for three-dimensional vector tuple. */
export const Vector3Schema: ReturnType<typeof vector.Vector3Schema> = /* @__PURE__ */ vector
   .Vector3Schema();
/** Schema for four-dimensional vector tuple. */
export const Vector4Schema: ReturnType<typeof vector.Vector4Schema> = /* @__PURE__ */ vector
   .Vector4Schema();
/** Schema for three-dimensional vector object. */
export const Vector2ObjectSchema: ReturnType<typeof vector.Vector2ObjectSchema> =
   /* @__PURE__ */ vector.Vector2ObjectSchema();
/** Schema for three-dimensional vector object. */
export const Vector3ObjectSchema: ReturnType<typeof vector.Vector3ObjectSchema> =
   /* @__PURE__ */ vector.Vector3ObjectSchema();
/** Schema for float vector. */
export const VectorFloatSchema: ReturnType<typeof vector.VectorFloatSchema> = /* @__PURE__ */ vector
   .VectorFloatSchema();
/** Schema for three-dimensional color vector. */
export const Vector3ColorSchema: ReturnType<typeof vector.Vector3ColorSchema> =
   /* @__PURE__ */ vector.Vector3ColorSchema();
/** Schema for four-dimensional color vector. */
export const Vector4ColorSchema: ReturnType<typeof vector.Vector4ColorSchema> =
   /* @__PURE__ */ vector.Vector4ColorSchema();

export * from './custom/mod.ts';
