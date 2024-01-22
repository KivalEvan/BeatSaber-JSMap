import logger from '../logger.ts';
import { Difficulty as V1Difficulty } from '../beatmap/v1/difficulty.ts';
import { Difficulty as V2Difficulty } from '../beatmap/v2/difficulty.ts';
import { Difficulty as V3Difficulty } from '../beatmap/v3/difficulty.ts';
import { Difficulty as V4Difficulty } from '../beatmap/v4/difficulty.ts';
import { Lightshow as V3Lightshow } from '../beatmap/v3/lightshow.ts';
import { Lightshow as V4Lightshow } from '../beatmap/v4/lightshow.ts';
import { Info as V1Info } from '../beatmap/v1/info.ts';
import { Info as V2Info } from '../beatmap/v2/info.ts';
import { Info as V4Info } from '../beatmap/v4/info.ts';
import { IWrapLightshow } from '../types/beatmap/wrapper/lightshow.ts';
import { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';
import { IWrapInfo } from '../types/beatmap/wrapper/info.ts';
import { deepCopy, shallowCopy } from '../utils/misc.ts';

function tag(name: string): string[] {
   return ['convert', name];
}

export function toV4Difficulty(data: IWrapDifficulty): V4Difficulty {
   if (data instanceof V4Difficulty) {
      return data;
   }

   logger.tWarn(
      tag('toV4Difficulty'),
      'Converting beatmap to v4 may lose certain data!',
   );

   const template = new V4Difficulty();
   template.filename = data.filename;
   template.customData = deepCopy(data.customData);

   if (data instanceof V3Difficulty) {
      template.addColorNotes(...data.colorNotes);
      template.addBombNotes(...data.bombNotes);
      template.addObstacles(...data.obstacles);
      template.addArcs(...data.arcs);
      template.addChains(...data.chains);
   }

   return template;
}

export function toV4Lightshow(
   data: IWrapLightshow | IWrapDifficulty,
): V4Lightshow {
   if (data instanceof V4Lightshow) {
      return data;
   }

   logger.tWarn(
      tag('toV4Lightshow'),
      'Converting beatmap to v4 may lose certain data!',
   );

   const template = new V4Lightshow();
   template.filename = data.filename;
   template.customData = deepCopy(data.customData);

   if (data instanceof V3Difficulty) {
      template.addBasicEvents(...data.basicEvents);
      template.addColorBoostEvents(...data.colorBoostEvents);
      template.addLightColorEventBoxGroups(...data.lightColorEventBoxGroups);
      template.addLightRotationEventBoxGroups(
         ...data.lightRotationEventBoxGroups,
      );
      template.addLightTranslationEventBoxGroups(
         ...data.lightTranslationEventBoxGroups,
      );
      template.addFxEventBoxGroups(...data.fxEventBoxGroups);
      template.addWaypoints(...data.waypoints);
   }

   return template;
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
               mappers: [...beatmap.authors.mappers, data.levelAuthorName],
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
