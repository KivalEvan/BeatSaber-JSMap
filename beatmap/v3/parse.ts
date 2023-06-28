import { IDifficulty } from '../../types/beatmap/v3/difficulty.ts';
import { Difficulty } from './difficulty.ts';
import { DifficultyCheck } from './dataCheck.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import logger from '../../logger.ts';
import { sortV3NoteFn, sortV3ObjectFn } from '../shared/helpers.ts';

function tag(name: string): string[] {
   return ['v3', 'parse', name];
}

export function difficulty(
   data: Partial<IDifficulty>,
   checkData: {
      enabled: boolean;
      throwError?: boolean;
   } = { enabled: true, throwError: true },
): Difficulty {
   logger.tInfo(tag('difficulty'), 'Parsing beatmap difficulty v3.x.x');
   if (!(data.version === '3.0.0' || data.version === '3.1.0' || data.version === '3.2.0')) {
      logger.tWarn(tag('difficulty'), 'Unidentified beatmap version');
      data.version = '3.0.0';
   }
   if (checkData.enabled) {
      deepCheck(data, DifficultyCheck, 'difficulty', data.version, checkData.throwError);
   }

   data.bpmEvents?.sort(sortV3ObjectFn);
   data.rotationEvents?.sort(sortV3ObjectFn);
   data.colorNotes?.sort(sortV3NoteFn);
   data.bombNotes?.sort(sortV3NoteFn);
   data.obstacles?.sort(sortV3ObjectFn);
   data.sliders?.sort(sortV3NoteFn);
   data.burstSliders?.sort(sortV3NoteFn);
   data.waypoints?.sort(sortV3ObjectFn);
   data.basicBeatmapEvents?.sort(sortV3ObjectFn);
   data.colorBoostBeatmapEvents?.sort(sortV3ObjectFn);
   data.lightColorEventBoxGroups?.sort(sortV3ObjectFn);
   data.lightRotationEventBoxGroups?.sort(sortV3ObjectFn);
   data.lightTranslationEventBoxGroups?.sort(sortV3ObjectFn);

   return new Difficulty(data);
}
