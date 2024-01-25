import { ISaveOptionsDifficulty } from '../types/bsmap/save.ts';
import * as optimize from '../optimize.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { deepCheck } from '../beatmap/shared/dataCheck.ts';
import { DifficultyDataCheck as V1DifficultyCheck } from '../beatmap/v1/dataCheck.ts';
import { DifficultyDataCheck as V2DifficultyCheck } from '../beatmap/v2/dataCheck.ts';
import { DifficultyDataCheck as V3DifficultyCheck } from '../beatmap/v3/dataCheck.ts';
import { DifficultyDataCheck as V4DifficultyCheck } from '../beatmap/v4/dataCheck.ts';
import { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';
import { resolve } from '../deps.ts';
import { writeJSONFile, writeJSONFileSync } from '../utils/_fs.ts';
import { defaultOptions } from './options.ts';

function tag(name: string): string[] {
   return ['save', name];
}

export function _difficulty(
   data: IWrapDifficulty,
   options: ISaveOptionsDifficulty,
) {
   const opt: Required<ISaveOptionsDifficulty> = {
      directory: '',
      filePath: '',
      format: options.format ?? defaultOptions.difficulty.format,
      optimize: { ...defaultOptions.difficulty.optimize, ...options.optimize },
      validate: { ...defaultOptions.difficulty.validate, ...options.validate },
      dataCheck: {
         ...defaultOptions.difficulty.dataCheck,
         ...options.dataCheck,
      },
      sort: options.sort ?? defaultOptions.difficulty.sort,
   };
   if (opt.validate.enabled) {
      logger.tInfo(tag('_difficulty'), 'Validating beatmap');
      if (!data.isValid()) {
         logger.tWarn(tag('_difficulty'), 'Invalid data detected in beatmap');
         if (opt.validate.reparse) {
            data.reparse();
         } else {
            throw new Error('Preventing save of beatmap');
         }
      }
   }

   if (opt.sort) {
      logger.tInfo(tag('_difficulty'), 'Sorting beatmap objects');
      data.sort();
   }

   const ver = parseInt(data.version.at(0) || '0');
   const json = data.toJSON();

   if (opt.optimize.enabled) {
      if (ver <= 2) {
         if (typeof options.optimize?.purgeZeros === 'boolean') {
            opt.optimize.purgeZeros = options.optimize.purgeZeros;
         } else opt.optimize.purgeZeros = false;
      }
      optimize.difficulty(json, ver, opt.optimize);
   }

   if (opt.dataCheck.enabled) {
      logger.tInfo(tag('_difficulty'), 'Checking difficulty data value');
      const dataCheck = ver === 4
         ? V4DifficultyCheck
         : ver === 3
         ? V3DifficultyCheck
         : ver === 2
         ? V2DifficultyCheck
         : ver === 1
         ? V1DifficultyCheck
         : {};
      deepCheck(
         json,
         dataCheck,
         'difficulty',
         data.version,
         opt.dataCheck.throwError,
      );
   }

   return json;
}

/**
 * Asynchronously save beatmap difficulty.
 * ```ts
 * await save.difficulty(difficulty);
 * ```
 */
export function difficulty(
   data: IWrapDifficulty,
   options: ISaveOptionsDifficulty = {},
) {
   logger.tInfo(tag('difficulty'), 'Async saving difficulty');
   return writeJSONFile(
      _difficulty(data, options),
      resolve(
         options.directory ??
            (globals.directory || defaultOptions.difficulty.directory),
         options.filePath ??
            (data.filename ||
               defaultOptions.difficulty.filePath ||
               'UnnamedDifficulty.dat'),
      ),
      options.format,
   );
}

/**
 * Synchronously save beatmap difficulty.
 * ```ts
 * save.difficultySync(difficulty);
 * ```
 */
export function difficultySync(
   data: IWrapDifficulty,
   options: ISaveOptionsDifficulty = {},
) {
   logger.tInfo(tag('difficultySync'), 'Sync saving difficulty');
   writeJSONFileSync(
      _difficulty(data, options),
      resolve(
         options.directory ??
            (globals.directory || defaultOptions.difficulty.directory),
         options.filePath ??
            (data.filename ||
               defaultOptions.difficulty.filePath ||
               'UnnamedDifficulty.dat'),
      ),
      options.format,
   );
}
