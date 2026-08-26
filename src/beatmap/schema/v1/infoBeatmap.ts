import type { IInfoDifficulty } from './types/info.ts';
import type { IWrapInfo, IWrapInfoBeatmap } from '../wrapper/types/info.ts';
import { shallowCopy } from '../../../utils/misc/json.ts';
import { createInfoBeatmap } from '../wrapper/infoBeatmap.ts';
import { DifficultyRanking } from '../../misc/difficulty.ts';
import type { DeepPartial } from '../../../types/utils.ts';

type InfoBeatmapSerializationPolyfills = {
   audio: Pick<IWrapInfo['audio'], 'filename'>;
};
type InfoBeatmapDeserializationPolyfills = Pick<
   IWrapInfoBeatmap,
   'characteristic' | 'njs' | 'njsOffset' | 'lightshowFilename' | 'authors'
>;

/** Serialize beatmap v1 `Info Beatmap` object into schema object.
 * @param data The unwrapped beatmap object.
 * @param options Serialization options.
 * @returns The serialized schema object.
 */
export function serializeInfoBeatmap(
   data: IWrapInfoBeatmap,
   options?: DeepPartial<InfoBeatmapSerializationPolyfills>,
): IInfoDifficulty {
   return {
      difficulty: data.difficulty,
      difficultyRank: DifficultyRanking[data.difficulty],
      audioPath: options?.audio?.filename ?? 'song.ogg',
      jsonPath: data.filename,
      characteristic: data.characteristic,
      offset: data.customData._editorOffset,
      oldOffset: data.customData._editorOldOffset,
      chromaToggle: data.customData._chromaToggle,
      customColors: data.customData._customColors,
      difficultyLabel: data.customData._difficultyLabel,
      colorLeft: shallowCopy(data.customData._colorLeft),
      colorRight: shallowCopy(data.customData._colorRight),
      envColorLeft: shallowCopy(data.customData._envColorLeft),
      envColorRight: shallowCopy(data.customData._envColorRight),
      obstacleColor: shallowCopy(data.customData._obstacleColor),
   };
}

/** Deserialize schema object into beatmap v1 `Info Beatmap` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills.
 * @returns The unwrapped beatmap object.
 */
export function deserializeInfoBeatmap(
   data: IInfoDifficulty,
   options?: DeepPartial<InfoBeatmapDeserializationPolyfills>,
): IWrapInfoBeatmap {
   return createInfoBeatmap({
      characteristic: data.characteristic,
      difficulty: data.difficulty,
      authors: {
         mappers: options?.authors?.mappers,
         lighters: options?.authors?.lighters,
      },
      filename: data.jsonPath,
      lightshowFilename: options?.lightshowFilename,
      njs: options?.njs,
      njsOffset: options?.njsOffset,
      customData: {
         _editorOffset: data.offset,
         _editorOldOffset: data.oldOffset,
         _chromaToggle: data.chromaToggle,
         _customColors: data.customColors,
         _difficultyLabel: data.difficultyLabel,
         _colorLeft: shallowCopy(data.colorLeft),
         _colorRight: shallowCopy(data.colorRight),
         _envColorLeft: shallowCopy(data.envColorLeft),
         _envColorRight: shallowCopy(data.envColorRight),
         _obstacleColor: shallowCopy(data.obstacleColor),
      },
   });
}
