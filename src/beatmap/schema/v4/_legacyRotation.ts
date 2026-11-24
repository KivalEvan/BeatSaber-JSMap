import { createRotationLaneLookup } from '../../helpers/rotation.ts';
import type { IWrapBeatmap } from '../wrapper/types/beatmap.ts';

// Internal to legacy-v4 migration. Keep the schema path independent of the
// version converters; serialization only changes its new output records.
export function legacyRotationLaneAt(data: IWrapBeatmap): (beat: number) => number {
   assertLegacyRotationOnly(data);
   return createRotationLaneLookup(data.difficulty.rotationEvents);
}

// Unsupported legacy tables have no defined precedence over native lanes.
// Reject mixed data during optional cleanup rather than choose an orientation.
export function assertLegacyRotationOnly(data: IWrapBeatmap): void {
   assertNoNativeLanes(data.difficulty.colorNotes);
   assertNoNativeLanes(data.difficulty.bombNotes);
   assertNoNativeLanes(data.difficulty.obstacles);
   assertNoNativeLanes(data.difficulty.arcs);
   assertNoNativeLanes(data.difficulty.chains);
   assertNoNativeLanes(data.lightshow.waypoints);
}

function assertNoNativeLanes(
   objects: readonly { laneRotation: number; tailLaneRotation?: number }[],
): void {
   for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      if (object.laneRotation || ('tailLaneRotation' in object && object.tailLaneRotation)) {
         throw new Error(
            'Cannot migrate legacy v4 rotation events mixed with nonzero native lanes: ' +
               'resolve the rotation representation before conversion or serialization.',
         );
      }
   }
}
