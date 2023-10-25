import {
   ISaveOptionsDifficulty,
   ISaveOptionsDifficultyList,
   ISaveOptionsInfo,
} from './types/bsmap/save.ts';
import { ILoadInfoData } from './types/bsmap/infoDiff.ts';
import * as optimize from './optimize.ts';
import globals from './globals.ts';
import logger from './logger.ts';
import { deepCheck } from './beatmap/shared/dataCheck.ts';
import {
   DifficultyCheck as V1DifficultyCheck,
   InfoCheck as V1InfoCheck,
} from './beatmap/v1/dataCheck.ts';
import {
   DifficultyCheck as V2DifficultyCheck,
   InfoCheck as V2InfoCheck,
} from './beatmap/v2/dataCheck.ts';
import { DifficultyCheck as V3DifficultyCheck } from './beatmap/v3/dataCheck.ts';
import { IWrapInfo } from './types/beatmap/wrapper/info.ts';
import { IWrapDifficulty } from './types/beatmap/wrapper/difficulty.ts';
import { resolve } from './deps.ts';

function tag(name: string): string[] {
   return ['save', name];
}

const optionsInfo: Required<ISaveOptionsInfo> = {
   directory: '',
   filePath: 'Info.dat',
   format: 0,
   optimize: {
      enabled: true,
      floatTrim: 4,
      stringTrim: true,
      purgeZeros: true,
      throwError: true,
   },
   validate: { enabled: true, reparse: true },
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
};

const optionsDifficulty: Required<ISaveOptionsDifficulty> = {
   directory: '',
   filePath: 'UnnamedPath.dat',
   format: 0,
   optimize: {
      enabled: true,
      floatTrim: 4,
      stringTrim: true,
      purgeZeros: true,
      throwError: true,
   },
   validate: { enabled: true, reparse: true },
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
};

const optionsDifficultyList: Required<ISaveOptionsDifficultyList> = {
   directory: '',
   format: 0,
   optimize: { enabled: true },
   validate: { enabled: true, reparse: true },
   dataCheck: {
      enabled: true,
      throwError: true,
   },
   sort: true,
};

/** Set default option value for save function. */
export const defaultOptions = {
   info: optionsInfo,
   difficulty: optionsDifficulty,
   difficultyList: optionsDifficultyList,
};

function _writeJSONFile(data: Record<string, unknown>, path: string, format?: number) {
   logger.tInfo(tag('_writeJSONFile'), `Async writing JSON file to ${path}`);
   return Deno.writeTextFile(path, JSON.stringify(data, null, format));
}

function _writeJSONFileSync(data: Record<string, unknown>, path: string, format?: number) {
   logger.tInfo(tag('_writeJSONFileSync'), `Sync writing JSON file to ${path}`);
   Deno.writeTextFileSync(path, JSON.stringify(data, null, format));
}

function _info(data: IWrapInfo, options: ISaveOptionsInfo) {
   const opt: Required<ISaveOptionsInfo> = {
      directory: '',
      filePath: '',
      format: options.format ?? defaultOptions.info.format,
      optimize: options.optimize ?? defaultOptions.info.optimize,
      validate: options.validate ?? defaultOptions.info.validate,
      dataCheck: options.dataCheck ?? defaultOptions.info.dataCheck,
      sort: options.sort ?? defaultOptions.info.sort,
   };

   if (opt.sort) {
      logger.tInfo(tag('_info'), 'Sorting beatmap objects');
      data.sort();
   }

   const ver = parseInt(data.version.at(0) || '0');
   const json = data.toJSON();

   if (opt.optimize.enabled) {
      optimize.info(json, ver, opt.optimize);
   }

   if (opt.dataCheck.enabled) {
      logger.tInfo(tag('_info'), 'Checking info data value');
      const dataCheck = ver === 2 ? V2InfoCheck : ver === 1 ? V1InfoCheck : {};
      deepCheck(json, dataCheck, 'info', data.version, opt.dataCheck.throwError);
   }

   return json;
}

/**
 * Asynchronously save beatmap info.
 * ```ts
 * await save.info(info);
 * ```
 */
