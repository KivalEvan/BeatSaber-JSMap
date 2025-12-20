import type { ICompatibilityOptions } from './types/compatibility.ts';
import type { InferBeatmapVersion, InferBeatmapWrapper } from '../schema/shared/types/infer.ts';
import type { BeatmapFileType } from '../schema/shared/types/schema.ts';
import { compatDifficulty as compatV1Difficulty } from '../schema/v1/compat/difficulty.ts';
import { compatInfo as compatV1Info } from '../schema/v1/compat/info.ts';
import { compatAudioData as compatV2AudioData } from '../schema/v2/compat/audioData.ts';
import { compatDifficulty as compatV2Difficulty } from '../schema/v2/compat/difficulty.ts';
import { compatInfo as compatV2Info } from '../schema/v2/compat/info.ts';
import { compatDifficulty as compatV3Difficulty } from '../schema/v3/compat/difficulty.ts';
import { compatLightshow as compatV3Lightshow } from '../schema/v3/compat/lightshow.ts';
import { compatAudioData as compatV4AudioData } from '../schema/v4/compat/audioData.ts';
import { compatDifficulty as compatV4Difficulty } from '../schema/v4/compat/difficulty.ts';
import { compatInfo as compatV4Info } from '../schema/v4/compat/info.ts';
import { compatLightshow as compatV4Lightshow } from '../schema/v4/compat/lightshow.ts';
import { getLogger } from '../../logger.ts';

function tag(...rest: string[]): string[] {
   return ['process', ...rest];
}

type CompatibilityMap<T extends BeatmapFileType> = {
   [TVersion in InferBeatmapVersion<T>]: <TWrapper extends InferBeatmapWrapper<T>>(
      data: TWrapper,
      options: ICompatibilityOptions,
   ) => void;
};

/** Compatibility function version map for beatmap info. */
export const infoCompatibilityMap = {
   1: compatV1Info,
   2: compatV2Info,
   4: compatV4Info,
} as const satisfies CompatibilityMap<'info'>;

/** Compatibility function version map for beatmap audio data. */
export const audioDataCompatibilityMap = {
   2: compatV2AudioData,
   4: compatV4AudioData,
} as const satisfies CompatibilityMap<'audioData'>;

/** Compatibility function version map for beatmap difficulty. */
export const difficultyCompatibilityMap = {
   1: compatV1Difficulty,
   2: compatV2Difficulty,
   3: compatV3Difficulty,
   4: compatV4Difficulty,
} as const satisfies CompatibilityMap<'difficulty'>;

/** Compatibility function version map for beatmap lightshow. */
export const lightshowCompatibilityMap = {
   3: compatV3Lightshow,
   4: compatV4Lightshow,
} as const satisfies CompatibilityMap<'lightshow'>;

const defaultOptions: ICompatibilityOptions = {
   enabled: true,
   throwOn: { incompatibleObject: true, mappingExtensions: false },
};

/**
 * Ensures the wrapper contents of a beatmap file has proper compatibility with the indicated map format.
 * @param type The beatmap file type.
 * @param data The wrapper contents of the beatmap file.
 * @param version The implied map format of the beatmap file.
 * @param options The options supplied to the compatibility checker.
 */
export function compatibilityCheck<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends InferBeatmapWrapper<TFileType>,
>(
   type: BeatmapFileType,
   data: TWrapper,
   version: TVersion,
   options?: Partial<ICompatibilityOptions>,
): void {
   const logger = getLogger();

   const opt: Required<ICompatibilityOptions> = {
      enabled: options?.enabled ?? defaultOptions.enabled,
      throwOn: {
         ...defaultOptions.throwOn,
         ...options?.throwOn,
      },
   };

   logger?.tInfo(
      tag('compatibilityCheck'),
      `Performing compatibility checks for ${type} with version ${version}`,
   );

   switch (type) {
      case 'info': {
         const compatFn = infoCompatibilityMap[version as InferBeatmapVersion<'info'>];
         return compatFn(data as InferBeatmapWrapper<'info'>, opt);
      }
      case 'audioData': {
         const compatFn = audioDataCompatibilityMap[version as InferBeatmapVersion<'audioData'>];
         return compatFn(data as InferBeatmapWrapper<'audioData'>, opt);
      }
      case 'difficulty': {
         const compatFn = difficultyCompatibilityMap[version as InferBeatmapVersion<'difficulty'>];
         return compatFn(data as InferBeatmapWrapper<'difficulty'>, opt);
      }
      case 'lightshow': {
         const compatFn = lightshowCompatibilityMap[version as InferBeatmapVersion<'lightshow'>];
         return compatFn(data as InferBeatmapWrapper<'lightshow'>, opt);
      }
      default: {
         logger?.tWarn(tag(type), `No compatibility map found. Skipping compatibility checks.`);
      }
   }
}
