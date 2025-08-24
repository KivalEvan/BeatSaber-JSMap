import { round } from '../../../../utils/math/helpers.ts';
import type { IOptimizeOptions } from '../../../mapping/types/optimize.ts';
import type { IDifficulty } from '../types/difficulty.ts';
import { deepClean, purgeZeros } from '../../../helpers/optimize.ts';
import { isEmpty } from '../../../../utils/misc/json.ts';

/**
 * Optimize v2 `Difficulty` schema data.
 */
export function optimizeDifficulty(
   // deno-lint-ignore no-explicit-any
   data: Record<string, any> | IDifficulty,
   options: IOptimizeOptions,
) {
   for (let i1 = 0; i1 < data._notes!.length; i1++) {
      const o1 = data._notes[i1];
      if (options.floatTrim) {
         o1._time = round(o1._time, options.floatTrim);
      }
      deepClean(o1._customData!, `difficulty._notes[${i1}]._customData`, options);
      if (isEmpty(o1._customData!)) {
         delete o1._customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < data._obstacles!.length; i1++) {
      const o1 = data._obstacles[i1];
      if (options.floatTrim) {
         o1._time = round(o1._time, options.floatTrim);
         o1._duration = round(o1._duration, options.floatTrim);
      }
      deepClean(o1._customData!, `difficulty._obstacles[${i1}]._customData`, options);
      if (isEmpty(o1._customData!)) {
         delete o1._customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < data._sliders!.length; i1++) {
      const o1 = data._sliders[i1];
      if (options.floatTrim) {
         o1._headTime = round(o1._headTime, options.floatTrim);
         o1._tailTime = round(o1._tailTime, options.floatTrim);
         o1._headControlPointLengthMultiplier = round(
            o1._headControlPointLengthMultiplier,
            options.floatTrim,
         );
         o1._tailControlPointLengthMultiplier = round(
            o1._tailControlPointLengthMultiplier,
            options.floatTrim,
         );
      }
      deepClean(o1._customData!, `difficulty._sliders[${i1}]._customData`, options);
      if (isEmpty(o1._customData!)) {
         delete o1._customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < data._waypoints!.length; i1++) {
      const o1 = data._waypoints[i1];
      if (options.floatTrim) {
         o1._time = round(o1._time, options.floatTrim);
      }
      deepClean(o1._customData!, `difficulty._waypoints[${i1}]._customData`, options);
      if (isEmpty(o1._customData!)) {
         delete o1._customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   for (let i1 = 0; i1 < data._events!.length; i1++) {
      const o1 = data._events[i1];
      if (options.floatTrim && o1._type !== 100) {
         o1._time = round(o1._time, options.floatTrim);
         o1._floatValue = round(o1._floatValue, options.floatTrim);
      }
      deepClean(o1._customData!, `difficulty._events[${i1}]._customData`, options);
      if (isEmpty(o1._customData!)) {
         delete o1._customData;
      }
      if (options.purgeZeros) purgeZeros(o1);
   }
   deepClean(data._customData!, 'difficulty._customData', options);
   if (isEmpty(data._customData!)) {
      delete data._customData;
   }
}
