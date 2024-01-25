import {
   IOptimizeOptionsDifficulty,
   IOptimizeOptionsInfo,
   IOptimizeOptionsLightshow,
} from './types/bsmap/optimize.ts';
import logger from './logger.ts';
import {
   cleanDifficulty as cleanV1Difficulty,
   cleanInfo as cleanV1Info,
} from './beatmap/v1/clean.ts';
import {
   cleanDifficulty as cleanV2Difficulty,
   cleanInfo as cleanV2Info,
} from './beatmap/v2/clean.ts';
import {
   cleanDifficulty as cleanV3Difficulty,
   cleanLightshow as cleanV3Lightshow,
} from './beatmap/v3/clean.ts';
import {
   cleanDifficulty as cleanV4Difficulty,
   cleanInfo as cleanV4Info,
   cleanLightshow as cleanV4Lightshow,
} from './beatmap/v4/clean.ts';
import { ICleanOptions } from './types/beatmap/shared/clean.ts';
import { ILightshow } from './types/beatmap/v4/lightshow.ts';
import { EventBoxType } from './types/beatmap/shared/constants.ts';
import { IDifficulty } from './types/beatmap/v4/difficulty.ts';

function tag(name: string): string[] {
   return ['optimize', name];
}

const optionsInfo: Required<IOptimizeOptionsInfo> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   purgeZeros: true,
   deduplicate: false,
   throwError: true,
};
const optionsDifficulty: Required<IOptimizeOptionsDifficulty> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   purgeZeros: true,
   deduplicate: false,
   throwError: true,
};
const optionsLightshow: Required<IOptimizeOptionsLightshow> = {
   enabled: true,
   floatTrim: 4,
   stringTrim: true,
   purgeZeros: true,
   deduplicate: false,
   throwError: true,
};

/** Set default option value for optimize function. */
export const defaultOptions = {
   info: optionsInfo,
   difficulty: optionsDifficulty,
   lightshow: optionsLightshow,
};

export function info(
   // deno-lint-ignore no-explicit-any
   info: Record<string, any>,
   version: number,
   options: IOptimizeOptionsInfo = {},
) {
   const opt: Required<IOptimizeOptionsInfo> = {
      enabled: options.enabled ?? defaultOptions.info.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.info.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.info.stringTrim,
      purgeZeros: options.purgeZeros ?? defaultOptions.info.purgeZeros,
      deduplicate: options.deduplicate ?? defaultOptions.info.deduplicate,
      throwError: options.throwError ?? defaultOptions.info.throwError,
   };

   logger.tInfo(tag('info'), `Optimising info data`);

   // deno-lint-ignore no-explicit-any
   const clean: (data: any, opt: ICleanOptions) => void = version === 4
      ? cleanV4Info
      : version === 2
      ? cleanV2Info
      : version === 1
      ? cleanV1Info
      : () => {};
   clean(info, opt);
}

function remapDedupe<T>(data: T[]): [T[], Map<number, number>] {
   const newData: string[] = [];
   const remapIdx = new Map<number, number>();
   for (let i = 0; i < data.length; i++) {
      const str = JSON.stringify(data[i]);
      let idx = newData.indexOf(str);
      if (idx === -1) {
         idx = newData.length;
         newData.push(str);
      }
      remapIdx.set(i, idx);
   }
   return [newData.map((d) => JSON.parse(d)), remapIdx];
}

export function difficulty(
   // deno-lint-ignore no-explicit-any
   difficulty: Record<string, any>,
   version: number,
   options: IOptimizeOptionsDifficulty = {},
) {
   const opt: Required<IOptimizeOptionsDifficulty> = {
      enabled: options.enabled ?? defaultOptions.difficulty.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.difficulty.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.difficulty.stringTrim,
      purgeZeros: options.purgeZeros ?? defaultOptions.difficulty.purgeZeros,
      deduplicate: options.deduplicate ?? defaultOptions.difficulty.deduplicate,
      throwError: options.throwError ?? defaultOptions.difficulty.throwError,
   };

   logger.tInfo(tag('difficulty'), `Optimising difficulty data`);

   if (version === 4 && opt.deduplicate) {
      logger.tInfo(tag('difficulty'), 'Deduplicating beatmap object data');
      const data = difficulty as IDifficulty;
      const [newNoteColorData, remapColorNoteIdx] = remapDedupe(
         data.content.colorNotesData,
      );
      const [newBombNoteData, remapBombNoteIdx] = remapDedupe(
         data.content.bombNotesData,
      );
      const [newObstacleData, remapObstacleIdx] = remapDedupe(
         data.content.obstaclesData,
      );
      const [newChainData, remapChainIdx] = remapDedupe(
         data.content.chainsData,
      );
      const [newArcData, remapArcIdx] = remapDedupe(data.content.arcsData);

      data.content.colorNotes.forEach(
         (d) => (d.i = remapColorNoteIdx.get(d.i!)),
      );
      data.content.bombNotes.forEach((d) => (d.i = remapBombNoteIdx.get(d.i!)));
      data.content.obstacles.forEach((d) => (d.i = remapObstacleIdx.get(d.i!)));
      data.content.chains.forEach((d) => {
         d.ci = remapChainIdx.get(d.ci!);
         d.i = remapColorNoteIdx.get(d.i!);
      });
      data.content.arcs.forEach((d) => {
         d.ai = remapArcIdx.get(d.ai!);
         d.hi = remapColorNoteIdx.get(d.hi!);
         d.ti = remapColorNoteIdx.get(d.ti!);
      });

      data.content.colorNotesData = newNoteColorData;
      data.content.bombNotesData = newBombNoteData;
      data.content.obstaclesData = newObstacleData;
      data.content.chainsData = newChainData;
      data.content.arcsData = newArcData;
   }

   // deno-lint-ignore no-explicit-any
   const clean: (data: any, opt: ICleanOptions) => void = version === 4
      ? cleanV4Difficulty
      : version === 3
      ? cleanV3Difficulty
      : version === 2
      ? cleanV2Difficulty
      : version === 1
      ? cleanV1Difficulty
      : () => {};
   clean(difficulty, opt);
}

