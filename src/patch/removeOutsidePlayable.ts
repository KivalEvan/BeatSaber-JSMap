import type { TimeProcessor } from '../beatmap/helpers/timeProcessor.ts';
import { logger } from '../logger.ts';
import type { IWrapBaseObject } from '../beatmap/schema/wrapper/types/baseObject.ts';
import type { IWrapBeatmap } from '../beatmap/schema/wrapper/types/beatmap.ts';

function tag(): string[] {
   return ['patch', 'removeOutsidePlayable'];
}

let duration = 0;
const filterTime = <T extends IWrapBaseObject>(obj: T) =>
   duration ? !(obj.time < 0 || obj.time > duration) : !(obj.time < 0);

/**
 * Removes outside playable objects from beatmap given duration (seconds).
 */
export function removeOutsidePlayable<T extends IWrapBeatmap>(
   data: T,
   timeProc: TimeProcessor,
   audioLength: number,
) {
   duration = timeProc.toBeatTime(audioLength, true);
   logger.tDebug(tag(), 'Removing outside playable BPM events');
   data.difficulty.bpmEvents = data.difficulty.bpmEvents.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable rotation events');
   data.difficulty.rotationEvents = data.difficulty.rotationEvents.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable color notes');
   data.difficulty.colorNotes = data.difficulty.colorNotes.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable bomb notes');
   data.difficulty.bombNotes = data.difficulty.bombNotes.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable obstacles');
   data.difficulty.obstacles = data.difficulty.obstacles.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable arcs');
   data.difficulty.arcs = data.difficulty.arcs.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable chains');
   data.difficulty.chains = data.difficulty.chains.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable waypoints');
   data.lightshow.waypoints = data.lightshow.waypoints.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable fake color notes');
   if (data.difficulty.customData.fakeColorNotes) {
      data.difficulty.customData.fakeColorNotes = data.difficulty.customData.fakeColorNotes.filter((
         obj,
      ) => duration ? !(obj.b! < 0 || obj.b! > duration) : !(obj.b! < 0));
   }
   logger.tDebug(tag(), 'Removing outside playable fake bomb notes');
   if (data.difficulty.customData.fakeBombNotes) {
      data.difficulty.customData.fakeBombNotes = data.difficulty.customData.fakeBombNotes.filter((
         obj,
      ) => duration ? !(obj.b! < 0 || obj.b! > duration) : !(obj.b! < 0));
   }
   logger.tDebug(tag(), 'Removing outside playable fake obstacles');
   if (data.difficulty.customData.fakeObstacles) {
      data.difficulty.customData.fakeObstacles = data.difficulty.customData.fakeObstacles.filter((
         obj,
      ) => duration ? !(obj.b! < 0 || obj.b! > duration) : !(obj.b! < 0));
   }
   logger.tDebug(tag(), 'Removing outside playable fake chains');
   if (data.difficulty.customData.fakeBurstSliders) {
      data.difficulty.customData.fakeBurstSliders = data.difficulty.customData.fakeBurstSliders
         .filter((obj) => duration ? !(obj.b! < 0 || obj.b! > duration) : !(obj.b! < 0));
   }
   logger.tDebug(tag(), 'Removing outside playable basic events');
   data.lightshow.basicEvents = data.lightshow.basicEvents.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable color boost beatmap events');
   data.lightshow.colorBoostEvents = data.lightshow.colorBoostEvents.filter(filterTime);
   logger.tDebug(
      tag(),
      'Removing outside playable light color event box groups',
   );
   data.lightshow.lightColorEventBoxGroups = data.lightshow.lightColorEventBoxGroups.filter(
      filterTime,
   );
   logger.tDebug(
      tag(),
      'Removing outside playable light rotation event box groups',
   );
   data.lightshow.lightRotationEventBoxGroups = data.lightshow.lightRotationEventBoxGroups.filter(
      filterTime,
   );
}
