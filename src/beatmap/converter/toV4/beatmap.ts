import { getLogger } from '../../../logger.ts';
import type { IWrapBeatmap } from '../../schema/wrapper/types/beatmap.ts';
import { sortObjectFn } from '../../helpers/sort.ts';
import { ExecutionTime } from '../../schema/shared/types/constants.ts';
import { toV3Beatmap } from '../toV3/beatmap.ts';

function tag(name: string): string[] {
   return ['convert', 'toV4Beatmap', name];
}

/**
 * Convert to beatmap v4.
 * ```ts
 * const converted = toV4Beatmap(data);
 * ```
 *
 * **WARNING:** Custom data may be lost on conversion, as well as other incompatible attributes.
 */
export function toV4Beatmap<T extends IWrapBeatmap>(
   data: T,
   fromVersion = data.version,
): T {
   const logger = getLogger();

   logger?.tWarn(
      tag('main'),
      'As v4 is similar to v3, the conversion will use v3 convertor alongside.',
   );
   toV3Beatmap(data, fromVersion);
   data.version = 4;

   const objects = [
      data.difficulty.arcs,
      data.difficulty.bombNotes,
      data.difficulty.chains,
      data.difficulty.colorNotes,
      data.difficulty.obstacles,
      data.lightshow.waypoints,
   ]
      .flat()
      .sort(sortObjectFn);

   if (data.difficulty.rotationEvents.length) {
      const rotations = [...data.difficulty.rotationEvents]
         .sort((a, b) => a.executionTime - b.executionTime)
         .sort(sortObjectFn);

      let calculatedRotations = 0;
      for (const r of rotations) {
         calculatedRotations += r.rotation;
      }

      // tail rotation is not required to be calculated as it is not previously used
      for (let i = objects.length - 1; i >= 0; i--) {
         const obj = objects[i];
         let evt = rotations.at(-1);
         while (evt && evt.time > obj.time) {
            rotations.pop();
            calculatedRotations -= evt.rotation;
            evt = rotations.at(-1);
         }
         if (!evt) break;
         if (
            evt.time === obj.time &&
            evt.executionTime === ExecutionTime.EARLY
         ) {
            obj.laneRotation = Math.round(calculatedRotations % 360);
            if ('tailLaneRotation' in obj) {
               obj.tailLaneRotation = obj.laneRotation;
            }
            continue;
         }

         while (evt && evt.time >= obj.time) {
            rotations.pop();
            calculatedRotations -= evt.rotation;
            evt = rotations.at(-1);
         }
         if (!evt) break;
         obj.laneRotation = Math.round(calculatedRotations % 360);
         if ('tailLaneRotation' in obj) {
            obj.tailLaneRotation = obj.laneRotation;
         }
      }

      data.difficulty.rotationEvents = [];
   }

   for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];
      if (typeof obj.customData.worldRotation === 'number') {
         obj.laneRotation = Math.round(obj.customData.worldRotation);
         if ('tailLaneRotation' in obj) {
            obj.tailLaneRotation = obj.customData.worldRotation;
         }
         delete obj.customData.worldRotation;
      }
   }

   return data;
}