export function lightshow(
   // deno-lint-ignore no-explicit-any
   lightshow: Record<string, any>,
   version: number,
   options: IOptimizeOptionsLightshow = {},
) {
   const opt: Required<IOptimizeOptionsLightshow> = {
      enabled: options.enabled ?? defaultOptions.lightshow.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.lightshow.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.lightshow.stringTrim,
      purgeZeros: options.purgeZeros ?? defaultOptions.lightshow.purgeZeros,
      deduplicate: options.deduplicate ?? defaultOptions.lightshow.deduplicate,
      throwError: options.throwError ?? defaultOptions.lightshow.throwError,
   };

   logger.tInfo(tag('lightshow'), `Optimising lightshow data`);

   if (version === 4 && opt.deduplicate) {
      logger.tInfo(tag('lightshow'), 'Deduplicating beatmap object data');
      const data = lightshow as ILightshow;
      const [newBasicEventsData, remapBasicEventsIdx] = remapDedupe(
         data.content.basicEventsData,
      );
      const [newColorBoostEventsData, remapColorBoostEventsIdx] = remapDedupe(
         data.content.colorBoostEventsData,
      );
      const [newWaypointsData, remapWaypointsIdx] = remapDedupe(
         data.content.waypointsData,
      );
      const [newIndexFilters, remapIndexFiltersIdx] = remapDedupe(
         data.content.indexFilters,
      );
      const [newLightColorEventBoxes, remapLightColorEventBoxesIdx] = remapDedupe(
         data.content.lightColorEventBoxes,
      );
      const [newLightColorEvents, remapLightColorEventsIdx] = remapDedupe(
         data.content.lightColorEvents,
      );
      const [newLightRotationEventBoxes, remapLightRotationEventBoxesIdx] = remapDedupe(
         data.content.lightRotationEventBoxes,
      );
      const [newLightRotationEvents, remapLightRotationEventsIdx] = remapDedupe(
         data.content.lightRotationEvents,
      );
      const [
         newLightTranslationEventBoxes,
         remapLightTranslationEventBoxesIdx,
      ] = remapDedupe(data.content.lightTranslationEventBoxes);
      const [newLightTranslationEvents, remapLightTranslationEventsIdx] = remapDedupe(
         data.content.lightTranslationEvents,
      );
      const [newFxEventBoxes, remapFxEventBoxesIdx] = remapDedupe(
         data.content.fxEventBoxes,
      );
      const [newFloatFxEvents, remapFloatFxEventsIdx] = remapDedupe(
         data.content.floatFxEvents,
      );

      data.content.basicEvents.forEach(
         (d) => (d.i = remapBasicEventsIdx.get(d.i!)),
      );
      data.content.colorBoostEvents.forEach(
         (d) => (d.i = remapColorBoostEventsIdx.get(d.i!)),
      );
      data.content.waypoints.forEach(
         (d) => (d.i = remapWaypointsIdx.get(d.i!)),
      );
      for (const ebg of data.content.eventBoxGroups) {
         for (const evt of ebg.e!) {
            evt.f = remapIndexFiltersIdx.get(evt.f!);
            switch (ebg.t) {
               case EventBoxType.COLOR:
                  evt.e = remapLightColorEventBoxesIdx.get(evt.e!);
                  evt.l?.forEach(
                     (l) => (l.i = remapLightColorEventsIdx.get(l.i!)),
                  );
                  break;
               case EventBoxType.ROTATION:
                  evt.e = remapLightRotationEventBoxesIdx.get(evt.e!);
                  evt.l?.forEach(
                     (l) => (l.i = remapLightRotationEventsIdx.get(l.i!)),
                  );
                  break;
               case EventBoxType.TRANSLATION:
                  evt.e = remapLightTranslationEventBoxesIdx.get(evt.e!);
                  evt.l?.forEach(
                     (l) => (l.i = remapLightTranslationEventsIdx.get(l.i!)),
                  );
                  break;
               case EventBoxType.FX_FLOAT:
                  evt.e = remapFxEventBoxesIdx.get(evt.e!);
                  evt.l?.forEach(
                     (l) => (l.i = remapFloatFxEventsIdx.get(l.i!)),
                  );
            }
         }
      }

      data.content.basicEventsData = newBasicEventsData;
      data.content.colorBoostEventsData = newColorBoostEventsData;
      data.content.waypointsData = newWaypointsData;
      data.content.indexFilters = newIndexFilters;
      data.content.lightColorEventBoxes = newLightColorEventBoxes;
      data.content.lightColorEvents = newLightColorEvents;
      data.content.lightRotationEventBoxes = newLightRotationEventBoxes;
      data.content.lightRotationEvents = newLightRotationEvents;
      data.content.lightTranslationEventBoxes = newLightTranslationEventBoxes;
      data.content.lightTranslationEvents = newLightTranslationEvents;
      data.content.fxEventBoxes = newFxEventBoxes;
      data.content.floatFxEvents = newFloatFxEvents;
   }

   // deno-lint-ignore no-explicit-any
   const clean: (data: any, opt: ICleanOptions) => void = version === 4
      ? cleanV4Lightshow
      : version === 3
      ? cleanV3Lightshow
      : () => {};
   clean(lightshow, opt);
}
