// deno-lint-ignore-file no-explicit-any
import type { BeatmapFileType } from '../../types/beatmap/shared/schema.ts';
import type { IWrapInfo } from '../../types/beatmap/wrapper/info.ts';
import type { IWrapAudio } from '../../types/beatmap/wrapper/audioData.ts';
import type { ILoadOptions } from '../../types/beatmap/options/loader.ts';
import type { IWrapBeatmap } from '../../types/beatmap/wrapper/beatmap.ts';
import logger from '../../logger.ts';
import { implicitVersion, retrieveVersion } from '../shared/version.ts';
import { Info } from '../core/info.ts';
import { AudioData } from '../core/audioData.ts';
import { Lightshow } from '../core/lightshow.ts';
import { Difficulty } from '../core/difficulty.ts';
import { audioDataConvertMap, beatmapConvertMap } from '../converter/verMap.ts';
import { infoConvertMap } from '../converter/verMap.ts';
import { validateJSON } from '../schema/validator/main.ts';

function tag(name: string): string[] {
   return ['loader', name];
}

const defaultOptions: Required<ILoadOptions<any>> = {
   forceConvert: true,
   dataCheck: {},
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
   options?: ILoadOptions<IWrapAudio>,
): IWrapAudio;
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
      dataCheck: {
         ...defaultOptions.dataCheck,
         ...options.dataCheck,
      },
      sort: options.sort ?? defaultOptions.sort,
      preprocess: options.preprocess ?? defaultOptions.preprocess,
      postprocess: options.postprocess ?? defaultOptions.postprocess,
   };
   let coreClass;
   let convertMap;
   switch (type) {
      case 'info':
         coreClass = Info;
         convertMap = infoConvertMap;
         break;
      case 'audioData':
         coreClass = AudioData;
         convertMap = audioDataConvertMap;
         break;
      case 'difficulty':
         coreClass = Difficulty;
         convertMap = beatmapConvertMap;
         break;
      case 'lightshow':
         coreClass = Lightshow;
         convertMap = beatmapConvertMap;
         break;
   }

   opt.preprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('loadBeatmap'),
         'Running preprocess function #' + (i + 1),
      );
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
   const schema = coreClass.schema[jsonVer];
   if (schema) {
      validateJSON(type, json, jsonVer, opt.dataCheck);
      data = coreClass.fromJSON(json, jsonVer);
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
      data = convertMap[targetVer](data, targetVer);
   }

   if (opt.sort) data.sort();

   opt.postprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('loadBeatmap'),
         'Running postprocess function #' + (i + 1),
      );
      data = fn(data);
   });
   return data;
}
