import type { IWrapBeatmap } from './types/beatmap.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createDifficulty } from './difficulty.ts';
import { createLightshow } from './lightshow.ts';

export function createBeatmap(data: DeepPartial<IWrapBeatmap> = {}): IWrapBeatmap {
   return {
      version: data.version ?? -1,
      filename: data.filename ?? 'Unnamed.beatmap.dat',
      lightshowFilename: data.lightshowFilename ?? 'Unnamed.lightshow.dat',
      difficulty: createDifficulty(data.difficulty),
      lightshow: createLightshow(data.lightshow),
      customData: deepCopy({ ...data.customData }),
   };
}
