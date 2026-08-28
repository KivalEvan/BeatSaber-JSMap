import type { TimeProcessor } from '../beatmap/helpers/timeProcessor.ts';
import { getLogger } from '../logger.ts';
import type { IWrapBeatmap } from '../beatmap/schema/wrapper/types/beatmap.ts';

function tag(): string[] {
   return ['patch', 'removeOutsidePlayable'];
}

type TimeObject = { time?: number; b?: number };

function filterTime<T extends TimeObject>(
   objects: T[],
   property: 'time' | 'b',
   duration: number,
): T[] {
   const filtered: T[] = [];
   for (let i = 0, length = objects.length; i < length; i++) {
      if (!(i in objects)) continue;
      const obj = objects[i];
      const time = obj[property];
      if (duration ? !(time! < 0 || time! > duration) : !(time! < 0)) {
         filtered.push(obj);
      }
   }
   return filtered;
}

/**
 * Removes outside playable objects from beatmap given duration (seconds).
 */
export function removeOutsidePlayable<T extends IWrapBeatmap>(
   data: T,
   timeProc: TimeProcessor,
   audioLength: number,
) {
   const logger = getLogger();

   const duration = timeProc.toBeatTime(audioLength, true);
   logger?.tDebug(tag(), 'Removing outside playable BPM events');
   data.difficulty.bpmEvents = filterTime(data.difficulty.bpmEvents, 'time', duration);
   logger?.tDebug(tag(), 'Removing outside playable rotation events');
   data.difficulty.rotationEvents = filterTime(data.difficulty.rotationEvents, 'time', duration);
   logger?.tDebug(tag(), 'Removing outside playable color notes');
   data.difficulty.colorNotes = filterTime(data.difficulty.colorNotes, 'time', duration);
   logger?.tDebug(tag(), 'Removing outside playable bomb notes');
   data.difficulty.bombNotes = filterTime(data.difficulty.bombNotes, 'time', duration);
   logger?.tDebug(tag(), 'Removing outside playable obstacles');
   data.difficulty.obstacles = filterTime(data.difficulty.obstacles, 'time', duration);
   logger?.tDebug(tag(), 'Removing outside playable arcs');
   data.difficulty.arcs = filterTime(data.difficulty.arcs, 'time', duration);
   logger?.tDebug(tag(), 'Removing outside playable chains');
   data.difficulty.chains = filterTime(data.difficulty.chains, 'time', duration);
   logger?.tDebug(tag(), 'Removing outside playable waypoints');
   data.lightshow.waypoints = filterTime(data.lightshow.waypoints, 'time', duration);
   logger?.tDebug(tag(), 'Removing outside playable fake color notes');
   if (data.difficulty.customData.fakeColorNotes) {
      data.difficulty.customData.fakeColorNotes = filterTime(
         data.difficulty.customData.fakeColorNotes,
         'b',
         duration,
      );
   }
   logger?.tDebug(tag(), 'Removing outside playable fake bomb notes');
   if (data.difficulty.customData.fakeBombNotes) {
      data.difficulty.customData.fakeBombNotes = filterTime(
         data.difficulty.customData.fakeBombNotes,
         'b',
         duration,
      );
   }
   logger?.tDebug(tag(), 'Removing outside playable fake obstacles');
   if (data.difficulty.customData.fakeObstacles) {
      data.difficulty.customData.fakeObstacles = filterTime(
         data.difficulty.customData.fakeObstacles,
         'b',
         duration,
      );
   }
   logger?.tDebug(tag(), 'Removing outside playable fake chains');
   if (data.difficulty.customData.fakeBurstSliders) {
      data.difficulty.customData.fakeBurstSliders = filterTime(
         data.difficulty.customData.fakeBurstSliders,
         'b',
         duration,
      );
   }
   logger?.tDebug(tag(), 'Removing outside playable basic events');
   data.lightshow.basicEvents = filterTime(data.lightshow.basicEvents, 'time', duration);
   logger?.tDebug(tag(), 'Removing outside playable color boost beatmap events');
   data.lightshow.colorBoostEvents = filterTime(
      data.lightshow.colorBoostEvents,
      'time',
      duration,
   );
   logger?.tDebug(
      tag(),
      'Removing outside playable light color event box groups',
   );
   data.lightshow.lightColorEventBoxGroups = filterTime(
      data.lightshow.lightColorEventBoxGroups,
      'time',
      duration,
   );
   logger?.tDebug(
      tag(),
      'Removing outside playable light rotation event box groups',
   );
   data.lightshow.lightRotationEventBoxGroups = filterTime(
      data.lightshow.lightRotationEventBoxGroups,
      'time',
      duration,
   );
}
