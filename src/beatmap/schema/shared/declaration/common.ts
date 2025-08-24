import { v } from '../../../../deps.ts';
import {
   Axis,
   CharacteristicName,
   DifficultyName,
   DifficultyRank,
   DistributionType,
   EaseType,
   Environment360Name,
   EnvironmentAllName,
   EnvironmentName,
   EnvironmentV3Name,
   EventBoxType,
   EventLightColor,
   EventType,
   ExecutionTime,
   FxType,
   IndexFilterType,
   LightRotationDirection,
   LimitAlsoAffectsType,
   NoteType,
   ObstacleType,
   RandomType,
   TransitionType,
} from '../../shared/types/mod.ts';
import {
   EventLightValue,
   NoteColor,
   NoteDirection,
   OffsetDirection,
   PosX,
   PosY,
   SliderMidAnchorMode,
} from '../../shared/types/constants.ts';

/** Schema declaration for semantic version. */
export const VersionSchema: v.SchemaWithPipe<
   readonly [v.StringSchema<undefined>, v.RegexAction<string, undefined>]
> = v.pipe(v.string(), v.regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/));

/** Schema declaration for custom data. */
export const CustomDataSchema: v.RecordSchema<
   v.StringSchema<undefined>,
   v.AnySchema,
   undefined
> = v.record(v.string(), v.any());

/** Schema declaration for {@linkcode CharacteristicName} */
export const CharacteristicNameSchema: v.PicklistSchema<
   typeof CharacteristicName,
   undefined
> = v.picklist(CharacteristicName);

/** Schema declaration for {@linkcode DifficultyName} */
export const DifficultyNameSchema: v.PicklistSchema<
   typeof DifficultyName,
   undefined
> = v.picklist(DifficultyName);

/** Schema declaration for {@linkcode DifficultyRank} */
export const DifficultyRankSchema: v.PicklistSchema<
   typeof DifficultyRank,
   undefined
> = v.picklist(DifficultyRank);

/** Schema declaration for {@linkcode EnvironmentName} */
export const EnvironmentNameSchema: v.PicklistSchema<
   typeof EnvironmentName,
   undefined
> = v.picklist(EnvironmentName);

/** Schema declaration for {@linkcode EnvironmentV3Name} */
export const EnvironmentV3NameSchema: v.PicklistSchema<
   typeof EnvironmentV3Name,
   undefined
> = v.picklist(EnvironmentV3Name);

/** Schema declaration for {@linkcode Environment360Name} */
export const Environment360NameSchema: v.PicklistSchema<
   typeof Environment360Name,
   undefined
> = v.picklist(Environment360Name);

/** Schema declaration for {@linkcode EnvironmentAllName} */
export const EnvironmentAllNameSchema: v.PicklistSchema<
   typeof EnvironmentAllName,
   undefined
> = v.picklist(EnvironmentAllName);

/** Schema declaration for {@linkcode PosX} */
export const PosXSchema: v.EnumSchema<typeof PosX, undefined> = v.enum_(PosX);

/** Schema declaration for {@linkcode PosY} */
export const PosYSchema: v.EnumSchema<typeof PosY, undefined> = v.enum_(PosY);

/** Schema declaration for {@linkcode NoteColor} */
export const NoteColorSchema: v.EnumSchema<typeof NoteColor, undefined> = v.enum_(NoteColor);

/** Schema declaration for {@linkcode NoteDirection} */
export const NoteDirectionSchema: v.EnumSchema<
   typeof NoteDirection,
   undefined
> = v.enum_(NoteDirection);

/** Schema declaration for {@linkcode OffsetDirection} */
export const OffsetDirectionSchema: v.EnumSchema<
   typeof OffsetDirection,
   undefined
> = v.enum_(OffsetDirection);

/** Schema declaration for {@linkcode OffsetDirection} */
export const SliderMidAnchorModeSchema: v.EnumSchema<
   typeof SliderMidAnchorMode,
   undefined
> = v.enum_(SliderMidAnchorMode);

/** Schema declaration for {@linkcode EventLightValue} */
export const EventLightValueSchema: v.EnumSchema<
   typeof EventLightValue,
   undefined
> = v.enum_(EventLightValue);

/** Schema declaration for {@linkcode EventType} */
export const EventTypeSchema: v.EnumSchema<typeof EventType, undefined> = v.enum_(EventType);

/** Schema declaration for {@linkcode ExecutionTime} */
export const ExecutionTimeSchema: v.EnumSchema<
   typeof ExecutionTime,
   undefined
> = v.enum_(ExecutionTime);

/** Schema declaration for {@linkcode IndexFilterType} */
export const IndexFilterTypeSchema: v.EnumSchema<
   typeof IndexFilterType,
   undefined
> = v.enum_(IndexFilterType);

/** Schema declaration for {@linkcode LimitAlsoAffectsType} */
export const LimitAlsoAffectsTypeSchema: v.EnumSchema<
   typeof LimitAlsoAffectsType,
   undefined
> = v.enum_(LimitAlsoAffectsType);

/** Schema declaration for {@linkcode RandomType} */
export const RandomTypeSchema: v.EnumSchema<typeof RandomType, undefined> = v.enum_(RandomType);

/** Schema declaration for {@linkcode DistributionType} */
export const DistributionTypeSchema: v.EnumSchema<
   typeof DistributionType,
   undefined
> = v.enum_(DistributionType);

/** Schema declaration for {@linkcode EaseType} */
export const EaseTypeSchema: v.EnumSchema<typeof EaseType, undefined> = v.enum_(EaseType);

/** Schema declaration for {@linkcode EventLightColor} */
export const EventLightColorSchema: v.EnumSchema<
   typeof EventLightColor,
   undefined
> = v.enum_(EventLightColor);

/** Schema declaration for {@linkcode Axis} */
export const AxisSchema: v.EnumSchema<typeof Axis, undefined> = v.enum_(Axis);

/** Schema declaration for {@linkcode LightRotationDirection} */
export const LightRotationDirectionSchema: v.EnumSchema<
   typeof LightRotationDirection,
   undefined
> = v.enum_(LightRotationDirection);

/** Schema declaration for {@linkcode NoteType} */
export const NoteTypeSchema: v.EnumSchema<typeof NoteType, undefined> = v.enum_(NoteType);

/** Schema declaration for {@linkcode ObstacleType} */
export const ObstacleTypeSchema: v.EnumSchema<typeof ObstacleType, undefined> = v.enum_(
   ObstacleType,
);

/** Schema declaration for {@linkcode TransitionType} */
export const TransitionTypeSchema: v.EnumSchema<
   typeof TransitionType,
   undefined
> = v.enum_(TransitionType);

/** Schema declaration for {@linkcode FxType} */
export const FxTypeSchema: v.EnumSchema<typeof FxType, undefined> = v.enum_(FxType);

/** Schema declaration for {@linkcode EventBoxType} */
export const EventBoxTypeSchema: v.EnumSchema<typeof EventBoxType, undefined> = v.enum_(
   EventBoxType,
);
