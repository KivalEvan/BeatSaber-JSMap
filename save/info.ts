import { ISaveOptionsInfo } from '../types/bsmap/save.ts';
import * as optimize from '../optimize.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { deepCheck } from '../beatmap/shared/dataCheck.ts';
import { InfoCheck as V1InfoCheck } from '../beatmap/v1/dataCheck.ts';
import { InfoCheck as V2InfoCheck } from '../beatmap/v2/dataCheck.ts';
import { InfoCheck as V4InfoCheck } from '../beatmap/v4/dataCheck.ts';
import { IWrapInfo } from '../types/beatmap/wrapper/info.ts';
import { resolve } from '../deps.ts';
import { writeJSONFile, writeJSONFileSync } from '../utils/_fs.ts';
import { defaultOptions } from './options.ts';

function tag(name: string): string[] {
   return ['save', name];
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
      const dataCheck = ver === 4
         ? V4InfoCheck
         : ver === 2
         ? V2InfoCheck
         : ver === 1
         ? V1InfoCheck
         : {};
      deepCheck(
         json,
         dataCheck,
         'info',
         data.version,
         opt.dataCheck.throwError,
      );
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
   return writeJSONFile(
      _info(data, options),
      resolve(
         options.directory ??
            (globals.directory || defaultOptions.info.directory),
         options.filePath ??
            (data.filename || defaultOptions.info.filePath || 'Info.dat'),
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
   writeJSONFileSync(
      _info(data, options),
      resolve(
         options.directory ??
            (globals.directory || defaultOptions.info.directory),
         options.filePath ??
            (data.filename || defaultOptions.info.filePath || 'Info.dat'),
      ),
      options.format,
   );
}
