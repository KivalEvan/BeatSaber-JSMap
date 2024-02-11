import { ISaveOptionsLightshow } from '../types/bsmap/save.ts';
import * as optimize from '../optimize.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { deepCheck } from '../beatmap/shared/dataCheck.ts';
import { LightshowDataCheck as V3LightshowCheck } from '../beatmap/v3/dataCheck.ts';
import { LightshowDataCheck as V4LightshowCheck } from '../beatmap/v4/dataCheck.ts';
import { Lightshow as V3Lightshow } from '../beatmap/v3/lightshow.ts';
import { Lightshow as V4Lightshow } from '../beatmap/v4/lightshow.ts';
import { ILightshow as IV3Lightshow } from '../types/beatmap/v3/lightshow.ts';
import { ILightshow as IV4Lightshow } from '../types/beatmap/v4/lightshow.ts';
import { IWrapLightshow } from '../types/beatmap/wrapper/lightshow.ts';
import { resolve } from '../deps.ts';
import { writeJSONFile, writeJSONFileSync } from '../utils/_fs.ts';
import { defaultOptions } from './options.ts';
import { DataCheck } from '../types/beatmap/shared/dataCheck.ts';

function tag(name: string): string[] {
   return ['save', name];
}

const dataCheckMap: Record<number, Record<string, DataCheck>> = {
   3: V3LightshowCheck,
   4: V4LightshowCheck,
};

function _lightshow(data: IWrapLightshow, options: ISaveOptionsLightshow) {
   const opt: Required<ISaveOptionsLightshow> = {
      directory: '',
      filePath: '',
      format: options.format ?? defaultOptions.lightshow.format,
      optimize: { ...defaultOptions.lightshow.optimize, ...options.optimize },
      validate: { ...defaultOptions.lightshow.validate, ...options.validate },
      dataCheck: {
         ...defaultOptions.lightshow.dataCheck,
         ...options.dataCheck,
      },
      sort: options.sort ?? defaultOptions.lightshow.sort,
      write: true,
      preprocess: options.preprocess ?? defaultOptions.lightshow.preprocess,
      postprocess: options.postprocess ?? defaultOptions.lightshow.postprocess,
   };
   opt.preprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_lightshow'),
         'Running preprocess function #' + (i + 1),
      );
      data = fn(data);
   });

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
   let json = data.toJSON();

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
      const dataCheck = dataCheckMap[ver] ?? {};
      deepCheck(
         json,
         dataCheck,
         'lightshow',
         data.version,
         opt.dataCheck.throwError,
      );
   }

   opt.postprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_lightshow'),
         'Running postprocess function #' + (i + 1),
      );
      json = fn(json);
   });
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
   options?: ISaveOptionsLightshow,
   // deno-lint-ignore no-explicit-any
): Promise<Record<string, any>>;
export function lightshow(
   data: V3Lightshow,
   options?: ISaveOptionsLightshow,
): Promise<IV3Lightshow>;
export function lightshow(
   data: V4Lightshow,
   options?: ISaveOptionsLightshow,
): Promise<IV4Lightshow>;
export function lightshow(
   data: IWrapLightshow,
   options: ISaveOptionsLightshow = {},
) {
   logger.tInfo(tag('lightshow'), 'Async saving lightshow');
   const json = _lightshow(data, options);
   if (options.write ?? defaultOptions.difficulty.write) {
      return writeJSONFile(
         json,
         resolve(
            options.directory ??
               (globals.directory || defaultOptions.lightshow.directory),
            options.filePath ??
               (data.filename ||
                  defaultOptions.lightshow.filePath ||
                  'UnnamedLightshow.dat'),
         ),
         options.format,
      ).then(() => json);
   }
   return new Promise<typeof json>((resolve) => resolve(json));
}

/**
 * Synchronously save beatmap lightshow.
 * ```ts
 * save.lightshowSync(lightshow);
 * ```
 */
export function lightshowSync(
   data: IWrapLightshow,
   options?: ISaveOptionsLightshow,
   // deno-lint-ignore no-explicit-any
): Record<string, any>;
export function lightshowSync(
   data: V3Lightshow,
   options?: ISaveOptionsLightshow,
): IV3Lightshow;
export function lightshowSync(
   data: V4Lightshow,
   options?: ISaveOptionsLightshow,
): IV4Lightshow;
export function lightshowSync(
   data: IWrapLightshow,
   options: ISaveOptionsLightshow = {},
) {
   logger.tInfo(tag('lightshowSync'), 'Sync saving lightshow');
   const json = _lightshow(data, options);
   if (options.write ?? defaultOptions.difficulty.write) {
      writeJSONFileSync(
         json,
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
   return json;
}
