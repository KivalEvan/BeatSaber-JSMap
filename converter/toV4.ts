import logger from '../logger.ts';
import { Info as V1Info } from '../beatmap/v1/info.ts';
import { Info as V2Info } from '../beatmap/v2/info.ts';
import { Info as V4Info } from '../beatmap/v4/info.ts';
import { IWrapInfo } from '../types/beatmap/wrapper/info.ts';
import { shallowCopy } from '../utils/misc.ts';
import { deepCopy } from '../utils/misc.ts';

function tag(name: string): string[] {
   return ['convert', name];
}

export function toV4Info(data: IWrapInfo): V4Info {
   if (data instanceof V4Info) {
      return data;
   }

   const template = new V4Info();
   template.filename = data.filename;

   if (data instanceof V1Info) {
      template.song.title = data.songName;
      template.song.subTitle = data.songSubName;
      template.song.author = data.songAuthorName;

      template.audio.bpm = data.beatsPerMinute;
      template.audio.previewStartTime = data.previewStartTime;
      template.audio.previewDuration = data.previewDuration;
      template.audio.filename = data.songFilename;

      template.coverImageFilename = data.coverImageFilename;
      template.environmentNames = [data.environmentName];

      template.customData.contributors = data.contributors;
      template.customData.customEnvironment = data.customEnvironment;
      template.customData.customEnvironmentHash = data.customEnvironmentHash;

      data.listMap().forEach(([_, beatmap]) => {
         template.addMap({
            characteristic: beatmap.characteristic,
            difficulty: beatmap.difficulty,
            beatmapAuthors: {
               mappers: [...beatmap.authors.mappers],
               lighters: [...beatmap.authors.lighters],
            },
            beatmapColorSchemeIdx: beatmap.colorSchemeId,
            environmentNameIdx: beatmap.environmentId,
            noteJumpMovementSpeed: beatmap.njs,
            noteJumpStartBeatOffset: beatmap.njsOffset,
            beatmapDataFilename: beatmap.filename,
            lightshowDataFilename: beatmap.filename,
         });
      });
   }
   if (data instanceof V2Info) {
      template.song.title = data.songName;
      template.song.subTitle = data.songSubName;
      template.song.author = data.songAuthorName;

      template.audio.bpm = data.beatsPerMinute;
      template.audio.previewStartTime = data.previewStartTime;
      template.audio.previewDuration = data.previewDuration;
      template.audio.filename = data.songFilename;

      template.coverImageFilename = data.coverImageFilename;
      template.songPreviewFilename = data.songFilename;
      template.environmentNames = [...data.environmentNames];
      template.colorSchemes = data.colorSchemes.map((d) => shallowCopy(d));

      template.customData = deepCopy(data.customData);
      data.listMap().forEach(([_, beatmap]) => {
         template.addMap({
            characteristic: beatmap.characteristic,
            difficulty: beatmap.difficulty,
            beatmapAuthors: {
               mappers: [...beatmap.authors.mappers],
               lighters: [...beatmap.authors.lighters],
            },
            beatmapColorSchemeIdx: beatmap.colorSchemeId,
            environmentNameIdx: beatmap.environmentId,
            noteJumpMovementSpeed: beatmap.njs,
            noteJumpStartBeatOffset: beatmap.njsOffset,
            beatmapDataFilename: beatmap.filename,
            lightshowDataFilename: beatmap.filename,
            customData: deepCopy(beatmap.customData),
         });
      });
   }

   return template;
}
