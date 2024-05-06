import { isV3 } from '../beatmap/version.ts';
import logger from '../logger.ts';
import type { TimeProcessor } from '../beatmap/shared/timeProcessor.ts';
import type { IWrapBaseObject } from '../types/beatmap/wrapper/baseObject.ts';
import type { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';

function tag(): string[] {
   return ['patch', 'removeOutsidePlayable'];
}

let duration = 0;
const filterTime = <T extends IWrapBaseObject>(obj: T) =>
   duration ? !(obj.time < 0 || obj.time > duration) : !(obj.time < 0);

export default function (data: IWrapDifficulty, bpm: TimeProcessor, audioLength: number) {
   duration = bpm.toBeatTime(audioLength, true);
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
   if (isV3(data)) {
      if (data.customData.fakeColorNotes) {
         data.customData.fakeColorNotes = data.customData.fakeColorNotes.filter((obj) =>
            duration ? !(obj.b! < 0 || obj.b! > duration) : !(obj.b! < 0)
         );
      }
      logger.tDebug(tag(), 'Removing outside playable fake bomb notes');
      if (data.customData.fakeBombNotes) {
         data.customData.fakeBombNotes = data.customData.fakeBombNotes.filter((obj) =>
            duration ? !(obj.b! < 0 || obj.b! > duration) : !(obj.b! < 0)
         );
      }
      logger.tDebug(tag(), 'Removing outside playable fake obstacles');
      if (data.customData.fakeObstacles) {
         data.customData.fakeObstacles = data.customData.fakeObstacles.filter((obj) =>
            duration ? !(obj.b! < 0 || obj.b! > duration) : !(obj.b! < 0)
         );
      }
      logger.tDebug(tag(), 'Removing outside playable fake chains');
      if (data.customData.fakeBurstSliders) {
         data.customData.fakeBurstSliders = data.customData.fakeBurstSliders.filter((obj) =>
            duration ? !(obj.b! < 0 || obj.b! > duration) : !(obj.b! < 0)
         );
      }
   }
   logger.tDebug(tag(), 'Removing outside playable basic events');
   data.basicEvents = data.basicEvents.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable color boost beatmap events');
   data.colorBoostEvents = data.colorBoostEvents.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable light color event box groups');
   data.lightColorEventBoxGroups = data.lightColorEventBoxGroups.filter(filterTime);
   logger.tDebug(tag(), 'Removing outside playable light rotation event box groups');
   data.lightRotationEventBoxGroups = data.lightRotationEventBoxGroups.filter(filterTime);
}
