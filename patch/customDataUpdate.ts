import type { Difficulty as V2Difficulty } from '../beatmap/v2/difficulty.ts';
import type { Difficulty as V3Difficulty } from '../beatmap/v3/difficulty.ts';
import { isV2, isV3 } from '../beatmap/version.ts';
import eventToV2 from '../converter/customData/eventToV2.ts';
import eventToV3 from '../converter/customData/eventToV3.ts';
import objectToV2 from '../converter/customData/objectToV2.ts';
import objectToV3 from '../converter/customData/objectToV3.ts';
import logger from '../logger.ts';
import type { IPointDefinition } from '../types/beatmap/v3/custom/pointDefinition.ts';
import type { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';
import type { ColorArray } from '../types/colors.ts';
import { colorFrom } from '../utils/colors.ts';

function tag(name: string): string[] {
   return ['patch', 'customDataUpdate', name];
}

function v2(data: V2Difficulty): void {
   logger.tDebug(tag('v2'), ' Patching notes');
   data.colorNotes.forEach((n) => {
      n.customData = objectToV2(n.customData);
   });
   logger.tDebug(tag('v2'), ' Patching obstacles');
   data.obstacles.forEach((o) => {
      o.customData = objectToV2(o.customData);
   });
   logger.tDebug(tag('v2'), ' Patching events');
   data.basicEvents.forEach((e) => {
      e.customData = eventToV2(e.customData);
      if (e.isLaserRotationEvent()) {
         if (typeof e.customData._preciseSpeed !== 'number') {
            delete e.customData._speed;
         }
      } else {
         delete e.customData._preciseSpeed;
      }
   });
}

function v3(data: V3Difficulty): void {
   logger.tDebug(tag('v3'), ' Patching color notes');
   data.colorNotes.forEach((n) => {
      n.customData = objectToV3(n.customData);
   });
   logger.tDebug(tag('v3'), ' Patching bomb notes');
   data.bombNotes.forEach((b) => {
      b.customData = objectToV3(b.customData);
   });
   logger.tDebug(tag('v3'), ' Patching obstacles');
   data.obstacles.forEach((o) => {
      o.customData = objectToV3(o.customData);
   });
   logger.tDebug(tag('v3'), ' Patching fake color notes');
   data.customData.fakeColorNotes?.forEach((n) => {
      n.customData = objectToV3(n.customData);
   });
   logger.tDebug(tag('v3'), ' Patching fake bomb notes');
   data.customData.fakeBombNotes?.forEach((b) => {
      b.customData = objectToV3(b.customData);
   });
   logger.tDebug(tag('v3'), ' Patching fake obstacles');
   data.customData.fakeObstacles?.forEach((o) => {
      o.customData = objectToV3(o.customData);
   });
   logger.tDebug(tag('v3'), ' Patching basic events');
   data.basicEvents.forEach((e) => {
      e.customData = eventToV3(e.customData);
   });
   logger.tDebug(tag('v3'), ' Patching bookmarks');
   data.customData.bookmarks?.forEach((b) => {
      if ('_time' in b && typeof b._time === 'number') {
         b.b ??= b._time as number;
         delete b._time;
      }
      if ('_name' in b && typeof b._name === 'string') {
         b.n ??= b._name as string;
         delete b._name;
      }
      if ('_color' in b && Array.isArray(b._color)) {
         try {
            b.c ??= colorFrom(b._color as ColorArray);
         } catch {
            // just try anyway
         }
         delete b._color;
      }
   });
   logger.tDebug(tag('v3'), ' Patching BPM changes');
   data.customData.BPMChanges?.forEach((bpmc) => {
      if ('_time' in bpmc && typeof bpmc._time === 'number') {
         bpmc.b ??= bpmc._time;
         delete bpmc._time;
      }
      if ('_BPM' in bpmc && typeof bpmc._BPM === 'number') {
         bpmc.m ??= bpmc._BPM;
         delete bpmc._BPM;
      }
      if ('_beatsPerBar' in bpmc && typeof bpmc._beatsPerBar === 'number') {
         bpmc.p ??= bpmc._beatsPerBar;
         delete bpmc._beatsPerBar;
      }
      if ('_metronomeOffset' in bpmc && typeof bpmc._metronomeOffset === 'number') {
         bpmc.o ??= bpmc._metronomeOffset;
         delete bpmc._metronomeOffset;
      }
   });
   logger.tDebug(tag('v3'), ' Patching environment');
   data.customData.environment?.forEach((env) => {
      if ('lightID' in env && typeof env.lightID === 'number') {
         const id = env.lightID as number;
         if (env.components) {
            if (env.components.ILightWithId) {
               env.components.ILightWithId.lightID ??= id;
            } else {
               env.components.ILightWithId = { lightID: id };
            }
         } else {
            env.components = { ILightWithId: { lightID: id } };
         }
         delete env.lightID;
      }
   });
   logger.tDebug(tag('v3'), ' Patching point definitions');
   if (Array.isArray(data.customData.pointDefinitions)) {
      const fixedObj: IPointDefinition = {};
      data.customData.pointDefinitions.forEach((pd) => (fixedObj[pd.name as string] = pd.points));
      data.customData.pointDefinitions = fixedObj;
   }
}

export default function (data: IWrapDifficulty) {
   if (isV2(data)) {
      logger.tInfo(['patch', 'customDataUpdate'], 'Patching custom data for beatmap v2...');
      v2(data);
   } else if (isV3(data)) {
      logger.tInfo(['patch', 'customDataUpdate'], 'Patching custom data for beatmap v3...');
      v3(data);
   }
}
