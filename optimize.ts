import { IInfo } from './types/beatmap/v2/info.ts';
import {
   IOptimizeOptions,
   IOptimizeOptionsDifficulty,
   IOptimizeOptionsInfo,
} from './types/bsmap/optimize.ts';
import { round } from './utils/math.ts';
import logger from './logger.ts';
import { IDifficulty as IV1Difficulty } from './types/beatmap/v1/difficulty.ts';
import { IDifficulty as IV2Difficulty } from './types/beatmap/v2/difficulty.ts';
import { IDifficulty as IV3Difficulty } from './types/beatmap/v3/difficulty.ts';
import { isV1, isV2, isV3 } from './beatmap/version.ts';
import {
   sortV2NoteFn,
   sortV2ObjectFn,
   sortV3NoteFn,
   sortV3ObjectFn,
} from './beatmap/shared/helpers.ts';
import { DataCheck } from './types/beatmap/shared/dataCheck.ts';
import {
   DifficultyCheck as DifficultyV1Check,
   InfoCheck as InfoV1Check,
} from './beatmap/v1/dataCheck.ts';
import {
   DifficultyCheck as DifficultyV2Check,
   InfoCheck as InfoV2Check,
} from './beatmap/v2/dataCheck.ts';
import { DifficultyCheck as DifficultyV3Check } from './beatmap/v3/dataCheck.ts';

function tag(name: string): string[] {
   return ['optimize', name];
}

const optionsInfo: Required<IOptimizeOptionsInfo> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   throwError: true,
};
const optionsDifficulty: Required<IOptimizeOptionsDifficulty> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   throwError: true,
   sort: true,
};

/** Set default option value for optimize function. */
export const defaultOptions = {
   info: optionsInfo,
   difficulty: optionsDifficulty,
};

export function deepClean(
   // deno-lint-ignore no-explicit-any
   obj: { [key: string | number]: any } | any[],
   check: { [key: string]: DataCheck },
   name: string,
   options: IOptimizeOptions,
) {
   for (const k in obj) {
      if (typeof obj[k] === 'number') {
         obj[k] = round(obj[k], options.floatTrim);
         continue;
      }

      if (typeof obj[k] === 'string' && options.stringTrim) {
         obj[k] = obj[k].trim();
         continue;
      }

      if (typeof obj[k] === 'boolean') {
         continue;
      }

      // throw or default null to 0
      if (obj[k] === null) {
         if (options.throwError) {
            throw new Error(`null value found in object key ${name}.${k}.}`);
         } else {
            if (Array.isArray(obj)) {
               logger.tError(
                  tag('deepClean'),
                  `null value found in array ${name}[${k}], defaulting to 0...`,
               );
               obj[k] = 0;
            } else {
               logger.tError(
                  tag('deepClean'),
                  `null value found in object key ${name}.${k}, deleting...`,
               );
               delete obj[k];
            }
         }
         continue;
      }
      // from here we can use data check, if it exist therefore it is mandatory
      const ch = check[k];
      // recursion stuff
      if (typeof obj[k] === 'object') {
         // filter out undefined in non data check stuff
         if (!ch && Array.isArray(obj[k])) {
            const len = obj[k].length;
            const newAry = obj[k].filter((e: unknown) => e !== undefined);
            if (len !== newAry.length) {
               if (options.throwError) {
                  throw new Error(`undefined found in array key ${name}.${k}.}`);
               } else {
                  logger.tError(
                     tag('deepClean'),
                     `undefined found in array key ${name}.${k}, replacing array with no undefined...`,
                  );
                  obj[k] = newAry;
               }
            }
         }
         deepClean(
            obj[k],
            ch && (ch.type === 'array' || ch.type === 'object') ? ch.check : {},
            Array.isArray(obj) ? `${name}[${k}]` : `${name}.${k}`,
            options,
         );
      }

      // remove unnecessary empty array/object property if exist and not part of data check
      if (!ch && ((Array.isArray(obj[k]) && !obj[k].length) || JSON.stringify(obj[k]) === '{}')) {
         delete obj[k];
         continue;
      }
   }
}

