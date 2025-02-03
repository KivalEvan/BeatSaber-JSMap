import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IInfoDifficulty } from '../../../types/beatmap/v2/info.ts';
import type { IWrapInfoBeatmapAttribute } from '../../../types/beatmap/wrapper/info.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { DifficultyRanking } from '../../shared/difficulty.ts';

type IInfoBeatmapPolyfills = Partial<
   Pick<IWrapInfoBeatmapAttribute, 'characteristic' | 'lightshowFilename' | 'authors'>
>;

/**
 * Schema serialization for v2 `Info Beatmap`.
 */
export const infoBeatmap: ISchemaContainer<
   IWrapInfoBeatmapAttribute,
   IInfoDifficulty,
   IInfoBeatmapPolyfills
> = {
   serialize(data) {
      return {
         _difficulty: data.difficulty,
         _difficultyRank: DifficultyRanking[data.difficulty],
         _beatmapFilename: data.filename,
         _noteJumpMovementSpeed: data.njs,
         _noteJumpStartBeatOffset: data.njsOffset,
         _beatmapColorSchemeIdx: data.colorSchemeId,
         _environmentNameIdx: data.environmentId,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data, options) {
      return {
         characteristic: options?.characteristic ?? 'Standard',
         difficulty: data._difficulty ?? 'Easy',
         authors: {
            mappers: options?.authors?.mappers ?? [],
            lighters: options?.authors?.lighters ?? [],
         },
         filename: data._beatmapFilename ?? 'EasyStandard.dat',
         lightshowFilename: options?.lightshowFilename ?? 'EasyLightshow.dat',
         njs: data._noteJumpMovementSpeed ?? 0,
         njsOffset: data._noteJumpStartBeatOffset ?? 0,
         colorSchemeId: data._beatmapColorSchemeIdx ?? -1,
         environmentId: data._environmentNameIdx ?? 0,
         customData: data._customData ?? {},
      };
   },
};
