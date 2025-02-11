import { round } from '../../../../utils/math/helpers.ts';
import type { IDifficulty } from '../../../../types/beatmap/v3/difficulty.ts';
import type { IOptimizeOptions } from '../../../../types/beatmap/options/optimize.ts';
import { deepClean, purgeZeros, remapDedupe } from '../../../helpers/optimize.ts';
import { isEmpty } from '../../../../utils/misc/json.ts';

/**
 * Optimize v3 `Difficulty` schema data.
 */
export function optimizeDifficulty(
   data: IDifficulty,
   options: IOptimizeOptions,
) {
   if (options.deduplicate) {
      const [newFloatFxEvents, remapFloatFxEventsIdx] = remapDedupe(
         data._fxEventsCollection!._fl!,
      );

      const vfxebg = data.vfxEventBoxGroups || [];
      for (let i = 0; i < vfxebg.length; i++) {
         const d = vfxebg[i].e || [];
         for (let j = 0; j < d.length; j++) {
            const e = d[j];
            e.l = e.l?.map((i) => remapFloatFxEventsIdx.get(i) || 0) ?? [];
         }
      }

      data._fxEventsCollection!._fl = newFloatFxEvents;
   }

   // deno-lint-ignore no-explicit-any
   const d = data as Record<string, any>;
   for (let i1 = 0; i1 < d.bpmEvents!.length; i1++) {
      const o1 = d.bpmEvents[i1];
      deepClean(
         o1.customData!,
         `difficulty.bpmEvents[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.rotationEvents!.length; i1++) {
      const o1 = d.rotationEvents[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
         o1.r = round(o1.r, options.floatTrim);
      }
      deepClean(
         o1.customData!,
         `difficulty.rotationEvents[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.colorNotes!.length; i1++) {
      const o1 = d.colorNotes[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
      }
      deepClean(
         o1.customData!,
         `difficulty.colorNotes[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.bombNotes!.length; i1++) {
      const o1 = d.bombNotes[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
      }
      deepClean(
         o1.customData!,
         `difficulty.bombNotes[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.obstacles!.length; i1++) {
      const o1 = d.obstacles[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
         o1.d = round(o1.d, options.floatTrim);
      }
      deepClean(
         o1.customData!,
         `difficulty.obstacles[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.sliders!.length; i1++) {
      const o1 = d.sliders[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
         o1.tb = round(o1.tb, options.floatTrim);
         o1.mu = round(o1.mu, options.floatTrim);
         o1.tmu = round(o1.tmu, options.floatTrim);
      }
      deepClean(
         o1.customData!,
         `difficulty.sliders[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.burstSliders!.length; i1++) {
      const o1 = d.burstSliders[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
         o1.tb = round(o1.tb, options.floatTrim);
         o1.s = round(o1.s, options.floatTrim);
      }
      deepClean(
         o1.customData!,
         `difficulty.burstSliders[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.waypoints!.length; i1++) {
      const o1 = d.waypoints[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
      }
      deepClean(
         o1.customData!,
         `difficulty.waypoints[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.basicBeatmapEvents!.length; i1++) {
      const o1 = d.basicBeatmapEvents[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
         o1.f = round(o1.f, options.floatTrim);
      }
      deepClean(
         o1.customData!,
         `difficulty.basicBeatmapEvents[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.colorBoostBeatmapEvents!.length; i1++) {
      const o1 = d.colorBoostBeatmapEvents[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
      }
      deepClean(
         o1.customData!,
         `difficulty.colorBoostBeatmapEvents[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (!o1.o) delete (o1 as Partial<typeof o1>).o;
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.lightColorEventBoxGroups!.length; i1++) {
      const o1 = d.lightColorEventBoxGroups[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
      }
      for (let i2 = 0; i2 < o1.e!.length; i2++) {
         const o2 = o1.e[i2];
         if (options.floatTrim) {
            o2.r = round(o2.r, options.floatTrim);
            o2.w = round(o2.w, options.floatTrim);
            o2.f.l = round(o2.f.l, options.floatTrim);
         }
         for (let i3 = 0; i3 < o2.e!.length; i3++) {
            const o3 = o2.e[i3];
            if (options.floatTrim) {
               o3.b = round(o3.b, options.floatTrim);
               o3.s = round(o3.s, options.floatTrim);
               o3.sb = round(o3.sb, options.floatTrim);
            }
            deepClean(
               o3.customData!,
               `difficulty.lightColorEventBoxGroups[${i1}].e[${i2}].e[${i3}].customData`,
               options,
            );
            if (isEmpty(o3.customData!)) {
               delete o3.customData;
            }
            if (options.purgeZeros) purgeZeros(o3);
         }
         deepClean(
            o2.f.customData!,
            `difficulty.lightRotationEventBoxGroups[${i2}].e[${i2}].customData`,
            options,
         );
         if (isEmpty(o2.f.customData!)) {
            delete o2.f.customData;
         }
         if (options.purgeZeros) purgeZeros(o2.f);
         deepClean(
            o2.customData!,
            `difficulty.lightColorEventBoxGroups[${i1}].e[${i2}].customData`,
            options,
         );
         if (isEmpty(o2.customData!)) {
            delete o2.customData;
         }
         if (options.purgeZeros) purgeZeros(o2);
      }
      deepClean(
         o1.customData!,
         `difficulty.lightColorEventBoxGroups[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.lightRotationEventBoxGroups!.length; i1++) {
      const o1 = d.lightRotationEventBoxGroups[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
      }
      for (let i2 = 0; i2 < o1.e!.length; i2++) {
         const o2 = o1.e[i2];
         if (options.floatTrim) {
            o2.s = round(o2.s, options.floatTrim);
            o2.w = round(o2.w, options.floatTrim);
            o2.f.l = round(o2.f.l, options.floatTrim);
         }
         for (let i3 = 0; i3 < o2.l!.length; i3++) {
            const o3 = o2.l[i3];
            if (options.floatTrim) {
               o3.b = round(o3.b, options.floatTrim);
               o3.r = round(o3.r, options.floatTrim);
            }
            deepClean(
               o3.customData!,
               `difficulty.lightRotationEventBoxGroups[${i3}].e[${i2}].l[${i3}].customData`,
               options,
            );
            if (isEmpty(o3.customData!)) {
               delete o3.customData;
            }
            if (options.purgeZeros) purgeZeros(o3);
         }
         deepClean(
            o2.f.customData!,
            `difficulty.lightRotationEventBoxGroups[${i2}].e[${i2}].customData`,
            options,
         );
         if (isEmpty(o2.f.customData!)) {
            delete o2.f.customData;
         }
         if (options.purgeZeros) purgeZeros(o2.f);
         deepClean(
            o2.customData!,
            `difficulty.lightRotationEventBoxGroups[${i2}].e[${i2}].customData`,
            options,
         );
         if (isEmpty(o2.customData!)) {
            delete o2.customData;
         }
         if (options.purgeZeros) purgeZeros(o2);
      }
      deepClean(
         o1.customData!,
         `difficulty.lightRotationEventBoxGroups[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.lightTranslationEventBoxGroups!.length; i1++) {
      const o1 = d.lightTranslationEventBoxGroups[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
      }
      for (let i2 = 0; i2 < o1.e!.length; i2++) {
         const o2 = o1.e[i2];
         if (options.floatTrim) {
            o2.s = round(o2.s, options.floatTrim);
            o2.w = round(o2.w, options.floatTrim);
            o2.f.l = round(o2.f.l, options.floatTrim);
         }
         for (let i3 = 0; i3 < o2.l!.length; i3++) {
            const o3 = o2.l[i3];
            if (options.floatTrim) {
               o3.b = round(o3.b, options.floatTrim);
               o3.t = round(o3.t, options.floatTrim);
            }
            deepClean(
               o3.customData!,
               `difficulty.lightTranslationEventBoxGroups[${i1}].e[${i2}].l[${i3}].customData`,
               options,
            );
            if (isEmpty(o3.customData!)) {
               delete o3.customData;
            }
            if (options.purgeZeros) purgeZeros(o3);
         }
         deepClean(
            o2.f.customData!,
            `difficulty.lightRotationEventBoxGroups[${i2}].e[${i2}].customData`,
            options,
         );
         if (isEmpty(o2.f.customData!)) {
            delete o2.f.customData;
         }
         if (options.purgeZeros) purgeZeros(o2.f);
         deepClean(
            o2.customData!,
            `difficulty.lightTranslationEventBoxGroups[${i1}].e[${i2}].customData`,
            options,
         );
         if (isEmpty(o2.customData!)) {
            delete o2.customData;
         }
         if (options.purgeZeros) purgeZeros(o2);
      }
      deepClean(
         o1.customData!,
         `difficulty.lightTranslationEventBoxGroups[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d.vfxEventBoxGroups!.length; i1++) {
      const o1 = d.vfxEventBoxGroups[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
      }
      for (let i2 = 0; i2 < o1.e!.length; i2++) {
         const o2 = o1.e[i2];
         if (options.floatTrim) {
            o2.s = round(o2.s, options.floatTrim);
            o2.w = round(o2.w, options.floatTrim);
            o2.f.l = round(o2.f.l, options.floatTrim);
         }
         deepClean(
            o2.f.customData!,
            `difficulty.lightRotationEventBoxGroups[${i2}].e[${i2}].customData`,
            options,
         );
         if (isEmpty(o2.f.customData!)) {
            delete o2.f.customData;
         }
         if (options.purgeZeros) purgeZeros(o2.f);
         deepClean(
            o2.customData!,
            `difficulty.vfxEventBoxGroups[${i1}].e[${i2}].customData`,
            options,
         );
         if (isEmpty(o2.customData!)) {
            delete o2.customData;
         }
         if (options.purgeZeros) purgeZeros(o2);
      }
      deepClean(
         o1.customData!,
         `difficulty.vfxEventBoxGroups[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d._fxEventsCollection._fl!.length; i1++) {
      const o1 = d._fxEventsCollection._fl[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
         o1.v = round(o1.v, options.floatTrim);
      }
      deepClean(
         o1.customData!,
         `difficulty._fxEventsCollection._fl[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < d._fxEventsCollection._il!.length; i1++) {
      const o1 = d._fxEventsCollection._il[i1];
      if (options.floatTrim) {
         o1.b = round(o1.b, options.floatTrim);
      }
      deepClean(
         o1.customData!,
         `difficulty._fxEventsCollection._il[${i1}].customData`,
         options,
      );
      if (isEmpty(o1.customData!)) {
         delete o1.customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (const o1 of d.basicEventTypesWithKeywords.d) {
      if (options.stringTrim) {
         o1.k = o1.k.trim();
      }
   }
   deepClean(d.customData!, `difficulty.customData`, options);
   if (isEmpty(d.customData!)) {
      delete d.customData;
   }
}
