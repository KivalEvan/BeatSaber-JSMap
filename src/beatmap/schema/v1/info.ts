import type { EnvironmentName } from '../../../types/beatmap/shared/environment.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IInfo } from '../../../types/beatmap/v1/info.ts';
import type { IWrapInfoAttribute } from '../../../types/beatmap/wrapper/info.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { is360Environment } from '../../helpers/environment.ts';
import { infoBeatmap } from './infoBeatmap.ts';

type InfoPolyfills = Pick<IWrapInfoAttribute, 'filename'> & {
   audio: Pick<
      IWrapInfoAttribute['audio'],
      | 'filename'
      | 'audioDataFilename'
      | 'lufs'
      | 'duration'
      | 'audioOffset'
      | 'shuffle'
      | 'shufflePeriod'
   >;
};

/**
 * Schema serialization for v1 `Info`.
 */
export const info: ISchemaContainer<IWrapInfoAttribute, IInfo, InfoPolyfills> = {
   serialize(data) {
      return {
         songName: data.song.title,
         songSubName: data.song.subTitle,
         authorName: data.song.author,
         beatsPerMinute: data.audio.bpm,
         previewStartTime: data.audio.previewStartTime,
         previewDuration: data.audio.previewDuration,
         coverImagePath: data.coverImageFilename,
         environmentName: data.environmentBase.normal ||
            (data.environmentNames.find(
               (e) => !is360Environment(e),
            ) as EnvironmentName) ||
            'DefaultEnvironment',
         difficultyLevels: data.difficulties.map((x) => {
            return infoBeatmap.serialize(x);
         }),
         oneSaber: data.difficulties.some(
            (m) => m.characteristic === 'OneSaber',
         ),
         contributors: deepCopy(data.customData._contributors),
         customEnvironment: data.customData._customEnvironment,
         customEnvironmentHash: data.customData._customEnvironmentHash,
      };
   },
   deserialize(data, options) {
      return {
         version: 1,
         filename: options?.filename ?? 'Info.dat',
         song: {
            title: data.songName ?? '',
            subTitle: data.songSubName ?? '',
            author: data.authorName ?? '',
         },
         audio: {
            filename: data.difficultyLevels?.find((e) => e?.audioPath)
               ?.audioPath ?? options?.audio?.filename ?? 'song.ogg',
            audioDataFilename: options?.audio?.audioDataFilename ?? 'BPMInfo.dat',
            bpm: data.beatsPerMinute ?? 120,
            lufs: options?.audio?.lufs ?? 0,
            duration: options?.audio?.duration ?? 0,
            previewStartTime: data.previewStartTime ?? 0,
            previewDuration: data.previewDuration ?? 0,
            audioOffset: options?.audio?.audioOffset ?? 0,
            shuffle: options?.audio?.shuffle ?? 0,
            shufflePeriod: options?.audio?.shufflePeriod ?? 0.5,
         },
         songPreviewFilename: data.difficultyLevels?.find((e) => e?.audioPath)
            ?.audioPath ?? options?.audio?.filename ?? 'song.ogg',
         coverImageFilename: data.coverImagePath ?? 'cover.jpg',
         environmentBase: { normal: data.environmentName, allDirections: 'GlassDesertEnvironment' },
         environmentNames: [data.environmentName],
         colorSchemes: [],
         difficulties: data.difficultyLevels?.map((x) => {
            return infoBeatmap.deserialize(x);
         }) ?? [],
         customData: {
            _contributors: data.contributors,
            _customEnvironment: data.customEnvironment,
            _customEnvironmentHash: data.customEnvironmentHash,
         },
      };
   },
};
