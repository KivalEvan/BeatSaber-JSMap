import { ISaveOptionsInfo } from '../types/bsmap/save.ts';
import * as optimize from '../optimize.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { deepCheck } from '../beatmap/shared/dataCheck.ts';
import { InfoDataCheck as V1InfoCheck } from '../beatmap/v1/dataCheck.ts';
import { InfoDataCheck as V2InfoCheck } from '../beatmap/v2/dataCheck.ts';
import { InfoDataCheck as V4InfoCheck } from '../beatmap/v4/dataCheck.ts';
import { Info as V1Info } from '../beatmap/v1/info.ts';
import { Info as V2Info } from '../beatmap/v2/info.ts';
import { Info as V4Info } from '../beatmap/v4/info.ts';
import { IInfo as IV1Info } from '../types/beatmap/v1/info.ts';
import { IInfo as IV2Info } from '../types/beatmap/v2/info.ts';
import { IInfo as IV4Info } from '../types/beatmap/v4/info.ts';
import { IWrapInfo } from '../types/beatmap/wrapper/info.ts';
import { resolve } from '../deps.ts';
import { writeJSONFile, writeJSONFileSync } from '../utils/_fs.ts';
import { defaultOptions } from './options.ts';
import { DataCheck } from '../types/beatmap/shared/dataCheck.ts';

function tag(name: string): string[] {
   return ['save', name];
}

const dataCheckList: Record<number, Record<string, DataCheck>> = {
   1: V1InfoCheck,
   2: V2InfoCheck,
   4: V4InfoCheck,
};

function _info(data: IWrapInfo, options: ISaveOptionsInfo) {
   const opt: Required<ISaveOptionsInfo> = {
      directory: '',
      filePath: '',
      format: options.format ?? defaultOptions.info.format,
      optimize: { ...defaultOptions.info.optimize, ...options.optimize },
      validate: { ...defaultOptions.info.validate, ...options.validate },
      dataCheck: {
         ...defaultOptions.info.dataCheck,
         ...options.dataCheck,
      },
      sort: options.sort ?? defaultOptions.info.sort,
      write: true,
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
      const dataCheck = dataCheckList[ver] ?? {};
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
export function info(
   data: IWrapInfo,
   options?: ISaveOptionsInfo,
   // deno-lint-ignore no-explicit-any
): Promise<Record<string, any>>;
export function info(data: V1Info, options?: ISaveOptionsInfo): Promise<IV1Info>;
export function info(data: V2Info, options?: ISaveOptionsInfo): Promise<IV2Info>;
export function info(data: V4Info, options?: ISaveOptionsInfo): Promise<IV4Info>;
export function info(data: IWrapInfo, options: ISaveOptionsInfo = {}) {
   logger.tInfo(tag('info'), 'Async saving info');
   const json = _info(data, options);
   if (options.write ?? defaultOptions.info.write) {
      return writeJSONFile(
         json,
         resolve(
            options.directory ??
               (globals.directory || defaultOptions.info.directory),
            options.filePath ??
               (data.filename || defaultOptions.info.filePath || 'Info.dat'),
         ),
         options.format,
      );
   }
   return new Promise(() => json);
}

/**
 * Synchronously save beatmap info.
 * ```ts
 * save.infoSync(info);
 * ```
 */
export function infoSync(
   data: IWrapInfo,
   options?: ISaveOptionsInfo,
   // deno-lint-ignore no-explicit-any
): Record<string, any>;
export function infoSync(data: V1Info, options?: ISaveOptionsInfo): IV1Info;
export function infoSync(data: V2Info, options?: ISaveOptionsInfo): IV2Info;
export function infoSync(data: V4Info, options?: ISaveOptionsInfo): IV4Info;
export function infoSync(data: IWrapInfo, options: ISaveOptionsInfo = {}) {
   logger.tInfo(tag('infoSync'), 'Sync saving info');
   const json = _info(data, options);
   if (options.write ?? defaultOptions.info.write) {
      writeJSONFileSync(
         json,
         resolve(
            options.directory ??
               (globals.directory || defaultOptions.info.directory),
            options.filePath ??
               (data.filename || defaultOptions.info.filePath || 'Info.dat'),
         ),
         options.format,
      );
   }
   return json;
}
