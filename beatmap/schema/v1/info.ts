import type { IInfo } from '../../../types/beatmap/v1/info.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { deepCopy } from '../../../utils/misc.ts';
import type {
   IWrapInfoAttribute,
} from '../../../types/beatmap/wrapper/info.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import { infoDifficulty } from './infoDifficulty.ts';

/** Difficulty beatmap class object. */
export const info: ISchemaContainer<IWrapInfoAttribute, IInfo> = {
   defaultValue: {
      songName: 'Untitled',
      songSubName: '',
      authorName: 'NoAuthor',
      beatsPerMinute: 120,
      previewStartTime: 0,
      previewDuration: 0,
      coverImagePath: 'cover.jpg',
      environmentName: 'DefaultEnvironment',
      difficultyLevels: [],
      oneSaber: false,
      contributors: [],
      customEnvironment: '',
      customEnvironmentHash: '',
   } as Required<IInfo>,
   serialize(data: IWrapInfoAttribute): IInfo {
      return {
         songName: data.song.title,
         songSubName: data.song.subTitle,
         authorName: data.song.author,
         beatsPerMinute: data.audio.bpm,
         previewStartTime: data.audio.previewStartTime,
         previewDuration: data.audio.previewDuration,
         coverImagePath: data.coverImageFilename,
         environmentName: data.environmentName,
         difficultyLevels: data.difficulties.map(infoDifficulty.serialize),
         oneSaber: data.difficulties.some(
            (m) => m.characteristic === 'OneSaber'
         ),
         contributors: deepCopy(data.customData._contributors),
         customEnvironment: data.customData._customEnvironment,
         customEnvironmentHash: data.customData._customEnvironmentHash,
      };
   },
   deserialize(data: DeepPartial<IInfo> = {}): DeepPartial<IWrapInfoAttribute> {
      return {
         song: {
            title: data.songName ?? this.defaultValue.songName,
            subTitle: data.songSubName ?? this.defaultValue.songSubName,
            author: data.authorName ?? this.defaultValue.authorName,
         },
         audio: {
            bpm: data.beatsPerMinute ?? this.defaultValue.beatsPerMinute,
            previewStartTime:
               data.previewStartTime ?? this.defaultValue.previewStartTime,
            previewDuration:
               data.previewDuration ?? this.defaultValue.previewDuration,
         },
         coverImageFilename:
            data.coverImagePath ?? this.defaultValue.coverImagePath,
         environmentName:
            data.environmentName ?? this.defaultValue.environmentName,

         difficulties: (
            data.difficultyLevels ?? this.defaultValue.difficultyLevels
         ).map(infoDifficulty.deserialize),
         songFilename: 'song.ogg',

         oneSaber: (
            data.difficultyLevels ?? this.defaultValue.difficultyLevels
         ).some((m) => m?.characteristic === 'OneSaber'),
         contributors: deepCopy(
            data.contributors ?? this.defaultValue.contributors
         ),
         customEnvironment:
            data.customEnvironment ?? this.defaultValue.customEnvironment,
         customEnvironmentHash:
            data.customEnvironmentHash ??
            this.defaultValue.customEnvironmentHash,
      };
   },
   isValid(_: IWrapInfoAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapInfoAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapInfoAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapInfoAttribute): boolean {
      return false;
   },
};
