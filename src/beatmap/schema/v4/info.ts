// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IInfo } from '../../../types/beatmap/v4/info.ts';
import type { IWrapInfo, IWrapInfoColorScheme } from '../../../types/beatmap/wrapper/info.ts';
import { colorToHex, hexToRgba, toColorObject } from '../../../utils/colors.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createInfo } from '../../core/info.ts';
import { infoBeatmap } from './infoBeatmap.ts';

type InfoDeserializationPolyfills = Pick<IWrapInfo, 'filename'>;

/**
 * Schema serialization for v4 `Info`.
 */
export const info: ISchemaContainer<
   IWrapInfo,
   IInfo,
   Record<string, any>,
   InfoDeserializationPolyfills
> = {
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
      return createInfo({
         version: 4,
         filename: options?.filename,
         song: {
            author: data.song?.author,
            title: data.song?.title,
            subTitle: data.song?.subTitle,
         },
         audio: {
            filename: data.audio?.songFilename,
            duration: data.audio?.songDuration,
            audioDataFilename: data.audio?.audioDataFilename,
            bpm: data.audio?.bpm,
            lufs: data.audio?.lufs,
            previewStartTime: data.audio?.previewStartTime,
            previewDuration: data.audio?.previewDuration,
         },
         songPreviewFilename: data.songPreviewFilename,
         coverImageFilename: data.coverImageFilename,
         environmentNames: data.environmentNames,
         colorSchemes: data.colorSchemes?.map((e) => {
            const scheme: IWrapInfoColorScheme = {
               name: e?.colorSchemeName ?? '',
               overrideNotes: e?.overrideNotes ?? data.version === '4.0.0',
               overrideLights: e?.overrideLights ?? data.version === '4.0.0',
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
         difficulties: data.difficultyBeatmaps?.map((d) => {
            return infoBeatmap.deserialize(d);
         }),
         customData: data.customData,
      });
   },
};
