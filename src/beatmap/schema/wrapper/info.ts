import type { IWrapInfo, IWrapInfoColorScheme } from './types/info.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createInfoBeatmap } from './infoBeatmap.ts';

export function createInfo(data: DeepPartial<IWrapInfo> = {}): IWrapInfo {
   return {
      version: data.version ?? -1,
      filename: data.filename ?? 'Info.dat',
      song: {
         title: data.song?.title ?? 'Untitled',
         subTitle: data.song?.subTitle ?? '',
         author: data.song?.author ?? 'NoAuthor',
      },
      audio: {
         filename: data.audio?.filename ?? 'song.ogg',
         duration: data.audio?.duration ?? 0,
         audioDataFilename: data.audio?.audioDataFilename ?? 'AudioData.dat',
         bpm: data.audio?.bpm ?? 120,
         lufs: data.audio?.lufs ?? 0,
         previewStartTime: data.audio?.previewStartTime ?? 0,
         previewDuration: data.audio?.previewDuration ?? 0,
         audioOffset: data.audio?.audioOffset ?? 0,
         shuffle: data.audio?.shuffle ?? 0,
         shufflePeriod: data.audio?.shufflePeriod ?? 0.5,
      },
      songPreviewFilename: data.songPreviewFilename ?? 'song.ogg',
      coverImageFilename: data.coverImageFilename ?? 'cover.jpg',
      environmentBase: {
         normal: data.environmentBase?.normal ?? null,
         allDirections: data.environmentBase?.allDirections ?? null,
      },
      environmentNames: data.environmentNames ?? [],
      colorSchemes: data.colorSchemes?.map((e) => {
         const cs: IWrapInfoColorScheme = {
            name: e!.name ?? '',
            overrideLights: e!.overrideLights ?? false,
            overrideNotes: e!.overrideNotes ?? false,
            saberLeftColor: {
               r: e!.saberLeftColor?.r ?? 0,
               g: e!.saberLeftColor?.g ?? 0,
               b: e!.saberLeftColor?.b ?? 0,
               a: e!.saberLeftColor?.a ?? 0,
            },
            saberRightColor: {
               r: e!.saberRightColor?.r ?? 0,
               g: e!.saberRightColor?.g ?? 0,
               b: e!.saberRightColor?.b ?? 0,
               a: e!.saberRightColor?.a ?? 0,
            },
            environment0Color: {
               r: e!.environment0Color?.r ?? 0,
               g: e!.environment0Color?.g ?? 0,
               b: e!.environment0Color?.b ?? 0,
               a: e!.environment0Color?.a ?? 0,
            },
            environment1Color: {
               r: e!.environment1Color?.r ?? 0,
               g: e!.environment1Color?.g ?? 0,
               b: e!.environment1Color?.b ?? 0,
               a: e!.environment1Color?.a ?? 0,
            },
            environment0ColorBoost: {
               r: e!.environment0ColorBoost?.r ?? 0,
               g: e!.environment0ColorBoost?.g ?? 0,
               b: e!.environment0ColorBoost?.b ?? 0,
               a: e!.environment0ColorBoost?.a ?? 0,
            },
            environment1ColorBoost: {
               r: e!.environment1ColorBoost?.r ?? 0,
               g: e!.environment1ColorBoost?.g ?? 0,
               b: e!.environment1ColorBoost?.b ?? 0,
               a: e!.environment1ColorBoost?.a ?? 0,
            },
            obstaclesColor: {
               r: e!.obstaclesColor?.r ?? 0,
               g: e!.obstaclesColor?.g ?? 0,
               b: e!.obstaclesColor?.b ?? 0,
               a: e!.obstaclesColor?.a ?? 0,
            },
         };
         if (e!.environmentWColor) {
            cs.environmentWColor = {
               r: e!.environmentWColor?.r ?? 0,
               g: e!.environmentWColor?.g ?? 0,
               b: e!.environmentWColor?.b ?? 0,
               a: e!.environmentWColor?.a ?? 0,
            };
         }
         if (e!.environmentWColorBoost) {
            cs.environmentWColorBoost = {
               r: e!.environmentWColorBoost?.r ?? 0,
               g: e!.environmentWColorBoost?.g ?? 0,
               b: e!.environmentWColorBoost?.b ?? 0,
               a: e!.environmentWColorBoost?.a ?? 0,
            };
         }
         return cs;
      }) ?? [],
      difficulties: data.difficulties?.map(createInfoBeatmap) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}
