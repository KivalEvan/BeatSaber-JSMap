import { getLogger } from '../../../logger.ts';
import type { IWrapBeatmap } from '../../schema/wrapper/types/beatmap.ts';
import { toV3Beatmap } from '../toV3/beatmap.ts';
import { createRotationLaneLookup, legacyRotationLaneAt } from '../../schema/v4/_legacyRotation.ts';

type RotationObject =
   | IWrapBeatmap['difficulty']['arcs' | 'bombNotes' | 'chains' | 'colorNotes' | 'obstacles'][
      number
   ]
   | IWrapBeatmap['lightshow']['waypoints'][number];

function assignTimelineRotations(
   objects: readonly RotationObject[],
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

function consumeScalarRotationOverrides(objects: readonly RotationObject[]): boolean {
   let consumed = false;
   for (let i = 0; i < objects.length; i++) {
      if (!(i in objects)) continue;
      const object = objects[i];
      if (typeof object.customData.worldRotation === 'number') {
         consumed = true;
         object.laneRotation = Math.round(object.customData.worldRotation);
         if ('tailLaneRotation' in object) {
            object.tailLaneRotation = object.laneRotation;
         }
      }
   }
   return consumed;
}

function removeScalarRotationOverrides(objects: readonly RotationObject[]): void {
   for (let i = 0; i < objects.length; i++) {
      if (!(i in objects)) continue;
      const object = objects[i];
      if (typeof object.customData.worldRotation === 'number') {
         delete object.customData.worldRotation;
      }
   }
}

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
 *
 * Current v4 data is left intact. Legacy event-only v4 rotations are replaced
 * with native object lanes in place.
 * @throws If legacy v4 events coexist with nonzero native lanes. Resolve these
 * representations explicitly before conversion.
 */
export function toV4Beatmap<T extends IWrapBeatmap>(
   data: T,
   fromVersion = data.version,
): T {
   if (fromVersion === 4) {
      if (data.difficulty.rotationEvents.length) {
         const laneAt = legacyRotationLaneAt(data);
         const colorNotes = data.difficulty.colorNotes;
         const bombNotes = data.difficulty.bombNotes;
         const obstacles = data.difficulty.obstacles;
         const arcs = data.difficulty.arcs;
         const chains = data.difficulty.chains;
         const waypoints = data.lightshow.waypoints;
         assignTimelineRotations(colorNotes, laneAt, false);
         assignTimelineRotations(bombNotes, laneAt, false);
         assignTimelineRotations(obstacles, laneAt, false);
         assignTimelineRotations(arcs, laneAt, false);
         assignTimelineRotations(chains, laneAt, false);
         assignTimelineRotations(waypoints, laneAt, false);
         data.difficulty.rotationEvents = [];
      }
      data.version = 4;
      return data;
   }
   const logger = getLogger();

   logger?.tWarn(
      tag('main'),
      'As v4 is similar to v3, the conversion will use v3 convertor alongside.',
   );
   toV3Beatmap(data, fromVersion);
   data.version = 4;

   const arcs = data.difficulty.arcs;
   const bombNotes = data.difficulty.bombNotes;
   const chains = data.difficulty.chains;
   const colorNotes = data.difficulty.colorNotes;
   const obstacles = data.difficulty.obstacles;
   const waypoints = data.lightshow.waypoints;

   if (data.difficulty.rotationEvents.length) {
      const laneAt = createRotationLaneLookup(data.difficulty.rotationEvents);
      assignTimelineRotations(arcs, laneAt, true);
      assignTimelineRotations(bombNotes, laneAt, true);
      assignTimelineRotations(chains, laneAt, true);
      assignTimelineRotations(colorNotes, laneAt, true);
      assignTimelineRotations(obstacles, laneAt, true);
      assignTimelineRotations(waypoints, laneAt, true);

      data.difficulty.rotationEvents = [];
   }

   let consumedScalarOverride = consumeScalarRotationOverrides(arcs);
   consumedScalarOverride = consumeScalarRotationOverrides(bombNotes) || consumedScalarOverride;
   consumedScalarOverride = consumeScalarRotationOverrides(chains) || consumedScalarOverride;
   consumedScalarOverride = consumeScalarRotationOverrides(colorNotes) || consumedScalarOverride;
   consumedScalarOverride = consumeScalarRotationOverrides(obstacles) || consumedScalarOverride;
   consumedScalarOverride = consumeScalarRotationOverrides(waypoints) || consumedScalarOverride;
   // Indexed metadata can be shared in transfer mode. Every object must consume
   // the override before its removal, without replacing any custom-data alias.
   if (consumedScalarOverride) {
      removeScalarRotationOverrides(arcs);
      removeScalarRotationOverrides(bombNotes);
      removeScalarRotationOverrides(chains);
      removeScalarRotationOverrides(colorNotes);
      removeScalarRotationOverrides(obstacles);
      removeScalarRotationOverrides(waypoints);
   }

   return data;
}
