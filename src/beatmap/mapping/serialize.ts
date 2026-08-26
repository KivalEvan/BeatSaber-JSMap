// deno-lint-ignore-file no-explicit-any
import { getLogger } from '../../logger.ts';
import type {
   InferBeatmapSerial,
   InferBeatmapVersion,
   InferBeatmapWrapper,
} from '../schema/shared/types/infer.ts';
import type { BeatmapFileType } from '../schema/shared/types/schema.ts';
import { serializeDifficulty as serializeV1Difficulty } from '../schema/v1/difficulty.ts';
import { serializeInfo as serializeV1Info } from '../schema/v1/info.ts';
import { serializeAudioData as serializeV2AudioData } from '../schema/v2/audioData.ts';
import { serializeDifficulty as serializeV2Difficulty } from '../schema/v2/difficulty.ts';
import { serializeInfo as serializeV2Info } from '../schema/v2/info.ts';
import { serializeDifficulty as serializeV3Difficulty } from '../schema/v3/difficulty.ts';
import { serializeLightshow as serializeV3Lightshow } from '../schema/v3/lightshow.ts';
import { serializeAudioData as serializeV4AudioData } from '../schema/v4/audioData.ts';
import { serializeDifficulty as serializeV4Difficulty } from '../schema/v4/difficulty.ts';
import { serializeInfo as serializeV4Info } from '../schema/v4/info.ts';
import { serializeLightshow as serializeV4Lightshow } from '../schema/v4/lightshow.ts';

function tag(...rest: string[]): string[] {
   return ['process', ...rest];
}

interface SerializerEntry<TSerializer extends (data: any) => any = (data: any) => any> {
   serialize: TSerializer;
}

/** Maps every supported version of a file type to its serializer. */
type SerializerMap<T extends BeatmapFileType> = {
   [TVersion in InferBeatmapVersion<T>]-?: SerializerEntry<
      (data: InferBeatmapWrapper<T>) => InferBeatmapSerial<T, TVersion>
   >;
};

/** Serializer version map for beatmap info. */
export const infoSerializerMap = {
   1: { serialize: serializeV1Info },
   2: { serialize: serializeV2Info },
   4: { serialize: serializeV4Info },
} satisfies SerializerMap<'info'>;

/** Serializer version map for beatmap audio data. */
export const audioDataSerializerMap = {
   2: { serialize: serializeV2AudioData },
   4: { serialize: serializeV4AudioData },
} satisfies SerializerMap<'audioData'>;

/** Serializer version map for beatmap difficulty. */
export const difficultySerializerMap = {
   1: { serialize: serializeV1Difficulty },
   2: { serialize: serializeV2Difficulty },
   3: { serialize: serializeV3Difficulty },
   4: { serialize: serializeV4Difficulty },
} satisfies SerializerMap<'difficulty'>;

/** Serializer version map for beatmap lightshow. */
export const lightshowSerializerMap = {
   3: { serialize: serializeV3Lightshow },
   4: { serialize: serializeV4Lightshow },
} satisfies SerializerMap<'lightshow'>;

function resolveSerializer(
   map: Partial<Record<number, SerializerEntry>>,
   type: BeatmapFileType,
   version: number,
): SerializerEntry {
   const entry = map[version];
   if (!entry) {
      throw new Error(
         `Unsupported ${type} beatmap version ${version}, found no matching serializer.`,
      );
   }
   return entry;
}

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
         const serializer = resolveSerializer(infoSerializerMap, type, version as number);
         return serializer.serialize(data) as TSerial;
      }
      case 'audioData': {
         const serializer = resolveSerializer(audioDataSerializerMap, type, version as number);
         return serializer.serialize(data) as TSerial;
      }
      case 'difficulty': {
         const serializer = resolveSerializer(difficultySerializerMap, type, version as number);
         return serializer.serialize(data) as TSerial;
      }
      case 'lightshow': {
         const serializer = resolveSerializer(lightshowSerializerMap, type, version as number);
         return serializer.serialize(data) as TSerial;
      }
      default:
         throw new Error(`Unsupported beatmap file type: ${type}`);
   }
}
