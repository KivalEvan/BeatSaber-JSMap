import type { IOptimizeOptionsLightshow } from '../types/bsmap/optimize.ts';
import logger from '../logger.ts';
import { cleanLightshow as cleanV3Lightshow } from '../beatmap/v3/clean.ts';
import { cleanLightshow as cleanV4Lightshow } from '../beatmap/v4/clean.ts';
import type { ICleanOptions } from '../types/beatmap/shared/clean.ts';
import type { ILightshow } from '../types/beatmap/v4/lightshow.ts';
import { EventBoxType } from '../types/beatmap/shared/constants.ts';
import { defaultOptions } from './options.ts';
import { remapDedupe, tag } from './_common.ts';

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
         data.basicEventsData,
      );
      const [newColorBoostEventsData, remapColorBoostEventsIdx] = remapDedupe(
         data.colorBoostEventsData,
      );
      const [newWaypointsData, remapWaypointsIdx] = remapDedupe(
         data.waypointsData,
      );
      const [newIndexFilters, remapIndexFiltersIdx] = remapDedupe(
         data.indexFilters,
      );
      const [newLightColorEventBoxes, remapLightColorEventBoxesIdx] = remapDedupe(
         data.lightColorEventBoxes,
      );
      const [newLightColorEvents, remapLightColorEventsIdx] = remapDedupe(
         data.lightColorEvents,
      );
      const [newLightRotationEventBoxes, remapLightRotationEventBoxesIdx] = remapDedupe(
         data.lightRotationEventBoxes,
      );
      const [newLightRotationEvents, remapLightRotationEventsIdx] = remapDedupe(
         data.lightRotationEvents,
      );
      const [
         newLightTranslationEventBoxes,
         remapLightTranslationEventBoxesIdx,
      ] = remapDedupe(data.lightTranslationEventBoxes);
      const [newLightTranslationEvents, remapLightTranslationEventsIdx] = remapDedupe(
         data.lightTranslationEvents,
      );
      const [newFxEventBoxes, remapFxEventBoxesIdx] = remapDedupe(
         data.fxEventBoxes,
      );
      const [newFloatFxEvents, remapFloatFxEventsIdx] = remapDedupe(
         data.floatFxEvents,
      );

      data.basicEvents.forEach((d) => (d.i = remapBasicEventsIdx.get(d.i!)));
      data.colorBoostEvents.forEach(
         (d) => (d.i = remapColorBoostEventsIdx.get(d.i!)),
      );
      data.waypoints.forEach((d) => (d.i = remapWaypointsIdx.get(d.i!)));
      for (const ebg of data.eventBoxGroups) {
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

      data.basicEventsData = newBasicEventsData;
      data.colorBoostEventsData = newColorBoostEventsData;
      data.waypointsData = newWaypointsData;
      data.indexFilters = newIndexFilters;
      data.lightColorEventBoxes = newLightColorEventBoxes;
      data.lightColorEvents = newLightColorEvents;
      data.lightRotationEventBoxes = newLightRotationEventBoxes;
      data.lightRotationEvents = newLightRotationEvents;
      data.lightTranslationEventBoxes = newLightTranslationEventBoxes;
      data.lightTranslationEvents = newLightTranslationEvents;
      data.fxEventBoxes = newFxEventBoxes;
      data.floatFxEvents = newFloatFxEvents;
   }

   // deno-lint-ignore no-explicit-any
   const clean: (data: any, opt: ICleanOptions) => void = version === 4
      ? cleanV4Lightshow
      : version === 3
      ? cleanV3Lightshow
      : () => {};
   clean(lightshow, opt);
}
