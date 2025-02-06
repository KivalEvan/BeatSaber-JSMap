// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IDifficulty } from '../../../types/beatmap/v2/difficulty.ts';
import type { IWrapBasicEvent } from '../../../types/beatmap/wrapper/basicEvent.ts';
import type { IWrapBeatmap } from '../../../types/beatmap/wrapper/beatmap.ts';
import type { IWrapBombNote } from '../../../types/beatmap/wrapper/bombNote.ts';
import type { IWrapBPMEvent } from '../../../types/beatmap/wrapper/bpmEvent.ts';
import type { IWrapColorBoostEvent } from '../../../types/beatmap/wrapper/colorBoostEvent.ts';
import type { IWrapColorNote } from '../../../types/beatmap/wrapper/colorNote.ts';
import type { IWrapRotationEvent } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createBeatmap } from '../../core/beatmap.ts';
import { createDifficulty } from '../../core/difficulty.ts';
import { createLightshow } from '../../core/lightshow.ts';
import { sortV2NoteFn, sortV2ObjectFn } from '../../helpers/sort.ts';
import { compareVersion } from '../../helpers/version.ts';
import { arc } from './arc.ts';
import { basicEvent } from './basicEvent.ts';
import { basicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import { bombNote } from './bombNote.ts';
import { bpmEvent } from './bpmEvent.ts';
import { colorBoostEvent } from './colorBoostEvent.ts';
import { colorNote } from './colorNote.ts';
import { obstacle } from './obstacle.ts';
import { rotationEvent } from './rotationEvent.ts';
import { waypoint } from './waypoint.ts';

type DifficultyDeserializationPolyfills = Pick<
   IWrapBeatmap,
   | 'filename'
   | 'lightshowFilename'
>;

/**
 * Schema serialization for v2 `Difficulty`.
 */
export const difficulty: ISchemaContainer<
   IWrapBeatmap,
   IDifficulty,
   Record<string, any>,
   DifficultyDeserializationPolyfills
> = {
   serialize(data) {
      return {
         _version: '2.6.0',
         _notes: [
            ...data.difficulty.colorNotes.map((x) => {
               return colorNote.serialize(x);
            }),
            ...data.difficulty.bombNotes.map((x) => {
               return bombNote.serialize(x);
            }),
         ].sort(sortV2NoteFn),
         _sliders: data.difficulty.arcs.map((x) => {
            return arc.serialize(x);
         }),
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
         ].sort(sortV2ObjectFn),
         _waypoints: data.lightshow.waypoints.map((x) => {
            return waypoint.serialize(x);
         }),
         _specialEventsKeywordFilters: basicEventTypesWithKeywords.serialize(
            data.lightshow.basicEventTypesWithKeywords,
         ),
         _customData: deepCopy(data.difficulty.customData),
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
               colorBoostEvents.push(colorBoostEvent.deserialize(obj));
               break;
            case 14:
            case 15:
               rotationEvents.push(rotationEvent.deserialize(obj));
               break;
            case 100:
               bpmEvents.push(bpmEvent.deserialize(obj));
               break;
            default: {
               const evt = basicEvent.deserialize(obj);
               if (preV25 < 0) {
                  if (obj._type === 10) {
                     bpmEvents.push(bpmEvent.deserialize(obj));
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
         difficulty: createDifficulty({
            colorNotes,
            bombNotes,
            obstacles: data._obstacles?.map((x) => {
               return obstacle.deserialize(x);
            }),
            rotationEvents,
            bpmEvents,
            customData: data._customData,
         }),
         lightshow: createLightshow({
            waypoints: data._waypoints?.map((x) => {
               return waypoint.deserialize(x);
            }),
            basicEvents,
            colorBoostEvents,
            useNormalEventsAsCompatibleEvents: true,
            basicEventTypesWithKeywords: basicEventTypesWithKeywords.deserialize(
               data._specialEventsKeywordFilters ?? {},
            ),
         }),
      });
   },
};
