import type { ISchemaContainer } from '../shared/types/schema.ts';
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
import { createDifficulty } from '../wrapper/difficulty.ts';
import { createLightshow } from '../wrapper/lightshow.ts';
import { basicEvent } from './basicEvent.ts';
import { bombNote } from './bombNote.ts';
import { bpmEvent } from './bpmEvent.ts';
import { colorBoostEvent } from './colorBoostEvent.ts';
import { colorNote } from './colorNote.ts';
import { obstacle } from './obstacle.ts';
import { rotationEvent } from './rotationEvent.ts';

type DifficultySerializationPolyfills =
   & Pick<IWrapInfo['audio'], 'bpm' | 'shuffle' | 'shufflePeriod'>
   & Pick<IWrapInfoBeatmap, 'njs' | 'njsOffset'>
   & { beatsPerBar: number };

type DifficultyDeserializationPolyfills = Pick<
   IWrapBeatmap,
   'filename' | 'lightshowFilename'
>;

/**
 * Schema serialization for v1 `Difficulty`.
 */
export const difficulty: ISchemaContainer<
   IWrapBeatmap,
   IDifficulty,
   DifficultySerializationPolyfills,
   DifficultyDeserializationPolyfills
> = {
   serialize(data, options) {
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
               return colorNote.serialize(x);
            }),
            ...data.difficulty.bombNotes.map((x) => {
               return bombNote.serialize(x);
            }),
         ],
         _obstacles: data.difficulty.obstacles.map((x) => {
            return obstacle.serialize(x);
         }),
         _events: [
            ...data.lightshow.basicEvents.map((x) => {
               return basicEvent.serialize(x);
            }),
            ...data.lightshow.colorBoostEvents.map((x) => {
               return colorBoostEvent.serialize(x);
            }),
            ...data.difficulty.rotationEvents.map((x) => {
               return rotationEvent.serialize(x);
            }),
            ...data.difficulty.bpmEvents.map((x) => {
               return bpmEvent.serialize(x);
            }),
         ],
         _time: data.difficulty.customData._time,
         _BPMChanges: data.difficulty.customData._bpmChanges,
         _bookmarks: data.difficulty.customData._bookmarks,
      };
   },
   deserialize(data, options) {
      const colorNotes: IWrapColorNote[] = [];
      const bombNotes: IWrapBombNote[] = [];
      const _notes = data._notes || [];
      for (let i = 0; i < _notes.length; i++) {
         const obj = _notes[i];
         if (obj?._type === 3) {
            bombNotes.push(bombNote.deserialize(obj));
         } else {
            colorNotes.push(colorNote.deserialize(obj));
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
               colorBoostEvents.push(colorBoostEvent.deserialize(obj));
               break;
            case 14:
            case 15:
               rotationEvents.push(rotationEvent.deserialize(obj));
               break;
            case 100:
            case 10:
               bpmEvents.push(bpmEvent.deserialize(obj));
               break;
            default:
               basicEvents.push(basicEvent.deserialize(obj));
         }
      }

      return createBeatmap({
         version: 1,
         filename: options?.filename ?? 'EasyStandard.dat',
         lightshowFilename: options?.lightshowFilename ?? 'EasyLightshow.dat',
         difficulty: createDifficulty({
            colorNotes,
            bombNotes,
            obstacles: data._obstacles?.map((x) => obstacle.deserialize(x)),
            rotationEvents,
            bpmEvents,
            customData: {
               _bpmChanges: data._BPMChanges,
               _bookmarks: data._bookmarks,
               _time: data._time,
            },
         }),
         lightshow: createLightshow({
            basicEvents,
            colorBoostEvents,
            useNormalEventsAsCompatibleEvents: true,
         }),
      });
   },
};
