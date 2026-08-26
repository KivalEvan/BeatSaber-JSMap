// deno-lint-ignore-file no-explicit-any
import { getLogger } from '../../logger.ts';
import type {
   InferBeatmapSerial,
   InferBeatmapVersion,
   InferBeatmapWrapper,
} from '../schema/shared/types/infer.ts';
import type { BeatmapFileType } from '../schema/shared/types/schema.ts';
import { deserializeDifficulty as deserializeV1Difficulty } from '../schema/v1/difficulty.ts';
import { deserializeInfo as deserializeV1Info } from '../schema/v1/info.ts';
import { deserializeAudioData as deserializeV2AudioData } from '../schema/v2/audioData.ts';
import { deserializeDifficulty as deserializeV2Difficulty } from '../schema/v2/difficulty.ts';
import { deserializeInfo as deserializeV2Info } from '../schema/v2/info.ts';
import { deserializeDifficulty as deserializeV3Difficulty } from '../schema/v3/difficulty.ts';
import { deserializeLightshow as deserializeV3Lightshow } from '../schema/v3/lightshow.ts';
import { deserializeAudioData as deserializeV4AudioData } from '../schema/v4/audioData.ts';
import { deserializeDifficulty as deserializeV4Difficulty } from '../schema/v4/difficulty.ts';
import { deserializeInfo as deserializeV4Info } from '../schema/v4/info.ts';
import { deserializeLightshow as deserializeV4Lightshow } from '../schema/v4/lightshow.ts';

function tag(...rest: string[]): string[] {
   return ['process', ...rest];
}

interface DeserializerEntry<
   TDeserializer extends (data: any) => any = (data: any) => any,
> {
   deserialize: TDeserializer;
}

/** Maps every supported version of a file type to its deserializer. */
type DeserializerMap<T extends BeatmapFileType> = {
   [TVersion in InferBeatmapVersion<T>]-?: DeserializerEntry<
      (data: InferBeatmapSerial<T, TVersion>) => InferBeatmapWrapper<T>
   >;
};

/** Deserializer version map for beatmap info. */
export const infoDeserializerMap = {
   1: { deserialize: deserializeV1Info },
   2: { deserialize: deserializeV2Info },
   4: { deserialize: deserializeV4Info },
} satisfies DeserializerMap<'info'>;

/** Deserializer version map for beatmap audio data. */
export const audioDataDeserializerMap = {
   2: { deserialize: deserializeV2AudioData },
   4: { deserialize: deserializeV4AudioData },
} satisfies DeserializerMap<'audioData'>;

/** Deserializer version map for beatmap difficulty. */
export const difficultyDeserializerMap = {
   1: { deserialize: deserializeV1Difficulty },
   2: { deserialize: deserializeV2Difficulty },
   3: { deserialize: deserializeV3Difficulty },
   4: { deserialize: deserializeV4Difficulty },
} satisfies DeserializerMap<'difficulty'>;

/** Deserializer version map for beatmap lightshow. */
export const lightshowDeserializerMap = {
   3: { deserialize: deserializeV3Lightshow },
   4: { deserialize: deserializeV4Lightshow },
} satisfies DeserializerMap<'lightshow'>;

function resolveDeserializer(
   map: Partial<Record<number, DeserializerEntry>>,
   type: BeatmapFileType,
   version: number,
): DeserializerEntry {
   const entry = map[version];
   if (!entry) {
      throw new Error(
         `Unsupported ${type} beatmap version ${version}, found no matching deserializer.`,
      );
   }
   return entry;
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
         const deserializer = resolveDeserializer(infoDeserializerMap, type, version as number);
         return deserializer.deserialize(data) as TWrapper;
      }
      case 'audioData': {
         const deserializer = resolveDeserializer(
            audioDataDeserializerMap,
            type,
            version as number,
         );
         return deserializer.deserialize(data) as TWrapper;
      }
      case 'difficulty': {
         const deserializer = resolveDeserializer(
            difficultyDeserializerMap,
            type,
            version as number,
         );
         return deserializer.deserialize(data) as TWrapper;
      }
      case 'lightshow': {
         const deserializer = resolveDeserializer(
            lightshowDeserializerMap,
            type,
            version as number,
         );
         return deserializer.deserialize(data) as TWrapper;
      }
      default:
         throw new Error(`Unsupported beatmap file type: ${type}`);
   }
}
