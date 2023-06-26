import { IDifficulty } from '../../types/beatmap/v2/difficulty.ts';
import { Difficulty } from './difficulty.ts';
import { IInfo } from '../../types/beatmap/v2/info.ts';
import { Info } from './info.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import { DifficultyCheck, InfoCheck } from './dataCheck.ts';
import { CharacteristicOrder } from '../shared/characteristic.ts';
import { DifficultyRanking } from '../shared/difficulty.ts';
import { IBaseObject } from '../../types/beatmap/v2/object.ts';
import logger from '../../logger.ts';

function tag(name: string): string[] {
   return ['v2', 'parse', name];
}

const sortObjectTime = (a: IBaseObject, b: IBaseObject) => a._time - b._time;

export function difficulty(
   data: Partial<IDifficulty>,
   checkData: {
      enabled: boolean;
      throwError?: boolean;
   } = { enabled: true, throwError: true },
): Difficulty {
   logger.tInfo(tag('difficulty'), 'Parsing beatmap difficulty v2.x.x');
   if (!data._version?.startsWith('2')) {
      logger.tWarn(tag('difficulty'), 'Unidentified beatmap version');
      data._version = '2.0.0';
   }
   if (checkData.enabled) {
      deepCheck(data, DifficultyCheck, 'difficulty', data._version, checkData.throwError);
   }

   data._notes?.sort(sortObjectTime);
   data._sliders?.sort((a, b) => a._headTime - b._headTime);
   data._obstacles?.sort(sortObjectTime);
   data._events?.sort(sortObjectTime);
   data._waypoints?.sort(sortObjectTime);

   return new Difficulty(data);
}

export function info(
   data: Partial<IInfo>,
   checkData: {
      enabled: boolean;
      throwError?: boolean;
   } = { enabled: true, throwError: true },
): Info {
   logger.tInfo(tag('info'), 'Parsing beatmap info v2.x.x');
   if (!data._version?.startsWith('2')) {
      logger.tWarn(tag('info'), 'Unidentified beatmap version');
      data._version = '2.0.0';
   }
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
