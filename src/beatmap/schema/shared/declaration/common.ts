import {
   any,
   type AnySchema,
   enum_ as enumlike,
   type EnumSchema,
   picklist,
   type PicklistSchema,
   pipe,
   record,
   type RecordSchema,
   regex,
   type RegexAction,
   type SchemaWithPipe,
   string,
   type StringSchema,
} from '@valibot/valibot';
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
} from '../../../../types/beatmap/shared/mod.ts';
import {
   EventLightValue,
   NoteColor,
   NoteDirection,
   OffsetDirection,
   PosX,
   PosY,
   SliderMidAnchorMode,
} from '../../../shared/constants.ts';

/** Schema declaration for semantic version. */
export const VersionSchema: SchemaWithPipe<
   [StringSchema<undefined>, RegexAction<string, undefined>]
> = pipe(string(), regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/));

/** Schema declaration for custom data. */
export const CustomDataSchema: RecordSchema<
   StringSchema<undefined>,
   AnySchema,
   undefined
> = record(string(), any());

/** Schema declaration for {@linkcode CharacteristicName} */
export const CharacteristicNameSchema: PicklistSchema<
   typeof CharacteristicName,
   undefined
> = picklist(CharacteristicName);

/** Schema declaration for {@linkcode DifficultyName} */
export const DifficultyNameSchema: PicklistSchema<
   typeof DifficultyName,
   undefined
> = picklist(DifficultyName);

/** Schema declaration for {@linkcode DifficultyRank} */
export const DifficultyRankSchema: PicklistSchema<
   typeof DifficultyRank,
   undefined
> = picklist(DifficultyRank);

/** Schema declaration for {@linkcode EnvironmentName} */
export const EnvironmentNameSchema: PicklistSchema<
   typeof EnvironmentName,
   undefined
> = picklist(EnvironmentName);

/** Schema declaration for {@linkcode EnvironmentV3Name} */
export const EnvironmentV3NameSchema: PicklistSchema<
   typeof EnvironmentV3Name,
   undefined
> = picklist(EnvironmentV3Name);

/** Schema declaration for {@linkcode Environment360Name} */
export const Environment360NameSchema: PicklistSchema<
   typeof Environment360Name,
   undefined
> = picklist(Environment360Name);

/** Schema declaration for {@linkcode EnvironmentAllName} */
export const EnvironmentAllNameSchema: PicklistSchema<
   typeof EnvironmentAllName,
   undefined
> = picklist(EnvironmentAllName);

/** Schema declaration for {@linkcode PosX} */
export const PosXSchema: EnumSchema<typeof PosX, undefined> = enumlike(PosX);

/** Schema declaration for {@linkcode PosY} */
export const PosYSchema: EnumSchema<typeof PosY, undefined> = enumlike(PosY);

/** Schema declaration for {@linkcode NoteColor} */
export const NoteColorSchema: EnumSchema<typeof NoteColor, undefined> = enumlike(NoteColor);

/** Schema declaration for {@linkcode NoteDirection} */
export const NoteDirectionSchema: EnumSchema<typeof NoteDirection, undefined> = enumlike(
   NoteDirection,
);

/** Schema declaration for {@linkcode OffsetDirection} */
export const OffsetDirectionSchema: EnumSchema<
   typeof OffsetDirection,
   undefined
> = enumlike(OffsetDirection);

/** Schema declaration for {@linkcode OffsetDirection} */
export const SliderMidAnchorModeSchema: EnumSchema<
   typeof SliderMidAnchorMode,
   undefined
> = enumlike(SliderMidAnchorMode);

/** Schema declaration for {@linkcode EventLightValue} */
export const EventLightValueSchema: EnumSchema<
   typeof EventLightValue,
   undefined
> = enumlike(EventLightValue);

/** Schema declaration for {@linkcode EventType} */
export const EventTypeSchema: EnumSchema<typeof EventType, undefined> = enumlike(EventType);

/** Schema declaration for {@linkcode ExecutionTime} */
export const ExecutionTimeSchema: EnumSchema<typeof ExecutionTime, undefined> = enumlike(
   ExecutionTime,
);

/** Schema declaration for {@linkcode IndexFilterType} */
export const IndexFilterTypeSchema: EnumSchema<
   typeof IndexFilterType,
   undefined
> = enumlike(IndexFilterType);

/** Schema declaration for {@linkcode LimitAlsoAffectsType} */
export const LimitAlsoAffectsTypeSchema: EnumSchema<
   typeof LimitAlsoAffectsType,
   undefined
> = enumlike(LimitAlsoAffectsType);

/** Schema declaration for {@linkcode RandomType} */
export const RandomTypeSchema: EnumSchema<typeof RandomType, undefined> = enumlike(RandomType);

/** Schema declaration for {@linkcode DistributionType} */
export const DistributionTypeSchema: EnumSchema<
   typeof DistributionType,
   undefined
> = enumlike(DistributionType);

/** Schema declaration for {@linkcode EaseType} */
export const EaseTypeSchema: EnumSchema<typeof EaseType, undefined> = enumlike(EaseType);

/** Schema declaration for {@linkcode EventLightColor} */
export const EventLightColorSchema: EnumSchema<
   typeof EventLightColor,
   undefined
> = enumlike(EventLightColor);

/** Schema declaration for {@linkcode Axis} */
export const AxisSchema: EnumSchema<typeof Axis, undefined> = enumlike(Axis);

/** Schema declaration for {@linkcode LightRotationDirection} */
export const LightRotationDirectionSchema: EnumSchema<
   typeof LightRotationDirection,
   undefined
> = enumlike(LightRotationDirection);

/** Schema declaration for {@linkcode NoteType} */
export const NoteTypeSchema: EnumSchema<typeof NoteType, undefined> = enumlike(NoteType);

/** Schema declaration for {@linkcode ObstacleType} */
export const ObstacleTypeSchema: EnumSchema<typeof ObstacleType, undefined> = enumlike(
   ObstacleType,
);

/** Schema declaration for {@linkcode TransitionType} */
export const TransitionTypeSchema: EnumSchema<
   typeof TransitionType,
   undefined
> = enumlike(TransitionType);

/** Schema declaration for {@linkcode FxType} */
export const FxTypeSchema: EnumSchema<typeof FxType, undefined> = enumlike(FxType);

/** Schema declaration for {@linkcode EventBoxType} */
export const EventBoxTypeSchema: EnumSchema<typeof EventBoxType, undefined> = enumlike(
   EventBoxType,
);
