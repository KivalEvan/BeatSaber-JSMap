import type { IDifficulty } from './types/difficulty.ts';
import type { IWrapBasicEvent } from '../wrapper/types/basicEvent.ts';
import type { IWrapBeatmap } from '../wrapper/types/beatmap.ts';
import type { IWrapBombNote } from '../wrapper/types/bombNote.ts';
import type { IWrapBPMEvent } from '../wrapper/types/bpmEvent.ts';
import type { IWrapColorBoostEvent } from '../wrapper/types/colorBoostEvent.ts';
import type { IWrapColorNote } from '../wrapper/types/colorNote.ts';
import type { IWrapInfo, IWrapInfoBeatmap } from '../wrapper/types/info.ts';
import type { IWrapRotationEvent } from '../wrapper/types/rotationEvent.ts';
import { createBeatmap } from '../wrapper/beatmap.ts';
import { deserializeBasicEvent, serializeBasicEvent } from './basicEvent.ts';
import { deserializeBombNote, serializeBombNote } from './bombNote.ts';
import { deserializeBPMEvent, serializeBPMEvent } from './bpmEvent.ts';
import { deserializeColorBoostEvent, serializeColorBoostEvent } from './colorBoostEvent.ts';
import { deserializeColorNote, serializeColorNote } from './colorNote.ts';
import { deserializeObstacle, serializeObstacle } from './obstacle.ts';
import { deserializeRotationEvent, serializeRotationEvent } from './rotationEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';

type DifficultySerializationPolyfills =
   & Pick<IWrapInfo['audio'], 'bpm' | 'shuffle' | 'shufflePeriod'>
   & Pick<IWrapInfoBeatmap, 'njs' | 'njsOffset'>
   & { beatsPerBar: number };

type DifficultyDeserializationPolyfills = Pick<
   IWrapBeatmap,
   'filename' | 'lightshowFilename'
>;

/** Serialize beatmap v1 `Difficulty` object into schema object.
 * @param data The unwrapped beatmap object.
 * @param options Serialization options.
 * @returns The serialized schema object.
 */
export function serializeDifficulty(
   data: IWrapBeatmap,
   options?: DeepPartial<DifficultySerializationPolyfills>,
): IDifficulty {
   return {
      _version: '1.5.0',
      // FIXME: none of these shouldve ever existed, why
      _beatsPerMinute: options?.bpm ?? 120,
      _beatsPerBar: options?.beatsPerBar ?? 4,
      _shuffle: options?.shuffle ?? 0,
      _shufflePeriod: options?.shufflePeriod ?? 0.5,
      _noteJumpSpeed: options?.njs ?? 0,
      _noteJumpStartBeatOffset: options?.njsOffset ?? 0,
      _notes: [
         ...data.difficulty.colorNotes.map((x) => {
            return serializeColorNote(x);
         }),
         ...data.difficulty.bombNotes.map((x) => {
            return serializeBombNote(x);
         }),
      ],
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
      ],
      _time: data.difficulty.customData._time,
      _BPMChanges: data.difficulty.customData._bpmChanges,
      _bookmarks: data.difficulty.customData._bookmarks,
   };
}

/** Deserialize schema object into beatmap v1 `Difficulty` object.
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
         case 10:
            bpmEvents.push(deserializeBPMEvent(obj));
            break;
         default:
            basicEvents.push(deserializeBasicEvent(obj));
      }
   }

   return createBeatmap({
      version: 1,
      filename: options?.filename ?? 'EasyStandard.dat',
      lightshowFilename: options?.lightshowFilename ?? 'EasyLightshow.dat',
      difficulty: {
         colorNotes,
         bombNotes,
         obstacles: data._obstacles?.map((x) => deserializeObstacle(x)),
         rotationEvents,
         bpmEvents,
         customData: {
            _bpmChanges: data._BPMChanges,
            _bookmarks: data._bookmarks,
            _time: data._time,
         },
      },
      lightshow: {
         basicEvents,
         colorBoostEvents,
         useNormalEventsAsCompatibleEvents: true,
      },
   });
}
