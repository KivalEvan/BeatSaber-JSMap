import { IDifficulty } from '../../types/beatmap/v2/difficulty.ts';
import { Difficulty } from './difficulty.ts';
import { IInfo } from '../../types/beatmap/v2/info.ts';
import { Info } from './info.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import { DifficultyCheck, InfoCheck } from './dataCheck.ts';
import { CharacteristicOrder } from '../shared/characteristic.ts';
import { DifficultyRanking } from '../shared/difficulty.ts';
import logger from '../../logger.ts';
import { IDataCheckOption } from '../../types/beatmap/shared/dataCheck.ts';

function tag(name: string): string[] {
   return ['v2', 'parse', name];
}

export function parseDifficulty(
   data: Partial<IDifficulty>,
   checkData: IDataCheckOption = { enabled: true, throwError: true },
): Difficulty {
   logger.tInfo(tag('difficulty'), 'Parsing beatmap difficulty v2.x.x');
   if (!data._version?.startsWith('2')) {
      logger.tWarn(tag('difficulty'), 'Unidentified beatmap version');
      data._version = '2.0.0';
   }
   if (checkData.enabled) {
      deepCheck(data, DifficultyCheck, 'difficulty', data._version, checkData.throwError);
   }

   return new Difficulty(data);
}

export function parseInfo(
   data: Partial<IInfo>,
   checkData: IDataCheckOption = { enabled: true, throwError: true },
): Info {
   logger.tInfo(tag('info'), 'Parsing beatmap info v2.x.x');
   if (!data._version?.startsWith('2')) {
      logger.tWarn(tag('info'), 'Unidentified beatmap version');
   }
   // FIXME: temporary fix from my own mistake, remove when 2.2.0 exist
   data._version = '2.0.0';
   if (checkData.enabled) {
      deepCheck(data, InfoCheck, 'info', data._version, checkData.throwError);
   }
   data._difficultyBeatmapSets?.sort(
      (a, b) =>
         CharacteristicOrder[a._beatmapCharacteristicName] -
         CharacteristicOrder[b._beatmapCharacteristicName],
   );
   data._difficultyBeatmapSets?.forEach((set) => {
      let num = 0;
      set._difficultyBeatmaps.forEach((a) => {
         if (a._difficultyRank - num <= 0) {
            logger.tWarn(tag('info'), a._difficulty + ' is unordered');
         }
         if (DifficultyRanking[a._difficulty] !== a._difficultyRank) {
            logger.tError(tag('info'), a._difficulty + ' has invalid rank');
         }
         num = a._difficultyRank;
         if (
            typeof a._customData?._editorOffset === 'number' &&
            a._customData._editorOffset === 0
         ) {
            delete a._customData._editorOffset;
         }
         if (
            typeof a._customData?._editorOldOffset === 'number' &&
            a._customData._editorOldOffset === 0
         ) {
            delete a._customData._editorOldOffset;
         }
      });
      set._difficultyBeatmaps.sort((a, b) => a._difficultyRank - b._difficultyRank);
   });

   return new Info(data);
}
