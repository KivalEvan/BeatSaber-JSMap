import type { StandardSchemaV1 } from '@standard-schema/spec';
import { DifficultySchema as V1DifficultySchema } from '../schema/v1/declaration/difficulty.ts';
import { InfoSchema as V1InfoSchema } from '../schema/v1/declaration/info.ts';
import { BPMInfoSchema as V2AudioSchema } from '../schema/v2/declaration/audioData.ts';
import { InfoSchema as V2InfoSchema } from '../schema/v2/declaration/info.ts';
import { AudioDataSchema as V4AudioSchema } from '../schema/v4/declaration/audioData.ts';
import { DifficultySchema as V2DifficultySchema } from '../schema/v2/declaration/difficulty.ts';
import { InfoSchema as V4InfoSchema } from '../schema/v4/declaration/info.ts';
import { DifficultySchema as V3DifficultySchema } from '../schema/v3/declaration/difficulty.ts';
import { DifficultySchema as V4DifficultySchema } from '../schema/v4/declaration/difficulty.ts';
import { LightshowSchema as V3LightshowSchema } from '../schema/v3/declaration/lightshow.ts';
import { LightshowSchema as V4LightshowSchema } from '../schema/v4/declaration/lightshow.ts';
import type { ISchemaCheckOptions } from './types/schema.ts';
import type { BeatmapFileType } from '../schema/shared/types/schema.ts';
import type { InferBeatmapSerial, InferBeatmapVersion } from '../schema/shared/types/infer.ts';
import { getLogger } from '../../logger.ts';
import { schemaCheck } from '../validator/schema.ts';

function tag(...rest: string[]): string[] {
   return ['process', ...rest];
}

type CheckMap<T extends BeatmapFileType> = {
   [TVersion in InferBeatmapVersion<T>]: () => StandardSchemaV1<InferBeatmapSerial<T, TVersion>>;
};

/** Data check version map for schema beatmap info. */
export const infoCheckMap: CheckMap<'info'> = {
   1: V1InfoSchema,
   2: V2InfoSchema,
   4: V4InfoSchema,
} as const satisfies CheckMap<'info'>;

/** Data check version map for schema beatmap audio data. */
export const audioDataCheckMap: CheckMap<'audioData'> = {
   2: V2AudioSchema,
   4: V4AudioSchema,
} as const satisfies CheckMap<'audioData'>;

/** Data check version map for schema beatmap difficulty. */
export const difficultyCheckMap: CheckMap<'difficulty'> = {
   1: V1DifficultySchema,
   2: V2DifficultySchema,
   3: V3DifficultySchema,
   4: V4DifficultySchema,
} as const satisfies CheckMap<'difficulty'>;

/** Data check version map for schema beatmap lightshow. */
export const lightshowCheckMap: CheckMap<'lightshow'> = {
   3: V3LightshowSchema,
   4: V4LightshowSchema,
} as const satisfies CheckMap<'lightshow'>;

const defaultOptions: ISchemaCheckOptions = {
   enabled: true,
   throwOn: {
      unused: false,
      missing: true,
      ignoreOptional: false,
      nullish: true,
      wrongType: true,
      notInt: false,
      notUnsigned: false,
   },
};

/**
 * Ensures the serial contents of the beatmap file conforms to its schema.
 * @param type The beatmap file type.
 * @param data The serial contents of the beatmap file.
 * @param version The implied map format of the beatmap file.
 * @param options The options supplied to the validator.
 */
export function validateJSON<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TSerial extends InferBeatmapSerial<TFileType, TVersion>,
>(
   type: BeatmapFileType,
   data: TSerial,
   version: TVersion,
   options?: Partial<ISchemaCheckOptions>,
): StandardSchemaV1.Issue[] {
   const logger = getLogger();

   const opt: Required<ISchemaCheckOptions> = {
      enabled: options?.enabled ?? defaultOptions.enabled,
      throwOn: {
         ...defaultOptions.throwOn,
         ...options?.throwOn,
      },
   };

   logger?.tInfo(
      tag('validateJSON'),
      `Validating serial contents for ${type} with version ${version}`,
   );

   switch (type) {
      case 'info': {
         const schema = infoCheckMap[version as InferBeatmapVersion<'info'>]();
         return schemaCheck(data, schema, type, undefined, opt.throwOn);
      }
      case 'audioData': {
         const schema = audioDataCheckMap[version as InferBeatmapVersion<'audioData'>]();
         return schemaCheck(data, schema, type, undefined, opt.throwOn);
      }
      case 'difficulty': {
         const schema = difficultyCheckMap[version as InferBeatmapVersion<'difficulty'>]();
         return schemaCheck(data, schema, type, undefined, opt.throwOn);
      }
      case 'lightshow': {
         const schema = lightshowCheckMap[version as InferBeatmapVersion<'lightshow'>]();
         return schemaCheck(data, schema, type, undefined, opt.throwOn);
      }
      default: {
         logger?.tWarn(tag(), `No check map found. Skipping validation step.`);
         return [];
      }
   }
}
