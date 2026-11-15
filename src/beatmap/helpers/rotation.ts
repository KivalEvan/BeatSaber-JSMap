import type {
   IWrapBaseSlider,
   IWrapBeatmap,
   IWrapGridObject,
   IWrapRotationEvent,
} from '../schema/wrapper/types/mod.ts';
import { assertLegacyRotationOnly } from '../schema/v4/_legacyRotation.ts';

/** Creates a mapper function that derives lane rotation properties from grid objects based on legacy rotation events. */
export function createRotationLaneLookup<T extends IWrapRotationEvent>(
   rotationEvents: readonly T[],
): (beat: number) => number {
   const events = [...rotationEvents].sort(
      (a, b) => a.time - b.time || a.executionTime - b.executionTime,
   );
   let rotation = 0;
   const rotations = events.map((event) => {
      rotation += event.rotation;
      return Math.round(rotation % 360);
   });
   // Binary search allows serializers to retain their authored object order.
   // The cumulative sum stays unrounded; only the final i32 lane is quantized.
   return (beat: number): number => {
      let low = 0;
      let high = events.length;
      while (low < high) {
         const mid = (low + high) >>> 1;
         const event = events[mid];
         if (event.time < beat || (event.time === beat && event.executionTime === 0)) {
            low = mid + 1;
         } else {
            high = mid;
         }
      }
      return low ? rotations[low - 1] : 0;
   };
}

/** Mutably applies lane rotation properties to object collections based on a mapper function. */
export function assignTimelineRotations<T extends IWrapGridObject | IWrapBaseSlider>(
   objects: readonly T[],
   laneAt: (beat: number) => number,
   skipHoles: boolean,
): void {
   for (let i = 0; i < objects.length; i++) {
      if (skipHoles && !(i in objects)) continue;
      const object = objects[i];
      object.laneRotation = laneAt(object.time);
      if ('tailLaneRotation' in object) {
         // The v3 game loader samples BeatToRotation independently for each endpoint.
         object.tailLaneRotation = laneAt(object.tailTime);
      }
   }
}

function sameLane(a: number, b: number): boolean {
   return a === b || (a - b) % 360 === 0;
}

/** Backports lane rotation object properties to a global timeline of rotation events. */
export function convertV4Rotation<T extends IWrapBeatmap>(
   bm: T,
): void {
   if (bm.difficulty.rotationEvents.length) {
      assertLegacyRotationOnly(bm);
      return;
   }

   const objects = [
      bm.difficulty.arcs,
      bm.difficulty.bombNotes,
      bm.difficulty.chains,
      bm.difficulty.colorNotes,
      bm.difficulty.obstacles,
      bm.lightshow.waypoints,
   ].flat();
   const samples: { time: number; laneRotation: number }[] = [];
   for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];
      samples.push(obj);
      if ('tailLaneRotation' in obj) {
         samples.push({ time: obj.tailTime, laneRotation: obj.tailLaneRotation });
      }
   }
   samples.sort((a, b) => a.time - b.time);

   const lanes: Record<number, number> = {};
   for (let i = 0; i < samples.length; i++) {
      const { time, laneRotation } = samples[i];
      if (!(time in lanes)) {
         lanes[time] = laneRotation;
      } else if (!sameLane(lanes[time], laneRotation)) {
         throw new Error(
            `Cannot convert conflicting rotation constraints at beat ${time}: ` +
               `lanes ${lanes[time]} and ${laneRotation} require different global rotations.`,
         );
      }
   }

   if (samples.length) {
      bm.difficulty.rotationEvents = [];
      let currentRotation = 0;
      for (let i = 0; i < samples.length; i++) {
         const { time } = samples[i];
         const laneRotation = lanes[time];
         const difference = laneRotation - currentRotation;
         if (difference === 0) continue;
         currentRotation = laneRotation;
         bm.difficulty.rotationEvents.push({
            time,
            rotation: difference,
            executionTime: 0,
            customData: {},
         });
      }
   }
   for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];
      obj.laneRotation = 0;
      if ('tailLaneRotation' in obj) obj.tailLaneRotation = 0;
   }
}
