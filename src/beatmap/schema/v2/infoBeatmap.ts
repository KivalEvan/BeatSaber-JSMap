// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IInfoDifficulty } from '../../schema/v2/types/info.ts';
import type { IWrapInfoBeatmap } from '../../core/types/info.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createInfoBeatmap } from '../../core/infoBeatmap.ts';
import { DifficultyRanking } from '../../misc/difficulty.ts';

type IInfoBeatmapDeserializationPolyfills = Pick<
   IWrapInfoBeatmap,
   'characteristic' | 'lightshowFilename' | 'authors'
>;

/**
 * Schema serialization for v2 `Info Beatmap`.
 */
export const infoBeatmap: ISchemaContainer<
   IWrapInfoBeatmap,
   IInfoDifficulty,
   Record<string, any>,
   IInfoBeatmapDeserializationPolyfills
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
      return createInfoBeatmap({
         characteristic: options?.characteristic,
         difficulty: data._difficulty,
         authors: {
            mappers: options?.authors?.mappers,
            lighters: options?.authors?.lighters,
         },
         filename: data._beatmapFilename,
         lightshowFilename: options?.lightshowFilename,
         njs: data._noteJumpMovementSpeed,
         njsOffset: data._noteJumpStartBeatOffset,
         colorSchemeId: data._beatmapColorSchemeIdx,
         environmentId: data._environmentNameIdx,
         customData: data._customData,
      });
   },
};
