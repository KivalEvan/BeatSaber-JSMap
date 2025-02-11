// deno-lint-ignore-file no-explicit-any
import { logger } from '../../logger.ts';
import type { ILoadOptions } from '../../types/beatmap/options/loader.ts';
import type { BeatmapFileType } from '../../types/beatmap/shared/schema.ts';
import type { IWrapAudioData } from '../../types/beatmap/wrapper/audioData.ts';
import type { IWrapBeatmap } from '../../types/beatmap/wrapper/beatmap.ts';
import type { IWrapInfo } from '../../types/beatmap/wrapper/info.ts';
import { AudioData } from '../core/audioData.ts';
import { Beatmap } from '../core/beatmap.ts';
import { Info } from '../core/info.ts';
import { implicitVersion, retrieveVersion } from '../helpers/version.ts';
import { audioDataConvertMap, beatmapConvertMap, infoConvertMap } from '../mapping/converter.ts';
import {
   audioDataSchemaMap,
   difficultySchemaMap,
   infoSchemaMap,
   lightshowSchemaMap,
} from '../mapping/schema.ts';
import { validateJSON } from '../validator/json.ts';

export function tag(name: string): string[] {
   return ['loader', name];
}

const defaultOptions: Required<ILoadOptions<any>> = {
   forceConvert: true,
   schemaCheck: {},
   sort: true,
   preprocess: [],
   postprocess: [],
};

export function loadBeatmap<T extends Record<string, any>>(
   type: BeatmapFileType,
   json: Record<string, unknown>,
   targetVer?: number | null,
   options?: ILoadOptions<T>,
): T;
export function loadBeatmap(
   type: 'info',
   json: Record<string, unknown>,
   targetVer?: number | null,
   options?: ILoadOptions<IWrapInfo>,
): IWrapInfo;
export function loadBeatmap(
   type: 'audioData',
   json: Record<string, unknown>,
   targetVer?: number | null,
   options?: ILoadOptions<IWrapAudioData>,
): IWrapAudioData;
export function loadBeatmap(
   type: 'lightshow',
   json: Record<string, unknown>,
   targetVer?: number | null,
   options?: ILoadOptions<IWrapBeatmap>,
): IWrapBeatmap;
export function loadBeatmap(
   type: 'difficulty',
   json: Record<string, unknown>,
   targetVer?: number | null,
   options?: ILoadOptions<IWrapBeatmap>,
): IWrapBeatmap;
export function loadBeatmap<T extends Record<string, any>>(
   type: BeatmapFileType,
   json: Record<string, unknown>,
   targetVer?: number | null,
   options: ILoadOptions<any> = {},
): T {
   const opt: Required<ILoadOptions> = {
      forceConvert: options.forceConvert ?? defaultOptions.forceConvert,
      schemaCheck: {
         ...defaultOptions.schemaCheck,
         ...options.schemaCheck,
      },
      sort: options.sort ?? defaultOptions.sort,
      preprocess: options.preprocess ?? defaultOptions.preprocess,
      postprocess: options.postprocess ?? defaultOptions.postprocess,
   };
   let coreClass;
   let schemaMap;
   let convertMap;
   switch (type) {
      case 'info':
         coreClass = Info;
         schemaMap = infoSchemaMap;
         convertMap = infoConvertMap;
         break;
      case 'audioData':
         coreClass = AudioData;
         schemaMap = audioDataSchemaMap;
         convertMap = audioDataConvertMap;
         break;
      case 'difficulty':
         coreClass = Beatmap;
         schemaMap = difficultySchemaMap;
         convertMap = beatmapConvertMap;
         break;
      case 'lightshow':
         coreClass = Beatmap;
         schemaMap = lightshowSchemaMap;
         convertMap = beatmapConvertMap;
         break;
   }

   opt.preprocess.forEach((fn, i) => {
      logger.tInfo(tag('loadBeatmap'), 'Running preprocess function #' + (i + 1));
      json = fn(json);
   });

   const jsonVerStr = retrieveVersion(json)?.at(0);
   let jsonVer: number;
   if (jsonVerStr) {
      jsonVer = parseInt(jsonVerStr);
   } else {
      jsonVer = +implicitVersion(type).at(0)!;
      logger.tWarn(
         tag('loadBeatmap'),
         'Could not identify beatmap version from JSON, assume implicit version',
         jsonVer,
      );
   }

   let data: any;
   const schema = schemaMap[jsonVer];
   if (schema) {
      if (opt.schemaCheck.enabled) validateJSON(type, json, jsonVer, opt.schemaCheck);
      data = new coreClass(schema.deserialize(json));
   } else {
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
         tag('loadBeatmap'),
         'Beatmap version unmatched, expected',
         targetVer,
         'but received',
         jsonVer,
         'for version; Converting to beatmap version',
         targetVer,
      );
      data = convertMap[targetVer](data, data.version);
   }

   if (opt.sort && 'sort' in data && typeof data.sort === 'function') {
      data.sort();
   }

   opt.postprocess.forEach((fn, i) => {
      logger.tInfo(tag('loadBeatmap'), 'Running postprocess function #' + (i + 1));
      data = fn(data);
   });
   return data;
}
