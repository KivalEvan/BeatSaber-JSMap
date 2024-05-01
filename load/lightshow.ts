// deno-lint-ignore-file no-explicit-any
import type { GenericFilename } from '../types/beatmap/shared/filename.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import type { LooseAutocomplete } from '../types/utils.ts';
import type { ILoadOptionsLightshow } from '../types/bsmap/load.ts';
import { resolve } from '../deps.ts';
import { toV3Lightshow } from '../converter/toV3/lightshow.ts';
import { toV4Lightshow } from '../converter/toV4/lightshow.ts';
import type { IWrapLightshow } from '../types/beatmap/wrapper/lightshow.ts';
import { readJSONFile, readJSONFileSync } from '../utils/_fs.ts';
import { defaultOptions } from './options.ts';

function tag(name: string): string[] {
   return ['load', name];
}

const parseMap: Record<number, any> = {
   3: parseV3Lightshow,
   4: parseV4Lightshow,
} as const;
const convertMap: Record<number, any> = {
   3: toV3Lightshow,
   4: toV4Lightshow,
} as const;

function _lightshow(
   json: Record<string, unknown>,
   filePath: string,
   targetVer: number | null | undefined,
   options: ILoadOptionsLightshow,
): IWrapLightshow {
   const opt: Required<ILoadOptionsLightshow> = {
      directory: '',
      forceConvert: options.forceConvert ?? defaultOptions.lightshow.forceConvert,
      dataCheck: {
         ...defaultOptions.lightshow.dataCheck,
         ...options.dataCheck,
      },
      sort: options.sort ?? defaultOptions.lightshow.sort,
      preprocess: options.preprocess ?? defaultOptions.lightshow.preprocess,
      postprocess: options.postprocess ?? defaultOptions.lightshow.postprocess,
   };
   opt.preprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_lightshow'),
         'Running preprocess function #' + (i + 1),
      );
      json = fn(json);
   });

   const jsonVerStr = typeof json._version === 'string'
      ? json._version.at(0)
      : typeof json.version === 'string'
      ? json.version.at(0)
      : null;
   let jsonVer: number;
   if (jsonVerStr) {
      jsonVer = parseInt(jsonVerStr);
   } else {
      logger.tWarn(
         tag('_lightshow'),
         'Could not identify beatmap version from JSON, assume implicit version',
         3,
      );
      jsonVer = 3;
   }

   let data: IWrapLightshow;
   const parser = parseMap[jsonVer];
   if (parser) data = parser(json, opt.dataCheck).setFilename(filePath);
   else {
      throw new Error(
         `Beatmap version ${jsonVer} is not supported, this may be an error in JSON or is newer than currently supported.`,
      );
   }

   if (targetVer && jsonVer !== targetVer) {
      if (!opt.forceConvert) {
         throw new Error(
            `Beatmap version unmatched, expected ${targetVer} but received ${jsonVer}`,
         );
      }
      logger.tWarn(
         tag('_lightshow'),
         'Beatmap version unmatched, expected',
         targetVer,
         'but received',
         jsonVer,
         'for version; Converting to beatmap version',
         targetVer,
      );
      data = convertMap[targetVer](data);
   }

   if (opt.sort) data.sort();

   opt.postprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_lightshow'),
         'Running postprocess function #' + (i + 1),
      );
      data = fn(data);
   });
   return data;
}

/**
 * Asynchronously load beatmap lightshow file.
 * ```ts
 * load.lightshow('EasyStandard.dat', 4).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function lightshow(
   filePath: LooseAutocomplete<GenericFilename>,
   version?: null,
   options?: ILoadOptionsLightshow,
): Promise<IWrapLightshow>;
export function lightshow(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 4,
   options?: ILoadOptionsLightshow,
): Promise<V4Lightshow>;
export function lightshow(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 3,
   options?: ILoadOptionsLightshow,
): Promise<V3Lightshow>;
export function lightshow(
   filePath: Record<string, unknown>,
   version?: null,
   options?: ILoadOptionsLightshow,
): Promise<IWrapLightshow>;
export function lightshow(
   filePath: Record<string, unknown>,
   version: 4,
   options?: ILoadOptionsLightshow,
): Promise<V4Lightshow>;
export function lightshow(
   filePath: Record<string, unknown>,
   version: 3,
   options?: ILoadOptionsLightshow,
): Promise<V3Lightshow>;
export function lightshow(
   src: LooseAutocomplete<GenericFilename> | Record<string, unknown>,
   version?: number | null,
   options: ILoadOptionsLightshow = {},
) {
   logger.tInfo(tag('lightshow'), 'Async loading lightshow');
   if (typeof src === 'string') {
      const path = resolve(
         options.directory ??
            (defaultOptions.lightshow.directory || globals.directory),
         src,
      );
      return readJSONFile(path).then((data) => _lightshow(data, src, version!, options));
   } else {
      return new Promise<IWrapLightshow>((resolve) =>
         resolve(_lightshow(src, 'LoadJSON.dat', version!, options))
      );
   }
}

/**
 * Synchronously load beatmap lightshow file.
 * ```ts
 * const lightshow = load.lightshowSync('EasyStandard.dat', 4);
 * console.log(lightshow);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function lightshowSync(
   filePath: LooseAutocomplete<GenericFilename>,
   version?: null,
   options?: ILoadOptionsLightshow,
): IWrapLightshow;
export function lightshowSync(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 4,
   options?: ILoadOptionsLightshow,
): V4Lightshow;
export function lightshowSync(
   filePath: LooseAutocomplete<GenericFilename>,
   version: 3,
   options?: ILoadOptionsLightshow,
): V3Lightshow;
export function lightshowSync(
   json: Record<string, unknown>,
   version?: null,
   options?: ILoadOptionsLightshow,
): IWrapLightshow;
export function lightshowSync(
   json: Record<string, unknown>,
   version: 4,
   options?: ILoadOptionsLightshow,
): V4Lightshow;
export function lightshowSync(
   json: Record<string, unknown>,
   version: 3,
   options?: ILoadOptionsLightshow,
): V3Lightshow;
export function lightshowSync(
   src: LooseAutocomplete<GenericFilename> | Record<string, unknown>,
   version?: number | null,
   options: ILoadOptionsLightshow = {},
) {
   logger.tInfo(tag('lightshowSync'), 'Sync loading lightshow');
   if (typeof src === 'string') {
      const path = resolve(
         options.directory ??
            (defaultOptions.lightshow.directory || globals.directory),
         src,
      );
      return _lightshow(readJSONFileSync(path), src, version!, options);
   } else {
      return _lightshow(src, 'LoadJSON.dat', version!, options);
   }
}
