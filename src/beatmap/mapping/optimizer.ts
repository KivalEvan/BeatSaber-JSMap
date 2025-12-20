// deno-lint-ignore-file no-explicit-any
import type { IOptimizeOptions } from './types/optimize.ts';
import type { InferBeatmapSerial, InferBeatmapVersion } from '../schema/shared/types/infer.ts';
import type { BeatmapFileType } from '../schema/shared/types/schema.ts';
import { optimizeDifficulty as optimizeV1Difficulty } from '../schema/v1/optimize/difficulty.ts';
import { optimizeInfo as optimizeV1Info } from '../schema/v1/optimize/info.ts';
import { optimizeDifficulty as optimizeV2Difficulty } from '../schema/v2/optimize/difficulty.ts';
import { optimizeInfo as optimizeV2Info } from '../schema/v2/optimize/info.ts';
import { optimizeDifficulty as optimizeV3Difficulty } from '../schema/v3/optimize/difficulty.ts';
import { optimizeLightshow as optimizeV3Lightshow } from '../schema/v3/optimize/lightshow.ts';
import { optimizeDifficulty as optimizeV4Difficulty } from '../schema/v4/optimize/difficulty.ts';
import { optimizeInfo as optimizeV4Info } from '../schema/v4/optimize/info.ts';
import { optimizeLightshow as optimizeV4Lightshow } from '../schema/v4/optimize/lightshow.ts';
import { getLogger } from '../../logger.ts';

function tag(...rest: string[]): string[] {
   return ['process', ...rest];
}

type OptimizeMap<T extends BeatmapFileType> = {
   [TVersion in InferBeatmapVersion<T>]: (
      data: InferBeatmapSerial<T, TVersion>,
      options: IOptimizeOptions,
   ) => void;
};

/** Optimize function version map for schema beatmap info. */
export const infoOptimizeMap = {
   1: optimizeV1Info,
   2: optimizeV2Info,
   4: optimizeV4Info,
} as const satisfies OptimizeMap<'info'>;

/** Optimize function version map for schema beatmap difficulty. */
export const difficultyOptimizeMap = {
   1: optimizeV1Difficulty,
   2: optimizeV2Difficulty,
   3: optimizeV3Difficulty,
   4: optimizeV4Difficulty,
} as const satisfies OptimizeMap<'difficulty'>;

/** Optimize function version map for schema beatmap lightshow. */
export const lightshowOptimizeMap = {
   3: optimizeV3Lightshow,
   4: optimizeV4Lightshow,
} as const satisfies OptimizeMap<'lightshow'>;

/**
 * Mutably alters the serial contents of the beatmap file for filesize optimizations.
 * @param type The beatmap file type.
 * @param version The implied map format of the beatmap file.
 * @param data The serial contents of the beatmap file.
 * @param options The options supplied to the optimizer.
 */
export function optimizeBeatmap<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TSerial extends InferBeatmapSerial<TFileType, TVersion>,
>(
   type: TFileType,
   version: TVersion,
   data: TSerial,
   options: IOptimizeOptions,
): void {
   const logger = getLogger();

   logger?.tInfo(
      tag('optimizeBeatmap'),
      `Optimizing serial contents for ${type} with version ${version}`,
   );

   switch (type) {
      case 'info': {
         const optimize = infoOptimizeMap[version as InferBeatmapVersion<'info'>];
         return optimize(data as any, options);
      }
      case 'difficulty': {
         const optimize = difficultyOptimizeMap[version as InferBeatmapVersion<'difficulty'>];
         return optimize(data as any, options);
      }
      case 'lightshow': {
         const optimize = lightshowOptimizeMap[version as InferBeatmapVersion<'lightshow'>];
         return optimize(data as any, options);
      }
      default: {
         logger?.tWarn(tag(type), `No optimize map found. Skipping optimization step.`);
      }
   }
}
