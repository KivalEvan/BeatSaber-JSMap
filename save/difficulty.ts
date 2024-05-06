// deno-lint-ignore-file no-explicit-any
import type { ISaveOptionsDifficulty } from '../types/bsmap/save.ts';
import * as optimize from '../optimize/mod.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { deepCheck } from '../beatmap/shared/dataCheck.ts';
import type { DifficultyDataCheck as V1DifficultyCheck } from '../beatmap/schema/v1/dataCheck.ts';
import type { DifficultyDataCheck as V2DifficultyCheck } from '../beatmap/schema/v2/dataCheck.ts';
import type { DifficultyDataCheck as V3DifficultyCheck } from '../beatmap/schema/v3/dataCheck.ts';
import type { DifficultyDataCheck as V4DifficultyCheck } from '../beatmap/schema/v4/dataCheck.ts';
import type { IWrapBeatmap } from '../types/beatmap/wrapper/beatmap.ts';
import { resolve } from '../deps.ts';
import { writeJSONFile, writeJSONFileSync } from '../utils/_fs.ts';
import { defaultOptions } from './options.ts';
import type { DataCheck } from '../types/beatmap/shared/dataCheck.ts';

function tag(name: string): string[] {
   return ['save', name];
}

export function _difficulty(
   data: IWrapBeatmap,
   options: ISaveOptionsDifficulty,
): Record<string, any> {
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
      preprocess: options.preprocess ?? defaultOptions.difficulty.preprocess,
      postprocess: options.postprocess ?? defaultOptions.difficulty.postprocess,
   };
   opt.preprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_difficulty'),
         'Running preprocess function #' + (i + 1),
      );
      data = fn(data);
   });

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
   let json = data.toJSON();

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
      const dataCheck = dataCheckMap[ver] ?? {};
      deepCheck(
         json,
         dataCheck,
         'difficulty',
         data.version,
         opt.dataCheck.throwError,
      );
   }

   opt.postprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_difficulty'),
         'Running postprocess function #' + (i + 1),
      );
      json = fn(json);
   });
   return json;
}

/**
 * Asynchronously save beatmap difficulty.
 * ```ts
 * await save.difficulty(difficulty);
 * ```
 */
export function difficulty(
   data: IWrapBeatmap,
   options?: ISaveOptionsDifficulty,
): Promise<Record<string, any>>;
export function difficulty(
   data: IWrapBeatmap,
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
   return new Promise<typeof json>((resolve) => resolve(json));
}

/**
 * Synchronously save beatmap difficulty.
 * ```ts
 * save.difficultySync(difficulty);
 * ```
 */
export function difficultySync(
   data: IWrapBeatmap,
   options?: ISaveOptionsDifficulty,
): Record<string, any>;
export function difficultySync(
   data: IWrapBeatmap,
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
