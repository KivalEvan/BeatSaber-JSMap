import type { IDifficulty } from '../../schema/v2/types/difficulty.ts';
import type { IWrapBasicEvent } from '../wrapper/types/basicEvent.ts';
import type { IWrapBeatmap } from '../wrapper/types/beatmap.ts';
import type { IWrapBombNote } from '../wrapper/types/bombNote.ts';
import type { IWrapBPMEvent } from '../wrapper/types/bpmEvent.ts';
import type { IWrapColorBoostEvent } from '../wrapper/types/colorBoostEvent.ts';
import type { IWrapColorNote } from '../wrapper/types/colorNote.ts';
import type { IWrapRotationEvent } from '../wrapper/types/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBeatmap } from '../wrapper/beatmap.ts';
import { sortV2NoteFn, sortV2ObjectFn } from '../../helpers/sort.ts';
import { compareVersion } from '../../helpers/version.ts';
import { serializeArc } from './arc.ts';
import { deserializeBasicEvent, serializeBasicEvent } from './basicEvent.ts';
import {
   deserializeBasicEventTypesWithKeywords,
   serializeBasicEventTypesWithKeywords,
} from './basicEventTypesWithKeywords.ts';
import { deserializeBombNote, serializeBombNote } from './bombNote.ts';
import { deserializeBPMEvent, serializeBPMEvent } from './bpmEvent.ts';
import { deserializeColorBoostEvent, serializeColorBoostEvent } from './colorBoostEvent.ts';
import { deserializeColorNote, serializeColorNote } from './colorNote.ts';
import { deserializeObstacle, serializeObstacle } from './obstacle.ts';
import { deserializeRotationEvent, serializeRotationEvent } from './rotationEvent.ts';
import { deserializeWaypoint, serializeWaypoint } from './waypoint.ts';
import type { DeepPartial } from '../../../types/utils.ts';

type DifficultyDeserializationPolyfills = Pick<
   IWrapBeatmap,
   | 'filename'
   | 'lightshowFilename'
>;

/** Serialize beatmap v2 `Difficulty` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeDifficulty(data: IWrapBeatmap): IDifficulty {
   return {
      _version: '2.6.0',
      _notes: [
         ...data.difficulty.colorNotes.map((x) => {
            return serializeColorNote(x);
         }),
         ...data.difficulty.bombNotes.map((x) => {
            return serializeBombNote(x);
         }),
      ].sort(sortV2NoteFn),
      _sliders: data.difficulty.arcs.map((x) => {
         return serializeArc(x);
      }),
      _obstacles: data.difficulty.obstacles.map((x) => {
         return serializeObstacle(x);
      }),
      _events: [
         ...data.lightshow.basicEvents.map((x) => {
            return serializeBasicEvent(x);
         }),
         ...data.lightshow.colorBoostEvents.map((x) => {
            return serializeColorBoostEvent(x);
         }),
         ...data.difficulty.rotationEvents.map((x) => {
            return serializeRotationEvent(x);
         }),
         ...data.difficulty.bpmEvents.map((x) => {
            return serializeBPMEvent(x);
         }),
      ].sort(sortV2ObjectFn),
      _waypoints: data.lightshow.waypoints.map((x) => {
         return serializeWaypoint(x);
      }),
      _specialEventsKeywordFilters: serializeBasicEventTypesWithKeywords(
         data.lightshow.basicEventTypesWithKeywords,
      ),
      _customData: deepCopy(data.difficulty.customData),
   };
}

/** Deserialize schema object into beatmap v2 `Difficulty` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills.
 * @returns The unwrapped beatmap object.
 */
export function deserializeDifficulty(
   data: IDifficulty,
   options?: DeepPartial<DifficultyDeserializationPolyfills>,
): IWrapBeatmap {
   const colorNotes: IWrapColorNote[] = [];
   const bombNotes: IWrapBombNote[] = [];
   const _notes = data._notes || [];
   for (let i = 0; i < _notes.length; i++) {
      const obj = _notes[i];
      if (obj?._type === 3) {
         bombNotes.push(deserializeBombNote(obj));
      } else {
         colorNotes.push(deserializeColorNote(obj));
      }
   }

   const preV25 = compareVersion(data._version || '2.0.0', '2.5.0');
   const basicEvents: IWrapBasicEvent[] = [];
   const colorBoostEvents: IWrapColorBoostEvent[] = [];
   const rotationEvents: IWrapRotationEvent[] = [];
   const bpmEvents: IWrapBPMEvent[] = [];
   const _events = data._events || [];
   for (let i = 0; i < _events.length; i++) {
      const obj = _events[i];
      switch (obj?._type) {
         case 5:
            colorBoostEvents.push(deserializeColorBoostEvent(obj));
            break;
         case 14:
         case 15:
            rotationEvents.push(deserializeRotationEvent(obj));
            break;
         case 100:
            bpmEvents.push(deserializeBPMEvent(obj));
            break;
         default: {
            const evt = deserializeBasicEvent(obj);
            if (preV25 < 0) {
               if (obj._type === 10) {
                  bpmEvents.push(deserializeBPMEvent(obj));
               } else {
                  evt.floatValue = 1;
                  basicEvents.push(evt);
               }
            } else {
               basicEvents.push(evt);
            }
         }
      }
   }
   return createBeatmap({
      version: 2,
      filename: options?.filename,
      lightshowFilename: options?.lightshowFilename,
      difficulty: {
         colorNotes,
         bombNotes,
         obstacles: data._obstacles?.map((x) => {
            return deserializeObstacle(x);
         }),
         rotationEvents,
         bpmEvents,
         customData: data._customData,
      },
      lightshow: {
         waypoints: data._waypoints?.map((x) => {
            return deserializeWaypoint(x);
         }),
         basicEvents,
         colorBoostEvents,
         useNormalEventsAsCompatibleEvents: true,
         basicEventTypesWithKeywords: deserializeBasicEventTypesWithKeywords(
            data._specialEventsKeywordFilters ?? {},
         ),
      },
   });
}
