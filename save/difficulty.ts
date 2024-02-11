import { ISaveOptionsDifficulty } from '../types/bsmap/save.ts';
import * as optimize from '../optimize.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { deepCheck } from '../beatmap/shared/dataCheck.ts';
import { DifficultyDataCheck as V1DifficultyCheck } from '../beatmap/v1/dataCheck.ts';
import { DifficultyDataCheck as V2DifficultyCheck } from '../beatmap/v2/dataCheck.ts';
import { DifficultyDataCheck as V3DifficultyCheck } from '../beatmap/v3/dataCheck.ts';
import { DifficultyDataCheck as V4DifficultyCheck } from '../beatmap/v4/dataCheck.ts';
import { Difficulty as V1Difficulty } from '../beatmap/v1/difficulty.ts';
import { Difficulty as V2Difficulty } from '../beatmap/v2/difficulty.ts';
import { Difficulty as V3Difficulty } from '../beatmap/v3/difficulty.ts';
import { Difficulty as V4Difficulty } from '../beatmap/v4/difficulty.ts';
import { IDifficulty as IV1Difficulty } from '../types/beatmap/v1/difficulty.ts';
import { IDifficulty as IV2Difficulty } from '../types/beatmap/v2/difficulty.ts';
import { IDifficulty as IV3Difficulty } from '../types/beatmap/v3/difficulty.ts';
import { IDifficulty as IV4Difficulty } from '../types/beatmap/v4/difficulty.ts';
import { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';
import { resolve } from '../deps.ts';
import { writeJSONFile, writeJSONFileSync } from '../utils/_fs.ts';
import { defaultOptions } from './options.ts';
import { DataCheck } from '../types/beatmap/shared/dataCheck.ts';

function tag(name: string): string[] {
   return ['save', name];
}

const dataCheckList: Record<number, Record<string, DataCheck>> = {
   1: V1DifficultyCheck,
   2: V2DifficultyCheck,
   3: V3DifficultyCheck,
   4: V4DifficultyCheck,
};

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
      write: true,
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
      const dataCheck = dataCheckList[ver] ?? {};
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
   options?: ISaveOptionsDifficulty,
   // deno-lint-ignore no-explicit-any
): Promise<Record<string, any>>;
export function difficulty(
   data: V1Difficulty,
   options?: ISaveOptionsDifficulty,
): Promise<IV1Difficulty>;
export function difficulty(
   data: V2Difficulty,
   options?: ISaveOptionsDifficulty,
): Promise<IV2Difficulty>;
export function difficulty(
   data: V3Difficulty,
   options?: ISaveOptionsDifficulty,
): Promise<IV3Difficulty>;
export function difficulty(
   data: V4Difficulty,
   options?: ISaveOptionsDifficulty,
): Promise<IV4Difficulty>;
export function difficulty(
   data: IWrapDifficulty,
   options: ISaveOptionsDifficulty = {},
) {
   logger.tInfo(tag('difficulty'), 'Async saving difficulty');
   const json = _difficulty(data, options);
   if (options.write ?? defaultOptions.difficulty.write) {
      return writeJSONFile(
         json,
         resolve(
            options.directory ??
               (globals.directory || defaultOptions.difficulty.directory),
            options.filePath ??
               (data.filename ||
                  defaultOptions.difficulty.filePath ||
                  'UnnamedDifficulty.dat'),
         ),
         options.format,
      ).then(() => json);
   }
   return new Promise((resolve) => resolve(json));
}

/**
 * Synchronously save beatmap difficulty.
 * ```ts
 * save.difficultySync(difficulty);
 * ```
 */
export function difficultySync(
   data: IWrapDifficulty,
   options?: ISaveOptionsDifficulty,
   // deno-lint-ignore no-explicit-any
): Record<string, any>;
export function difficultySync(
   data: V1Difficulty,
   options?: ISaveOptionsDifficulty,
): IV1Difficulty;
export function difficultySync(
   data: V2Difficulty,
   options?: ISaveOptionsDifficulty,
): IV2Difficulty;
export function difficultySync(
   data: V3Difficulty,
   options?: ISaveOptionsDifficulty,
): IV3Difficulty;
export function difficultySync(
   data: V4Difficulty,
   options?: ISaveOptionsDifficulty,
): IV4Difficulty;
export function difficultySync(
   data: IWrapDifficulty,
   options: ISaveOptionsDifficulty = {},
) {
   logger.tInfo(tag('difficultySync'), 'Sync saving difficulty');
   const json = _difficulty(data, options);
   if (options.write ?? defaultOptions.difficulty.write) {
      writeJSONFileSync(
         json,
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
   return json;
}
