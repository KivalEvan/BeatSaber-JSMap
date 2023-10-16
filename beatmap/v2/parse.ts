import { Difficulty } from './difficulty.ts';
import { IInfoSet } from '../../types/beatmap/v2/info.ts';
import { Info } from './info.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import { DifficultyCheck, InfoCheck } from './dataCheck.ts';
import { DifficultyRanking } from '../shared/difficulty.ts';
import logger from '../../logger.ts';
import { IDataCheckOption } from '../../types/beatmap/shared/dataCheck.ts';
import { compareVersion } from '../shared/version.ts';
import { IEvent } from '../../types/beatmap/v2/event.ts';

function tag(name: string): string[] {
   return ['v2', 'parse', name];
}

export function parseDifficulty(
   // deno-lint-ignore no-explicit-any
   data: Record<string, any>,
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

   data._customData ||= {};
   if (data._BPMChanges) data._customData_BPMChanges ||= data._BPMChanges;
   if (data._bpmChanges) data._customData_bpmChanges ||= data._bpmChanges;
   if (data._bookmarks) data._customData._bookmarks ||= data._bookmarks;
   if (data._customEvents) data._customData._customEvents ||= data._customEvents;
   if (data._time) data._customData._time ||= data._time;

   if (compareVersion(data._version, '2.5.0') === 'old') {
      data._events?.forEach((e: IEvent) => (e._floatValue = 1));
   }

   return new Difficulty(data);
}

export function parseInfo(
   // deno-lint-ignore no-explicit-any
   data: Record<string, any>,
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

   data._difficultyBeatmapSets?.forEach((set: IInfoSet) => {
      let num = 0;
      set._difficultyBeatmaps?.forEach((a) => {
         if (typeof a._difficultyRank === 'number') {
            if (a._difficultyRank - num <= 0) {
               logger.tWarn(tag('info'), a._difficulty + ' is unordered');
            }
         } else if (typeof a._difficulty === 'string') {
            a._difficultyRank = DifficultyRanking[a._difficulty];
            if (!a._difficultyRank) {
               a._difficulty = 'Easy';
               a._difficultyRank = 1;
            }
         } else {
            a._difficulty = 'Easy';
            a._difficultyRank = 1;
         }
         if (DifficultyRanking[a._difficulty!] !== a._difficultyRank) {
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
   });

   return new Info(data);
}
