import { IInfo } from './types/beatmap/v2/info.ts';
import {
   IOptimizeOptions,
   IOptimizeOptionsDifficulty,
   IOptimizeOptionsInfo,
} from './types/bsmap/optimize.ts';
import { round } from './utils/math.ts';
import logger from './logger.ts';
import { IDifficulty as IDifficultyV1 } from './types/beatmap/v1/difficulty.ts';
import { IDifficulty as IDifficultyV2 } from './types/beatmap/v2/difficulty.ts';
import { IDifficulty as IDifficultyV3 } from './types/beatmap/v3/difficulty.ts';
import { isV1, isV2, isV3 } from './beatmap/version.ts';
import {
   sortV2NoteFn,
   sortV2ObjectFn,
   sortV3NoteFn,
   sortV3ObjectFn,
} from './beatmap/shared/helpers.ts';

function tag(name: string): string[] {
   return ['optimize', name];
}

const optionsInfo: Required<IOptimizeOptionsInfo> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   throwError: true,
   removeDuplicate: true,
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

const ignoreObjectRemove = [
   '_notes',
   '_sliders',
   '_events',
   '_obstacles',
   '_waypoints',
   '_difficultyBeatmapSets',
   'bpmEvents',
   'rotationEvents',
   'colorNotes',
   'bombNotes',
   'obstacles',
   'sliders',
   'burstSliders',
   'waypoints',
   'basicBeatmapEvents',
   'colorBoostBeatmapEvents',
   'lightColorEventBoxGroups',
   'lightRotationEventBoxGroups',
   'lightTranslationEventBoxGroups',
   'basicEventTypesWithKeywords',
   'useNormalEventsAsCompatibleEvents',
   'd',
   'e',
   'l',
];
export function deepClean(
   // deno-lint-ignore no-explicit-any
   obj: { [key: string | number]: any } | any[],
   options: IOptimizeOptions,
   name = '',
) {
   for (const k in obj) {
      // shorten number
      if (typeof obj[k] === 'number') {
         obj[k] = round(obj[k], options.floatTrim);
      }
      // trim that string space
      if (typeof obj[k] === 'string' && options.stringTrim) {
         obj[k] = obj[k].trim();
      }
      // recursion
      if ((typeof obj[k] === 'object' || Array.isArray(obj[k])) && obj[k] !== null) {
         deepClean(obj[k], options, `${name}.${k}`);
         // if it's lightID array, sort it
         if (
            (k === '_lightID' || k === 'lightID') &&
            Array.isArray(obj[k]) &&
            // deno-lint-ignore no-explicit-any
            obj[k].every((x: any) => typeof x === 'number')
         ) {
            obj[k] = obj[k].sort((a: number, b: number) => a - b);
         }
      }
      // remove empty array/object property
      if (
         !ignoreObjectRemove.includes(k) &&
         ((Array.isArray(obj[k]) && !obj[k].length) ||
            (typeof obj[k] === 'object' &&
               !Array.isArray(obj[k]) &&
               JSON.stringify(obj[k]) === '{}'))
      ) {
         delete obj[k];
         continue;
      }
      // throw or remove null
      if (obj[k] === null) {
         if (options.throwError) {
            throw new Error(`null value found in object key ${name}.${k}.`);
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
                  `null value found in object key ${name}.${k}, deleting property...`,
               );
               delete obj[k];
            }
         }
      }
   }
}

export function info(info: IInfo, options: IOptimizeOptionsInfo = { enabled: true }) {
   const opt: Required<IOptimizeOptionsInfo> = {
      enabled: options.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.info.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.info.stringTrim,
      throwError: options.throwError ?? defaultOptions.info.throwError,
      removeDuplicate: options.removeDuplicate ?? defaultOptions.info.removeDuplicate,
   };

   if (!opt.enabled) {
      return info;
   }
   logger.tInfo(tag('info'), `Optimising info data`);

   logger.tDebug(tag('info'), 'Applying deep clean');
   deepClean(info, opt);
   return info;
}

export function difficulty<T extends IDifficultyV1 | IDifficultyV2 | IDifficultyV3>(
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
   deepClean(difficulty, opt);

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
