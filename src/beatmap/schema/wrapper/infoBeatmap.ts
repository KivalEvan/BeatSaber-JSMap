import type { IWrapInfoBeatmap } from './types/info.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';

export function createInfoBeatmap(
   data: DeepPartial<IWrapInfoBeatmap> = {},
   options?: DeserializationOptions,
): IWrapInfoBeatmap {
   return {
      characteristic: data.characteristic ?? 'Standard',
      difficulty: data.difficulty ?? 'Easy',
      filename: data.filename ?? 'Unnamed.beatmap.dat',
      lightshowFilename: data.lightshowFilename ?? 'Unnamed.lightshow.dat',
      authors: {
         mappers: data.authors?.mappers ?? [],
         lighters: data.authors?.lighters ?? [],
      },
      njs: data.njs ?? 0,
      njsOffset: data.njsOffset ?? 0,
      colorSchemeId: data.colorSchemeId ?? -1,
      environmentId: data.environmentId ?? 0,
      customData: copyCustomData(data.customData, options),
   };
}
