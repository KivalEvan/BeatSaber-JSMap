import { defaultOptions } from './options.ts';
import type { BeatmapFileType } from '../../types/beatmap/shared/schema.ts';
import type { IWrapInfo } from '../../types/beatmap/wrapper/info.ts';
import type { IWrapAudio } from '../../types/beatmap/wrapper/audioData.ts';
import type { ILoadOptions } from '../../types/beatmap/options/loader.ts';
import type { IWrapBeatmap } from '../../types/beatmap/wrapper/beatmap.ts';
import logger from '../../logger.ts';

function tag(name: string): string[] {
   return ['loader', name];
}

export function loadBeatmap(
   type: BeatmapFileType,
   json: Record<string, unknown>,
   targetVer?: number | null,
   options?: ILoadOptions
): Record<string, any>;
export function loadBeatmap(
   type: 'info',
   json: Record<string, unknown>,
   targetVer?: number | null,
   options?: ILoadOptions<IWrapInfo>
): IWrapInfo;
export function loadBeatmap(
   type: 'audioData',
   json: Record<string, unknown>,
   targetVer?: number | null,
   options?: ILoadOptions<IWrapAudio>
): IWrapAudio;
export function loadBeatmap(
   type: 'lightshow',
   json: Record<string, unknown>,
   targetVer?: number | null,
   options?: ILoadOptions<IWrapBeatmap>
): IWrapBeatmap;
export function loadBeatmap(
   type: 'difficulty',
   json: Record<string, unknown>,
   targetVer?: number | null,
   options?: ILoadOptions<IWrapBeatmap>
): IWrapBeatmap;
export function loadBeatmap(
   type: BeatmapFileType,
   json: Record<string, unknown>,
   targetVer?: number | null,
   options: ILoadOptions = {}
): Record<string, any> {
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
   opt.preprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_difficulty'),
         'Running preprocess function #' + (i + 1)
      );
      json = fn(json);
   });

   const jsonVerStr = retrieveVersion(json)?.at(0);
   let jsonVer: number;
   if (jsonVerStr) {
      jsonVer = parseInt(jsonVerStr);
   } else {
      logger.tWarn(
         tag('_difficulty'),
         'Could not identify beatmap version from JSON, assume implicit version',
         2
      );
      jsonVer = 2;
   }

   let data: IWrapBeatmap;
   const parser = parseMap[jsonVer];
   if (parser) data = parser(json, opt.dataCheck).setFilename(filePath);
   else {
      throw new Error(
         `Beatmap version ${jsonVer} is not supported, this may be an error in JSON or is newer than currently supported.`
      );
   }

   if (targetVer && jsonVer !== targetVer) {
      if (!opt.forceConvert) {
         throw new Error(
            `Beatmap version unmatched, expected ${targetVer} but received ${jsonVer}`
         );
      }
      logger.tWarn(
         tag('_difficulty'),
         'Beatmap version unmatched, expected',
         targetVer,
         'but received',
         jsonVer,
         'for version; Converting to beatmap version',
         targetVer
      );
      data = convertMap[targetVer](data, targetVer);
   }

   if (opt.sort) data.sort();

   opt.postprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_difficulty'),
         'Running postprocess function #' + (i + 1)
      );
      data = fn(data);
   });
   return data;
}
