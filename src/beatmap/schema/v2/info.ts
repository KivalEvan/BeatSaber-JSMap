// deno-lint-ignore-file no-explicit-any
import type {
   Environment360Name,
   EnvironmentName,
   EnvironmentV3Name,
} from '../../../types/beatmap/shared/environment.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IInfo, IInfoSet } from '../../../types/beatmap/v2/info.ts';
import type { IWrapInfo } from '../../../types/beatmap/wrapper/info.ts';
import { deepCopy, shallowCopy } from '../../../utils/misc.ts';
import { createInfo } from '../../core/info.ts';
import { is360Environment } from '../../helpers/environment.ts';
import { infoBeatmap } from './infoBeatmap.ts';

type InfoDeserializationPolyfills = Pick<IWrapInfoAttribute, 'filename'> & {
   audio: Pick<
      IWrapInfoAttribute['audio'],
      | 'audioDataFilename'
      | 'lufs'
      | 'duration'
   >;
};

/**
 * Schema serialization for v2 `Info`.
 */
export const info: ISchemaContainer<
   IWrapInfoAttribute,
   IInfo,
   Record<string, any>,
   InfoDeserializationPolyfills
> = {
   serialize(data) {
      const authorSet = new Set();
      const d: Required<IInfo> = {
         _version: '2.1.0',
         _songName: data.song.title,
         _songSubName: data.song.subTitle,
         _songAuthorName: data.song.author,
         _levelAuthorName: '',
         _beatsPerMinute: data.audio.bpm,
         _songTimeOffset: data.audio.audioOffset,
         _shuffle: data.audio.shuffle,
         _shufflePeriod: data.audio.shufflePeriod,
         _previewStartTime: data.audio.previewStartTime,
         _previewDuration: data.audio.previewDuration,
         _songFilename: data.audio.filename,
         _coverImageFilename: data.coverImageFilename,
         _environmentName: data.environmentBase.normal ||
            (data.environmentNames.find(
               (e) => !is360Environment(e),
            ) as EnvironmentName & EnvironmentV3Name) ||
            'DefaultEnvironment',
         _allDirectionsEnvironmentName: data.environmentBase.allDirections ||
            (data.environmentNames.find((e) => is360Environment(e)) as Environment360Name) ||
            'GlassDesertEnvironment',
         _environmentNames: data.environmentNames.map((e) => e),
         _colorSchemes: data.colorSchemes.map((e) => {
            const cs: Required<IInfo>['_colorSchemes'][number] = {
               useOverride: e.overrideNotes || e.overrideLights,
               colorScheme: {
                  colorSchemeId: e.name,
                  saberAColor: shallowCopy(e.saberLeftColor),
                  saberBColor: shallowCopy(e.saberRightColor),
                  environmentColor0: shallowCopy(e.environment0Color),
                  environmentColor1: shallowCopy(e.environment1Color),
                  obstaclesColor: shallowCopy(e.obstaclesColor),
                  environmentColor0Boost: shallowCopy(e.environment0ColorBoost),
                  environmentColor1Boost: shallowCopy(e.environment1ColorBoost),
               },
            };
            if (e.environmentWColor) {
               cs.colorScheme!.environmentColorW = shallowCopy(
                  e.environmentWColor,
               );
            }
            if (e.environmentWColorBoost) {
               cs.colorScheme!.environmentColorWBoost = shallowCopy(
                  e.environmentWColorBoost,
               );
            }
            return cs;
         }),
         _customData: deepCopy(data.customData),
         _difficultyBeatmapSets: data.difficulties.reduce((set, d) => {
            let found = set.find(
               (s) => s._beatmapCharacteristicName === d.characteristic,
            );
            if (!found) {
               found = {
                  _beatmapCharacteristicName: d.characteristic,
                  _difficultyBeatmaps: [],
               };
               set.push(found);
            }
            d.authors.mappers.forEach((e) => authorSet.add(e));
            d.authors.lighters.forEach((e) => authorSet.add(e));
            found._difficultyBeatmaps!.push(infoBeatmap.serialize(d));
            return set;
         }, [] as IInfoSet[]),
      };
      d._levelAuthorName = [...authorSet].join(', ');
      return d;
   },
   deserialize(data, options) {
      return createInfo({
         version: 2,
         filename: options?.filename,
         song: {
            title: data._songName,
            subTitle: data._songSubName,
            author: data._songAuthorName,
         },
         audio: {
            audioDataFilename: options?.audio?.audioDataFilename,
            bpm: data._beatsPerMinute,
            lufs: options?.audio?.lufs,
            duration: options?.audio?.duration,
            previewStartTime: data._previewStartTime,
            previewDuration: data._previewDuration,
            filename: data._songFilename,
            audioOffset: data._songTimeOffset,
            shuffle: data._shuffle,
            shufflePeriod: data._shufflePeriod,
         },
         songPreviewFilename: data._songFilename,
         coverImageFilename: data._coverImageFilename,
         environmentBase: {
            normal: data._environmentName,
            allDirections: data._allDirectionsEnvironmentName,
         },
         environmentNames: data._environmentNames,
         colorSchemes: data._colorSchemes?.map((e) => {
            return {
               name: e.colorScheme?.colorSchemeId,
               overrideNotes: !!e.useOverride,
               overrideLights: !!e.useOverride,
               saberLeftColor: {
                  r: e.colorScheme?.saberAColor?.r,
                  g: e.colorScheme?.saberAColor?.g,
                  b: e.colorScheme?.saberAColor?.b,
                  a: e.colorScheme?.saberAColor?.a,
               },
               saberRightColor: {
                  r: e.colorScheme?.saberBColor?.r,
                  g: e.colorScheme?.saberBColor?.g,
                  b: e.colorScheme?.saberBColor?.b,
                  a: e.colorScheme?.saberBColor?.a,
               },
               environment0Color: {
                  r: e.colorScheme?.environmentColor0?.r,
                  g: e.colorScheme?.environmentColor0?.g,
                  b: e.colorScheme?.environmentColor0?.b,
                  a: e.colorScheme?.environmentColor0?.a,
               },
               environment1Color: {
                  r: e.colorScheme?.environmentColor1?.r,
                  g: e.colorScheme?.environmentColor1?.g,
                  b: e.colorScheme?.environmentColor1?.b,
                  a: e.colorScheme?.environmentColor1?.a,
               },
               obstaclesColor: {
                  r: e.colorScheme?.obstaclesColor?.r,
                  g: e.colorScheme?.obstaclesColor?.g,
                  b: e.colorScheme?.obstaclesColor?.b,
                  a: e.colorScheme?.obstaclesColor?.a,
               },
               environment0ColorBoost: {
                  r: e.colorScheme?.environmentColor0Boost?.r,
                  g: e.colorScheme?.environmentColor0Boost?.g,
                  b: e.colorScheme?.environmentColor0Boost?.b,
                  a: e.colorScheme?.environmentColor0Boost?.a,
               },
               environment1ColorBoost: {
                  r: e.colorScheme?.environmentColor1Boost?.r,
                  g: e.colorScheme?.environmentColor1Boost?.g,
                  b: e.colorScheme?.environmentColor1Boost?.b,
                  a: e.colorScheme?.environmentColor1Boost?.a,
               },
               environmentWColor: e.colorScheme?.environmentColorW
                  ? {
                     r: e.colorScheme?.environmentColorW?.r,
                     g: e.colorScheme?.environmentColorW?.g,
                     b: e.colorScheme?.environmentColorW?.b,
                     a: e.colorScheme?.environmentColorW?.a,
                  }
                  : undefined,
               environmentWColorBoost: e.colorScheme?.environmentColorWBoost
                  ? {
                     r: e.colorScheme?.environmentColorWBoost?.r,
                     g: e.colorScheme?.environmentColorWBoost?.g,
                     b: e.colorScheme?.environmentColorWBoost?.b,
                     a: e.colorScheme?.environmentColorWBoost?.a,
                  }
                  : undefined,
            };
         }),
         difficulties: data._difficultyBeatmapSets?.flatMap((set) => {
            return set._difficultyBeatmaps?.map((diff) => {
               return infoBeatmap.deserialize(diff, {
                  characteristic: set._beatmapCharacteristicName,
                  authors: {
                     mappers: data._levelAuthorName?.split(','),
                  },
               });
            }) ?? [];
         }),
         customData: data._customData,
      });
   },
};
