// deno-lint-ignore-file no-explicit-any
import type { IOptimizeOptions } from '../../types/beatmap/options/optimize.ts';
import type { InferBeatmapSerial, InferBeatmapVersion } from '../../types/beatmap/shared/infer.ts';
import type { BeatmapFileType } from '../../types/mod.ts';
import { optimizeDifficulty as optimizeV1Difficulty } from '../schema/v1/optimize/difficulty.ts';
import { optimizeInfo as optimizeV1Info } from '../schema/v1/optimize/info.ts';
import { optimizeDifficulty as optimizeV2Difficulty } from '../schema/v2/optimize/difficulty.ts';
import { optimizeInfo as optimizeV2Info } from '../schema/v2/optimize/info.ts';
import { optimizeDifficulty as optimizeV3Difficulty } from '../schema/v3/optimize/difficulty.ts';
import { optimizeLightshow as optimizeV3Lightshow } from '../schema/v3/optimize/lightshow.ts';
import { optimizeDifficulty as optimizeV4Difficulty } from '../schema/v4/optimize/difficulty.ts';
import { optimizeInfo as optimizeV4Info } from '../schema/v4/optimize/info.ts';
import { optimizeLightshow as optimizeV4Lightshow } from '../schema/v4/optimize/lightshow.ts';

type OptimizeMap<T extends BeatmapFileType> = {
   [key in InferBeatmapVersion<T>]: (
      data: InferBeatmapSerial<T, key>,
      options: IOptimizeOptions,
   ) => void;
};

/** Optimize function version map for schema beatmap info. */
export const infoOptimizeMap: OptimizeMap<'info'> = {
   1: optimizeV1Info,
   2: optimizeV2Info,
   4: optimizeV4Info,
};

/** Optimize function version map for schema beatmap difficulty. */
export const difficultyOptimizeMap: OptimizeMap<'difficulty'> = {
   1: optimizeV1Difficulty,
   2: optimizeV2Difficulty,
   3: optimizeV3Difficulty,
   4: optimizeV4Difficulty,
} as const;

/** Optimize function version map for schema beatmap lightshow. */
export const lightshowOptimizeMap: OptimizeMap<'lightshow'> = {
   3: optimizeV3Lightshow,
   4: optimizeV4Lightshow,
};

export function optimizeBeatmap<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TSerial extends InferBeatmapSerial<TFileType, TVersion>,
>(type: TFileType, ver: TVersion, data: TSerial, options: IOptimizeOptions): void {
   switch (type) {
      case 'info': {
         const optimize = infoOptimizeMap[ver as InferBeatmapVersion<'info'>];
         return optimize(data as any, options);
      }
      case 'difficulty': {
         const optimize = difficultyOptimizeMap[ver as InferBeatmapVersion<'difficulty'>];
         return optimize(data as any, options);
      }
      case 'lightshow': {
         const optimize = lightshowOptimizeMap[ver as InferBeatmapVersion<'lightshow'>];
         return optimize(data as any, options);
      }
      default: {
         return data as any;
      }
   }
}
