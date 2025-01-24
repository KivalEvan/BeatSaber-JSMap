import { any, enum_ as enumlike, picklist, pipe, record, regex, string } from '@valibot/valibot';
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
} from '../../../types/beatmap/shared/mod.ts';
import {
   EventLightValue,
   NoteColor,
   NoteDirection,
   OffsetDirection,
   PosX,
   PosY,
   SliderMidAnchorMode,
} from '../../shared/constants.ts';

/** Schema declaration for semantic version. */
export const VersionSchema = pipe(
   string(),
   regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/),
);
/** Schema declaration for custom data. */
export const CustomDataSchema = record(string(), any());

/** Schema declaration for {@linkcode CharacteristicName} */
export const CharacteristicNameSchema = picklist(CharacteristicName);
/** Schema declaration for {@linkcode DifficultyName} */
export const DifficultyNameSchema = picklist(DifficultyName);
/** Schema declaration for {@linkcode DifficultyRank} */
export const DifficultyRankSchema = picklist(DifficultyRank);
/** Schema declaration for {@linkcode EnvironmentName} */
export const EnvironmentNameSchema = picklist(EnvironmentName);
/** Schema declaration for {@linkcode EnvironmentV3Name} */
export const EnvironmentV3NameSchema = picklist(EnvironmentV3Name);
/** Schema declaration for {@linkcode Environment360Name} */
export const Environment360NameSchema = picklist(Environment360Name);
/** Schema declaration for {@linkcode EnvironmentAllName} */
export const EnvironmentAllNameSchema = picklist(EnvironmentAllName);

/** Schema declaration for {@linkcode PosX} */
export const PosXSchema = enumlike(PosX);
/** Schema declaration for {@linkcode PosY} */
export const PosYSchema = enumlike(PosY);
/** Schema declaration for {@linkcode NoteColor} */
export const NoteColorSchema = enumlike(NoteColor);
/** Schema declaration for {@linkcode NoteDirection} */
export const NoteDirectionSchema = enumlike(NoteDirection);
/** Schema declaration for {@linkcode OffsetDirection} */
export const OffsetDirectionSchema = enumlike(OffsetDirection);
/** Schema declaration for {@linkcode OffsetDirection} */
export const SliderMidAnchorModeSchema = enumlike(SliderMidAnchorMode);
/** Schema declaration for {@linkcode EventLightValue} */
export const EventLightValueSchema = enumlike(EventLightValue);
/** Schema declaration for {@linkcode EventType} */
export const EventTypeSchema = enumlike(EventType);
/** Schema declaration for {@linkcode ExecutionTime} */
export const ExecutionTimeSchema = enumlike(ExecutionTime);
/** Schema declaration for {@linkcode IndexFilterType} */
export const IndexFilterTypeSchema = enumlike(IndexFilterType);
/** Schema declaration for {@linkcode LimitAlsoAffectsType} */
export const LimitAlsoAffectsTypeSchema = enumlike(LimitAlsoAffectsType);
/** Schema declaration for {@linkcode RandomType} */
export const RandomTypeSchema = enumlike(RandomType);
/** Schema declaration for {@linkcode DistributionType} */
export const DistributionTypeSchema = enumlike(DistributionType);
/** Schema declaration for {@linkcode EaseType} */
export const EaseTypeSchema = enumlike(EaseType);
/** Schema declaration for {@linkcode EventLightColor} */
export const EventLightColorSchema = enumlike(EventLightColor);
/** Schema declaration for {@linkcode Axis} */
export const AxisSchema = enumlike(Axis);
/** Schema declaration for {@linkcode LightRotationDirection} */
export const LightRotationDirectionSchema = enumlike(LightRotationDirection);

/** Schema declaration for {@linkcode NoteType} */
export const NoteTypeSchema = enumlike(NoteType);
/** Schema declaration for {@linkcode ObstacleType} */
export const ObstacleTypeSchema = enumlike(ObstacleType);
/** Schema declaration for {@linkcode TransitionType} */
export const TransitionTypeSchema = enumlike(TransitionType);
/** Schema declaration for {@linkcode FxType} */
export const FxTypeSchema = enumlike(FxType);
/** Schema declaration for {@linkcode EventBoxType} */
export const EventBoxTypeSchema = enumlike(EventBoxType);
