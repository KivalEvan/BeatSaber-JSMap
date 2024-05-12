// deno-lint-ignore-file no-explicit-any
import logger from '../../logger.ts';
import type { BeatmapFileType } from '../../types/beatmap/shared/schema.ts';
import type { ISaveOptions } from '../../types/beatmap/options/saver.ts';
import type { IWrapInfo } from '../../types/beatmap/wrapper/info.ts';
import type { IWrapAudio } from '../../types/beatmap/wrapper/audioData.ts';
import type { IWrapBeatmap } from '../../types/beatmap/wrapper/beatmap.ts';
import type { IWrapBeatmapFile } from '../../types/beatmap/wrapper/baseFile.ts';
import { validateJSON } from '../schema/validator/main.ts';
import type { IOptimizeOptions } from '../../types/beatmap/options/optimize.ts';
import {
   difficultyOptimizeMap,
   infoOptimizeMap,
   lightshowOptimizeMap,
} from '../mapping/optimizer.ts';
import {
   audioDataSchemaMap,
   difficultySchemaMap,
   infoSchemaMap,
   lightshowSchemaMap,
} from '../mapping/schema.ts';

export function tag(name: string): string[] {
   return ['saver', name];
}

const defaultOptions: Required<ISaveOptions> = {
   format: 0,
   optimize: {},
   validate: {},
   sort: true,
   write: true,
   preprocess: [],
   postprocess: [],
};

export function saveBeatmap<
   TSerial extends { [key: string]: any },
   TWrap extends { [key: string]: any },
>(
   type: BeatmapFileType,
   data: IWrapBeatmapFile,
   version: number,
   options?: ISaveOptions<TWrap>,
): TSerial;
export function saveBeatmap<TSerial extends { [key: string]: any }>(
   type: 'info',
   data: IWrapInfo,
   version: number,
   options?: ISaveOptions<IWrapInfo>,
): TSerial;
export function saveBeatmap<TSerial extends { [key: string]: any }>(
   type: 'audioData',
   data: IWrapAudio,
   version: number,
   options?: ISaveOptions<IWrapAudio>,
): TSerial;
export function saveBeatmap<TSerial extends { [key: string]: any }>(
   type: 'lightshow',
   data: IWrapBeatmap,
   version: number,
   options?: ISaveOptions<IWrapBeatmap>,
): TSerial;
export function saveBeatmap<TSerial extends { [key: string]: any }>(
   type: 'difficulty',
   data: IWrapBeatmap,
   version: number,
   options?: ISaveOptions<IWrapBeatmap>,
): TSerial;
export function saveBeatmap<
   TSerial extends { [key: string]: any },
   TWrap extends { [key: string]: any },
>(
   type: BeatmapFileType,
   data: IWrapBeatmapFile,
   version: number,
   options: ISaveOptions<TWrap> = {},
): TSerial {
   const opt: Required<ISaveOptions<any>> = {
      format: options.format ?? defaultOptions.format,
      optimize: { ...defaultOptions.optimize, ...options.optimize },
      validate: { ...defaultOptions.validate, ...options.validate },
      sort: options.sort ?? defaultOptions.sort,
      write: true,
      preprocess: options.preprocess ?? defaultOptions.preprocess,
      postprocess: options.postprocess ?? defaultOptions.postprocess,
   };
   let schemaMap;
   let optMap: Record<number, (data: any, options: IOptimizeOptions) => void> = {};
   switch (type) {
      case 'info':
         optMap = infoOptimizeMap;
         schemaMap = infoSchemaMap;
         break;
      case 'audioData':
         schemaMap = audioDataSchemaMap;
         break;
      case 'difficulty':
         optMap = difficultyOptimizeMap;
         schemaMap = difficultySchemaMap;
         break;
      case 'lightshow':
         optMap = lightshowOptimizeMap;
         schemaMap = lightshowSchemaMap;
         break;
   }

   opt.preprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('saveBeatmap'),
         'Running preprocess function #' + (i + 1),
      );
      data = fn(data);
   });

   if (opt.validate.enabled) {
      logger.tInfo(tag('saveBeatmap'), 'Validating beatmap');
      if (!data.isValid()) {
         logger.tWarn(tag('saveBeatmap'), 'Invalid data detected in beatmap');
      }
   }

   if (opt.sort) {
      logger.tInfo(tag('saveBeatmap'), 'Sorting beatmap objects');
      data.sort();
   }

   let json = schemaMap[version]?.serialize(data as any) ?? {};
   if (opt.optimize.enabled) {
      optMap[version]?.(json, opt.optimize);
   }

   if (opt.validate.enabled) {
      validateJSON(type, json, version, opt.validate?.dataCheck);
   }

   opt.postprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('saveBeatmap'),
         'Running postprocess function #' + (i + 1),
      );
      json = fn(json);
   });

   return json as TSerial;
}
