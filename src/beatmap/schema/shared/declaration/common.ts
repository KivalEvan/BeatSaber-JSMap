import * as v from 'valibot';
import {
   Axis,
   CharacteristicName,
   DifficultyName,
   DifficultyRank,
   DistributionType,
   EaseType,
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
import {
   is360Environment,
   isV2Environment,
   isV3Environment,
} from '../../../helpers/environment.ts';
import { EnvironmentName } from '../types/environment.ts';

/** Schema declaration for semantic version. */
export function VersionSchema(): v.SchemaWithPipe<
   readonly [v.StringSchema<undefined>, v.RegexAction<string, undefined>]
> {
   return v.pipe(v.string(), v.regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/));
}

/** Schema declaration for custom data. */
export function CustomDataSchema(): v.RecordSchema<
   v.StringSchema<undefined>,
   v.AnySchema,
   undefined
> {
   return v.record(v.string(), v.any());
}

/** Schema declaration for {@linkcode CharacteristicName} */
export function CharacteristicNameSchema(): v.PicklistSchema<
   typeof CharacteristicName,
   undefined
> {
   return v.picklist(CharacteristicName);
}

/** Schema declaration for {@linkcode DifficultyName} */
export function DifficultyNameSchema(): v.PicklistSchema<
   typeof DifficultyName,
   undefined
> {
   return v.picklist(DifficultyName);
}

/** Schema declaration for {@linkcode DifficultyRank} */
export function DifficultyRankSchema(): v.PicklistSchema<
   typeof DifficultyRank,
   undefined
> {
   return v.picklist(DifficultyRank);
}

/** Schema declaration for {@linkcode EnvironmentName} */
export function EnvironmentNameSchema(): v.PicklistSchema<
   typeof EnvironmentName,
   undefined
> {
   return v.picklist(EnvironmentName);
}

/** Schema declaration for {@linkcode EnvironmentV2Name} */
export function EnvironmentV2NameSchema(): v.SchemaWithPipe<
   readonly [ReturnType<typeof EnvironmentNameSchema>, v.CheckAction<EnvironmentName, undefined>]
> {
   return v.pipe(EnvironmentNameSchema(), v.check(isV2Environment));
}

/** Schema declaration for {@linkcode EnvironmentV3Name} */
export function EnvironmentV3NameSchema(): v.SchemaWithPipe<
   readonly [ReturnType<typeof EnvironmentNameSchema>, v.CheckAction<EnvironmentName, undefined>]
> {
   return v.pipe(EnvironmentNameSchema(), v.check(isV3Environment));
}

/** Schema declaration for {@linkcode Environment360Name} */
export function Environment360NameSchema(): v.SchemaWithPipe<
   readonly [ReturnType<typeof EnvironmentNameSchema>, v.CheckAction<EnvironmentName, undefined>]
> {
   return v.pipe(EnvironmentNameSchema(), v.check(is360Environment));
}

/** Schema declaration for {@linkcode PosX} */
export function PosXSchema(): v.EnumSchema<
   typeof PosX,
   undefined
> {
   return v.enum_(PosX);
}

/** Schema declaration for {@linkcode PosY} */
export function PosYSchema(): v.EnumSchema<
   typeof PosY,
   undefined
> {
   return v.enum_(PosY);
}

/** Schema declaration for {@linkcode NoteColor} */
export function NoteColorSchema(): v.EnumSchema<
   typeof NoteColor,
   undefined
> {
   return v.enum_(NoteColor);
}

/** Schema declaration for {@linkcode NoteDirection} */
export function NoteDirectionSchema(): v.EnumSchema<
   typeof NoteDirection,
   undefined
> {
   return v.enum_(NoteDirection);
}

/** Schema declaration for {@linkcode OffsetDirection} */
export function OffsetDirectionSchema(): v.EnumSchema<
   typeof OffsetDirection,
   undefined
> {
   return v.enum_(OffsetDirection);
}

/** Schema declaration for {@linkcode OffsetDirection} */
export function SliderMidAnchorModeSchema(): v.EnumSchema<
   typeof SliderMidAnchorMode,
   undefined
> {
   return v.enum_(SliderMidAnchorMode);
}

/** Schema declaration for {@linkcode EventLightValue} */
export function EventLightValueSchema(): v.EnumSchema<
   typeof EventLightValue,
   undefined
> {
   return v.enum_(EventLightValue);
}

/** Schema declaration for {@linkcode EventType} */
export function EventTypeSchema(): v.EnumSchema<
   typeof EventType,
   undefined
> {
   return v.enum_(EventType);
}

/** Schema declaration for {@linkcode ExecutionTime} */
export function ExecutionTimeSchema(): v.EnumSchema<
   typeof ExecutionTime,
   undefined
> {
   return v.enum_(ExecutionTime);
}

/** Schema declaration for {@linkcode IndexFilterType} */
export function IndexFilterTypeSchema(): v.EnumSchema<
   typeof IndexFilterType,
   undefined
> {
   return v.enum_(IndexFilterType);
}

/** Schema declaration for {@linkcode LimitAlsoAffectsType} */
export function LimitAlsoAffectsTypeSchema(): v.EnumSchema<
   typeof LimitAlsoAffectsType,
   undefined
> {
   return v.enum_(LimitAlsoAffectsType);
}

/** Schema declaration for {@linkcode RandomType} */
export function RandomTypeSchema(): v.EnumSchema<
   typeof RandomType,
   undefined
> {
   return v.enum_(RandomType);
}

/** Schema declaration for {@linkcode DistributionType} */
export function DistributionTypeSchema(): v.EnumSchema<
   typeof DistributionType,
   undefined
> {
   return v.enum_(DistributionType);
}

/** Schema declaration for {@linkcode EaseType} */
export function EaseTypeSchema(): v.EnumSchema<
   typeof EaseType,
   undefined
> {
   return v.enum_(EaseType);
}

/** Schema declaration for {@linkcode EventLightColor} */
export function EventLightColorSchema(): v.EnumSchema<
   typeof EventLightColor,
   undefined
> {
   return v.enum_(EventLightColor);
}

/** Schema declaration for {@linkcode Axis} */
export function AxisSchema(): v.EnumSchema<
   typeof Axis,
   undefined
> {
   return v.enum_(Axis);
}

/** Schema declaration for {@linkcode LightRotationDirection} */
export function LightRotationDirectionSchema(): v.EnumSchema<
   typeof LightRotationDirection,
   undefined
> {
   return v.enum_(LightRotationDirection);
}

/** Schema declaration for {@linkcode NoteType} */
export function NoteTypeSchema(): v.EnumSchema<
   typeof NoteType,
   undefined
> {
   return v.enum_(NoteType);
}

/** Schema declaration for {@linkcode ObstacleType} */
export function ObstacleTypeSchema(): v.EnumSchema<
   typeof ObstacleType,
   undefined
> {
   return v.enum_(ObstacleType);
}

/** Schema declaration for {@linkcode TransitionType} */
export function TransitionTypeSchema(): v.EnumSchema<
   typeof TransitionType,
   undefined
> {
   return v.enum_(TransitionType);
}

/** Schema declaration for {@linkcode FxType} */
export function FxTypeSchema(): v.EnumSchema<
   typeof FxType,
   undefined
> {
   return v.enum_(FxType);
}

/** Schema declaration for {@linkcode EventBoxType} */
export function EventBoxTypeSchema(): v.EnumSchema<
   typeof EventBoxType,
   undefined
> {
   return v.enum_(EventBoxType);
}
