import { Info as V1Info } from '../beatmap/v1/info.ts';
import { Info as V2Info } from '../beatmap/v2/info.ts';
import { Info as V4Info } from '../beatmap/v4/info.ts';
import { parseInfo as parseV1Info } from '../beatmap/v1/parse.ts';
import { parseInfo as parseV2Info } from '../beatmap/v2/parse.ts';
import { parseInfo as parseV4Info } from '../beatmap/v4/parse.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { ILoadOptionsInfo } from '../types/bsmap/load.ts';
import { resolve } from '../deps.ts';
import { toV1Info } from '../converter/toV1/mod.ts';
import { toV2Info } from '../converter/toV2/mod.ts';
import { toV4Info } from '../converter/toV4/mod.ts';
import { IWrapInfo } from '../types/beatmap/wrapper/info.ts';
import { defaultOptions } from './options.ts';
import { readJSONFile, readJSONFileSync } from '../utils/_fs.ts';

function tag(name: string): string[] {
   return ['load', name];
}

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
   };

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
   switch (jsonVer) {
      case 1: {
         data = parseV1Info(json, opt.dataCheck).setFileName(filePath);
         break;
      }
      case 2: {
         data = parseV2Info(json, opt.dataCheck).setFileName(filePath);
         break;
      }
      case 4: {
         data = parseV4Info(json, opt.dataCheck).setFileName(filePath);
         break;
      }
      default: {
         throw new Error(
            `Info version ${jsonVer} is not supported, this may be an error in JSON or is newer than currently supported.`,
         );
      }
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
      if (targetVer === 1) data = toV1Info(data);
      if (targetVer === 2) data = toV2Info(data);
      if (targetVer === 4) data = toV4Info(data);
   }

   if (opt.sort) data.sort();

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
export function info(version: 4, options?: ILoadOptionsInfo): Promise<V4Info>;
export function info(version: 2, options?: ILoadOptionsInfo): Promise<V2Info>;
export function info(version: 1, options?: ILoadOptionsInfo): Promise<V1Info>;
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
export function infoSync(version: 4, options?: ILoadOptionsInfo): V4Info;
export function infoSync(version: 2, options?: ILoadOptionsInfo): V2Info;
export function infoSync(version: 1, options?: ILoadOptionsInfo): V1Info;
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