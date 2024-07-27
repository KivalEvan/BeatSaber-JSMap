import { logger } from '../logger.ts';
import type { TimeProcessor } from '../beatmap/helpers/timeProcessor.ts';
import type { IWrapBaseObject } from '../types/beatmap/wrapper/baseObject.ts';
import type { IWrapBeatmap } from '../types/beatmap/wrapper/beatmap.ts';

function tag(): string[] {
   return ['patch', 'removeOutsidePlayable'];
}

let duration = 0;
const filterTime = <T extends IWrapBaseObject>(obj: T) =>
   duration ? !(obj.time < 0 || obj.time > duration) : !(obj.time < 0);

/**
 * Removes outside playable objects from beatmap given duration (seconds).
 */
export function removeOutsidePlayable(
   data: IWrapBeatmap,
   timeProc: TimeProcessor,
   audioLength: number,
) {
   duration = timeProc.toBeatTime(audioLength, true);
   logger.tDebug(tag(), 'Removing outside playable BPM events');
   data.bpmEvents = data.bpmEvents.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable rotation events');
   data.rotationEvents = data.rotationEvents.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable color notes');
   data.colorNotes = data.colorNotes.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable bomb notes');
   data.bombNotes = data.bombNotes.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable obstacles');
   data.obstacles = data.obstacles.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable arcs');
   data.arcs = data.arcs.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable chains');
   data.chains = data.chains.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable waypoints');
   data.waypoints = data.waypoints.filter(filterTime);
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
   data.basicEvents = data.basicEvents.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable color boost beatmap events');
   data.colorBoostEvents = data.colorBoostEvents.filter(filterTime);
   logger.tDebug(
      tag(),
      'Removing outside playable light color event box groups',
   );
   data.lightColorEventBoxGroups = data.lightColorEventBoxGroups.filter(filterTime);
   logger.tDebug(
      tag(),
      'Removing outside playable light rotation event box groups',
   );
   data.lightRotationEventBoxGroups = data.lightRotationEventBoxGroups.filter(filterTime);
}
