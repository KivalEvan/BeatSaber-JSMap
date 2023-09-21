import { IDifficulty } from '../../types/beatmap/v1/difficulty.ts';
import { Difficulty } from './difficulty.ts';
import { IInfo } from '../../types/beatmap/v1/info.ts';
import { Info } from './info.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import { DifficultyCheck, InfoCheck } from './dataCheck.ts';
import { CharacteristicOrder } from '../shared/characteristic.ts';
import logger from '../../logger.ts';
import { sortV2NoteFn, sortV2ObjectFn } from '../shared/helpers.ts';
import { IDataCheckOption } from '../../types/beatmap/shared/dataCheck.ts';

function tag(name: string): string[] {
   return ['v1', 'parse', name];
}

export function parseDifficulty(
   data: Partial<IDifficulty>,
   checkData: IDataCheckOption = { enabled: true, throwError: true },
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

   data._notes.sort(sortV2NoteFn);
   data._obstacles.sort(sortV2ObjectFn);
   data._events.sort(sortV2ObjectFn);

   return new Difficulty(data);
}

export function parseInfo(
   data: Partial<IInfo>,
   checkData: IDataCheckOption = { enabled: true, throwError: true },
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
