// deno-lint-ignore-file no-explicit-any
import { getLogger } from '../../logger.ts';
import type {
   InferBeatmapSerial,
   InferBeatmapVersion,
   InferBeatmapWrapper,
} from '../schema/shared/types/infer.ts';
import type { BeatmapFileType, ISchemaContainer } from '../schema/shared/types/schema.ts';
import { difficulty as V1Difficulty } from '../schema/v1/difficulty.ts';
import { info as V1Info } from '../schema/v1/info.ts';
import { audioData as V2AudioData } from '../schema/v2/audioData.ts';
import { difficulty as V2Difficulty } from '../schema/v2/difficulty.ts';
import { info as V2Info } from '../schema/v2/info.ts';
import { difficulty as V3Difficulty } from '../schema/v3/difficulty.ts';
import { lightshow as V3Lightshow } from '../schema/v3/lightshow.ts';
import { audioData as V4AudioData } from '../schema/v4/audioData.ts';
import { difficulty as V4Difficulty } from '../schema/v4/difficulty.ts';
import { info as V4Info } from '../schema/v4/info.ts';
import { lightshow as V4Lightshow } from '../schema/v4/lightshow.ts';

function tag(...rest: string[]): string[] {
   return ['process', ...rest];
}

type SchemaMap<T extends BeatmapFileType> = {
   [TVersion in InferBeatmapVersion<T>]: ISchemaContainer<
      InferBeatmapWrapper<T>,
      InferBeatmapSerial<T, TVersion>
   >;
};

/** Schema version map for beatmap info. */
export const infoSchemaMap = {
   1: V1Info,
   2: V2Info,
   4: V4Info,
} as const satisfies SchemaMap<'info'>;

/** Schema version map for beatmap audio data. */
export const audioDataSchemaMap = {
   2: V2AudioData,
   4: V4AudioData,
} as const satisfies SchemaMap<'audioData'>;

/** Schema version map for beatmap difficulty. */
export const difficultySchemaMap = {
   1: V1Difficulty,
   2: V2Difficulty,
   3: V3Difficulty,
   4: V4Difficulty,
} as const satisfies SchemaMap<'difficulty'>;

/** Schema version map for beatmap lightshow. */
export const lightshowSchemaMap = {
   3: V3Lightshow,
   4: V4Lightshow,
} as const satisfies SchemaMap<'lightshow'>;

/**
 * Converts the wrapper contents of the beatmap into its serial form.
 * @param type The beatmap file type.
 * @param version The map format of the beatmap file.
 * @param data The wrapper contents of the beatmap file.
 * @returns The newly-transformed serial contents of the beatmap file.
 */
export function serializeBeatmap<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends InferBeatmapWrapper<TFileType>,
   TSerial extends InferBeatmapSerial<TFileType, TVersion>,
>(type: TFileType, version: TVersion, data: TWrapper): TSerial {
   const logger = getLogger();

   logger?.tInfo(
      tag('serializeBeatmap'),
      `Serializing wrapper contents for ${type} to version ${version}`,
   );

   switch (type) {
      case 'info': {
         const container = infoSchemaMap[version as InferBeatmapVersion<'info'>];
         return container.serialize(data as InferBeatmapWrapper<'info'>) as TSerial;
      }
      case 'audioData': {
         const container = audioDataSchemaMap[version as InferBeatmapVersion<'audioData'>];
         return container.serialize(data as InferBeatmapWrapper<'audioData'>) as TSerial;
      }
      case 'difficulty': {
         const container = difficultySchemaMap[version as InferBeatmapVersion<'difficulty'>];
         return container.serialize(data as InferBeatmapWrapper<'difficulty'>) as TSerial;
      }
      case 'lightshow': {
         const container = lightshowSchemaMap[version as InferBeatmapVersion<'lightshow'>];
         return container.serialize(data as InferBeatmapWrapper<'lightshow'>) as TSerial;
      }
      default:
         throw new Error(`Unsupported beatmap file type: ${type}`);
   }
}

/**
 * Converts the serial contents of the beatmap into its wrapper form.
 * @param type The beatmap file type.
 * @param version The implied map format of the beatmap file.
 * @param data The serial contents of the beatmap file.
 * @returns The newly-transformed wrapper contents of the beatmap file.
 */
export function deserializeBeatmap<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TSerial extends InferBeatmapSerial<TFileType, TVersion>,
   TWrapper extends InferBeatmapWrapper<TFileType>,
>(type: TFileType, version: TVersion, data: TSerial): TWrapper {
   const logger = getLogger();

   logger?.tInfo(
      tag('deserializeBeatmap'),
      `Deserializing serial contents for ${type} from version ${version}`,
   );

   switch (type) {
      case 'info': {
         const container = infoSchemaMap[version as InferBeatmapVersion<'info'>];
         return container.deserialize(data as any) as TWrapper;
      }
      case 'audioData': {
         const container = audioDataSchemaMap[version as InferBeatmapVersion<'audioData'>];
         return container.deserialize(data as any) as TWrapper;
      }
      case 'difficulty': {
         const container = difficultySchemaMap[version as InferBeatmapVersion<'difficulty'>];
         return container.deserialize(data as any) as TWrapper;
      }
      case 'lightshow': {
         const container = lightshowSchemaMap[version as InferBeatmapVersion<'lightshow'>];
         return container.deserialize(data as any) as TWrapper;
      }
      default:
         throw new Error(`Unsupported beatmap file type: ${type}`);
   }
}
