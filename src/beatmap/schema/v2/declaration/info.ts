import * as v from 'valibot';
import type {
   Environment360Name,
   EnvironmentName,
   EnvironmentV2Name,
   EnvironmentV3Name,
} from '../../shared/types/mod.ts';
import type {
   IInfo,
   IInfoColorScheme,
   IInfoColorSchemeData,
   IInfoDifficulty,
   IInfoSet,
} from '../../../schema/v2/types/info.ts';
import type { IColor } from '../../../../types/colors.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import {
   CharacteristicNameSchema,
   CustomDataSchema,
   DifficultyNameSchema,
   DifficultyRankSchema,
   VersionSchema,
} from '../../shared/declaration/common.ts';

/** Schema declaration for v2 `InfoSetDifficulty`. */
export function InfoSetDifficultySchema(): v.ObjectSchema<
   InferObjectEntries<IInfoDifficulty>,
   undefined
> {
   return v.object<InferObjectEntries<IInfoDifficulty>>({
      _difficulty: field(DifficultyNameSchema(), {
         version: '2.0.0',
      }),
      _difficultyRank: field(DifficultyRankSchema(), {
         version: '2.0.0',
      }),
      _beatmapFilename: field(v.string(), {
         version: '2.0.0',
      }),
      _noteJumpMovementSpeed: field(v.number(), {
         version: '2.0.0',
      }),
      _noteJumpStartBeatOffset: field(v.number(), {
         version: '2.0.0',
      }),
      _beatmapColorSchemeIdx: field(v.pipe(v.number(), v.integer()), {
         version: '2.1.0',
      }),
      _environmentNameIdx: field(v.pipe(v.number(), v.integer()), {
         version: '2.1.0',
      }),
      _customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v2 `InfoSet`. */
export function InfoSetSchema(): v.ObjectSchema<
   InferObjectEntries<IInfoSet>,
   undefined
> {
   return v.object<InferObjectEntries<IInfoSet>>({
      _beatmapCharacteristicName: field(CharacteristicNameSchema(), {
         version: '2.0.0',
      }),
      _difficultyBeatmaps: field(v.array(InfoSetDifficultySchema()), {
         version: '2.0.0',
      }),
      _customData: field(v.optional(CustomDataSchema())),
   });
}

/** Schema declaration for v2 `Color`. */
export function ColorObjectSchema(): v.ObjectSchema<
   InferObjectEntries<Required<IColor>>,
   undefined
> {
   return v.object<InferObjectEntries<Required<IColor>>>({
      r: field(v.number(), {
         version: '2.1.0',
      }),
      g: field(v.number(), {
         version: '2.1.0',
      }),
      b: field(v.number(), {
         version: '2.1.0',
      }),
      a: field(v.number(), {
         version: '2.1.0',
      }),
   });
}

/** Schema declaration for v2 `InfoColorSchemeData`. */
export function InfoColorSchemeDataSchema(): v.ObjectSchema<
   InferObjectEntries<IInfoColorSchemeData>,
   undefined
> {
   return v.object<InferObjectEntries<IInfoColorSchemeData>>({
      colorSchemeId: field(v.string(), {
         version: '2.1.0',
      }),
      saberAColor: field(ColorObjectSchema(), {
         version: '2.1.0',
      }),
      saberBColor: field(ColorObjectSchema(), {
         version: '2.1.0',
      }),
      environmentColor0: field(ColorObjectSchema(), {
         version: '2.1.0',
      }),
      environmentColor1: field(ColorObjectSchema(), {
         version: '2.1.0',
      }),
      obstaclesColor: field(ColorObjectSchema(), {
         version: '2.1.0',
      }),
      environmentColor0Boost: field(ColorObjectSchema(), {
         version: '2.1.0',
      }),
      environmentColor1Boost: field(ColorObjectSchema(), {
         version: '2.1.0',
      }),
      environmentColorW: field(v.optional(ColorObjectSchema()), {
         version: '2.1.0',
      }),
      environmentColorWBoost: field(v.optional(ColorObjectSchema()), {
         version: '2.1.0',
      }),
   });
}

/** Schema declaration for v2 `InfoColorScheme`. */
export function InfoColorSchemeSchema(): v.ObjectSchema<
   InferObjectEntries<IInfoColorScheme>,
   undefined
> {
   return v.object<InferObjectEntries<IInfoColorScheme>>({
      useOverride: field(v.boolean(), {
         version: '2.1.0',
      }),
      colorScheme: field(InfoColorSchemeDataSchema(), {
         version: '2.1.0',
      }),
   });
}

/** Schema declaration for v2 `Info`. */
export function InfoSchema(): v.ObjectSchema<
   InferObjectEntries<IInfo>,
   undefined
> {
   return entity<InferObjectEntries<IInfo>>((x) => x._version || '2.0.0', {
      _version: field(mask<'2.0.0' | '2.1.0'>(VersionSchema()), {
         version: '2.0.0',
      }),
      _songName: field(v.string(), {
         version: '2.0.0',
      }),
      _songSubName: field(v.string(), {
         version: '2.0.0',
      }),
      _songAuthorName: field(v.string(), {
         version: '2.0.0',
      }),
      _levelAuthorName: field(v.string(), {
         version: '2.0.0',
      }),
      _beatsPerMinute: field(v.number(), {
         version: '2.0.0',
      }),
      _songTimeOffset: field(v.number(), {
         version: '2.0.0',
      }),
      _shuffle: field(v.number(), {
         version: '2.0.0',
      }),
      _shufflePeriod: field(v.number(), {
         version: '2.0.0',
      }),
      _previewStartTime: field(v.number(), {
         version: '2.0.0',
      }),
      _previewDuration: field(v.number(), {
         version: '2.0.0',
      }),
      _songFilename: field(v.string(), {
         version: '2.0.0',
      }),
      _coverImageFilename: field(v.string(), {
         version: '2.0.0',
      }),
      _environmentName: field(mask<EnvironmentV2Name | EnvironmentV3Name>(v.string()), {
         version: '2.0.0',
      }),
      _allDirectionsEnvironmentName: field(v.optional(mask<Environment360Name>(v.string())), {
         version: '2.0.0',
      }),
      _environmentNames: field(v.array(mask<EnvironmentName>(v.string())), {
         version: '2.1.0',
      }),
      _colorSchemes: field(v.array(InfoColorSchemeSchema()), {
         version: '2.1.0',
      }),
      _difficultyBeatmapSets: field(v.array(InfoSetSchema()), {
         version: '2.0.0',
      }),
      _customData: field(v.optional(CustomDataSchema())),
   });
}
