import type {
   Environment360Name,
   EnvironmentName,
   EnvironmentV3Name,
} from '../../../types/beatmap/shared/environment.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IInfo, IInfoSet } from '../../../types/beatmap/v2/info.ts';
import type { IWrapInfoAttribute } from '../../../types/beatmap/wrapper/info.ts';
import { deepCopy, shallowCopy } from '../../../utils/misc.ts';
import { is360Environment } from '../../helpers/environment.ts';
import { infoBeatmap } from './infoBeatmap.ts';

type InfoPolyfills = Pick<IWrapInfoAttribute, 'filename'> & {
   audio: Pick<IWrapInfoAttribute['audio'], 'audioDataFilename' | 'lufs' | 'duration'>;
};

/**
 * Schema serialization for v2 `Info`.
 */
export const info: ISchemaContainer<IWrapInfoAttribute, IInfo, InfoPolyfills> = {
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
      return {
         version: 2,
         filename: options?.filename ?? 'Info.dat',
         song: {
            title: data._songName ?? '',
            subTitle: data._songSubName ?? '',
            author: data._songAuthorName ?? '',
         },
         audio: {
            audioDataFilename: options?.audio?.audioDataFilename ?? 'BPMInfo.dat',
            bpm: data._beatsPerMinute ?? 120,
            lufs: options?.audio?.lufs ?? 0,
            duration: options?.audio?.duration ?? 0,
            previewStartTime: data._previewStartTime ?? 0,
            previewDuration: data._previewDuration ?? 0,
            filename: data._songFilename ?? 'song.ogg',
            audioOffset: data._songTimeOffset ?? 0,
            shuffle: data._shuffle ?? 0,
            shufflePeriod: data._shufflePeriod ?? 0.5,
         },
         songPreviewFilename: data._songFilename ?? 'song.ogg',
         coverImageFilename: data._coverImageFilename ?? 'cover.jpg',
         environmentBase: {
            normal: data._environmentName ?? 'DefaultEnvironment',
            allDirections: data._allDirectionsEnvironmentName ?? 'GlassDesertEnvironment',
         },
         environmentNames: data._environmentNames ?? [],
         colorSchemes: data._colorSchemes?.map((e) => {
            return {
               name: e.colorScheme?.colorSchemeId ?? '',
               overrideNotes: !!e.useOverride,
               overrideLights: !!e.useOverride,
               saberLeftColor: {
                  r: e.colorScheme?.saberAColor?.r ?? 0,
                  g: e.colorScheme?.saberAColor?.g ?? 0,
                  b: e.colorScheme?.saberAColor?.b ?? 0,
                  a: e.colorScheme?.saberAColor?.a ?? 0,
               },
               saberRightColor: {
                  r: e.colorScheme?.saberBColor?.r ?? 0,
                  g: e.colorScheme?.saberBColor?.g ?? 0,
                  b: e.colorScheme?.saberBColor?.b ?? 0,
                  a: e.colorScheme?.saberBColor?.a ?? 0,
               },
               environment0Color: {
                  r: e.colorScheme?.environmentColor0?.r ?? 0,
                  g: e.colorScheme?.environmentColor0?.g ?? 0,
                  b: e.colorScheme?.environmentColor0?.b ?? 0,
                  a: e.colorScheme?.environmentColor0?.a ?? 0,
               },
               environment1Color: {
                  r: e.colorScheme?.environmentColor1?.r ?? 0,
                  g: e.colorScheme?.environmentColor1?.g ?? 0,
                  b: e.colorScheme?.environmentColor1?.b ?? 0,
                  a: e.colorScheme?.environmentColor1?.a ?? 0,
               },
               obstaclesColor: {
                  r: e.colorScheme?.obstaclesColor?.r ?? 0,
                  g: e.colorScheme?.obstaclesColor?.g ?? 0,
                  b: e.colorScheme?.obstaclesColor?.b ?? 0,
                  a: e.colorScheme?.obstaclesColor?.a ?? 0,
               },
               environment0ColorBoost: {
                  r: e.colorScheme?.environmentColor0Boost?.r ?? 0,
                  g: e.colorScheme?.environmentColor0Boost?.g ?? 0,
                  b: e.colorScheme?.environmentColor0Boost?.b ?? 0,
                  a: e.colorScheme?.environmentColor0Boost?.a ?? 0,
               },
               environment1ColorBoost: {
                  r: e.colorScheme?.environmentColor1Boost?.r ?? 0,
                  g: e.colorScheme?.environmentColor1Boost?.g ?? 0,
                  b: e.colorScheme?.environmentColor1Boost?.b ?? 0,
                  a: e.colorScheme?.environmentColor1Boost?.a ?? 0,
               },
               environmentWColor: e.colorScheme?.environmentColorW
                  ? {
                     r: e.colorScheme?.environmentColorW?.r ?? 0,
                     g: e.colorScheme?.environmentColorW?.g ?? 0,
                     b: e.colorScheme?.environmentColorW?.b ?? 0,
                     a: e.colorScheme?.environmentColorW?.a ?? 0,
                  }
                  : undefined,
               environmentWColorBoost: e.colorScheme?.environmentColorWBoost
                  ? {
                     r: e.colorScheme?.environmentColorWBoost?.r ?? 0,
                     g: e.colorScheme?.environmentColorWBoost?.g ?? 0,
                     b: e.colorScheme?.environmentColorWBoost?.b ?? 0,
                     a: e.colorScheme?.environmentColorWBoost?.a ?? 0,
                  }
                  : undefined,
            };
         }) ?? [],
         difficulties: data._difficultyBeatmapSets?.flatMap((set) => {
            return set._difficultyBeatmaps?.map((diff) => {
               return infoBeatmap.deserialize(diff, {
                  characteristic: set._beatmapCharacteristicName ?? 'Standard',
                  authors: {
                     mappers: data._levelAuthorName?.split(',') ?? [],
                     lighters: [],
                  },
               });
            }) ?? [];
         }) ?? [],
         customData: data._customData ?? {},
      };
   },
};
