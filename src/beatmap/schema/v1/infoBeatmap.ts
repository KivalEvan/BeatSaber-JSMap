import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IInfoDifficulty } from '../../../types/beatmap/v1/info.ts';
import type { IWrapInfo, IWrapInfoBeatmap } from '../../../types/beatmap/wrapper/info.ts';
import { shallowCopy } from '../../../utils/misc/json.ts';
import { createInfoBeatmap } from '../../core/infoBeatmap.ts';
import { DifficultyRanking } from '../../shared/difficulty.ts';

type InfoBeatmapSerializationPolyfills = {
   audio: Pick<IWrapInfo['audio'], 'filename'>;
};
type InfoBeatmapDeserializationPolyfills = Pick<
   IWrapInfoBeatmap,
   'characteristic' | 'njs' | 'njsOffset' | 'lightshowFilename' | 'authors'
>;

/**
 * Schema serialization for v1 `Info Beatmap`.
 */
export const infoBeatmap: ISchemaContainer<
   IWrapInfoBeatmap,
   IInfoDifficulty,
   InfoBeatmapSerializationPolyfills,
   InfoBeatmapDeserializationPolyfills
> = {
   serialize(data, options) {
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
   },
   deserialize(data, options) {
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
   },
};
