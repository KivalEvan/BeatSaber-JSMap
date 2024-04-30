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
         offset: data.offset,
         oldOffset: data.oldOffset,
         chromaToggle: data.chromaToggle,
         customColors: data.customColors,
         difficultyLabel: data.difficultyLabel,
         colorLeft: data.colorLeft,
         colorRight: data.colorRight,
         envColorLeft: data.envColorLeft,
         envColorRight: data.envColorRight,
         obstacleColor: data.obstacleColor,
      };
   },
   deserialize(
      data: Partial<IInfoDifficulty> = {}
   ): Partial<IWrapInfoBeatmapAttribute> {
      return {
         difficulty: data.difficulty ?? 'Easy',
         filename: data.jsonPath ?? 'UnnamedFile.dat',
         njs: 0,
         njsOffset: 0,

         audioPath: songFileName ?? 'song.ogg',
         characteristic: data.characteristic || 'Standard',
         offset: data.offset,
         oldOffset: data.oldOffset,
         chromaToggle: data.chromaToggle,
         customColors: data.customColors,
         difficultyLabel: data.difficultyLabel,
         colorLeft: shallowCopy(data.colorLeft),
         colorRight: shallowCopy(data.colorRight),
         envColorLeft: shallowCopy(data.envColorLeft),
         envColorRight: shallowCopy(data.envColorRight),
         obstacleColor: shallowCopy(data.obstacleColor),
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
