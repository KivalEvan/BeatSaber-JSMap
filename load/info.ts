// deno-lint-ignore-file no-explicit-any
import globals from '../globals.ts';
import logger from '../logger.ts';
import type { ILoadOptionsInfo } from '../types/bsmap/load.ts';
import { resolve } from '../deps.ts';
import { toV1Info } from '../converter/toV1/info.ts';
import { toV2Info } from '../converter/toV2/info.ts';
import { toV4Info } from '../converter/toV4/info.ts';
import type { IWrapInfo } from '../types/beatmap/wrapper/info.ts';
import { defaultOptions } from './options.ts';
import { readJSONFile, readJSONFileSync } from '../utils/_fs.ts';

function tag(name: string): string[] {
   return ['load', name];
}

const parseMap: Record<number, any> = {
   1: parseV1Info,
   2: parseV2Info,
   4: parseV4Info,
} as const;
const convertMap: Record<number, any> = {
   1: toV1Info,
   2: toV2Info,
   4: toV4Info,
} as const;

function _info(
   json: Record<string, unknown>,
   filePath: string,
   targetVer: number | null | undefined,
   options: ILoadOptionsInfo,
) {
   const opt: Required<ILoadOptionsInfo> = {
      filePath: '',
      directory: '',
      forceConvert: options.forceConvert ?? defaultOptions.info.forceConvert,
      dataCheck: {
         ...defaultOptions.info.dataCheck,
         ...options.dataCheck,
      },
      sort: options.sort ?? defaultOptions.info.sort,
      preprocess: options.preprocess ?? defaultOptions.info.preprocess,
      postprocess: options.postprocess ?? defaultOptions.info.postprocess,
   };
   opt.preprocess.forEach((fn, i) => {
      logger.tInfo(tag('_info'), 'Running preprocess function #' + (i + 1));
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
      jsonVer = json.songName ? 1 : 2;
      logger.tWarn(
         tag('_info'),
         'Could not identify info version from JSON, assume implicit version',
         jsonVer,
      );
   }

   let data: IWrapInfo;
   const parser = parseMap[jsonVer];
   if (parser) data = parser(json, opt.dataCheck).setFilename(filePath);
   else {
      throw new Error(
         `Info version ${jsonVer} is not supported, this may be an error in JSON or is newer than currently supported.`,
      );
   }

   if (targetVer && jsonVer !== targetVer) {
      if (!opt.forceConvert) {
         throw new Error(
            `Info version unmatched, expected ${targetVer} but received ${jsonVer}`,
         );
      }
      logger.tWarn(
         tag('_info'),
         'Info version unmatched, expected',
         targetVer,
         'but received',
         jsonVer,
         'for version; Converting to info version',
         targetVer,
      );
      data = convertMap[targetVer](data);
   }

   if (opt.sort) data.sort();

   opt.postprocess.forEach((fn, i) => {
      logger.tInfo(tag('_info'), 'Running postprocess function #' + (i + 1));
      data = fn(data);
   });
   return data;
}

/**
 * Asynchronously load beatmap info file.
 * ```ts
 * load.info(4).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function info(
   version?: null,
   options?: ILoadOptionsInfo,
): Promise<IWrapInfo>;
export function info(version?: number | null, options: ILoadOptionsInfo = {}) {
   logger.tInfo(tag('info'), 'Async loading info');
   const filePath = options.filePath ?? defaultOptions.info.filePath;
   const path = resolve(
      options.directory ?? (defaultOptions.info.directory || globals.directory),
      options.filePath ?? defaultOptions.info.filePath,
   );
   return readJSONFile(path).then((data) => _info(data, filePath, version, options));
}

/**
 * Synchronously load beatmap info file.
 * ```ts
 * const info = load.infoSync(4);
 * console.log(info);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function infoSync(version?: null, options?: ILoadOptionsInfo): IWrapInfo;
export function infoSync(
   version?: number | null,
   options: ILoadOptionsInfo = {},
) {
   logger.tInfo(tag('infoSync'), 'Sync loading info');
   const filePath = options.filePath ?? defaultOptions.info.filePath;
   const path = resolve(
      options.directory ?? (defaultOptions.info.directory || globals.directory),
      options.filePath ?? defaultOptions.info.filePath,
   );
   return _info(readJSONFileSync(path), filePath, version, options);
}