export function info(info: IInfo, options: IOptimizeOptionsInfo = { enabled: true }) {
   const opt: Required<IOptimizeOptionsInfo> = {
      enabled: options.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.info.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.info.stringTrim,
      throwError: options.throwError ?? defaultOptions.info.throwError,
   };

   if (!opt.enabled) {
      return info;
   }
   logger.tInfo(tag('info'), `Optimising info data`);

   logger.tDebug(tag('info'), 'Applying deep clean');
   const dCheck = info._version?.startsWith('2')
      ? InfoV2Check
      : info._version?.startsWith('1')
      ? InfoV1Check
      : {};
   deepClean(info, dCheck, 'info', opt);

   return info;
}

export function difficulty<T extends IV1Difficulty | IV2Difficulty | IV3Difficulty>(
   difficulty: T,
   options: IOptimizeOptionsDifficulty = { enabled: true },
): T {
   const opt: Required<IOptimizeOptionsDifficulty> = {
      enabled: options.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.difficulty.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.difficulty.stringTrim,
      throwError: options.throwError ?? defaultOptions.difficulty.throwError,
      sort: options.sort ?? defaultOptions.difficulty.sort,
   };

   if (!opt.enabled) {
      return difficulty;
   }
   logger.tInfo(tag('difficulty'), `Optimising difficulty data`);

   logger.tDebug(tag('difficulty'), 'Applying deep clean');
   const dCheck = (difficulty as IV3Difficulty).version?.startsWith('3')
      ? DifficultyV3Check
      : (difficulty as IV2Difficulty)._version?.startsWith('2')
      ? DifficultyV2Check
      : (difficulty as IV1Difficulty)._version?.startsWith('1')
      ? DifficultyV1Check
      : {};
   deepClean(difficulty, dCheck, 'difficulty', opt);

   if (opt.sort) {
      logger.tDebug(tag('difficulty'), 'Sorting objects');

      if (isV1(difficulty)) {
         difficulty._notes.sort(sortV2NoteFn);
         difficulty._obstacles.sort(sortV2ObjectFn);
         difficulty._events.sort(sortV2ObjectFn);
         difficulty._bookmarks?.sort(sortV2ObjectFn);
         difficulty._BPMChanges?.sort(sortV2ObjectFn);
      }
      if (isV2(difficulty)) {
         difficulty._notes.sort(sortV2NoteFn);
         difficulty._obstacles.sort(sortV2ObjectFn);
         difficulty._events.sort(sortV2ObjectFn);
         difficulty._sliders.sort((a, b) => a._headTime - b._headTime);
         difficulty._waypoints.sort(sortV2ObjectFn);
         difficulty._customData?._customEvents?.sort(sortV2ObjectFn);
         difficulty._customData?._bookmarks?.sort(sortV2ObjectFn);
         difficulty._customData?._bpmChanges?.sort(sortV2ObjectFn);
         difficulty._customData?._BPMChanges?.sort(sortV2ObjectFn);
      }
      if (isV3(difficulty)) {
         difficulty.colorNotes.sort(sortV3NoteFn);
         difficulty.bombNotes.sort(sortV3NoteFn);
         difficulty.obstacles.sort(sortV3ObjectFn);
         difficulty.bpmEvents.sort(sortV3ObjectFn);
         difficulty.rotationEvents.sort(sortV3ObjectFn);
         difficulty.colorBoostBeatmapEvents.sort(sortV3ObjectFn);
         difficulty.basicBeatmapEvents.sort(sortV3ObjectFn);
         difficulty.sliders.sort(sortV3NoteFn);
         difficulty.burstSliders.sort(sortV3NoteFn);
         difficulty.lightColorEventBoxGroups.sort(sortV3ObjectFn);
         difficulty.lightRotationEventBoxGroups.sort(sortV3ObjectFn);
         difficulty.lightTranslationEventBoxGroups.sort(sortV3ObjectFn);
         difficulty.waypoints.sort(sortV3NoteFn);
         difficulty.customData?.customEvents?.sort(sortV3ObjectFn);
         difficulty.customData?.bookmarks?.sort(sortV3ObjectFn);
         difficulty.customData?.BPMChanges?.sort(sortV3ObjectFn);
         difficulty.customData?.fakeColorNotes?.sort(sortV3NoteFn);
         difficulty.customData?.fakeBombNotes?.sort(sortV3NoteFn);
         difficulty.customData?.fakeBurstSliders?.sort(sortV3NoteFn);
         difficulty.customData?.fakeObstacles?.sort(sortV3ObjectFn);
      }
   }

   return difficulty;
}
