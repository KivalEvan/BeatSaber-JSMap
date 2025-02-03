import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IInfo, IInfoBeatmap } from '../../../types/beatmap/v4/info.ts';
import type {
   IWrapInfoAttribute,
   IWrapInfoColorScheme,
} from '../../../types/beatmap/wrapper/info.ts';
import { colorToHex, hexToRgba, toColorObject } from '../../../utils/colors.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { infoBeatmap } from './infoBeatmap.ts';

type InfoPolyfills = Pick<IWrapInfoAttribute, 'filename'>;

/**
 * Schema serialization for v4 `Info`.
 */
export const info: ISchemaContainer<IWrapInfoAttribute, IInfo, InfoPolyfills> = {
   serialize(data) {
      return {
         version: '4.0.1',
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
               colorSchemeName: e.name,
               overrideNotes: e.overrideNotes,
               overrideLights: e.overrideLights,
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
         difficultyBeatmaps: data.difficulties.map((x) => {
            return infoBeatmap.serialize(x);
         }),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data, options) {
      return {
         version: 4,
         filename: options?.filename ?? 'Info.dat',
         song: {
            author: data.song?.author ?? '',
            title: data.song?.title ?? '',
            subTitle: data.song?.subTitle ?? '',
         },
         audio: {
            filename: data.audio?.songFilename ?? 'song.ogg',
            duration: data.audio?.songDuration ?? 0,
            audioDataFilename: data.audio?.audioDataFilename ?? 'AudioData.dat',
            bpm: data.audio?.bpm ?? 120,
            lufs: data.audio?.lufs ?? 0,
            previewStartTime: data.audio?.previewStartTime ?? 0,
            previewDuration: data.audio?.previewDuration ?? 0,
            audioOffset: 0,
            shuffle: 0,
            shufflePeriod: 0.5,
         },
         songPreviewFilename: data.songPreviewFilename ?? 'song.ogg',
         coverImageFilename: data.coverImageFilename ?? 'cover.jpg',
         environmentBase: {
            normal: null,
            allDirections: null,
         },
         environmentNames: data.environmentNames?.map((e) => e!) ?? [],
         colorSchemes: data.colorSchemes?.map((e) => {
            e = e!;
            const scheme: IWrapInfoColorScheme = {
               name: e.colorSchemeName || '',
               overrideNotes: e.overrideNotes || data.version === '4.0.0',
               overrideLights: e.overrideLights || data.version === '4.0.0',
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
         }) ?? [],
         difficulties: (data.difficultyBeatmaps ?? []).map((d) =>
            infoBeatmap.deserialize(d as IInfoBeatmap)
         ),
         customData: data.customData ?? {},
      };
   },
};
