import type { IInfo } from './types/info.ts';
import type { IWrapInfo } from '../wrapper/types/info.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createInfo } from '../wrapper/info.ts';
import { is360Environment } from '../../helpers/environment.ts';
import { deserializeInfoBeatmap, serializeInfoBeatmap } from './infoBeatmap.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';

type InfoDeserializationPolyfills = Pick<IWrapInfo, 'filename'> & {
   audio: Pick<
      IWrapInfo['audio'],
      | 'filename'
      | 'audioDataFilename'
      | 'lufs'
      | 'duration'
      | 'audioOffset'
      | 'shuffle'
      | 'shufflePeriod'
   >;
   customDataOwnership?: DeserializationOptions['customDataOwnership'];
};

/** Serialize beatmap v1 `Info` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeInfo(data: IWrapInfo): IInfo {
   return {
      songName: data.song.title,
      songSubName: data.song.subTitle,
      authorName: data.song.author,
      beatsPerMinute: data.audio.bpm,
      previewStartTime: data.audio.previewStartTime,
      previewDuration: data.audio.previewDuration,
      coverImagePath: data.coverImageFilename,
      environmentName: data.environmentBase.normal ||
         (data.environmentNames.find((e) => !is360Environment(e))) ||
         'DefaultEnvironment',
      difficultyLevels: data.difficulties.map((x) => {
         return serializeInfoBeatmap(x);
      }),
      oneSaber: data.difficulties.some(
         (m) => m.characteristic === 'OneSaber',
      ),
      contributors: deepCopy(data.customData._contributors),
      customEnvironment: data.customData._customEnvironment,
      customEnvironmentHash: data.customData._customEnvironmentHash,
   };
}

/** Deserialize schema object into beatmap v1 `Info` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills and custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeInfo(
   data: IInfo,
   options?: DeepPartial<InfoDeserializationPolyfills>,
): IWrapInfo {
   const deserializationOptions: DeserializationOptions = {
      customDataOwnership: options?.customDataOwnership ?? 'copy',
   };
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
         return deserializeInfoBeatmap(x, deserializationOptions);
      }) ?? [],
      customData: {
         _contributors: data.contributors,
         _customEnvironment: data.customEnvironment,
         _customEnvironmentHash: data.customEnvironmentHash,
      },
   }, deserializationOptions);
}
