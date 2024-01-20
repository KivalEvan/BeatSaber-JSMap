import { ISaveOptionsLightshow } from '../types/bsmap/save.ts';
import * as optimize from '../optimize.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { deepCheck } from '../beatmap/shared/dataCheck.ts';
import { LightshowCheck as V3LightshowCheck } from '../beatmap/v3/dataCheck.ts';
import { LightshowCheck as V4LightshowCheck } from '../beatmap/v4/dataCheck.ts';
import { IWrapLightshow } from '../types/beatmap/wrapper/lightshow.ts';
import { resolve } from '../deps.ts';
import { writeJSONFile, writeJSONFileSync } from '../utils/_fs.ts';
import { defaultOptions } from './options.ts';

function tag(name: string): string[] {
   return ['save', name];
}

function _lightshow(data: IWrapLightshow, options: ISaveOptionsLightshow) {
   const opt: Required<ISaveOptionsLightshow> = {
      directory: '',
      filePath: '',
      format: options.format ?? defaultOptions.lightshow.format,
      optimize: options.optimize ?? defaultOptions.lightshow.optimize,
      validate: options.validate ?? defaultOptions.lightshow.validate,
      dataCheck: options.dataCheck ?? defaultOptions.lightshow.dataCheck,
      sort: options.sort ?? defaultOptions.lightshow.sort,
   };
   if (opt.validate.enabled) {
      logger.tInfo(tag('_lightshow'), 'Validating beatmap');
      if (!data.isValid()) {
         logger.tWarn(tag('_lightshow'), 'Invalid data detected in beatmap');
         if (opt.validate.reparse) {
            data.reparse();
         } else {
            throw new Error('Preventing save of beatmap');
         }
      }
   }

   if (opt.sort) {
      logger.tInfo(tag('_lightshow'), 'Sorting beatmap objects');
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
      optimize.lightshow(json, ver, opt.optimize);
   }

   if (opt.dataCheck.enabled) {
      logger.tInfo(tag('_lightshow'), 'Checking lightshow data value');
      const dataCheck = ver === 4 ? V4LightshowCheck : ver === 3 ? V3LightshowCheck : {};
      deepCheck(
         json,
         dataCheck,
         'lightshow',
         data.version,
         opt.dataCheck.throwError,
      );
   }

   return json;
}

/**
 * Asynchronously save beatmap lightshow.
 * ```ts
 * await save.lightshow(lightshow);
 * ```
 */
export function lightshow(
   data: IWrapLightshow,
   options: ISaveOptionsLightshow = {},
) {
   logger.tInfo(tag('lightshow'), 'Async saving lightshow');
   return writeJSONFile(
      _lightshow(data, options),
      resolve(
         options.directory ??
            (globals.directory || defaultOptions.lightshow.directory),
         options.filePath ??
            (data.filename ||
               defaultOptions.lightshow.filePath ||
               'UnnamedLightshow.dat'),
      ),
      options.format,
   );
}

/**
 * Synchronously save beatmap lightshow.
 * ```ts
 * save.lightshowSync(lightshow);
 * ```
 */
export function lightshowSync(
   data: IWrapLightshow,
   options: ISaveOptionsLightshow = {},
) {
   logger.tInfo(tag('lightshowSync'), 'Sync saving lightshow');
   writeJSONFileSync(
      _lightshow(data, options),
      resolve(
         options.directory ??
            (globals.directory || defaultOptions.lightshow.directory),
         options.filePath ??
            (data.filename ||
               defaultOptions.lightshow.filePath ||
               'UnnamedLightshow.dat'),
      ),
      options.format,
   );
}
