// deno-lint-ignore-file no-explicit-any
import type {
   InferBeatmapAttribute,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../../types/beatmap/shared/infer.ts';
import type { BeatmapFileType, ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
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

type SchemaMap<T extends BeatmapFileType> = {
   [key in InferBeatmapVersion<T>]: ISchemaContainer<
      InferBeatmapAttribute<T>,
      InferBeatmapSerial<T, key>
   >;
};

/** Schema version map for beatmap info. */
export const infoSchemaMap: SchemaMap<'info'> = {
   1: V1Info,
   2: V2Info,
   4: V4Info,
};

/** Schema version map for beatmap audio data. */
export const audioDataSchemaMap: SchemaMap<'audioData'> = {
   2: V2AudioData,
   4: V4AudioData,
};

/** Schema version map for beatmap difficulty. */
export const difficultySchemaMap: SchemaMap<'difficulty'> = {
   1: V1Difficulty,
   2: V2Difficulty,
   3: V3Difficulty,
   4: V4Difficulty,
};

/** Schema version map for beatmap lightshow. */
export const lightshowSchemaMap: SchemaMap<'lightshow'> = {
   3: V3Lightshow,
   4: V4Lightshow,
};

export function serializeBeatmap<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends InferBeatmapAttribute<TFileType>,
   TSerial extends InferBeatmapSerial<TFileType, TVersion>,
>(type: TFileType, ver: TVersion, data: TWrapper): TSerial {
   switch (type) {
      case 'info': {
         const container = infoSchemaMap[ver as InferBeatmapVersion<'info'>];
         return container.serialize(data as InferBeatmapAttribute<'info'>) as TSerial;
      }
      case 'audioData': {
         const container = audioDataSchemaMap[ver as InferBeatmapVersion<'audioData'>];
         return container.serialize(data as InferBeatmapAttribute<'audioData'>) as TSerial;
      }
      case 'difficulty': {
         const container = difficultySchemaMap[ver as InferBeatmapVersion<'difficulty'>];
         return container.serialize(data as InferBeatmapAttribute<'difficulty'>) as TSerial;
      }
      case 'lightshow': {
         const container = lightshowSchemaMap[ver as InferBeatmapVersion<'lightshow'>];
         return container.serialize(data as InferBeatmapAttribute<'lightshow'>) as TSerial;
      }
      default: {
         throw new Error('');
      }
   }
}

export function deserializeBeatmap<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TSerial extends InferBeatmapSerial<TFileType, TVersion>,
   TWrapper extends InferBeatmapAttribute<TFileType>,
>(type: TFileType, ver: TVersion, data: TSerial): TWrapper {
   switch (type) {
      case 'info': {
         const container = infoSchemaMap[ver as InferBeatmapVersion<'info'>];
         return container.deserialize(data as any) as TWrapper;
      }
      case 'audioData': {
         const container = audioDataSchemaMap[ver as InferBeatmapVersion<'audioData'>];
         return container.deserialize(data as any) as TWrapper;
      }
      case 'difficulty': {
         const container = difficultySchemaMap[ver as InferBeatmapVersion<'difficulty'>];
         return container.deserialize(data as any) as TWrapper;
      }
      case 'lightshow': {
         const container = lightshowSchemaMap[ver as InferBeatmapVersion<'lightshow'>];
         return container.deserialize(data as any) as TWrapper;
      }
      default: {
         throw new Error('');
      }
   }
}
