import type { IInfoDifficulty } from '../../schema/v2/types/info.ts';
import type { IWrapInfoBeatmap } from '../wrapper/types/info.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createInfoBeatmap } from '../wrapper/infoBeatmap.ts';
import { DifficultyRanking } from '../../misc/difficulty.ts';
import type { DeepPartial } from '../../../types/utils.ts';

type IInfoBeatmapDeserializationPolyfills = Pick<
   IWrapInfoBeatmap,
   'characteristic' | 'lightshowFilename' | 'authors'
>;

/** Serialize beatmap v2 `Info Beatmap` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeInfoBeatmap(data: IWrapInfoBeatmap): IInfoDifficulty {
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
}

/** Deserialize schema object into beatmap v2 `Info Beatmap` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills.
 * @returns The unwrapped beatmap object.
 */
export function deserializeInfoBeatmap(
   data: IInfoDifficulty,
   options?: DeepPartial<IInfoBeatmapDeserializationPolyfills>,
): IWrapInfoBeatmap {
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
}
