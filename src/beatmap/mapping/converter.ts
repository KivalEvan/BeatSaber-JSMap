// deno-lint-ignore-file no-explicit-any
import type { InferBeatmap, InferBeatmapVersion } from '../schema/shared/types/infer.ts';
import type { BeatmapFileType } from '../schema/shared/types/schema.ts';
import { toV1Beatmap } from '../converter/toV1/beatmap.ts';
import { toV1Info } from '../converter/toV1/info.ts';
import { toV2AudioData } from '../converter/toV2/audioData.ts';
import { toV2Beatmap } from '../converter/toV2/beatmap.ts';
import { toV2Info } from '../converter/toV2/info.ts';
import { toV3Beatmap } from '../converter/toV3/beatmap.ts';
import { toV4AudioData } from '../converter/toV4/audioData.ts';
import { toV4Beatmap } from '../converter/toV4/beatmap.ts';
import { toV4Info } from '../converter/toV4/info.ts';

type ConverterMap<T extends BeatmapFileType> = {
   [TVersion in InferBeatmapVersion<T>]: <TWrapper extends InferBeatmap<T>>(
      data: TWrapper,
      fromVersion?: number,
   ) => TWrapper;
};

/** Conversion function version map for beatmap info. */
export const infoConvertMap: ConverterMap<'info'> = {
   1: toV1Info,
   2: toV2Info,
   4: toV4Info,
};

/** Conversion function version map for beatmap audio data. */
export const audioDataConvertMap: ConverterMap<'audioData'> = {
   2: toV2AudioData,
   4: toV4AudioData,
};

/** Conversion function version map for beatmap data. */
export const beatmapConvertMap: ConverterMap<'difficulty' | 'lightshow'> = {
   1: toV1Beatmap,
   2: toV2Beatmap,
   3: toV3Beatmap,
   4: toV4Beatmap,
};

export function convertBeatmap<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends InferBeatmap<TFileType>,
>(
   type: TFileType,
   targetVersion: TVersion,
   data: TWrapper,
   sourceVersion?: InferBeatmapVersion<TFileType>,
): TWrapper {
   switch (type) {
      case 'info': {
         const convert = infoConvertMap[targetVersion as InferBeatmapVersion<'info'>];
         return convert(data as any, sourceVersion) as TWrapper;
      }
      case 'audioData': {
         const convert = audioDataConvertMap[targetVersion as InferBeatmapVersion<'audioData'>];
         return convert(data as any, sourceVersion) as TWrapper;
      }
      case 'difficulty': {
         const convert = beatmapConvertMap[targetVersion as InferBeatmapVersion<'difficulty'>];
         return convert(data as any, sourceVersion) as TWrapper;
      }
      case 'lightshow': {
         const convert = beatmapConvertMap[targetVersion as InferBeatmapVersion<'lightshow'>];
         return convert(data as any, sourceVersion) as TWrapper;
      }
      default: {
         throw new Error('');
      }
   }
}
