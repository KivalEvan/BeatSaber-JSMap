import { IDifficulty } from '../../types/beatmap/v1/difficulty.ts';
import { Difficulty } from './difficulty.ts';
import { IInfo } from '../../types/beatmap/v1/info.ts';
import { Info } from './info.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import { DifficultyCheck, InfoCheck } from './dataCheck.ts';
import { CharacteristicOrder } from '../shared/characteristic.ts';
import { IBaseObject } from '../../types/beatmap/v1/object.ts';
import logger from '../../logger.ts';

function tag(name: string): string[] {
   return ['v1', 'parse', name];
}

const sortObjectTime = (a: IBaseObject, b: IBaseObject) => a._time - b._time;

export function difficulty(
   data: Partial<IDifficulty>,
   checkData: {
      enabled: boolean;
      throwError?: boolean;
   } = { enabled: true, throwError: true },
): Difficulty {
   logger.tInfo(tag('difficulty'), 'Parsing beatmap difficulty v1.x.x');
   if (!data._version?.startsWith('1')) {
      logger.tWarn(tag('difficulty'), 'Unidentified beatmap version');
      data._version = '1.5.0';
   }
   if (checkData.enabled) {
      deepCheck(data, DifficultyCheck, 'difficulty', data._version, checkData.throwError);
   }

   data._notes = data._notes ?? [];
   data._obstacles = data._obstacles ?? [];
   data._events = data._events ?? [];

   data._notes.sort(sortObjectTime);
   data._obstacles.sort(sortObjectTime);
   data._events.sort(sortObjectTime);

   return new Difficulty(data);
}

export function info(
   data: Partial<IInfo>,
   checkData: {
      enabled: boolean;
      throwError?: boolean;
   } = { enabled: true, throwError: true },
): Info {
   logger.tInfo(tag('info'), 'Parsing beatmap info v1.x.x');
   if (checkData.enabled) {
      deepCheck(data, InfoCheck, 'info', '1.0.0', checkData.throwError);
   }

   data.difficultyLevels
      ?.sort((a, b) => a.difficultyRank - b.difficultyRank)
      .sort(
         (a, b) => CharacteristicOrder[a.characteristic] - CharacteristicOrder[b.characteristic],
      );

   return new Info(data);
}
