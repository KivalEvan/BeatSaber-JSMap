import type { IWrapBeatmap } from '../schema/wrapper/types/beatmap.ts';
import { assertLegacyRotationOnly } from '../schema/v4/_legacyRotation.ts';

function sameLane(a: number, b: number): boolean {
   return a === b || (a - b) % 360 === 0;
}

// Internal v4 downgrade planner. No object is changed until every required
// endpoint is known to be representable by one global timeline.
export function convertV4Rotation(
   bm: IWrapBeatmap,
   overrideKey: 'worldRotation' | '_rotation',
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
      // Neither spelling of an existing absolute override is a native constraint.
      if (obj.customData[overrideKey] !== undefined || obj.customData.worldRotation !== undefined) {
         continue;
      }
      samples.push(obj);
      if ('tailLaneRotation' in obj) {
         samples.push({ time: obj.tailTime, laneRotation: obj.tailLaneRotation });
      }
   }
   samples.sort((a, b) => a.time - b.time);

   let conflict = false;
   let lanes: Record<number, number> = {};
   for (let i = 0; i < samples.length; i++) {
      const { time, laneRotation } = samples[i];
      if (!(time in lanes)) {
         lanes[time] = laneRotation;
      } else if (!sameLane(lanes[time], laneRotation)) {
         conflict = true;
         break;
      }
   }

   if (conflict) {
      lanes = {};
      let hasRequiredEndpoints = false;
      // Transferred indexed metadata can be shared by several objects. A
      // single absolute override can represent that alias group only when all
      // of its endpoints have the same orientation.
      const sharedLanes = new Map<object, number | null>();
      for (let i = 0; i < objects.length; i++) {
         const obj = objects[i];
         if (
            obj.customData[overrideKey] !== undefined || obj.customData.worldRotation !== undefined
         ) {
            continue;
         }
         const lane = sharedLanes.get(obj.customData);
         if (
            lane === null || (lane !== undefined && !sameLane(lane, obj.laneRotation)) ||
            ('tailLaneRotation' in obj && !sameLane(obj.laneRotation, obj.tailLaneRotation))
         ) {
            sharedLanes.set(obj.customData, null);
         } else {
            sharedLanes.set(obj.customData, obj.laneRotation);
         }
      }
      for (let i = 0; i < objects.length; i++) {
         const obj = objects[i];
         if (sharedLanes.get(obj.customData) !== null) continue;
         hasRequiredEndpoints = true;
         const endpoints = [[obj.time, obj.laneRotation]];
         if ('tailLaneRotation' in obj) endpoints.push([obj.tailTime, obj.tailLaneRotation]);
         for (const [time, rotation] of endpoints) {
            if (time in lanes && !sameLane(lanes[time], rotation)) {
               throw new Error(
                  `Cannot convert conflicting rotation constraints at beat ${time}: ` +
                     `lanes ${lanes[time]} and ${rotation} require different global rotations ` +
                     'to preserve unequal slider endpoints or shared custom data.',
               );
            }
            if (!(time in lanes)) lanes[time] = rotation;
         }
      }

      // Preserve the established all-override fallback when there are no
      // unequal endpoints. Otherwise their hard constraints take precedence;
      // notes and equal-ended sliders can use independent absolute overrides.
      if (hasRequiredEndpoints) {
         for (let i = 0; i < samples.length; i++) {
            const { time, laneRotation } = samples[i];
            if (!(time in lanes)) lanes[time] = laneRotation;
         }
      }
      for (let i = 0; i < objects.length; i++) {
         const obj = objects[i];
         if (
            obj.customData[overrideKey] !== undefined || obj.customData.worldRotation !== undefined
         ) {
            continue;
         }
         const needsOverride = hasRequiredEndpoints
            ? !sameLane(obj.laneRotation, lanes[obj.time]) ||
               ('tailLaneRotation' in obj && !sameLane(obj.tailLaneRotation, lanes[obj.tailTime]))
            : !!obj.laneRotation;
         if (needsOverride) {
            // Zero is also an absolute override when the timeline is nonzero.
            obj.customData[overrideKey] = obj.laneRotation;
         }
      }
      if (!hasRequiredEndpoints) samples.length = 0;
   }

   if (samples.length || !conflict) {
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
