import type { IInfoDifficulty } from '../../../types/beatmap/v1/info.ts';
import { shallowCopy } from '../../../utils/misc.ts';
import type { IWrapInfoBeatmapAttribute } from '../../../types/beatmap/wrapper/info.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import { DifficultyRanking } from '../../shared/difficulty.ts';

export const infoDifficulty: ISchemaContainer<
   IWrapInfoBeatmapAttribute,
   IInfoDifficulty
> = {
   defaultValue: {} as Required<IInfoDifficulty>,
   serialize(data: IWrapInfoBeatmapAttribute): IInfoDifficulty {
      return {
         difficulty: data.difficulty,
         difficultyRank: DifficultyRanking[data.difficulty],
         audioPath: '',
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
   deserialize(
      data: Partial<IInfoDifficulty> = {},
   ): Partial<IWrapInfoBeatmapAttribute> {
      return {
         difficulty: data.difficulty ?? 'Easy',
         filename: data.jsonPath ?? 'UnnamedFile.dat',
         njs: 0,
         njsOffset: 0,

         // audioPath: songFileName ?? 'song.ogg',
         characteristic: data.characteristic || 'Standard',
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
      };
   },
   isValid(_: IWrapInfoBeatmapAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapInfoBeatmapAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapInfoBeatmapAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapInfoBeatmapAttribute): boolean {
      return false;
   },
};
