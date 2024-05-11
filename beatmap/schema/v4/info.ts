import type { IInfo, IInfoDifficulty } from '../../../types/beatmap/v4/info.ts';
import type { DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type {
   IWrapInfoAttribute,
   IWrapInfoBeatmapAttribute,
   IWrapInfoColorScheme,
} from '../../../types/beatmap/wrapper/info.ts';
import { hexToRgba, toColorObject } from '../../../utils/colors.ts';
import { colorToHex } from '../../../utils/colors.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';

export const info: ISchemaContainer<IWrapInfoAttribute, IInfo> = {
   defaultValue: {
      version: '4.0.0',
      song: {
         author: '',
         title: '',
         subTitle: '',
      },
      audio: {
         songFilename: '',
         songDuration: 0,
         audioDataFilename: '',
         bpm: 0,
         lufs: 0,
         previewStartTime: 0,
         previewDuration: 0,
      },
      songPreviewFilename: '',
      coverImageFilename: '',
      environmentNames: [],
      colorSchemes: [],
      difficultyBeatmaps: [],
      customData: {},
   } as DeepRequiredIgnore<IInfo, 'customData'>,
   serialize(data: IWrapInfoAttribute): IInfo {
      return {
         version: '4.0.0',
         song: {
            author: data.song.author,
            title: data.song.title,
            subTitle: data.song.subTitle,
         },
         audio: {
            songFilename: data.audio.filename,
            songDuration: data.audio.duration,
            audioDataFilename: data.audio.audioDataFilename,
            bpm: data.audio.bpm,
            lufs: data.audio.lufs,
            previewStartTime: data.audio.previewStartTime,
            previewDuration: data.audio.previewDuration,
         },
         songPreviewFilename: data.songPreviewFilename,
         coverImageFilename: data.coverImageFilename,
         environmentNames: data.environmentNames.map((e) => e),
         colorSchemes: data.colorSchemes.map((e) => {
            const cs: Required<IInfo>['colorSchemes'][number] = {
               useOverride: true,
               colorSchemeName: e.name,
               saberAColor: colorToHex(e.saberLeftColor),
               saberBColor: colorToHex(e.saberRightColor),
               environmentColor0: colorToHex(e.environment0Color),
               environmentColor1: colorToHex(e.environment1Color),
               obstaclesColor: colorToHex(e.obstaclesColor),
               environmentColor0Boost: colorToHex(e.environment0ColorBoost),
               environmentColor1Boost: colorToHex(e.environment1ColorBoost),
            };
            if (e.environmentWColor) {
               cs.environmentColorW = colorToHex(e.environmentWColor);
            }
            if (e.environmentWColorBoost) {
               cs.environmentColorWBoost = colorToHex(e.environmentWColorBoost);
            }
            return cs;
         }),
         difficultyBeatmaps: data.difficulties.map(infoDifficulty.serialize),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data: DeepPartial<IInfo> = {}): DeepPartial<IWrapInfoAttribute> {
      return {
         song: {
            author: data.song?.author ?? this.defaultValue.song.author,
            title: data.song?.title ?? this.defaultValue.song.title,
            subTitle: data.song?.subTitle ?? this.defaultValue.song.subTitle,
         },
         audio: {
            filename: data.audio?.songFilename ?? this.defaultValue.audio.songFilename,
            duration: data.audio?.songDuration ?? this.defaultValue.audio.songDuration,
            audioDataFilename: data.audio?.audioDataFilename ??
               this.defaultValue.audio.audioDataFilename,
            bpm: data.audio?.bpm ?? this.defaultValue.audio.bpm,
            lufs: data.audio?.lufs ?? this.defaultValue.audio.lufs,
            previewStartTime: data.audio?.previewStartTime ??
               this.defaultValue.audio.previewStartTime,
            previewDuration: data.audio?.previewDuration ??
               this.defaultValue.audio.previewDuration,
         },
         songPreviewFilename: data.songPreviewFilename ?? this.defaultValue.songPreviewFilename,
         coverImageFilename: data.coverImageFilename ?? this.defaultValue.coverImageFilename,
         environmentNames: (
            data.environmentNames ?? this.defaultValue.environmentNames
         ).map((e) => e!),
         colorSchemes: (
            data.colorSchemes ?? this.defaultValue.colorSchemes
         ).map((e) => {
            e = e!;
            const scheme: IWrapInfoColorScheme = {
               useOverride: !!e.useOverride,
               name: e.colorSchemeName || '',
               saberLeftColor: toColorObject(hexToRgba(e.saberAColor!), true),
               saberRightColor: toColorObject(hexToRgba(e.saberBColor!), true),
               environment0Color: toColorObject(
                  hexToRgba(e.environmentColor0!),
                  true,
               ),
               environment1Color: toColorObject(
                  hexToRgba(e.environmentColor1!),
                  true,
               ),
               obstaclesColor: toColorObject(
                  hexToRgba(e.obstaclesColor!),
                  true,
               ),
               environment0ColorBoost: toColorObject(
                  hexToRgba(e.environmentColor0Boost!),
                  true,
               ),
               environment1ColorBoost: toColorObject(
                  hexToRgba(e.environmentColor1Boost!),
                  true,
               ),
            };
            if (e.environmentColorW) {
               scheme.environmentWColor = toColorObject(
                  hexToRgba(e.environmentColorW),
                  true,
               );
            }
            if (e.environmentColorWBoost) {
               scheme.environmentWColorBoost = toColorObject(
                  hexToRgba(e.environmentColorWBoost),
                  true,
               );
            }
            return scheme;
         }),
         difficulties: (data.difficultyBeatmaps ?? []).map((d) =>
            infoDifficulty.deserialize(d as IInfoDifficulty)
         ),
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
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

export const infoDifficulty: ISchemaContainer<
   IWrapInfoBeatmapAttribute,
   IInfoDifficulty
> = {
   defaultValue: {
      characteristic: 'Standard',
      difficulty: 'Easy',
      beatmapAuthors: { mappers: [], lighters: [] },
      environmentNameIdx: 0,
      beatmapColorSchemeIdx: 0,
      noteJumpMovementSpeed: 0,
      noteJumpStartBeatOffset: 0,
      beatmapDataFilename: 'UnnamedFile.dat',
      lightshowDataFilename: 'UnnamedFile.dat',
      customData: {},
   } as Required<IInfoDifficulty>,
   serialize(data: IWrapInfoBeatmapAttribute): IInfoDifficulty {
      return {
         characteristic: data.characteristic,
         difficulty: data.difficulty,
         beatmapAuthors: {
            mappers: [...data.authors.mappers],
            lighters: [...data.authors.lighters],
         },
         environmentNameIdx: data.environmentId,
         beatmapColorSchemeIdx: data.colorSchemeId,
         noteJumpMovementSpeed: data.njs,
         noteJumpStartBeatOffset: data.njsOffset,
         lightshowDataFilename: data.lightshowFilename,
         beatmapDataFilename: data.filename,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: DeepPartial<IInfoDifficulty> = {},
   ): DeepPartial<IWrapInfoBeatmapAttribute> {
      return {
         characteristic: data.characteristic ?? this.defaultValue.characteristic,
         difficulty: data.difficulty ?? this.defaultValue.difficulty,
         authors: {
            mappers: (
               data.beatmapAuthors?.mappers ??
                  this.defaultValue.beatmapAuthors.mappers
            ).map((s) => s),
            lighters: (
               data.beatmapAuthors?.lighters ??
                  this.defaultValue.beatmapAuthors.lighters
            ).map((s) => s),
         },
         filename: data.beatmapDataFilename ?? this.defaultValue.beatmapDataFilename,
         lightshowFilename: data.lightshowDataFilename ??
            this.defaultValue.lightshowDataFilename,
         njs: data.noteJumpMovementSpeed ??
            this.defaultValue.noteJumpMovementSpeed,
         njsOffset: data.noteJumpStartBeatOffset ??
            this.defaultValue.noteJumpStartBeatOffset,
         colorSchemeId: data.beatmapColorSchemeIdx ??
            this.defaultValue.beatmapColorSchemeIdx,
         environmentId: data.environmentNameIdx ?? this.defaultValue.environmentNameIdx,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(_: IWrapInfoBeatmapAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapInfoBeatmapAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapInfoBeatmapAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapInfoBeatmapAttribute): boolean {
      return false;
   },
};
