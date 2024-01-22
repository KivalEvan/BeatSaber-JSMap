import { round } from '../../utils/math.ts';
import { ICleanOptions } from '../../types/beatmap/shared/clean.ts';
import { IInfo } from '../../types/beatmap/v4/info.ts';
import { IDifficulty } from '../../types/beatmap/v4/difficulty.ts';
import { ILightshow } from '../../types/beatmap/v4/lightshow.ts';
import { deepClean, purgeZeros } from '../shared/clean.ts';

export function cleanDifficulty(data: IDifficulty, options: ICleanOptions) {
   for (let i = 0; i < data.content.arcs.length; i++) {
      const o = data.content.arcs[i];
      if (options.floatTrim) {
         o.hb = round(o.hb!, options.floatTrim);
         o.hr = round(o.hr!, options.floatTrim);
         o.tb = round(o.tb!, options.floatTrim);
         o.tr = round(o.tr!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.arcs[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.arcsData.length; i++) {
      const o = data.content.arcsData[i];
      if (options.floatTrim) {
         o.m = round(o.m!, options.floatTrim);
         o.tm = round(o.tm!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.arcsData[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.bombNotes.length; i++) {
      const o = data.content.bombNotes[i];
      if (options.floatTrim) {
         o.b = round(o.b!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.bombNotes[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.bombNotesData.length; i++) {
      const o = data.content.bombNotesData[i];
      deepClean(
         o.customData!,
         `difficulty.content.bombNotesData[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.chains.length; i++) {
      const o = data.content.chains[i];
      if (options.floatTrim) {
         o.hb = round(o.hb!, options.floatTrim);
         o.hr = round(o.hr!, options.floatTrim);
         o.tb = round(o.tb!, options.floatTrim);
         o.tr = round(o.tr!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.chains[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.chainsData.length; i++) {
      const o = data.content.chainsData[i];
      if (options.floatTrim) {
         o.s = round(o.s!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.chainsData[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.colorNotes.length; i++) {
      const o = data.content.colorNotes[i];
      if (options.floatTrim) {
         o.b = round(o.b!, options.floatTrim);
         o.r = round(o.r!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.colorNotes[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.colorNotesData.length; i++) {
      const o = data.content.colorNotesData[i];
      if (options.floatTrim) {
         o.a = round(o.a!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.colorNotesData[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.obstacles.length; i++) {
      const o = data.content.obstacles[i];
      if (options.floatTrim) {
         o.b = round(o.b!, options.floatTrim);
         o.r = round(o.r!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.obstacles[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.obstaclesData.length; i++) {
      const o = data.content.obstaclesData[i];
      if (options.floatTrim) {
         o.d = round(o.d!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.obstaclesData[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   deepClean(
      data.content.customData!,
      `difficulty.content.customData`,
      options,
   );
   if (!Object.keys(data.content.customData!).length) {
      delete data.content.customData;
   }
}

export function cleanLightshow(data: ILightshow, options: ICleanOptions) {
   for (let i = 0; i < data.content.waypoints.length; i++) {
      const o = data.content.waypoints[i];
      if (options.floatTrim) {
         o.b = round(o.b!, options.floatTrim);
         o.r = round(o.r!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.waypoints[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.waypointsData.length; i++) {
      const o = data.content.waypointsData[i];
      deepClean(
         o.customData!,
         `difficulty.content.waypointsData[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.basicEvents.length; i++) {
      const o = data.content.basicEvents[i];
      if (options.floatTrim) {
         o.b = round(o.b!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.basicEvents[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.basicEventsData.length; i++) {
      const o = data.content.basicEventsData[i];
      if (options.floatTrim) {
         o.f = round(o.f!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.basicEventsData[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.colorBoostEvents.length; i++) {
      const o = data.content.colorBoostEvents[i];
      if (options.floatTrim) {
         o.b = round(o.b!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.colorBoostEvents[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.colorBoostEventsData.length; i++) {
      const o = data.content.colorBoostEventsData[i];
      deepClean(
         o.customData!,
         `difficulty.content.colorBoostEventsData[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.eventBoxGroups.length; i++) {
      const o = data.content.eventBoxGroups[i];
      if (options.floatTrim) {
         o.b = round(o.b!, options.floatTrim);
      }
      for (let j = 0; j < o.e!.length; j++) {
         const o2 = o.e![j];
         deepClean(
            o2.customData!,
            `lightshow.content.eventBoxGroups[${i}].e[${j}].customData`,
            options,
         );
         if (!Object.keys(o2.customData!).length) {
            delete o2.customData;
         }
      }
      deepClean(
         o.customData!,
         `difficulty.content.eventBoxGroups[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.indexFilters.length; i++) {
      const o = data.content.indexFilters[i];
      if (options.floatTrim) {
         o.l = round(o.l!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.indexFilters[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.lightColorEventBoxes.length; i++) {
      const o = data.content.lightColorEventBoxes[i];
      if (options.floatTrim) {
         o.s = round(o.s!, options.floatTrim);
         o.w = round(o.w!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.lightColorEventBoxes[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.lightColorEvents.length; i++) {
      const o = data.content.lightColorEvents[i];
      if (options.floatTrim) {
         o.b = round(o.b!, options.floatTrim);
         o.sb = round(o.sb!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.lightColorEvents[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.lightRotationEventBoxes.length; i++) {
      const o = data.content.lightRotationEventBoxes[i];
      if (options.floatTrim) {
         o.s = round(o.s!, options.floatTrim);
         o.w = round(o.w!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.lightRotationEventBoxes[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.lightRotationEvents.length; i++) {
      const o = data.content.lightRotationEvents[i];
      if (options.floatTrim) {
         o.r = round(o.r!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.lightRotationEvents[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.lightTranslationEventBoxes.length; i++) {
      const o = data.content.lightTranslationEventBoxes[i];
      if (options.floatTrim) {
         o.s = round(o.s!, options.floatTrim);
         o.w = round(o.w!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.lightTranslationEventBoxes[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.lightTranslationEvents.length; i++) {
      const o = data.content.lightTranslationEvents[i];
      if (options.floatTrim) {
         o.t = round(o.t!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.lightTranslationEvents[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.fxEventBoxes.length; i++) {
      const o = data.content.fxEventBoxes[i];
      if (options.floatTrim) {
         o.s = round(o.s!, options.floatTrim);
         o.w = round(o.w!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.fxEventBoxes[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (let i = 0; i < data.content.floatFxEvents.length; i++) {
      const o = data.content.floatFxEvents[i];
      if (options.floatTrim) {
         o.v = round(o.v!, options.floatTrim);
      }
      deepClean(
         o.customData!,
         `difficulty.content.floatFxEvents[${i}].customData`,
         options,
      );
      if (!Object.keys(o.customData!).length) {
         delete o.customData;
      }
      if (options.purgeZeros) purgeZeros(o);
   }
   for (const o1 of data.content.basicEventTypesWithKeywords.d!) {
      if (options.stringTrim) {
         o1.k = o1.k!.trim();
      }
   }
   deepClean(data.content.customData!, `lightshow.content.customData`, options);
   if (!Object.keys(data.content.customData!).length) {
      delete data.content.customData;
   }
}

export function cleanInfo(data: IInfo, options: ICleanOptions) {
   if (options.floatTrim) {
      data.audio.bpm = round(data.audio.bpm, options.floatTrim);
      data.audio.previewDuration = round(
         data.audio.previewDuration,
         options.floatTrim,
      );
      data.audio.previewStartTime = round(
         data.audio.previewStartTime,
         options.floatTrim,
      );
      data.audio.songDuration = round(
         data.audio.songDuration,
         options.floatTrim,
      );
   }

   if (options.stringTrim) {
      data.song.author = data.song.author.trim();
      data.song.title = data.song.title.trim();
      data.song.subTitle = data.song.subTitle.trim();
   }

   for (let i = 0; i < data.difficultyBeatmaps!.length; i++) {
      const diff = data.difficultyBeatmaps[i];
      if (options.floatTrim) {
         diff.noteJumpMovementSpeed = round(
            diff.noteJumpMovementSpeed,
            options.floatTrim,
         );
         diff.noteJumpStartBeatOffset = round(
            diff.noteJumpStartBeatOffset,
            options.floatTrim,
         );
      }
      if (options.stringTrim) {
         diff.beatmapAuthors.lighters = diff.beatmapAuthors.lighters.map((s) => s.trim());
         diff.beatmapAuthors.mappers = diff.beatmapAuthors.mappers.map((s) => s.trim());
      }

      deepClean(
         diff.customData!,
         `info.difficultyBeatmaps[${i}].customData`,
         options,
      );
      if (!Object.keys(diff.customData!).length) {
         delete diff.customData;
      }
   }

   deepClean(data.customData!, `info.customData`, options);
   if (!Object.keys(data.customData!).length) {
      delete data.customData;
   }
}
