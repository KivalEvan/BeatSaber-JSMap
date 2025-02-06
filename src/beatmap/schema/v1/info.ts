// deno-lint-ignore-file no-explicit-any
import type { EnvironmentName } from '../../../types/beatmap/shared/environment.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IInfo } from '../../../types/beatmap/v1/info.ts';
import type { IWrapInfoAttribute } from '../../../types/beatmap/wrapper/info.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createInfo } from '../../core/info.ts';
import { is360Environment } from '../../helpers/environment.ts';
import { infoBeatmap } from './infoBeatmap.ts';

type InfoDeserializationPolyfills = Pick<IWrapInfoAttribute, 'filename'> & {
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
export const info: ISchemaContainer<
   IWrapInfoAttribute,
   IInfo,
   Record<string, any>,
   InfoDeserializationPolyfills
> = {
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
      const difficulty = data.difficultyLevels?.find((e) => {
         return e?.audioPath;
      });
      return createInfo({
         version: 1,
         filename: options?.filename,
         song: {
            title: data.songName,
            subTitle: data.songSubName,
            author: data.authorName,
         },
         audio: {
            filename: difficulty?.audioPath ?? options?.audio?.filename,
            audioDataFilename: options?.audio?.audioDataFilename,
            bpm: data.beatsPerMinute,
            lufs: options?.audio?.lufs,
            duration: options?.audio?.duration,
            previewStartTime: data.previewStartTime,
            previewDuration: data.previewDuration,
         },
         songPreviewFilename: difficulty?.audioPath ?? options?.audio?.filename,
         coverImageFilename: data.coverImagePath,
         environmentBase: { normal: data.environmentName },
         difficulties: data.difficultyLevels?.map((x) => {
            return infoBeatmap.deserialize(x);
         }) ?? [],
         customData: {
            _contributors: data.contributors,
            _customEnvironment: data.customEnvironment,
            _customEnvironmentHash: data.customEnvironmentHash,
         },
      });
   },
};