export function info(data: IWrapInfo, options: ISaveOptionsInfo = {}) {
   logger.tInfo(tag('info'), 'Async saving info');
   return _writeJSONFile(
      _info(data, options),
      resolve(
         options.directory ?? (globals.directory || defaultOptions.info.directory),
         options.filePath ?? (data.filename || defaultOptions.info.filePath || 'Info.dat'),
      ),
      options.format,
   );
}

/**
 * Synchronously save beatmap info.
 * ```ts
 * save.infoSync(info);
 * ```
 */
export function infoSync(data: IWrapInfo, options: ISaveOptionsInfo = {}) {
   logger.tInfo(tag('infoSync'), 'Sync saving info');
   _writeJSONFileSync(
      _info(data, options),
      resolve(
         options.directory ?? (globals.directory || defaultOptions.info.directory),
         options.filePath ?? (data.filename || defaultOptions.info.filePath || 'Info.dat'),
      ),
      options.format,
   );
}

function _difficulty(data: IWrapDifficulty, options: ISaveOptionsDifficulty) {
   const opt: Required<ISaveOptionsDifficulty> = {
      directory: '',
      filePath: '',
      format: options.format ?? defaultOptions.difficulty.format,
      optimize: options.optimize ?? defaultOptions.difficulty.optimize,
      validate: options.validate ?? defaultOptions.difficulty.validate,
      dataCheck: options.dataCheck ?? defaultOptions.difficulty.dataCheck,
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
      const dataCheck = ver === 3
         ? V3DifficultyCheck
         : ver === 2
         ? V2DifficultyCheck
         : ver === 1
         ? V1DifficultyCheck
         : {};
      deepCheck(json, dataCheck, 'difficulty', data.version, opt.dataCheck.throwError);
   }

   return json;
}

/**
 * Asynchronously save beatmap difficulty.
 * ```ts
 * await save.difficulty(difficulty);
 * ```
 */
export function difficulty(data: IWrapDifficulty, options: ISaveOptionsDifficulty = {}) {
   logger.tInfo(tag('difficulty'), 'Async saving difficulty');
   return _writeJSONFile(
      _difficulty(data, options),
      resolve(
         options.directory ?? (globals.directory || defaultOptions.difficulty.directory),
         options.filePath ??
            (data.filename || defaultOptions.difficulty.filePath || 'UnnamedDifficulty.dat'),
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
export function difficultySync(data: IWrapDifficulty, options: ISaveOptionsDifficulty = {}) {
   logger.tInfo(tag('difficultySync'), 'Sync saving difficulty');
   _writeJSONFileSync(
      _difficulty(data, options),
      resolve(
         options.directory ?? (globals.directory || defaultOptions.difficulty.directory),
         options.filePath ??
            (data.filename || defaultOptions.difficulty.filePath || 'UnnamedDifficulty.dat'),
      ),
      options.format,
   );
}

/**
 * Asynchronously save multiple beatmap difficulties.
 * ```ts
 * await save.difficultyList(difficulties);
 * ```
 */
export function difficultyList(
   difficulties: ILoadInfoData[],
   options: ISaveOptionsDifficultyList = {},
) {
   logger.tInfo(tag('difficultyList'), 'Async saving list of difficulty');
   return Promise.allSettled(
      difficulties.map(async (dl) => {
         await _writeJSONFile(
            _difficulty(dl.data, options),
            resolve(
               options.directory ?? (globals.directory || defaultOptions.difficulty.directory),
               dl.settings.filename ||
                  dl.data.filename ||
                  defaultOptions.difficulty.filePath ||
                  'UnnamedDifficulty.dat',
            ),
            options.format,
         );
      }),
   );
}

/**
 * Synchronously save multiple beatmap difficulties.
 * ```ts
 * save.difficultyList(difficulties);
 * ```
 */
export function difficultyListSync(
   difficulties: ILoadInfoData[],
   options: ISaveOptionsDifficultyList = {},
) {
   logger.tInfo(tag('difficultyListSync'), 'Sync saving list of difficulty');
   for (const dl of difficulties) {
      _writeJSONFileSync(
         _difficulty(dl.data, options),
         resolve(
            options.directory ?? (globals.directory || defaultOptions.difficulty.directory),
            dl.settings.filename ||
               dl.data.filename ||
               defaultOptions.difficulty.filePath ||
               'UnnamedDifficulty.dat',
         ),
         options.format,
      );
   }
}
