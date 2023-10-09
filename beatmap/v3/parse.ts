import { IDifficulty } from '../../types/beatmap/v3/difficulty.ts';
import { Difficulty } from './difficulty.ts';
import { DifficultyCheck } from './dataCheck.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import logger from '../../logger.ts';
import { IDataCheckOption } from '../../types/beatmap/shared/dataCheck.ts';

function tag(name: string): string[] {
   return ['v3', 'parse', name];
}

export function parseDifficulty(
   data: Partial<IDifficulty>,
   checkData: IDataCheckOption = { enabled: true, throwError: true },
): Difficulty {
   logger.tInfo(tag('difficulty'), 'Parsing beatmap difficulty v3.x.x');
   if (
      !(
         data.version === '3.0.0' ||
         data.version === '3.1.0' ||
         data.version === '3.2.0' ||
         data.version === '3.3.0'
      )
   ) {
      logger.tWarn(tag('difficulty'), 'Unidentified beatmap version');
      data.version = '3.0.0';
   }
   if (checkData.enabled) {
      deepCheck(data, DifficultyCheck, 'difficulty', data.version, checkData.throwError);
   }

   return new Difficulty(data);
}
