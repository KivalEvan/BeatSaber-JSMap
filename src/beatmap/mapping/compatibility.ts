import type { ICompatibilityOptions } from '../../types/beatmap/options/compatibility.ts';
import type { InferBeatmap, InferBeatmapVersion } from '../../types/beatmap/shared/infer.ts';
import type { BeatmapFileType } from '../../types/beatmap/shared/schema.ts';
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

type CompatibilityMap<T extends BeatmapFileType> = {
   [TVersion in InferBeatmapVersion<T>]: <TSerial extends InferBeatmap<T>>(
      data: TSerial,
      options: ICompatibilityOptions,
   ) => void;
};

/** Compatibility function version map for beatmap info. */
export const infoCompatibilityMap: CompatibilityMap<'info'> = {
   1: compatV1Info,
   2: compatV2Info,
   4: compatV4Info,
} as const;

/** Compatibility function version map for beatmap audio data. */
export const audioDataCompatibilityMap: CompatibilityMap<'audioData'> = {
   2: compatV2AudioData,
   4: compatV4AudioData,
} as const;

/** Compatibility function version map for beatmap difficulty. */
export const difficultyCompatibilityMap: CompatibilityMap<'difficulty'> = {
   1: compatV1Difficulty,
   2: compatV2Difficulty,
   3: compatV3Difficulty,
   4: compatV4Difficulty,
} as const;

/** Compatibility function version map for beatmap lightshow. */
export const lightshowCompatibilityMap: CompatibilityMap<'lightshow'> = {
   3: compatV3Lightshow,
   4: compatV4Lightshow,
} as const;
